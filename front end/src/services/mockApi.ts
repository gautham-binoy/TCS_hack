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

import {
  mockCampusOverview,
  mockBuildings,
  mockSensors,
  mockWasteBins,
  mockWaterStations,
  mockSolarAreas,
  mockRoads,
  mockGreenAreas,
  mockAlerts,
  mockRecommendations,
  mockOverallMetrics,
  getMockAIResponse,
  calculateMockSimulation,
} from './mockData';

// Small artificial delay to simulate realistic network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiService = {
  async getCampus(): Promise<CampusOverview> {
    await delay(120);
    return { ...mockCampusOverview };
  },

  async getBuildings(): Promise<Building[]> {
    await delay(150);
    return [...mockBuildings];
  },

  async getBuildingById(id: string): Promise<Building | null> {
    await delay(100);
    const building = mockBuildings.find(b => b.id === id);
    return building ? { ...building } : null;
  },

  async getSensors(): Promise<Sensor[]> {
    await delay(120);
    return [...mockSensors];
  },

  async getWasteBins(): Promise<WasteBin[]> {
    await delay(120);
    return [...mockWasteBins];
  },

  async getWaterStations(): Promise<WaterStation[]> {
    await delay(100);
    return [...mockWaterStations];
  },

  async getSolarAreas(): Promise<SolarArea[]> {
    await delay(80);
    return [...mockSolarAreas];
  },

  async getRoads(): Promise<CampusRoad[]> {
    await delay(60);
    return [...mockRoads];
  },

  async getGreenAreas(): Promise<CampusGreenArea[]> {
    await delay(60);
    return [...mockGreenAreas];
  },

  async getMetrics(): Promise<OverallMetrics> {
    await delay(150);
    return { ...mockOverallMetrics };
  },

  async getAlerts(): Promise<Alert[]> {
    await delay(100);
    return [...mockAlerts];
  },

  async getRecommendations(): Promise<Recommendation[]> {
    await delay(100);
    return [...mockRecommendations];
  },

  async queryAI(request: AIQueryRequest): Promise<AIQueryResponse> {
    await delay(450); // Simulate AI inference delay
    return getMockAIResponse(request.query, request.buildingId);
  },

  async runSimulation(request: SimulationRequest): Promise<SimulationResponse> {
    await delay(350); // Simulate calculation model delay
    return calculateMockSimulation(request);
  },
};
