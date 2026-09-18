from typing import Tuple, Optional
from pydantic import BaseModel

class Sensor(BaseModel):
    id: str
    name: str
    buildingId: str
    floor: Optional[int] = None
    room: Optional[str] = None
    type: str
    coordinates: Tuple[float, float]
    currentValue: float
    unit: str
    status: str
    batteryPct: Optional[int] = None
    lastUpdated: str
    anomalyDetected: bool = False
