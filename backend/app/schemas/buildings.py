from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.schemas.campus import BuildingBase

class Alert(BaseModel):
    id: str
    type: str
    message: str
    severity: str
    timestamp: str

class Recommendation(BaseModel):
    id: str
    title: str
    description: str
    impact: str

class Trend(BaseModel):
    energy: float
    waste: float
    water: float

class BuildingDetail(BuildingBase):
    sustainability_score: int
    energy: Dict[str, Any]
    waste: Dict[str, Any]
    water: Dict[str, Any]
    carbon: Dict[str, Any]
    trends: Trend
    alerts: List[Alert]
    recommendations: List[Recommendation]
