from typing import List, Dict, Any, Optional
from app.db.session import db

class BaseRepository:
    def get_all(self) -> List[Dict[str, Any]]:
        raise NotImplementedError

    def get_by_id(self, id: str) -> Optional[Dict[str, Any]]:
        raise NotImplementedError

class BuildingRepository(BaseRepository):
    def get_all(self) -> List[Dict[str, Any]]:
        return db.buildings

    def get_by_id(self, id: str) -> Optional[Dict[str, Any]]:
        building = next((b for b in db.buildings if b["id"] == id), None)
        if building:
            b = dict(building)
            b["alerts"] = [a for a in db.alerts if a.get("building_id") == id]
            b["recommendations"] = [r for r in db.recommendations if r.get("building_id") == id]
            return b
        return None

class SensorRepository(BaseRepository):
    def get_all(self) -> List[Dict[str, Any]]:
        return db.sensors

    def add_data(self, data: Dict[str, Any]) -> None:
        sensor = next((s for s in db.sensors if s["id"] == data.get("sensorId")), None)
        if sensor:
            sensor["last_reading"] = data["value"]
            sensor["last_updated"] = data["timestamp"]
        else:
            db.sensors.append({
                "id": data["sensorId"],
                "building_id": "unknown",
                "type": data["type"],
                "status": "active",
                "last_reading": data["value"],
                "unit": data["unit"],
                "last_updated": data["timestamp"]
            })

class WasteBinRepository(BaseRepository):
    def get_all(self) -> List[Dict[str, Any]]:
        return db.waste_bins

class AlertRepository(BaseRepository):
    def get_all(self) -> List[Dict[str, Any]]:
        return db.alerts
    
    def add_alert(self, alert: Dict[str, Any]) -> None:
        db.alerts.append(alert)

class RecommendationRepository(BaseRepository):
    def get_all(self) -> List[Dict[str, Any]]:
        return db.recommendations

class MetricsRepository(BaseRepository):
    def get_metrics(self) -> Dict[str, Any]:
        return db.get_campus_metrics()
