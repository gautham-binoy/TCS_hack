from pydantic import BaseModel
from typing import List, Optional, Any

class AIContext(BaseModel):
    scope: Optional[str] = None
    layer: Optional[str] = None

class AIQueryRequest(BaseModel):
    query: str
    buildingId: Optional[str] = None
    context: Optional[AIContext] = None

class AIQueryResponse(BaseModel):
    answer: str
    locations: List[Any] = []
    metrics: List[Any] = []
    recommendations: List[str] = []
    alerts: List[str] = []
