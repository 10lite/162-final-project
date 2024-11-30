from io import BytesIO
from fastapi import UploadFile, File
import random
import decord
import cv2
import numpy as np


# async def extract_random_frames(video_file: UploadFile, number_of_frames: int = 1):
#     video_data = await video_file.read()
#     video_stream = BytesIO(video_data)

#     container = decord.VideoReader(video_stream)
#     total_frames = len(container)

#     frame_indices = random.sample(range(total_frames), number_of_frames)
#     for index in frame_indices:
#         frame_data = container[index].asnumpy()
#         yield frame_data


def enhance_photo(photo: BytesIO):
    pass


# def compress_photo(photo: np.ndarray, quality: int = 80) -> BytesIO:
#     # Convert the image (NumPy array) to JPEG format with compression
#     encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]
#     is_success, encoded_image = cv2.imencode(".jpg", photo, encode_param)

#     if is_success:
#         # Convert the encoded image back to BytesIO to yield as a file-like object
#         compressed_image = BytesIO(encoded_image.tobytes())
#         return compressed_image
#     else:
#         raise ValueError("Image compression failed")


async def extract_random_frames(video_file: UploadFile, number_of_frames: int = 1):
    video_data = await video_file.read()
    video_stream = BytesIO(video_data)

    container = decord.VideoReader(video_stream)
    total_frames = len(container)

    frame_indices = random.sample(range(total_frames), number_of_frames)
    for index in frame_indices:
        frame_data = container[index].asnumpy()  # This is a NumPy array
        yield frame_data


def compress_photo(photo: np.ndarray, quality: int = 80) -> BytesIO:
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