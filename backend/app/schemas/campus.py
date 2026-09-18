from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Location(BaseModel):
    lat: float
    lng: float

class BuildingBase(BaseModel):
    id: str
    name: str
    type: str
    location: Location

class Building(BuildingBase):
    pass
