from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.buildings import BuildingDetail
from app.repositories.base import BuildingRepository

router = APIRouter()
building_repo = BuildingRepository()

@router.get("/")
def get_buildings():
    return building_repo.get_all()

@router.get("/{building_id}")
def get_building(building_id: str):
    building = building_repo.get_by_id(building_id)
    if not building:
        raise HTTPException(status_code=404, detail="Building not found")
    return building
