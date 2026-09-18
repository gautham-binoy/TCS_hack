from app.db.session import db, get_db, CampusDB
from app.db.base import (
    BaseRepository,
    BuildingRepository,
    SensorRepository,
    WasteBinRepository,
    AlertRepository,
    RecommendationRepository,
    MetricsRepository,
)

__all__ = [
    "db",
    "get_db",
    "CampusDB",
    "BaseRepository",
    "BuildingRepository",
    "SensorRepository",
    "WasteBinRepository",
    "AlertRepository",
    "RecommendationRepository",
    "MetricsRepository",
]
