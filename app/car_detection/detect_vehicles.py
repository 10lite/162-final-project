from fastapi import APIRouter
from pydantic import BaseModel, ConfigDict

router = APIRouter()

class Count(BaseModel):
  car: int
  bus: int
  truck: int
  motorcycle: int

class DetectVehiclesResponse(BaseModel):
  count: Count
  photo: bytes

  model_config = ConfigDict(arbitrary_types_allowed=True)

@router.post(
  "/detect_vehicles",
  response_model=DetectVehiclesResponse,
)
async def detect_vehicles() -> DetectVehiclesResponse:
  return DetectVehiclesResponse(
    count=Count(car=1, bus=2, truck=3, motorcycle=4),
    photo=b"photo"
  )