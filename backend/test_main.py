from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "stage": "preprod"}


def test_search():
    response = client.get("/api/search")
    assert response.status_code == 200


def test_change_detection():
    response = client.get("/api/change-detection")
    assert response.status_code == 200
