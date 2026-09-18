from fastapi import APIRouter
from app.api.routes import (
    campus,
    buildings,
    sensors,
    waste_bins,
    water_stations,
    solar_areas,
    roads,
    green_areas,
    metrics,
    alerts,
    recommendations,
    ai,
    simulation,
    iot,
)

api_router = APIRouter()

api_router.include_router(campus.router, prefix="/campus", tags=["Campus"])
api_router.include_router(buildings.router, prefix="/buildings", tags=["Buildings"])
api_router.include_router(sensors.router, prefix="/sensors", tags=["Sensors"])
api_router.include_router(waste_bins.router, prefix="/waste-bins", tags=["Waste Bins"])
api_router.include_router(water_stations.router, prefix="/water-stations", tags=["Water Stations"])
api_router.include_router(solar_areas.router, prefix="/solar-areas", tags=["Solar Areas"])
api_router.include_router(roads.router, prefix="/roads", tags=["Roads"])
api_router.include_router(green_areas.router, prefix="/green-areas", tags=["Green Areas"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["Metrics"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["Alerts"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["Recommendations"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI"])
api_router.include_router(simulation.router, prefix="/simulation", tags=["Simulation"])
api_router.include_router(iot.router, prefix="/iot", tags=["IoT"])
