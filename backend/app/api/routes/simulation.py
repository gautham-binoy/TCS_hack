from fastapi import APIRouter, HTTPException
from app.schemas.simulation import SimulationRequest, SimulationResponse
from app.services.simulation import SimulationService

router = APIRouter()
simulation_service = SimulationService()

@router.post("/", response_model=SimulationResponse)
def run_simulation(request: SimulationRequest):
    try:
        return simulation_service.run_simulation(request.model_dump())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
