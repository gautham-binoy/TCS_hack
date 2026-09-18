// Campus EcoTwin Data Models & Interfaces

export type LayerType = 'energy' | 'waste' | 'water' | 'carbon' | 'sensors';

export interface Coordinates {
  lat: number;
  lng: number;
}

export type LatLngTuple = [number, number];

export interface BuildingMetrics {
  energyKwhPerDay: number;
  energyPeakKw: number;
  energyBaselineKwhPerDay?: number;
  energyChangePct?: number;
  wasteKgPerDay: number;
  wasteDiversionPct: number;
  wasteChangePct?: number;
  wasteBaselineKgPerDay?: number;
  waterLitersPerDay: number;
  waterRecycledPct?: number;
  waterChangePct?: number;
  waterBaselineLitersPerDay?: number;
  carbonKgCo2ePerDay: number;
  carbonChangePct?: number;
  carbonIntensityRating: 'A' | 'B' | 'C' | 'D';
}

export interface MetricTrendPoint {
  time: string;
  energyKwh: number;
  waterLiters: number;
  carbonKg: number;
  wasteKg: number;
}

export interface BuildingEquipment {
  id: string;
  name: string;
  category: string;
  status: string;
  powerDrawKw: number;
  efficiencyRating: string;
}

export interface BuildingHourlyPoint {
  hour: string;
  energyKw: number;
  baselineKw: number;
}

export interface BuildingMeter {
  id: string;
  type: string;
  label: string;
  currentReading: number;
  unit: string;
  status: string;
}

export interface BuildingHourlyEnergy {
  hour: string;
  energyKw: number;
  baselineKw: number;
}

export interface Building {
  id: string;
  name: string;
  code: string;
  category: 'academic' | 'research' | 'residential' | 'student_life' | 'athletics' | 'administration' | 'infrastructure' | 'workshop' | 'library' | 'dining';
  coordinates: LatLngTuple;
  polygonCoordinates: LatLngTuple[];
  sustainabilityScore: number; // 0 - 100
  floorAreaSqMeters: number;
  yearBuilt: number;
  solarInstalledKw?: number;
  leedCertification?: 'Platinum' | 'Gold' | 'Silver' | 'Certified';
  metrics: BuildingMetrics;
  historicalTrends?: MetricTrendPoint[];
  meters?: BuildingMeter[];
  equipment?: BuildingEquipment[];
  hourlyLoadProfile?: BuildingHourlyPoint[];
  hourlyEnergy?: BuildingHourlyEnergy[];
  alerts: Alert[];
  recommendations: Recommendation[];
}

export interface Sensor {
  id: string;
  code: string;
  name: string;
  type: 'energy' | 'air_quality' | 'water_flow' | 'occupancy' | 'solar' | 'temperature';
  location: string;
  coordinates: LatLngTuple;
  buildingId?: string;
  value: number;
  unit: string;
  status: 'online' | 'warning' | 'offline';
  lastUpdated: string;
}

export interface WasteBin {
  id: string;
  code: string;
  name?: string;
  type?: string;
  icon?: string;
  notes?: string;
  category: 'compost' | 'recycle' | 'landfill' | 'ewaste';
  fillLevel: number; // 0 - 100 percentage
  coordinates: LatLngTuple;
  location: string;
  buildingId?: string;
  status: 'normal' | 'near_full' | 'full';
  lastCollected: string;
}

export interface WaterStation {
  id: string;
  name: string;
  coordinates: LatLngTuple;
  location: string;
  buildingId?: string;
  bottlesSaved: number;
  filterStatus: 'optimal' | 'good' | 'replace_soon';
  litersDispensed: number;
  status: 'online' | 'maintenance';
}

export interface SolarArea {
  id: string;
  name: string;
  coordinates: LatLngTuple[];
  center: LatLngTuple;
  capacityKw: number;
  currentOutputKw: number;
  dailyProductionKwh: number;
  panelCount: number;
  efficiency: number; // %
}

export interface CampusRoad {
  id: string;
  name: string;
  type: 'road' | 'pedestrian' | 'bike_path';
  coordinates: LatLngTuple[];
}

export interface CampusGreenArea {
  id: string;
  name: string;
  type: 'arboretum' | 'park' | 'bioswale' | 'community_garden' | 'meadow';
  coordinates: LatLngTuple[];
  areaSqM: number;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description?: string;
  category: 'energy' | 'waste' | 'water' | 'carbon' | 'sensor';
  buildingId?: string;
  buildingName?: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedSavings: string;
  category: 'energy' | 'waste' | 'water' | 'carbon';
  buildingId?: string;
  actionableStep?: string;
}

export interface CampusOverview {
  id: string;
  name: string;
  location: string;
  centerCoordinates: LatLngTuple;
  zoomLevel: number;
  bounds: [LatLngTuple, LatLngTuple];
  totalBuildings: number;
  totalSensors: number;
  totalWasteBins: number;
  totalWaterStations: number;
  solarCapacityKw: number;
  sustainabilityScore: number;
  carbonNeutralTargetYear: number;
  currentWeather: {
    tempC: number;
    solarRadiationWm2: number;
    airQualityIndex: number;
    condition: string;
  };
}

export interface OverallMetrics {
  sustainabilityScore: number;
  sustainabilityScoreChange: number; // +/- % vs last period
  energy: {
    currentKw: number;
    dailyKwh: number;
    monthlyMwh: number;
    renewableSharePct: number;
    changePct: number;
  };
  waste: {
    dailyKg: number;
    monthlyTonnes: number;
    diversionRatePct: number;
    changePct: number;
  };
  water: {
    dailyLiters: number;
    monthlyKl: number;
    rainwaterHarvestedPct: number;
    changePct: number;
  };
  carbon: {
    dailyKgCo2e: number;
    monthlyTonnesCo2e: number;
    targetReductionProgressPct: number;
    changePct: number;
  };
  sensors: {
    total: number;
    active: number;
    warning: number;
    offline: number;
  };
  alerts: {
    totalActive: number;
    critical: number;
    warning: number;
    info: number;
  };
  historicalTrends: {
    hourlyEnergy: Array<{ time: string; consumptionKw: number; solarGenerationKw: number }>;
    monthlyEmissions: Array<{ month: string; actualCo2Tonnes: number; targetCo2Tonnes: number }>;
    wasteBreakdown: Array<{ name: string; value: number; color: string }>;
    waterByZone: Array<{ zone: string; usageKl: number }>;
  };
}

// AI Service Interfaces
export interface AIQueryRequest {
  query: string;
  buildingId?: string;
  context?: {
    scope?: 'campus' | 'building';
    layer?: LayerType;
  };
}

export interface AILocationReference {
  id: string;
  name: string;
  coordinates: LatLngTuple;
  type: 'building' | 'sensor' | 'waste_bin' | 'solar_area';
  highlightMetric?: string;
}

export interface AIMetricHighlight {
  label: string;
  value: string | number;
  change?: string;
  status?: 'positive' | 'negative' | 'neutral' | 'warning';
}

export interface AIQueryResponse {
  answer: string;
  locations: AILocationReference[];
  metrics: AIMetricHighlight[];
  recommendations: string[];
  alerts: string[];
}

// Simulation Service Interfaces
export interface SimulationRequest {
  scenarioId?: string;
  buildingId?: string; // Optional: all campus or specific building
  electricityReductionPct?: number; // e.g., 10 for 10%
  wasteReductionPct?: number; // e.g., 20 for 20%
  ledReplacementPct?: number; // e.g., 50 for 50%
  solarAdditionKw?: number; // e.g., 100 for 100 kW
}

export interface SimulationMetricValue {
  energyKwhYear: number;
  wasteKgYear: number;
  waterLitersYear: number;
  carbonTonnesCo2eYear: number;
  operatingCostDollarsYear: number;
}

export interface SimulationReduction {
  energyKwh: number;
  energyPct: number;
  wasteKg: number;
  wastePct: number;
  waterLiters: number;
  waterPct: number;
  costSavingsDollars: number;
  costSavingsPct: number;
}

export interface SimulationCarbonImpact {
  carbonTonnesAvoided: number;
  carbonPctReduction: number;
  treesPlantedEquivalent: number;
  passengerCarKmOffset: number;
  homesPoweredEquivalent: number;
}

export interface SimulationTimelinePoint {
  month: string;
  baselineEnergyMwh: number;
  projectedEnergyMwh: number;
  baselineCarbonTonnes: number;
  projectedCarbonTonnes: number;
}

export interface SimulationResponse {
  scenarioTitle: string;
  scopeLabel: string;
  currentValue: SimulationMetricValue;
  projectedValue: SimulationMetricValue;
  estimatedReduction: SimulationReduction;
  estimatedCarbonImpact: SimulationCarbonImpact;
  timeline: SimulationTimelinePoint[];
  methodologyNote: string;
}
