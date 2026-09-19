from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_register():

    response = client.post(
        "/api/auth/register",
        json={
            "name": "Test User",
            "email": "testuser@example.com",
            "password": "Test12345",
            "phone": "9999999999",
        },
    )

    assert response.status_code in [
        200,
        400,
    ]


def test_login_invalid_user():

    response = client.post(
        "/api/auth/login",
        json={
            "email": "doesnotexist@example.com",
            "password": "wrongpassword",
        },
    )

    assert response.status_code == 401