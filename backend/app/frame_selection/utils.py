from io import BytesIO
from fastapi import UploadFile, File

import random
import decord
import cv2
import numpy as np


def enhance_photo(photo: np.ndarray) -> np.ndarray:
    """
    Enhance the given photo by applying Contrast Limited Adaptive Histogram Equalization (CLAHE)
    to the value channel in the HSV color space.

    Args:
        photo (np.ndarray): Input image in RGB format as a NumPy array.
    Returns:
        np.ndarray: Enhanced image in RGB format as a NumPy array.
    """

    hsv_photo = cv2.cvtColor(photo, cv2.COLOR_RGB2HSV)

    clahe = cv2.createCLAHE(clipLimit=5.0, tileGridSize=(8, 8))
    hsv_photo[:, :, 2] = clahe.apply(hsv_photo[:, :, 2])
    image_enhanced = cv2.cvtColor(hsv_photo, cv2.COLOR_HSV2RGB)

    return image_enhanced


async def extract_random_frames(video_file: UploadFile, number_of_frames: int = 1):
    """
    Extracts a specified number of random frames from a given video file.
    Args:
        video_file (UploadFile): The video file from which frames are to be extracted.
        number_of_frames (int, optional): The number of random frames to extract. Defaults to 1.
    Yields:
        np.ndarray: A NumPy array representing the pixel data of each extracted frame.
    Raises:
        ValueError: If the number of frames requested exceeds the total number of frames in the video.
    """
    video_data = await video_file.read()
    video_stream = BytesIO(video_data)

    container = decord.VideoReader(video_stream)
    total_frames = len(container)

    frame_indices = random.sample(range(total_frames), number_of_frames)
    for index in frame_indices:
        frame_data = container[index].asnumpy()  # This is a NumPy array
        yield frame_data


def compress_photo(photo: np.ndarray, quality: int = 80) -> BytesIO:
    """
    Compress a photo represented as a NumPy array to JPEG format with the specified quality.
    Args:
        photo (np.ndarray): The input image as a NumPy array in RGB format.
        quality (int, optional): The quality of the JPEG compression (1-100). Default is 80.
    Returns:
        BytesIO: A BytesIO object containing the compressed JPEG image.
    Raises:
        ValueError: If the image compression fails.
    """
    # Convert the NumPy array (image) to JPEG format with compression
    photo_to_bgr = cv2.cvtColor(photo, cv2.COLOR_RGB2BGR)
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]
    is_success, encoded_image = cv2.imencode(".jpg", photo_to_bgr, encode_param)

    if is_success:
        # Convert the encoded image to a BytesIO object
        compressed_image = BytesIO(encoded_image.tobytes())
        return compressed_image
    else:
        raise ValueError("Image compression failed")
