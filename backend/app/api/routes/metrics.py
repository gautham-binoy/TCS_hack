from fastapi import APIRouter
from app.db import db

router = APIRouter()

@router.get("")
@router.get("/")
def get_metrics():
    return db.get_campus_metrics()
