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

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]