import io
import base64

import cv2
import numpy as np
from fastapi import APIRouter, UploadFile, HTTPException, status
from pydantic import BaseModel, ConfigDict
from ultralytics import YOLO
from PIL import Image

from .utils import draw_bounding_boxes

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
async def detect_vehicles(input: UploadFile) -> DetectVehiclesResponse:
    model_path = "./app/car_detection/bantay_trapiko_model.pt"
    model = YOLO(model_path)
    count = {"car": 0, "bus": 0, "truck": 0, "motorcycle": 0}

    try:
        # Convert bytearray into numpy.ndarray and do inference on this ndarray object instead of image path
        image = await input.read()
        photo_stream = io.BytesIO(image)
        image = Image.open(photo_stream)
        image_array = np.array(image)

        if image_array.ndim == 2:  # Grayscale to RGB
            image_array = np.stack((image_array,) * 3, axis=-1)
        elif image_array.shape[2] == 4:  # RGBA to RGB
            image_array = image_array[:, :, :3]

        # Perform inference, do not save the photo and only return the count of vehicles and bytearray of the photo with boxes
        results = model(image_array, conf=0.5)

        boxes = results[0].boxes
        names = results[0].names

        detected_vehicles = boxes.cls.tolist()
        for vehicle in detected_vehicles:
            count[names[vehicle]] += 1

        # Draw the bounding boxes on the image
        image_with_boxes = results[0].plot()
        image_with_boxes = cv2.cvtColor(image_with_boxes, cv2.COLOR_BGR2RGB)

        # encode the numpy into file format
        success, encoded_image = cv2.imencode(".jpg", image_with_boxes)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to encode image",
            )

        return {
            "count": count,
            "photo": base64.b64encode(encoded_image).decode(),
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
