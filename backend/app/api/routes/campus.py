from fastapi import APIRouter
from app.repositories.base import BuildingRepository

router = APIRouter()
building_repo = BuildingRepository()

@router.get("/")
def get_campus():
    # Return overall campus information and map locations.
    # The MVP definition states it returns overall info and map locations.
    buildings = building_repo.get_all()
    locations = [{"id": b["id"], "name": b["name"], "location": b["location"]} for b in buildings]
    return {
        "name": "Campus EcoTwin",
        "description": "AI-powered campus sustainability platform",
        "locations": locations
    }
