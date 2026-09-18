"""Backward compatibility re-export from app.db.base"""
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
    "BaseRepository",
    "BuildingRepository",
    "SensorRepository",
    "WasteBinRepository",
    "AlertRepository",
    "RecommendationRepository",
    "MetricsRepository",
]
