# Campus EcoTwin Backend MVP

This is the backend API for the Campus EcoTwin sustainability platform. It provides RESTful endpoints to monitor campus energy, waste, water, carbon emissions, and manage IoT sensor data. It also includes an AI assistant mockup and a what-if simulation engine.

## Architecture

- **Framework**: FastAPI (Python 3.11+)
- **Data Validation**: Pydantic
- **Data Storage**: In-Memory Mock Data (Repository Pattern)
- **Deployment**: Uvicorn

The application is built using a clear, modular architecture:
- `app/api/routes`: Contains all API endpoints.
- `app/schemas`: Pydantic models for request/response validation.
- `app/data`: In-memory mock database for the MVP.
- `app/repositories`: Abstracted data access layers, preparing the app to be swapped to a real database (like PostgreSQL).
- `app/services`: Business logic (AI, Anomaly Detection, Simulations).

## Installation

1. Make sure you have Python 3.11+ installed.
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Environment Variables

Create a `.env` file in the root directory (you can copy `.env.example`):
```ini
PORT=8000
FRONTEND_URL=http://localhost:5173
AI_API_KEY=your_api_key_here
```

## Running the API

Start the FastAPI development server:
```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

## Swagger Documentation

FastAPI automatically generates interactive documentation. Once the server is running, visit:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## API Endpoints

- `GET /api/campus`: Overall campus information and map locations.
- `GET /api/buildings`: List of all buildings.
- `GET /api/buildings/{id}`: Detailed information about a specific building.
- `GET /api/sensors`: List of all sensors.
- `GET /api/waste-bins`: List of all waste bins.
- `GET /api/metrics`: Campus-level sustainability metrics.
- `GET /api/alerts`: Active alerts.
- `GET /api/recommendations`: Sustainability recommendations.
- `POST /api/ai/query`: AI queries for campus context.
- `POST /api/simulation`: Run what-if scenarios (e.g., `reduce_energy`, `reduce_waste`, `led_replacement`).
- `POST /api/iot/data`: Ingest data from sensors.

### Example Requests

**AI Query**:
```bash
curl -X POST "http://localhost:8000/api/ai/query" \
-H "Content-Type: application/json" \
-d '{"message": "Which building consumes the most energy?", "context": {"buildingId": null}}'
```

**Run Simulation**:
```bash
curl -X POST "http://localhost:8000/api/simulation" \
-H "Content-Type: application/json" \
-d '{"scenario": "reduce_energy", "value": 10}'
```

**Send IoT Data**:
```bash
curl -X POST "http://localhost:8000/api/iot/data" \
-H "Content-Type: application/json" \
-d '{"sensorId": "s-energy-b-01", "timestamp": "2026-09-18T10:30:00Z", "type": "energy", "value": 150.5, "unit": "kW"}'
```

## Future Expansions

### Connecting PostgreSQL
To connect a real database like PostgreSQL:
1. Add `sqlalchemy` and `psycopg2` to `requirements.txt`.
2. Define SQLAlchemy ORM models matching the Pydantic schemas.
3. Update the classes in `app/repositories/base.py` to use an SQLAlchemy `Session` to fetch from the DB instead of the `mock_db`. The rest of the app (routes, services) will not need to change!

### Connecting a real LLM
To connect a real LLM for the AI Assistant:
1. Implement a new class in `app/services/ai.py` (e.g., `LLMAIService`) that makes HTTP calls to OpenAI, Gemini, or a local model.
2. Inject this new class into `app/api/routes/ai.py` in place of `MockAIService`.
3. You can set up a basic Retrieval-Augmented Generation (RAG) by fetching context from the Repositories before sending the prompt to the LLM.

### Connecting ESP32 IoT Devices
ESP32 devices can send data directly to the `/api/iot/data` endpoint using an HTTP POST request.
The JSON payload from the ESP32 must match the `IoTDataRequest` schema.
In the future, a MQTT broker (like Mosquitto) could be deployed alongside this app, with a background worker subscribing to MQTT topics and forwarding the data to this endpoint.
