from typing import Dict, Any
from app.repositories.base import AlertRepository
import uuid
from datetime import datetime

alert_repo = AlertRepository()

class AnomalyDetectionService:
    def check_for_anomalies(self, data: Dict[str, Any]):
        if data["type"] == "energy":
            # Very basic historical comparison logic placeholder
            # For MVP, just artificially trigger an alert if the value is unusually high 
            # e.g., > 450 kW (based on our mock data generation ranges)
            value = float(data["value"])
            if value > 450:
                alert = {
                    "id": str(uuid.uuid4()),
                    "type": "unusual_consumption",
                    "message": "Unusual energy consumption detected.",
                    "severity": "warning",
                    "timestamp": datetime.utcnow().isoformat() + "Z",
                    "building_id": "unknown", 
                    "sensor_id": data["sensorId"]
                }
                alert_repo.add_alert(alert)
