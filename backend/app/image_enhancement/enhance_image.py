from fastapi import APIRouter, UploadFile, HTTPException, Query
from pydantic import BaseModel
from PIL import Image
import io
import cv2
import numpy as np
import base64


router = APIRouter()

class EnhanceImageResponse(BaseModel):
  enhanced_image: bytes

@router.post(
  "/enhance_image",
  response_model=EnhanceImageResponse,
)
async def enhance_image(
    image: UploadFile,
    enhancement_level: float = Query(..., ge=0, le=1),
    restoration_level: float = Query(..., ge=0, le=1),
    compression_level: float = Query(..., ge=0, le=1),
) -> EnhanceImageResponse:
  """
    Process an image with enhancement, restoration, and compression.
    
    Parameter Ranges and Recommendations:
    
    1. Enhancement Level (0.0 - 1.0):
    - 0.0: No enhancement (original image)
    - 0.2-0.4: Mild contrast improvement
    - 0.5-0.7: Moderate contrast enhancement
    - 0.8-1.0: Strong contrast boost (may look unnatural)
    
    2. Restoration Level (0.0 - 1.0):
    - 0.0: No noise reduction
    - 0.1-0.3: Light noise reduction (subtle smoothing)
    - 0.4-0.6: Moderate noise reduction 
    - 0.7-1.0: Heavy noise reduction (may lose some image details)
    
    3. Compression Level (0.0 - 1.0):
    - 0.0: Highest quality, largest file size
    - 0.2-0.4: High quality, moderate file size reduction
    - 0.5-0.7: Balanced quality and compression
    - 0.8-1.0: Significant compression, lower image quality
    
    Parameters:
    - input_image: numpy array representing the input image
    - enhancement_level: float between 0 and 1 for image enhancement intensity
    - restoration_level: float between 0 and 1 for image restoration intensity
    - compression_level: float between 0 and 1 for compression quality
    
    Returns:
    - enhanced_image: base64 representing the processed image
  """
  try:
    # Read the uploaded image
    image_data = await image.read()
    photo_stream = io.BytesIO(image_data)
    image = Image.open(photo_stream)
    image_array = np.array(image)

    # Enhance image
    enhanced_image = image_array.copy()
    if enhancement_level > 0:
      clip_limit = 2.0 + (enhancement_level * 8.0) # 2.0 to 10.0
      clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=(8, 8))
      if len(image_array.shape) == 3:
          lab_image = cv2.cvtColor(image_array, cv2.COLOR_RGB2LAB)
          lab_planes = list(cv2.split(lab_image))
          lab_planes[0] = clahe.apply(lab_planes[0])
          enhanced_image = cv2.cvtColor(cv2.merge(lab_planes), cv2.COLOR_LAB2RGB)
      else:
        # Handle grayscale or other formats
        if len(image_array.shape) == 2:
          # Grayscale to RGB
          enhanced_image = cv2.cvtColor(image_array, cv2.COLOR_GRAY2RGB)
        elif image_array.shape[2] == 4:
          # RGBA to RGB
          enhanced_image = cv2.cvtColor(image_array, cv2.COLOR_RGBA2RGB)

    # Restore image
    restored_image = enhanced_image.copy()
    if restoration_level > 0:
      # Adaptive bilateral filtering
      # Higher restoration level means more aggressive noise reduction
      restoration_strength = max(3, int(restoration_level * 15)) # 3 to 15
      restored_image = cv2.bilateralFilter(
        enhanced_image,
        restoration_strength,
        restoration_strength * 2,
        restoration_strength * 2,
      )

    # Compress image
    # Map compression level to JPEG quality
    # 0.0 = highest quality (100), 1.0 = lowest quality (10)
    compression_quality = int(100 - (compression_level * 90))  # 100 to 10
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), compression_quality]

    # Ensure image is in RGB before encoding
    restored_image_rgb = cv2.cvtColor(restored_image, cv2.COLOR_BGR2RGB)

    # Encode the RGB image
    result, encoded_image = cv2.imencode(".jpg", restored_image_rgb, encode_param)

    if not result:
      raise Exception("Failed to encode image")

    encoded_image_base64 = base64.b64encode(encoded_image).decode()

    return EnhanceImageResponse(enhanced_image=encoded_image_base64)

  except Exception as e:
    print(f"Error during processing: {e}")
    raise ValueError(f"An error occurred: {e}")