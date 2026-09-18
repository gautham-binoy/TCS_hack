# Campus EcoTwin

**Campus EcoTwin** is an AI-powered sustainability intelligence and digital twin platform for smart campuses. It provides real-time telemetry monitoring, spatial digital twin mapping with Leaflet, interactive What-If scenario simulations, and a domain-specific sustainability AI intelligence assistant.

---

## 🏛️ System Architecture

The application is architected with a strict separation between a **React frontend** and a **FastAPI backend**:

```text
project-root/
│
├── front end/               # React 18 + Vite + TypeScript + Tailwind CSS
│   ├── public/              # Static assets & favicon
│   ├── src/
│   │   ├── components/      # UI components (Layout, Map, Modals, Panels)
│   │   ├── pages/           # Primary application views
│   │   ├── services/        # Centralized API service layer
│   │   ├── types/           # TypeScript interfaces & domain models
│   │   ├── App.tsx          # Main React application component
│   │   ├── main.tsx         # React DOM entrypoint
│   │   └── index.css        # Tailwind styling & Leaflet map theme
│   ├── package.json         # Clean production dependencies
│   ├── vite.config.ts       # Vite build & server configuration (Port 3000)
│   ├── tailwind.config.js   # Custom campus sustainability color tokens
│   ├── tsconfig.json        # TypeScript configuration
│   └── .env.example         # Frontend environment template
│
├── backend/                 # FastAPI + Python 3 + Pydantic
│   ├── app/
│   │   ├── main.py          # FastAPI application entrypoint & CORS setup
│   │   ├── core/            # Centralized configuration (pydantic-settings)
│   │   │   └── config.py
│   │   ├── api/             # API routing layer
│   │   │   ├── router.py    # Route aggregator
│   │   │   └── routes/      # Domain route controllers
│   │   ├── models/          # Domain data models & entities
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   ├── services/        # Business logic & AI intelligence engine
│   │   ├── db/              # In-memory database & repository layer
│   │   └── utils/           # Shared helper functions
│   ├── requirements.txt     # Python backend dependencies
│   └── .env.example         # Backend environment template
│
├── .gitignore               # Comprehensive Git ignore rules
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+) & **npm**
- **Python** (v3.10+)

---

### 1. Backend Setup (FastAPI)

```bash
cd backend

# Create and activate a Python virtual environment (if not already created)
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create your local environment configuration
cp .env.example .env
```

#### Running the Backend
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The FastAPI backend will start at `http://localhost:8000`.
- Interactive Swagger UI: `http://localhost:8000/docs`
- ReDoc Documentation: `http://localhost:8000/redoc`

---

### 2. Frontend Setup (React)

```bash
cd "front end"

# Install dependencies
npm install

# Create your local environment configuration
cp .env.example .env
```

#### Running the Frontend
```bash
npm run dev
```
The React development server will start at `http://localhost:3000`.

---

## ⚙️ Environment Configuration

### Frontend (`front end/.env`)
| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8000` | Backend API Base URL |
| `VITE_USE_MOCK` | `false` | Fallback to local mock data if backend is offline |

### Backend (`backend/.env`)
| Variable | Default | Description |
|---|---|---|
| `PORT` | `8000` | Server listening port |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin (Vite defaults: 3000 & 5173 supported) |
| `GROQ_API_KEY` | *(Optional)* | Groq API Key for live LLM chat inference |
| `GROQ_MODEL` | `llama3-8b-8192` | Model identifier for Groq inference |
| `AI_API_KEY` | *(Optional)* | Alternative API Key fallback for AI services |

> **Note**: The backend features a built-in deterministic campus analytics engine that generates domain-specific AI intelligence responses even when external API keys are omitted.

---

## 📡 API Endpoints

All endpoints are prefixed with `/api`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/campus` | Campus overview, geographical bounds, weather & baseline metrics |
| `GET` | `/api/buildings` | List of all campus buildings with LEED status and telemetry |
| `GET` | `/api/buildings/{id}` | Detailed building view with equipment, meters, and hourly load profile |
| `GET` | `/api/sensors` | Real-time IoT sensor telemetry feeds |
| `GET` | `/api/waste-bins` | Smart waste bin fill levels and recycling streams |
| `GET` | `/api/water-stations` | Water bottle refill stations and usage data |
| `GET` | `/api/solar-areas` | Solar photovoltaic canopy arrays and generation capacities |
| `GET` | `/api/roads` | Campus road network geometry |
| `GET` | `/api/green-areas` | Bioswales, meadows, and campus green spaces |
| `GET` | `/api/metrics` | Campus-wide energy, carbon, water, and waste metrics |
| `GET` | `/api/alerts` | Active environmental and equipment anomaly alerts |
| `GET` | `/api/recommendations` | Energy efficiency & sustainability action items |
| `POST` | `/api/ai/query` | Campus intelligence AI query assistant |
| `POST` | `/api/simulation` | What-If sustainability scenario calculation engine |
| `POST` | `/api/iot/data` | Ingest live sensor telemetry and trigger anomaly checks |

---

## 🛠️ Verification & Build Commands

- **Frontend Typecheck & Production Build**:
  ```bash
  cd "front end" && npm run build
  ```
- **Backend Import & Route Check**:
  ```bash
  cd backend && python -c "from app.main import app; print(f'Routes configured: {len(app.routes)}')"
  ```
