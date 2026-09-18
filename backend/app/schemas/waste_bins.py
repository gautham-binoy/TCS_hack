from pydantic import BaseModel
from app.schemas.campus import Location

class WasteBin(BaseModel):
    id: str
    building_id: str
    location: Location
    location_desc: str
    fill_level: float
    last_emptied: str
    status: str
