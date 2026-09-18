from fastapi import APIRouter
from app.repositories.base import MetricsRepository

router = APIRouter()
metrics_repo = MetricsRepository()

@router.get("/")
def get_metrics():
    return metrics_repo.get_metrics()
