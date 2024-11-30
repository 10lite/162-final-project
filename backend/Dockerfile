# FROM python:3.12-slim

# WORKDIR /app

# RUN pip install --no-cache-dir poetry

# COPY pyproject.toml poetry.lock ./
# RUN poetry install --no-dev --no-interaction --no-ansi --no-root

# COPY . .

# RUN poetry shell
# EXPOSE 8000

# CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN pip install --no-cache-dir poetry

# Copy only dependency files first for better caching
COPY pyproject.toml poetry.lock ./

# Install dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

# Copy the rest of the application
COPY . .