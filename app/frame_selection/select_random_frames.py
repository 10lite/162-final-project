import base64
from enum import Enum

from fastapi import HTTPException, UploadFile, APIRouter, File, status
from pydantic import BaseModel

from .utils import extract_random_frames, compress_photo, enhance_photo
from ..common.models import ErrorResponse


router = APIRouter()


class VideoUploadLimit(int, Enum):
    TEN_MB = 10 * 1024 * 1024  # 10 MB


class SelectRandomFramesResponse(BaseModel):
    photos: list[str]


error_response = {
    413: {
        "description": "File size is too large",
        "model": ErrorResponse,
    },
    400: {
        "description": "Bad request, general error",
        "model": ErrorResponse,
    },
}


@router.post(
    "/get_enhanced_frames",
    response_model=SelectRandomFramesResponse,
    responses=error_response,
)
async def select_random_frames(
    video: UploadFile = File(...),
) -> SelectRandomFramesResponse:
    frames = []

    if video.size > VideoUploadLimit.TEN_MB:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size is too large. Maximum file size is 10MB.",
        )

    try:
        async for frame in extract_random_frames(video, number_of_frames=3):
            enhanced_image = enhance_photo(frame)
            compressed_frame = compress_photo(enhanced_image)
            frames.append(compressed_frame.getvalue())

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    frames_base64 = [base64.b64encode(f).decode() for f in frames]

    return SelectRandomFramesResponse(photos=frames_base64)
