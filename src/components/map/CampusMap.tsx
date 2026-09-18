import React, { useState, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import {
  Zap,
  Trash2,
  Droplets,
  CloudSun,
  Radio,
  Search,
  RotateCcw,
  Sun,
  Layers,
  Check,
} from 'lucide-react';
import {
  Building,
  Sensor,
  WasteBin,
  WaterStation,
  SolarArea,
  CampusRoad,
  CampusGreenArea,
  LayerType,
  LatLngTuple,
} from '../../types';
import { SelectedEntity } from './EntityDetailModal';

// Center and bounds
const DEFAULT_CENTER: LatLngTuple = [37.4285, -122.1690];
const DEFAULT_ZOOM = 16;

// Helper component to programmatically pan/zoom map
const MapController: React.FC<{
  targetCoords?: LatLngTuple | null;
  targetZoom?: number;
}> = ({ targetCoords, targetZoom = 17 }) => {
  const map = useMap();

  React.useEffect(() => {
    if (targetCoords) {
      map.flyTo(targetCoords, targetZoom, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [targetCoords, targetZoom, map]);

  return null;
};

// Create custom SVG-based Leaflet DivIcons
const createSensorIcon = (type: Sensor['type'], status: Sensor['status']) => {
  const statusColor =
    status === 'online' ? '#10b981' : status === 'warning' ? '#f59e0b' : '#ef4444';
  const pulseClass = status === 'online' ? 'pulse-sensor' : '';

  return L.divIcon({
    className: 'custom-sensor-icon',
    html: `
      <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
        <div class="${pulseClass}" style="position: absolute; width: 22px; height: 22px; border-radius: 9999px; background-color: ${statusColor}; opacity: 0.35;"></div>
        <div style="width: 14px; height: 14px; border-radius: 9999px; background-color: ${statusColor}; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const createWasteBinIcon = (category: WasteBin['category'], fillLevel: number) => {
  const badgeColor =
    fillLevel >= 85 ? '#ef4444' : fillLevel >= 60 ? '#f59e0b' : '#10b981';
  const streamIcon = category === 'compost' ? '🌱' : category === 'recycle' ? '♻️' : category === 'ewaste' ? '⚡' : '🗑️';

  return L.divIcon({
    className: 'custom-bin-icon',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
        <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 2px 5px; font-size: 11px; box-shadow: 0 2px 5px rgba(0,0,0,0.12); display: flex; align-items: center; gap: 2px;">
          <span>${streamIcon}</span>
          <span style="font-weight: 700; font-size: 10px; color: ${badgeColor};">${fillLevel}%</span>
        </div>
        <div style="width: 2px; height: 4px; background: #94a3b8;"></div>
      </div>
    `,
    iconSize: [36, 26],
    iconAnchor: [18, 26],
  });
};

const createWaterStationIcon = () => {
  return L.divIcon({
    className: 'custom-water-icon',
    html: `
      <div style="background: #0284c7; color: white; width: 24px; height: 24px; border-radius: 8px; border: 2px solid white; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.4); display: flex; align-items: center; justify-content: center; font-size: 12px;">
        💧
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const createSolarMarkerIcon = (capacityKw: number) => {
  return L.divIcon({
    className: 'custom-solar-icon',
    html: `
      <div style="background: #f59e0b; color: white; padding: 2px 6px; border-radius: 6px; border: 1.5px solid white; box-shadow: 0 2px 5px rgba(245, 158, 11, 0.35); font-weight: 700; font-size: 10px; display: flex; align-items: center; gap: 3px;">
        <span>☀️</span>
        <span>${capacityKw} kW</span>
      </div>
    `,
    iconSize: [60, 22],
    iconAnchor: [30, 11],
  });
};

interface CampusMapProps {
  buildings: Building[];
  sensors: Sensor[];
  wasteBins: WasteBin[];
  waterStations: WaterStation[];
  solarAreas: SolarArea[];
  roads: CampusRoad[];
  greenAreas: CampusGreenArea[];
  activeBuilding: Building | null;
  onSelectBuilding: (building: Building) => void;
  onSelectEntity: (entity: SelectedEntity) => void;
  activeLayers: LayerType[];
  onToggleLayer: (layer: LayerType) => void;
}

export const CampusMap: React.FC<CampusMapProps> = ({
  buildings,
  sensors,
  wasteBins,
  waterStations,
  solarAreas,
  roads,
  greenAreas,
  activeBuilding,
  onSelectBuilding,
  onSelectEntity,
  activeLayers,
  onToggleLayer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [targetView, setTargetView] = useState<LatLngTuple | null>(null);

  // Search filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const matchingBuildings = buildings
      .filter(b => b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q))
      .map(b => ({ type: 'building' as const, id: b.id, title: b.name, subtitle: `${b.code} • ${b.sustainabilityScore}/100 Score`, coords: b.coordinates, raw: b }));

    const matchingSensors = sensors
      .filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.location.toLowerCase().includes(q))
      .map(s => ({ type: 'sensor' as const, id: s.id, title: s.name, subtitle: `${s.code} • ${s.value} ${s.unit}`, coords: s.coordinates, raw: s }));

    const matchingBins = wasteBins
      .filter(b => b.code.toLowerCase().includes(q) || b.location.toLowerCase().includes(q) || b.category.toLowerCase().includes(q))
      .map(b => ({ type: 'waste_bin' as const, id: b.id, title: `${b.category.toUpperCase()} Bin (${b.code})`, subtitle: `${b.fillLevel}% full • ${b.location}`, coords: b.coordinates, raw: b }));

    return [...matchingBuildings, ...matchingSensors, ...matchingBins].slice(0, 7);
  }, [searchQuery, buildings, sensors, wasteBins]);

  const handleSelectSearchResult = (result: (typeof searchResults)[0]) => {
    setTargetView(result.coords);
    setSearchQuery('');
    setSearchFocused(false);

    if (result.type === 'building') {
      onSelectBuilding(result.raw as Building);
    } else if (result.type === 'sensor') {
      onSelectEntity({ type: 'sensor', data: result.raw as Sensor });
    } else if (result.type === 'waste_bin') {
      onSelectEntity({ type: 'waste_bin', data: result.raw as WasteBin });
    }
  };

  const handleResetView = () => {
    setTargetView([...DEFAULT_CENTER]);
  };

  // Determine building polygon style based on active layer
  const getBuildingStyle = (building: Building) => {
    const isSelected = activeBuilding?.id === building.id;

    // Layer-specific thematic rendering
    if (activeLayers.includes('energy')) {
      const isHighEnergy = building.metrics.energyKwhPerDay > 4500;
      return {
        fillColor: isHighEnergy ? '#f59e0b' : '#10b981',
        fillOpacity: isSelected ? 0.75 : 0.45,
        color: isSelected ? '#0f172a' : isHighEnergy ? '#d97706' : '#059669',
        weight: isSelected ? 3 : 1.5,
      };
    }

    if (activeLayers.includes('carbon')) {
      const rating = building.metrics.carbonIntensityRating;
      const color = rating === 'A' ? '#10b981' : rating === 'B' ? '#0ea5e9' : rating === 'C' ? '#f59e0b' : '#ef4444';
      return {
        fillColor: color,
        fillOpacity: isSelected ? 0.75 : 0.45,
        color: isSelected ? '#0f172a' : color,
        weight: isSelected ? 3 : 1.5,
      };
    }

    if (activeLayers.includes('water')) {
      return {
        fillColor: '#0284c7',
        fillOpacity: isSelected ? 0.7 : 0.4,
        color: isSelected ? '#0f172a' : '#0369a1',
        weight: isSelected ? 3 : 1.5,
      };
    }

    if (activeLayers.includes('waste')) {
      const highDiversion = building.metrics.wasteDiversionPct >= 80;
      return {
        fillColor: highDiversion ? '#10b981' : '#f59e0b',
        fillOpacity: isSelected ? 0.7 : 0.4,
        color: isSelected ? '#0f172a' : highDiversion ? '#059669' : '#d97706',
        weight: isSelected ? 3 : 1.5,
      };
    }

    // Default: Sustainability score based color
    const score = building.sustainabilityScore;
    const baseColor = score >= 88 ? '#10b981' : score >= 75 ? '#84cc16' : '#f59e0b';
    return {
      fillColor: baseColor,
      fillOpacity: isSelected ? 0.8 : 0.45,
      color: isSelected ? '#0f172a' : '#1e293b',
      weight: isSelected ? 3 : 1.5,
    };
  };

  const layersConfig: Array<{ id: LayerType; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'energy', label: 'Energy', icon: Zap },
    { id: 'waste', label: 'Waste', icon: Trash2 },
    { id: 'water', label: 'Water', icon: Droplets },
    { id: 'carbon', label: 'Carbon', icon: CloudSun },
    { id: 'sensors', label: 'Sensors', icon: Radio },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-slate-100">
      {/* Top Search & Layer Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pointer-events-none">
        {/* Search Bar Container */}
        <div className="relative w-full sm:w-80 pointer-events-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search buildings, sensors, bins..."
              className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl bg-white/95 backdrop-blur border border-slate-200/90 shadow-subtle text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {searchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-panel border border-slate-200 overflow-hidden divide-y divide-slate-100 z-50">
              {searchResults.map(res => (
                <button
                  key={`${res.type}-${res.id}`}
                  onClick={() => handleSelectSearchResult(res)}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-emerald-700">
                      {res.title}
                    </div>
                    <div className="text-[11px] text-slate-500">{res.subtitle}</div>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 px-1.5 py-0.5 rounded bg-slate-100">
                    {res.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map Layer Toggles Bar */}
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur p-1.5 rounded-xl border border-slate-200/90 shadow-subtle pointer-events-auto overflow-x-auto">
          <div className="hidden lg:flex items-center gap-1 px-2 text-xs font-semibold text-slate-500 border-r border-slate-200 mr-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Layers:</span>
          </div>

          {layersConfig.map(layer => {
            const Icon = layer.icon;
            const isLayerActive = activeLayers.includes(layer.id);
            return (
              <button
                key={layer.id}
                onClick={() => onToggleLayer(layer.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isLayerActive
                    ? 'bg-emerald-500 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{layer.label}</span>
                {isLayerActive && <Check className="w-3 h-3 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Left Map Legend */}
      <div className="absolute bottom-4 left-4 z-30 hidden sm:block bg-white/95 backdrop-blur p-3 rounded-xl border border-slate-200/90 shadow-subtle text-xs space-y-2 pointer-events-auto max-w-xs">
        <div className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider flex items-center justify-between">
          <span>Campus Map Legend</span>
          <span className="text-[10px] text-emerald-600 font-bold">Verdant Twin</span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 opacity-80" />
            <span>High Eco-Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500 opacity-80" />
            <span>Moderate / Warning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
            <span>Green Areas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300" />
            <span>Solar Arrays</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>IoT Sensors</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">💧</span>
            <span>Water Stations</span>
          </div>
        </div>
      </div>

      {/* Bottom Right Controls: Reset View */}
      <div className="absolute bottom-6 right-4 z-30 pointer-events-auto flex flex-col gap-2">
        <button
          onClick={handleResetView}
          title="Reset map view to center"
          className="p-2.5 rounded-xl bg-white shadow-subtle border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center focus:outline-none"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Leaflet Map Container */}
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={14}
        maxZoom={18}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapController targetCoords={targetView} />

        {/* Crisp, light Positron CartoDB Basemap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* 1. Green Areas */}
        {greenAreas.map(area => (
          <Polygon
            key={area.id}
            positions={area.coordinates}
            pathOptions={{
              fillColor: '#dcfce7',
              fillOpacity: 0.6,
              color: '#4ade80',
              weight: 1.5,
            }}
          >
            <Tooltip permanent={false} direction="center" className="text-xs font-semibold">
              🌿 {area.name} ({area.areaSqM.toLocaleString()} m²)
            </Tooltip>
          </Polygon>
        ))}

        {/* 2. Campus Roads & Walkways */}
        {roads.map(road => (
          <Polyline
            key={road.id}
            positions={road.coordinates}
            pathOptions={{
              color: road.type === 'bike_path' ? '#10b981' : '#94a3b8',
              weight: road.type === 'road' ? 4 : 2.5,
              dashArray: road.type === 'bike_path' ? '4, 6' : undefined,
              opacity: 0.8,
            }}
          >
            <Tooltip sticky className="text-xs font-medium">
              {road.name}
            </Tooltip>
          </Polyline>
        ))}

        {/* 3. Solar Areas */}
        {solarAreas.map(solar => (
          <React.Fragment key={solar.id}>
            <Polygon
              positions={solar.coordinates}
              pathOptions={{
                fillColor: '#fef3c7',
                fillOpacity: 0.7,
                color: '#f59e0b',
                weight: 2,
              }}
              eventHandlers={{
                click: () => onSelectEntity({ type: 'solar_area', data: solar }),
              }}
            >
              <Tooltip sticky className="text-xs font-semibold">
                ☀️ {solar.name} ({solar.capacityKw} kW)
              </Tooltip>
            </Polygon>
            <Marker
              position={solar.center}
              icon={createSolarMarkerIcon(solar.capacityKw)}
              eventHandlers={{
                click: () => onSelectEntity({ type: 'solar_area', data: solar }),
              }}
            />
          </React.Fragment>
        ))}

        {/* 4. Campus Buildings */}
        {buildings.map(building => {
          const style = getBuildingStyle(building);
          return (
            <Polygon
              key={building.id}
              positions={building.polygonCoordinates}
              pathOptions={style}
              eventHandlers={{
                click: () => onSelectBuilding(building),
              }}
            >
              <Tooltip permanent={false} sticky direction="top" className="text-xs font-bold">
                <div>
                  <div className="font-bold text-slate-900">{building.name}</div>
                  <div className="text-[11px] font-medium text-emerald-700">
                    Score: {building.sustainabilityScore}/100 • {building.code}
                  </div>
                </div>
              </Tooltip>
            </Polygon>
          );
        })}

        {/* 5. Waste Bins Layer */}
        {activeLayers.includes('waste') &&
          wasteBins.map(bin => (
            <Marker
              key={bin.id}
              position={bin.coordinates}
              icon={createWasteBinIcon(bin.category, bin.fillLevel)}
              eventHandlers={{
                click: () => onSelectEntity({ type: 'waste_bin', data: bin }),
              }}
            >
              <Tooltip className="text-xs">
                {bin.category.toUpperCase()} Bin: {bin.fillLevel}% full ({bin.location})
              </Tooltip>
            </Marker>
          ))}

        {/* 6. Sensors Layer */}
        {activeLayers.includes('sensors') &&
          sensors.map(sensor => (
            <Marker
              key={sensor.id}
              position={sensor.coordinates}
              icon={createSensorIcon(sensor.type, sensor.status)}
              eventHandlers={{
                click: () => onSelectEntity({ type: 'sensor', data: sensor }),
              }}
            >
              <Tooltip className="text-xs font-medium">
                {sensor.name}: {sensor.value} {sensor.unit} ({sensor.status.toUpperCase()})
              </Tooltip>
            </Marker>
          ))}

        {/* 7. Water Stations Layer */}
        {activeLayers.includes('water') &&
          waterStations.map(station => (
            <Marker
              key={station.id}
              position={station.coordinates}
              icon={createWaterStationIcon()}
              eventHandlers={{
                click: () => onSelectEntity({ type: 'water_station', data: station }),
              }}
            >
              <Tooltip className="text-xs font-medium">
                {station.name} ({station.bottlesSaved.toLocaleString()} bottles saved)
              </Tooltip>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};
