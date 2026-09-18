import React, { useState } from 'react';
import { CampusMap } from '../components/map/CampusMap';
import { BuildingDetailPanel } from '../components/map/BuildingDetailPanel';
import { EntityDetailModal, SelectedEntity } from '../components/map/EntityDetailModal';
import {
  Building,
  Sensor,
  WasteBin,
  WaterStation,
  SolarArea,
  CampusRoad,
  CampusGreenArea,
  LayerType,
  CampusOverview,
} from '../types';
import { Sun, Wind, AlertTriangle } from 'lucide-react';

interface CampusPageProps {
  campus: CampusOverview | null;
  buildings: Building[];
  sensors: Sensor[];
  wasteBins: WasteBin[];
  waterStations: WaterStation[];
  solarAreas: SolarArea[];
  roads: CampusRoad[];
  greenAreas: CampusGreenArea[];
  activeBuilding: Building | null;
  onSelectBuilding: (building: Building | null) => void;
  onAskAI: (building: Building) => void;
  onNavigateToMonitorAlerts?: () => void;
}

export const CampusPage: React.FC<CampusPageProps> = ({
  campus,
  buildings,
  sensors,
  wasteBins,
  waterStations,
  solarAreas,
  roads,
  greenAreas,
  activeBuilding,
  onSelectBuilding,
  onAskAI,
  onNavigateToMonitorAlerts,
}) => {
  const [activeLayers, setActiveLayers] = useState<LayerType[]>([
    'energy',
    'sensors',
    'waste',
    'water',
  ]);
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity | null>(null);

  const handleToggleLayer = (layer: LayerType) => {
    setActiveLayers(prev =>
      prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]
    );
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {/* Interactive Map */}
      <CampusMap
        buildings={buildings}
        sensors={sensors}
        wasteBins={wasteBins}
        waterStations={waterStations}
        solarAreas={solarAreas}
        roads={roads}
        greenAreas={greenAreas}
        activeBuilding={activeBuilding}
        onSelectBuilding={b => onSelectBuilding(b)}
        onSelectEntity={e => setSelectedEntity(e)}
        activeLayers={activeLayers}
        onToggleLayer={handleToggleLayer}
      />

      {/* Floating Campus Environment Status Pill (Bottom Center) */}
      {campus && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur border border-slate-200/90 shadow-panel text-xs text-slate-700">
          <div className="flex items-center gap-1.5 text-amber-600 font-medium">
            <Sun className="w-3.5 h-3.5" />
            <span>{campus.currentWeather.solarRadiationWm2} W/m² Solar</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <Wind className="w-3.5 h-3.5" />
            <span>AQI {campus.currentWeather.airQualityIndex} (Good)</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="text-slate-500 font-medium">
            <span>{campus.totalBuildings} Facilities • {campus.totalSensors} Telemetry Nodes</span>
          </div>

          {onNavigateToMonitorAlerts && (
            <>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <button
                onClick={onNavigateToMonitorAlerts}
                className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>4 Active Alerts</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Building Detail Slide-out Side Panel */}
      <BuildingDetailPanel
        building={activeBuilding}
        onClose={() => onSelectBuilding(null)}
        onAskAI={bldg => onAskAI(bldg)}
      />

      {/* Sensor/Bin/Water Station Telemetry Modal */}
      <EntityDetailModal
        entity={selectedEntity}
        onClose={() => setSelectedEntity(null)}
      />
    </div>
  );
};
