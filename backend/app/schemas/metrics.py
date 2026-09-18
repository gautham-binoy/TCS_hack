from pydantic import BaseModel

class CampusMetrics(BaseModel):
    sustainability_score: int
    energy_efficiency: int
    waste_management: int
    water_conservation: int
    green_coverage: int
    green_mobility: int
    total_energy: float
    total_waste: float
    total_water: float
    estimated_carbon_emissions: float
    active_sensors: int
    active_alerts: int
