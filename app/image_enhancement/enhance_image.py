from fastapi import APIRouter, UploadFile
from pydantic import BaseModel
from PIL import Image
import io
import cv2
import numpy as np


router = APIRouter()

class EnhanceImageResponse(BaseModel):
  enhanced_image: bytes

@router.post(
  "/enhance_image",
  response_model=EnhanceImageResponse,
)
async def enhance_image(image: UploadFile, enhancement_level: int, restoration_level: int, compression_level: int) -> EnhanceImageResponse:

  try:
    image = await image.read()
    photo_stream = io.BytesIO(image)
    image = Image.open(photo_stream)
    image_array = np.array(image)

  except Exception as e:
    print(e)
    return {"error": e}