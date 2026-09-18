from pydantic import BaseModel
from typing import Optional, Dict, Any, List

class SimulationRequest(BaseModel):
    scenarioId: Optional[str] = None
    buildingId: Optional[str] = None
    electricityReductionPct: Optional[float] = None
    wasteReductionPct: Optional[float] = None
    ledReplacementPct: Optional[float] = None
    solarAdditionKw: Optional[float] = None

class SimulationResponse(BaseModel):
    scenarioTitle: str
    scopeLabel: str
    currentValue: Dict[str, Any]
    projectedValue: Dict[str, Any]
    estimatedReduction: Dict[str, Any]
    estimatedCarbonImpact: Dict[str, Any]
    timeline: List[Dict[str, Any]]
    methodologyNote: str
