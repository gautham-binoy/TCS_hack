from pydantic import BaseModel

class IoTDataRequest(BaseModel):
    sensorId: str
    timestamp: str
    type: str
    value: float
    unit: str
