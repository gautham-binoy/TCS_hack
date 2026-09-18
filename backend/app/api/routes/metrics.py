from fastapi import APIRouter
from app.data.mock_db import db

router = APIRouter()

@router.get("/")
def get_metrics():
    return db.get_campus_metrics()
