from fastapi.responses import HTMLResponse
from fastapi import FastAPI
import uvicorn
from app.frame_selection.select_random_frames import router

app = FastAPI(
    title="CMSC 162 - Final Project",
)

app.include_router(router, prefix="/api")


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
