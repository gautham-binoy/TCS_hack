from fastapi import APIRouter, HTTPException
from app.data.mock_db import db

router = APIRouter()

@router.get("/")
def get_buildings():
    return db.buildings

@router.get("/{building_id}")
def get_building(building_id: str):
    for b in db.buildings:
        if b["id"] == building_id:
            return b
    raise HTTPException(status_code=404, detail="Building not found")
