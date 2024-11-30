import base64
from io import BytesIO


from fastapi import HTTPException, UploadFile, APIRouter, File
from fastapi.responses import JSONResponse, StreamingResponse
from .utils import extract_random_frames, compress_photo

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from typing import Optional


router = APIRouter()
from io import BytesIO


@router.post("/select_random_frames")
async def select_random_frames(video: UploadFile = File(...)):
    frames = []

    try:
        async for frame in extract_random_frames(video, number_of_frames=3):
            compressed_frame = compress_photo(frame)
            frames.append(
                compressed_frame.getvalue()
            )  # Get raw bytes from the BytesIO object

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Convert the frames to base64 before returning as JSON
    frames_base64 = [base64.b64encode(f).decode() for f in frames]

    # Return frames as a JSON response
    return JSONResponse(content={"photos": frames_base64})


import io
import decord
from PIL import Image


@router.post("/uploadvideo/")
async def upload_video(video: UploadFile = File(...), frame: int = 0):
    # Read the video data into memory
    video_data = await video.read()  # Asynchronous read
    video_stream = BytesIO(video_data)

    # Use decord to read the video
    container = decord.VideoReader(video_stream)

    # Retrieve the specified frame
    frame_data = container[frame].asnumpy()

    # Convert the frame to a PIL image
    image = Image.fromarray(frame_data)

    # Save the image to a BytesIO buffer as JPEG
    buffer = BytesIO()
    image.save(buffer, format="JPEG")
    buffer.seek(0)

    # Return the frame as an image response
    return StreamingResponse(buffer, media_type="image/jpeg")
