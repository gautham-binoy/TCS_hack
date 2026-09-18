from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings

settings = get_settings()

app = FastAPI(
    title="Campus EcoTwin API",
    description="Backend API for Campus EcoTwin sustainability platform",
    version="1.0.0",
)

# Setup CORS
origins = [
    settings.frontend_url,
    "http://localhost:5173",  # Ensure default vite port is always allowed for dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api.routes import campus, buildings, sensors, waste_bins, metrics, alerts, recommendations, ai, simulation, iot, water_stations, solar_areas, roads, green_areas

app.include_router(campus.router, prefix="/api/campus", tags=["Campus"])
app.include_router(buildings.router, prefix="/api/buildings", tags=["Buildings"])
app.include_router(sensors.router, prefix="/api/sensors", tags=["Sensors"])
app.include_router(waste_bins.router, prefix="/api/waste-bins", tags=["Waste Bins"])
app.include_router(metrics.router, prefix="/api/metrics", tags=["Metrics"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["Recommendations"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])
app.include_router(simulation.router, prefix="/api/simulation", tags=["Simulation"])
app.include_router(iot.router, prefix="/api/iot", tags=["IoT"])
app.include_router(water_stations.router, prefix="/api/water-stations", tags=["Water Stations"])
app.include_router(solar_areas.router, prefix="/api/solar-areas", tags=["Solar Areas"])
app.include_router(roads.router, prefix="/api/roads", tags=["Roads"])
app.include_router(green_areas.router, prefix="/api/green-areas", tags=["Green Areas"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Campus EcoTwin API"}
