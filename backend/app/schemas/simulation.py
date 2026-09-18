from pydantic import BaseModel
from typing import Optional, Dict, Any, List

class SimulationRequest(BaseModel):
    scenario: str
    value: float
    buildingId: Optional[str] = None

class SimulationResponse(BaseModel):
    current: Dict[str, Any]
    projected: Dict[str, Any]
    impact: Dict[str, Any]
    assumptions: List[str]
