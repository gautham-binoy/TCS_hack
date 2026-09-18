from pydantic import BaseModel
from typing import List, Optional, Any
from app.schemas.campus import Location

class AIContext(BaseModel):
    buildingId: Optional[str] = None
    userLocation: Optional[Location] = None

class AIQueryRequest(BaseModel):
    message: str
    context: Optional[AIContext] = None

class AIQueryResponse(BaseModel):
    answer: str
    locations: List[Any] = []
    metrics: List[Any] = []
    recommendations: List[Any] = []
    alerts: List[Any] = []
