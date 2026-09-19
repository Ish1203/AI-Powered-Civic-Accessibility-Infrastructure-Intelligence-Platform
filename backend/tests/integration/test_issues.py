from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_get_issues():

    response = client.get(
        "/api/issues/"
    )

    assert response.status_code == 200


def test_get_non_existing_issue():

    response = client.get(
        "/api/issues/999999"
    )

    assert response.status_code == 404