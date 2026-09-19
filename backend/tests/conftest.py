import os

os.environ[
    "DATABASE_URL"
] = "sqlite:///./test.db"

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def get_client():
    return client