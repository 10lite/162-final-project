import base64

from fastapi import HTTPException, UploadFile, APIRouter, File, status
from fastapi.responses import JSONResponse, StreamingResponse
from enum import Enum
from .utils import extract_random_frames, compress_photo, enhance_photo

from fastapi import File, UploadFile


router = APIRouter()


class VideoUploadLimit(int, Enum):
    TEN_MB = 10 * 1024 * 1024  # 10 MB


@router.post("/get_enhanced_frames")
async def select_random_frames(video: UploadFile = File(...)):
    frames = []

    try:
        if video.size > VideoUploadLimit.TEN_MB:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="File size is too large. Maximum file size is 10MB.",
            )

        async for frame in extract_random_frames(video, number_of_frames=3):
            enhanced_image = enhance_photo(frame)
            compressed_frame = compress_photo(enhanced_image)
            frames.append(compressed_frame.getvalue())

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Convert the frames to base64 before returning as JSON
    frames_base64 = [base64.b64encode(f).decode() for f in frames]

    # Return frames as a JSON response
    return JSONResponse(content={"photos": frames_base64})
