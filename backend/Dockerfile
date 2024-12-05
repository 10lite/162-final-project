# FROM python:3.12-slim

# WORKDIR /app

# RUN pip install --no-cache-dir poetry

# COPY pyproject.toml poetry.lock ./
# RUN poetry install --no-dev --no-interaction --no-ansi --no-root

# COPY . .

# RUN poetry shell
# EXPOSE 8000


# FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11


# COPY ./requirements.txt /app/requirements.txt

# # Install system dependencies
# RUN pip install --pre torch torchvision --force-reinstall --index-url https://download.pytorch.org/whl/nightly/cpu

# # Install dependencies
# RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# # Copy the rest of the application
# COPY . /app/

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0

# Install Python dependencies
COPY ./requirements.txt /app/requirements.txt
RUN pip install --pre torch torchvision --force-reinstall --index-url https://download.pytorch.org/whl/nightly/cpu
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy the application code
COPY . /app/
