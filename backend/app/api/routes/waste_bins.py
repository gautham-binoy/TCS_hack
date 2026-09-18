from fastapi import APIRouter
from app.repositories.base import WasteBinRepository

router = APIRouter()
waste_bin_repo = WasteBinRepository()

@router.get("/")
def get_waste_bins():
    return waste_bin_repo.get_all()
