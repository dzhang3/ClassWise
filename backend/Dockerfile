# Use an official Python image as the base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /backend

# Install PostgreSQL development packages
RUN apt-get update \
    && apt-get install -y libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt to the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire Django application to the container
COPY . .

# Expose port 8000
EXPOSE 8000

# Run migrations and start the Django app
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

# # Command to start the Django app
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
