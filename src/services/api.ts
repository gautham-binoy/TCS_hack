import {
  CampusOverview,
  Building,
  Sensor,
  WasteBin,
  WaterStation,
  SolarArea,
  CampusRoad,
  CampusGreenArea,
  Alert,
  Recommendation,
  OverallMetrics,
  AIQueryRequest,
  AIQueryResponse,
  SimulationRequest,
  SimulationResponse,
} from '../types';

import { mockApiService } from './mockApi';

const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// Strip trailing slash if any
export const API_BASE_URL = RAW_API_URL.replace(/\/+$/, '');

// Persistent or environment-driven mock state
const INITIAL_MOCK_STATE =
  localStorage.getItem('ecotwin_use_mock') !== null
    ? localStorage.getItem('ecotwin_use_mock') === 'true'
    : import.meta.env.VITE_USE_MOCK !== 'false';

let currentUseMock: boolean = INITIAL_MOCK_STATE;
let lastLiveApiCheck: 'connected' | 'offline' | 'untested' = 'untested';
const listeners: Array<(useMock: boolean, liveStatus: 'connected' | 'offline' | 'untested') => void> = [];

export function getMockMode(): boolean {
  return currentUseMock;
}

export function setMockMode(useMock: boolean): void {
  currentUseMock = useMock;
  localStorage.setItem('ecotwin_use_mock', String(useMock));
  notifyListeners();
}

export function getLiveStatus(): 'connected' | 'offline' | 'untested' {
  return lastLiveApiCheck;
}

export function subscribeApiStatus(callback: (useMock: boolean, liveStatus: 'connected' | 'offline' | 'untested') => void) {
  listeners.push(callback);
  callback(currentUseMock, lastLiveApiCheck);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

function notifyListeners() {
  listeners.forEach(fn => fn(currentUseMock, lastLiveApiCheck));
}

// Generic fetcher with graceful mock fallback if real backend is offline
async function request<T>(endpoint: string, options?: RequestInit, fallbackFn?: () => Promise<T>): Promise<T> {
  if (currentUseMock) {
    if (fallbackFn) return fallbackFn();
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} from ${endpoint}`);
    }

    lastLiveApiCheck = 'connected';
    notifyListeners();
    return (await response.json()) as T;
  } catch (error) {
    console.warn(`[Campus EcoTwin API] Request to ${url} failed:`, error);
    lastLiveApiCheck = 'offline';
    notifyListeners();

    // Fallback gracefully to mock data so UI remains fully functional
    if (fallbackFn) {
      console.info(`[Campus EcoTwin API] Seamlessly falling back to Mock API for ${endpoint}`);
      return fallbackFn();
    }
    throw error;
  }
}

/**
 * Dedicated API Service Layer
 * Fully decoupled from UI components.
 */
export const api = {
  // GET /api/campus
  async getCampus(): Promise<CampusOverview> {
    return request<CampusOverview>('/api/campus', { method: 'GET' }, () => mockApiService.getCampus());
  },

  // GET /api/buildings
  async getBuildings(): Promise<Building[]> {
    return request<Building[]>('/api/buildings', { method: 'GET' }, () => mockApiService.getBuildings());
  },

  // GET /api/buildings/:id
  async getBuildingById(id: string): Promise<Building | null> {
    return request<Building | null>(`/api/buildings/${id}`, { method: 'GET' }, () => mockApiService.getBuildingById(id));
  },

  // GET /api/sensors
  async getSensors(): Promise<Sensor[]> {
    return request<Sensor[]>('/api/sensors', { method: 'GET' }, () => mockApiService.getSensors());
  },

  // GET /api/waste-bins
  async getWasteBins(): Promise<WasteBin[]> {
    return request<WasteBin[]>('/api/waste-bins', { method: 'GET' }, () => mockApiService.getWasteBins());
  },

  // Auxiliary spatial data endpoints for full campus map fidelity
  async getWaterStations(): Promise<WaterStation[]> {
    return request<WaterStation[]>('/api/water-stations', { method: 'GET' }, () => mockApiService.getWaterStations());
  },

  async getSolarAreas(): Promise<SolarArea[]> {
    return request<SolarArea[]>('/api/solar-areas', { method: 'GET' }, () => mockApiService.getSolarAreas());
  },

  async getRoads(): Promise<CampusRoad[]> {
    return request<CampusRoad[]>('/api/roads', { method: 'GET' }, () => mockApiService.getRoads());
  },

  async getGreenAreas(): Promise<CampusGreenArea[]> {
    return request<CampusGreenArea[]>('/api/green-areas', { method: 'GET' }, () => mockApiService.getGreenAreas());
  },

  // GET /api/metrics
  async getMetrics(): Promise<OverallMetrics> {
    return request<OverallMetrics>('/api/metrics', { method: 'GET' }, () => mockApiService.getMetrics());
  },

  // GET /api/alerts
  async getAlerts(): Promise<Alert[]> {
    return request<Alert[]>('/api/alerts', { method: 'GET' }, () => mockApiService.getAlerts());
  },

  // GET /api/recommendations
  async getRecommendations(): Promise<Recommendation[]> {
    return request<Recommendation[]>('/api/recommendations', { method: 'GET' }, () => mockApiService.getRecommendations());
  },

  // POST /api/ai/query
  async queryAI(payload: AIQueryRequest): Promise<AIQueryResponse> {
    return request<AIQueryResponse>(
      '/api/ai/query',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      () => mockApiService.queryAI(payload)
    );
  },

  // POST /api/simulation
  async runSimulation(payload: SimulationRequest): Promise<SimulationResponse> {
    return request<SimulationResponse>(
      '/api/simulation',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      () => mockApiService.runSimulation(payload)
    );
  },
};
