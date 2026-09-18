from fastapi import APIRouter
from app.repositories.base import SensorRepository

router = APIRouter()
sensor_repo = SensorRepository()

@router.get("/")
def get_sensors():
    return sensor_repo.get_all()
