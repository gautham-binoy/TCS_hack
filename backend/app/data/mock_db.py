from datetime import datetime, timedelta
import random
from typing import Dict, Any, List

def generate_building(id: str, name: str, btype: str, lat: float, lng: float) -> Dict[str, Any]:
    return {
        "id": id,
        "name": name,
        "type": btype,
        "location": {"lat": lat, "lng": lng},
        "sustainability_score": random.randint(70, 98),
        "energy": {
            "current_usage": round(random.uniform(50, 500), 2),
            "unit": "kW",
            "historical_average": round(random.uniform(200, 400), 2)
        },
        "waste": {
            "current_level": round(random.uniform(10, 90), 2),
            "unit": "%"
        },
        "water": {
            "current_usage": round(random.uniform(100, 1000), 2),
            "unit": "L/h"
        },
        "carbon": {
            "estimated_emissions": round(random.uniform(10, 100), 2),
            "unit": "kg CO2e"
        },
        "trends": {
            "energy": round(random.uniform(-5, 5), 2),
            "waste": round(random.uniform(-5, 5), 2),
            "water": round(random.uniform(-5, 5), 2)
        },
        "alerts": [],
        "recommendations": []
    }

def generate_sensor(id: str, b_id: str, type: str, unit: str) -> Dict[str, Any]:
    return {
        "id": id,
        "building_id": b_id,
        "type": type,
        "status": random.choice(["active", "active", "active", "maintenance"]),
        "last_reading": round(random.uniform(10, 100), 2),
        "unit": unit,
        "last_updated": datetime.utcnow().isoformat() + "Z"
    }

def generate_waste_bin(id: str, b_id: str, b_lat: float, b_lng: float) -> Dict[str, Any]:
    return {
        "id": id,
        "building_id": b_id,
        "location": {
            "lat": b_lat + random.uniform(-0.001, 0.001),
            "lng": b_lng + random.uniform(-0.001, 0.001)
        },
        "location_desc": f"Floor {random.randint(1, 4)} Hallway",
        "fill_level": round(random.uniform(0, 100), 2),
        "last_emptied": (datetime.utcnow() - timedelta(hours=random.randint(1, 48))).isoformat() + "Z",
        "status": "ok" if random.random() > 0.1 else "full"
    }

class MockDB:
    def __init__(self):
        self.buildings: List[Dict[str, Any]] = [
            generate_building("b-01", "Engineering Block", "academic", 34.0522, -118.2437),
            generate_building("b-02", "Science Center", "academic", 34.0530, -118.2430),
            generate_building("b-03", "Main Library", "library", 34.0520, -118.2440),
            generate_building("b-04", "Student Union", "recreation", 34.0515, -118.2425),
            generate_building("b-05", "Dormitory A", "residential", 34.0500, -118.2450),
            generate_building("b-06", "Dormitory B", "residential", 34.0495, -118.2460),
            generate_building("b-07", "Administration", "office", 34.0540, -118.2410),
            generate_building("b-08", "Sports Complex", "sports", 34.0480, -118.2400),
            generate_building("b-09", "Arts Building", "academic", 34.0510, -118.2455),
            generate_building("b-10", "Cafeteria", "food", 34.0505, -118.2435),
        ]
        
        self.sensors: List[Dict[str, Any]] = []
        for b in self.buildings[:5]:
            self.sensors.append(generate_sensor(f"s-energy-{b['id']}", b['id'], "energy", "kW"))
            self.sensors.append(generate_sensor(f"s-water-{b['id']}", b['id'], "water", "L/h"))
            self.sensors.append(generate_sensor(f"s-temp-{b['id']}", b['id'], "temperature", "C"))
        
        self.waste_bins: List[Dict[str, Any]] = []
        for i in range(25):
            b = random.choice(self.buildings)
            self.waste_bins.append(generate_waste_bin(f"wb-{i+1}", b["id"], b["location"]["lat"], b["location"]["lng"]))
            
        self.alerts = [
            {
                "id": "a-01",
                "type": "energy_spike",
                "message": "Unusual energy consumption detected in Engineering Block.",
                "severity": "warning",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "building_id": "b-01"
            },
            {
                "id": "a-02",
                "type": "bin_full",
                "message": "Multiple waste bins are full in Student Union.",
                "severity": "info",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "building_id": "b-04"
            }
        ]
        
        self.recommendations = [
            {
                "id": "r-01",
                "title": "HVAC Optimization",
                "description": "Reduce heating in Dormitory A during peak sun hours.",
                "impact": "High",
                "building_id": "b-05"
            },
            {
                "id": "r-02",
                "title": "Waste Collection Route",
                "description": "Adjust collection times for Cafeteria to post-lunch.",
                "impact": "Medium",
                "building_id": "b-10"
            }
        ]

    def get_campus_metrics(self) -> Dict[str, Any]:
        return {
            "sustainability_score": 85,
            "energy_efficiency": 78,
            "waste_management": 92,
            "water_conservation": 88,
            "green_coverage": 65,
            "green_mobility": 70,
            "total_energy": sum(b["energy"]["current_usage"] for b in self.buildings),
            "total_waste": sum(wb["fill_level"] for wb in self.waste_bins) / len(self.waste_bins) if self.waste_bins else 0,
            "total_water": sum(b["water"]["current_usage"] for b in self.buildings),
            "estimated_carbon_emissions": sum(b["carbon"]["estimated_emissions"] for b in self.buildings),
            "active_sensors": len([s for s in self.sensors if s["status"] == "active"]),
            "active_alerts": len(self.alerts)
        }

db = MockDB()
