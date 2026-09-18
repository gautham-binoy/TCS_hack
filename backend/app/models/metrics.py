from typing import List, Dict, Any
from pydantic import BaseModel

class EnergyMetric(BaseModel):
    currentKw: float
    dailyKwh: float
    monthlyMwh: float
    renewableSharePct: float
    changePct: float

class WasteMetric(BaseModel):
    dailyKg: float
    monthlyTonnes: float
    diversionRatePct: float
    changePct: float

class WaterMetric(BaseModel):
    dailyLiters: float
    monthlyKl: float
    rainwaterHarvestedPct: float
    changePct: float

class CarbonMetric(BaseModel):
    dailyKgCo2e: float
    monthlyTonnesCo2e: float
    targetReductionProgressPct: float
    changePct: float

class SensorStatusSummary(BaseModel):
    total: int
    active: int
    warning: int
    offline: int

class AlertStatusSummary(BaseModel):
    totalActive: int
    critical: int
    warning: int
    info: int

class OverallMetrics(BaseModel):
    sustainabilityScore: int
    sustainabilityScoreChange: float
    energy: EnergyMetric
    waste: WasteMetric
    water: WaterMetric
    carbon: CarbonMetric
    sensors: SensorStatusSummary
    alerts: AlertStatusSummary
    historicalTrends: Dict[str, Any] = {}
