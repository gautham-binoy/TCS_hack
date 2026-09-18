from fastapi import APIRouter
from app.db import db

router = APIRouter()

@router.get("")
@router.get("/")
def get_recommendations():
    return db.recommendations
