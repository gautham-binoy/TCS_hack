from fastapi import APIRouter
from app.repositories.base import AlertRepository

router = APIRouter()
alert_repo = AlertRepository()

@router.get("/")
def get_alerts():
    return alert_repo.get_all()
