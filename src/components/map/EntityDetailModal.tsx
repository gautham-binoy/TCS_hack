import React from 'react';
import {
  X,
  Radio,
  Trash2,
  Droplets,
  Sun,
  Activity,
  AlertTriangle,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Sensor, WasteBin, WaterStation, SolarArea } from '../../types';

export type SelectedEntity =
  | { type: 'sensor'; data: Sensor }
  | { type: 'waste_bin'; data: WasteBin }
  | { type: 'water_station'; data: WaterStation }
  | { type: 'solar_area'; data: SolarArea };

interface EntityDetailModalProps {
  entity: SelectedEntity | null;
  onClose: () => void;
}

export const EntityDetailModal: React.FC<EntityDetailModalProps> = ({ entity, onClose }) => {
  if (!entity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-panel border border-slate-200 max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-slate-700">
              {entity.type === 'sensor' && <Radio className="w-5 h-5 text-emerald-600" />}
              {entity.type === 'waste_bin' && <Trash2 className="w-5 h-5 text-amber-600" />}
              {entity.type === 'water_station' && <Droplets className="w-5 h-5 text-sky-600" />}
              {entity.type === 'solar_area' && <Sun className="w-5 h-5 text-amber-500" />}
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {entity.type.replace('_', ' ')}
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {'name' in entity.data ? entity.data.name : entity.data.code}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Entity-specific telemetry content */}
        {entity.type === 'sensor' && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Live Reading</span>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">
                  {entity.data.value}{' '}
                  <span className="text-sm font-medium text-slate-500">{entity.data.unit}</span>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                  entity.data.status === 'online'
                    ? 'bg-emerald-100 text-emerald-800'
                    : entity.data.status === 'warning'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {entity.data.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Sensor Type:</span>
                <p className="font-semibold text-slate-800 capitalize mt-0.5">
                  {entity.data.type.replace('_', ' ')}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Node ID:</span>
                <p className="font-mono font-semibold text-slate-800 mt-0.5">{entity.data.code}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{entity.data.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Last telemetry received {entity.data.lastUpdated}</span>
            </div>
          </div>
        )}

        {entity.type === 'waste_bin' && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-600">Current Volume Level</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    entity.data.fillLevel >= 85
                      ? 'bg-rose-100 text-rose-800'
                      : entity.data.fillLevel >= 60
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {entity.data.fillLevel}% Full
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    entity.data.fillLevel >= 85
                      ? 'bg-rose-500'
                      : entity.data.fillLevel >= 60
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${entity.data.fillLevel}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Waste Stream:</span>
                <p className="font-semibold text-slate-800 capitalize mt-0.5">
                  {entity.data.category}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Last Emptied:</span>
                <p className="font-semibold text-slate-800 mt-0.5">{entity.data.lastCollected}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{entity.data.location}</span>
            </div>
          </div>
        )}

        {entity.type === 'water_station' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-sky-900">
                <span className="text-[11px] text-sky-700">Bottles Avoided</span>
                <div className="text-xl font-bold mt-1">
                  {entity.data.bottlesSaved.toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500">Total Dispensed</span>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  {(entity.data.litersDispensed / 1000).toFixed(1)} kL
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Filter Status</span>
              <span
                className={`font-semibold capitalize px-2 py-0.5 rounded ${
                  entity.data.filterStatus === 'optimal'
                    ? 'text-emerald-700 bg-emerald-50'
                    : entity.data.filterStatus === 'good'
                    ? 'text-sky-700 bg-sky-50'
                    : 'text-amber-700 bg-amber-50'
                }`}
              >
                {entity.data.filterStatus.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{entity.data.location}</span>
            </div>
          </div>
        )}

        {entity.type === 'solar_area' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80">
                <span className="text-[11px] text-amber-800 font-medium">Live Solar Power</span>
                <div className="text-xl font-bold text-amber-900 mt-1">
                  {entity.data.currentOutputKw} kW
                </div>
                <span className="text-[10px] text-amber-700 font-medium">
                  of {entity.data.capacityKw} kW Peak
                </span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80">
                <span className="text-[11px] text-emerald-800 font-medium">Today's Energy Yield</span>
                <div className="text-xl font-bold text-emerald-900 mt-1">
                  {entity.data.dailyProductionKwh.toLocaleString()} kWh
                </div>
                <span className="text-[10px] text-emerald-700 font-medium">
                  {entity.data.efficiency}% Efficiency
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-500">Photovoltaic Modules</span>
              <span className="font-semibold text-slate-800">
                {entity.data.panelCount.toLocaleString()} high-efficiency panels
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
