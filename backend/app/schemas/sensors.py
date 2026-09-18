from pydantic import BaseModel

class Sensor(BaseModel):
    id: str
    building_id: str
    type: str
    status: str
    last_reading: float
    unit: str
    last_updated: str
