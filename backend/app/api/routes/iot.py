from fastapi import APIRouter, HTTPException
from app.schemas.iot import IoTDataRequest
from app.repositories.base import SensorRepository
from app.services.anomaly import AnomalyDetectionService

router = APIRouter()
sensor_repo = SensorRepository()
anomaly_service = AnomalyDetectionService()

@router.post("/data")
def receive_iot_data(request: IoTDataRequest):
    data = request.model_dump()
    sensor_repo.add_data(data)
    anomaly_service.check_for_anomalies(data)
    
    return {"status": "success", "message": "IoT data received and processed successfully."}
