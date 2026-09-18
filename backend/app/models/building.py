from typing import List, Tuple, Optional, Dict, Any
from pydantic import BaseModel

class BuildingMetrics(BaseModel):
    energyKwhPerDay: float
    energyPeakKw: float
    energyChangePct: float
    energyBaselineKwhPerDay: float
    wasteKgPerDay: float
    wasteDiversionPct: float
    wasteChangePct: float
    wasteBaselineKgPerDay: float
    waterLitersPerDay: float
    waterChangePct: float
    carbonKgCo2ePerDay: float
    carbonIntensityRating: str

class Meter(BaseModel):
    id: str
    type: str
    label: str
    currentReading: float
    unit: str
    status: str

class Equipment(BaseModel):
    id: str
    name: str
    category: str
    status: str
    powerDrawKw: float
    efficiencyRating: str

class HourlyLoad(BaseModel):
    hour: str
    energyKw: float
    baselineKw: float

class Building(BaseModel):
    id: str
    name: str
    code: str
    category: str
    coordinates: Tuple[float, float]
    polygonCoordinates: List[List[float]]
    areaSqFt: float
    floors: int
    occupancyCurrent: int
    occupancyCapacity: int
    yearBuilt: int
    sustainabilityScore: int
    sustainabilityTier: str
    leedCertification: Optional[str] = None
    solarInstalledKw: float
    metrics: BuildingMetrics
    meters: List[Meter] = []
    equipment: List[Equipment] = []
    hourlyLoadProfile: List[HourlyLoad] = []
    alerts: List[Dict[str, Any]] = []
    recommendations: List[Dict[str, Any]] = []
