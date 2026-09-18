from fastapi import APIRouter
from app.repositories.base import RecommendationRepository

router = APIRouter()
rec_repo = RecommendationRepository()

@router.get("/")
def get_recommendations():
    return rec_repo.get_all()
