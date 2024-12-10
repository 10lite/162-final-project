import numpy as np
import cv2

def draw_bounding_boxes(image: np.ndarray, boxes: list, color=(0, 255, 0), thickness=2):
    """
    Draw bounding boxes on an image.

    :param image: Original image in NumPy array format.
    :param boxes: List of bounding boxes in (x, y, width, height) format.
    :param color: Tuple representing the color of the bounding box (default is green).
    :param thickness: Thickness of the rectangle border (default is 2).
    :return: Image with bounding boxes drawn.
    """

    # Ensure image is uint8 and contiguous
    if image.dtype != np.uint8:
        image = image.astype(np.uint8)
    image = np.ascontiguousarray(image)

    for box in boxes:
        x, y, w, h = box  # Bounding box in (x, y, width, height)
        x_min = max(int(x - w / 2), 0)
        y_min = max(int(y - h / 2), 0)
        x_max = min(int(x + w / 2), image.shape[1])
        y_max = min(int(y + h / 2), image.shape[0])

        # Draw rectangle on the image
        cv2.rectangle(image, (x_min, y_min), (x_max, y_max), color, thickness)

    return image
