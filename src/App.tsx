import React, { useState, useEffect } from 'react';
import { Navbar, TabType } from './components/layout/Navbar';
import { CampusPage } from './pages/CampusPage';
import { MonitorPage } from './pages/MonitorPage';
import { AIPage } from './pages/AIPage';
import { SimulatePage } from './pages/SimulatePage';
import { api } from './services/api';
import {
  CampusOverview,
  Building,
  Sensor,
  WasteBin,
  WaterStation,
  SolarArea,
  CampusRoad,
  CampusGreenArea,
  OverallMetrics,
  Alert,
  Recommendation,
} from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('campus');

  // Campus Data States
  const [campus, setCampus] = useState<CampusOverview | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [wasteBins, setWasteBins] = useState<WasteBin[]>([]);
  const [waterStations, setWaterStations] = useState<WaterStation[]>([]);
  const [solarAreas, setSolarAreas] = useState<SolarArea[]>([]);
  const [roads, setRoads] = useState<CampusRoad[]>([]);
  const [greenAreas, setGreenAreas] = useState<CampusGreenArea[]>([]);
  const [metrics, setMetrics] = useState<OverallMetrics | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Selection & Context States
  const [activeBuilding, setActiveBuilding] = useState<Building | null>(null);
  const [aiBuildingContext, setAiBuildingContext] = useState<Building | null>(null);

  // Initial load via API service
  useEffect(() => {
    const loadAllCampusData = async () => {
      try {
        const [
          campusData,
          bldgsData,
          sensorsData,
          binsData,
          stationsData,
          solarData,
          roadsData,
          greensData,
          metricsData,
          alertsData,
          recsData,
        ] = await Promise.all([
          api.getCampus(),
          api.getBuildings(),
          api.getSensors(),
          api.getWasteBins(),
          api.getWaterStations(),
          api.getSolarAreas(),
          api.getRoads(),
          api.getGreenAreas(),
          api.getMetrics(),
          api.getAlerts(),
          api.getRecommendations(),
        ]);

        setCampus(campusData);
        setBuildings(bldgsData);
        setSensors(sensorsData);
        setWasteBins(binsData);
        setWaterStations(stationsData);
        setSolarAreas(solarData);
        setRoads(roadsData);
        setGreenAreas(greensData);
        setMetrics(metricsData);
        setAlerts(alertsData);
        setRecommendations(recsData);
      } catch (err) {
        console.error('Failed to load campus data:', err);
      }
    };

    loadAllCampusData();
  }, []);

  // Flow: Building panel -> Ask AI about this building
  const handleAskAIAboutBuilding = (building: Building) => {
    setAiBuildingContext(building);
    setActiveTab('ai');
  };

  // Flow: Leaderboard / Location cards -> View on Campus Map
  const handleSelectBuildingOnMap = (building: Building) => {
    setActiveBuilding(building);
    setActiveTab('campus');
  };

  // Flow: AI location card -> View on Campus Map
  const handleNavigateToMapLocation = (_coords: [number, number], buildingId?: string) => {
    if (buildingId) {
      const bldg = buildings.find(b => b.id === buildingId);
      if (bldg) setActiveBuilding(bldg);
    }
    setActiveTab('campus');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        sustainabilityScore={metrics?.sustainabilityScore || campus?.sustainabilityScore || 86}
      />

      {/* Primary Tab Views */}
      <main className="flex-1">
        {activeTab === 'campus' && (
          <CampusPage
            campus={campus}
            buildings={buildings}
            sensors={sensors}
            wasteBins={wasteBins}
            waterStations={waterStations}
            solarAreas={solarAreas}
            roads={roads}
            greenAreas={greenAreas}
            activeBuilding={activeBuilding}
            onSelectBuilding={setActiveBuilding}
            onAskAI={handleAskAIAboutBuilding}
            onNavigateToMonitorAlerts={() => setActiveTab('monitor')}
          />
        )}

        {activeTab === 'monitor' && (
          <MonitorPage
            metrics={metrics}
            buildings={buildings}
            alerts={alerts}
            onSelectBuildingOnMap={handleSelectBuildingOnMap}
          />
        )}

        {activeTab === 'ai' && (
          <AIPage
            selectedBuildingContext={aiBuildingContext}
            onClearBuildingContext={() => setAiBuildingContext(null)}
            onSelectBuildingContext={setAiBuildingContext}
            buildings={buildings}
            onNavigateToMapLocation={handleNavigateToMapLocation}
          />
        )}

        {activeTab === 'simulate' && <SimulatePage buildings={buildings} />}
      </main>
    </div>
  );
};

export default App;
