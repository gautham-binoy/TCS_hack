import json
import os
from typing import Dict, Any, List

class MockDB:
    def __init__(self):
        db_path = os.path.join(os.path.dirname(__file__), 'db.json')
        with open(db_path, 'r') as f:
            data = json.load(f)
            
        self.campus = data.get("campus", {})
        self.buildings: List[Dict[str, Any]] = data.get("buildings", [])
        self.sensors: List[Dict[str, Any]] = data.get("sensors", [])
        self.waste_bins: List[Dict[str, Any]] = data.get("wasteBins", [])
        self.water_stations: List[Dict[str, Any]] = data.get("waterStations", [])
        self.solar_areas: List[Dict[str, Any]] = data.get("solarAreas", [])
        self.roads: List[Dict[str, Any]] = data.get("roads", [])
        self.green_areas: List[Dict[str, Any]] = data.get("greenAreas", [])
        self.alerts: List[Dict[str, Any]] = data.get("alerts", [])
        self.recommendations: List[Dict[str, Any]] = data.get("recommendations", [])

    def get_campus_metrics(self) -> Dict[str, Any]:
        return {
            "sustainabilityScore": self.campus.get("sustainabilityScore", 86),
            "sustainabilityScoreChange": 2.4,
            "energy": {
                "currentKw": 1845,
                "dailyKwh": 14200,
                "monthlyMwh": 435,
                "renewableSharePct": 42.5,
                "changePct": -4.2
            },
            "waste": {
                "dailyKg": 2150,
                "monthlyTonnes": 64.5,
                "diversionRatePct": 78,
                "changePct": 1.5
            },
            "water": {
                "dailyLiters": 128000,
                "monthlyKl": 3840,
                "rainwaterHarvestedPct": 18.5,
                "changePct": -2.1
            },
            "carbon": {
                "dailyKgCo2e": 5150,
                "monthlyTonnesCo2e": 154.5,
                "targetReductionProgressPct": 68,
                "changePct": -5.4
            },
            "sensors": {
                "total": len(self.sensors),
                "active": len([s for s in self.sensors if s.get("status") == "online"]),
                "warning": len([s for s in self.sensors if s.get("status") == "warning"]),
                "offline": len([s for s in self.sensors if s.get("status") == "offline"])
            },
            "alerts": {
                "totalActive": len([a for a in self.alerts if a.get("status") == "active"]),
                "critical": len([a for a in self.alerts if a.get("severity") == "critical" and a.get("status") == "active"]),
                "warning": len([a for a in self.alerts if a.get("severity") == "warning" and a.get("status") == "active"]),
                "info": len([a for a in self.alerts if a.get("severity") == "info" and a.get("status") == "active"])
            },
            "historicalTrends": {
                "hourlyEnergy": [
                    {"time": "00:00", "consumptionKw": 1100, "solarGenerationKw": 0},
                    {"time": "04:00", "consumptionKw": 1050, "solarGenerationKw": 0},
                    {"time": "08:00", "consumptionKw": 2200, "solarGenerationKw": 150},
                    {"time": "12:00", "consumptionKw": 3100, "solarGenerationKw": 680},
                    {"time": "16:00", "consumptionKw": 2800, "solarGenerationKw": 420},
                    {"time": "20:00", "consumptionKw": 1900, "solarGenerationKw": 0}
                ],
                "monthlyEmissions": [
                    {"month": "Jan", "actualCo2Tonnes": 165, "targetCo2Tonnes": 180},
                    {"month": "Feb", "actualCo2Tonnes": 158, "targetCo2Tonnes": 175},
                    {"month": "Mar", "actualCo2Tonnes": 152, "targetCo2Tonnes": 170},
                    {"month": "Apr", "actualCo2Tonnes": 148, "targetCo2Tonnes": 165},
                    {"month": "May", "actualCo2Tonnes": 155, "targetCo2Tonnes": 160}
                ],
                "wasteBreakdown": [
                    {"name": "Recycling", "value": 45, "color": "#3B82F6"},
                    {"name": "Compost", "value": 33, "color": "#10B981"},
                    {"name": "Landfill", "value": 22, "color": "#6B7280"}
                ],
                "waterByZone": [
                    {"zone": "Academic", "usageKl": 1250},
                    {"zone": "Residential", "usageKl": 1850},
                    {"zone": "Athletics", "usageKl": 450},
                    {"zone": "Irrigation", "usageKl": 290}
                ]
            }
        }

db = MockDB()
