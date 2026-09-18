from fastapi import APIRouter
from app.db import db

router = APIRouter()

@router.get("")
@router.get("/")
def get_green_areas():
    return db.green_areas
