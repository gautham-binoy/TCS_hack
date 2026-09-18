from typing import List, Tuple, Dict, Any, Optional
from pydantic import BaseModel

class Weather(BaseModel):
    tempC: float
    solarRadiationWm2: float
    airQualityIndex: int
    condition: str

class Campus(BaseModel):
    id: str
    name: str
    location: str
    centerCoordinates: Tuple[float, float]
    zoomLevel: int
    bounds: List[List[float]]
    totalBuildings: int
    totalSensors: int
    totalWasteBins: int
    totalWaterStations: int
    solarCapacityKw: float
    sustainabilityScore: int
    carbonNeutralTargetYear: int
    currentWeather: Weather
