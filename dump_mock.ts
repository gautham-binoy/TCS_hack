import fs from 'fs';
import path from 'path';
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
} from './src/services/mockData';

const data = {
  campus: mockCampusOverview,
  buildings: mockBuildings,
  sensors: mockSensors,
  wasteBins: mockWasteBins,
  waterStations: mockWaterStations,
  solarAreas: mockSolarAreas,
  roads: mockRoads,
  greenAreas: mockGreenAreas,
  alerts: mockAlerts,
  recommendations: mockRecommendations,
};

fs.writeFileSync(
  path.join(process.cwd(), 'backend', 'app', 'data', 'db.json'),
  JSON.stringify(data, null, 2)
);

console.log('Successfully dumped mock data to db.json');
