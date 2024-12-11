from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import uvicorn
from app.frame_selection.select_random_frames import router as frame_selection_router
from app.car_detection.detect_vehicles import router as car_detection_router
from app.image_enhancement.enhance_image import router as image_enhancement_router

app = FastAPI(
    title="CMSC 162 - Final Project",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(frame_selection_router, prefix="/api")
app.include_router(car_detection_router, prefix="/api")
app.include_router(image_enhancement_router, prefix="/api")

@app.get("/", include_in_schema=False)
def entry():
    html_content = """
    <html>
        <head>
            <title>CMSC 162 Final Project</title>
        </head>
        <body>
            <h1>APIs used for the CMSC 162 Final Project</h1>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
