from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_verification_endpoint():

    response = client.post(
        "/api/verification/",
    )

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "PENDING"