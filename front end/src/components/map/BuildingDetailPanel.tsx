import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Zap,
  Trash2,
  Droplets,
  CloudSun,
  AlertTriangle,
  Lightbulb,
  Calendar,
  Award,
  Maximize2,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Building } from '../../types';

interface BuildingDetailPanelProps {
  building: Building | null;
  onClose: () => void;
  onAskAI: (building: Building) => void;
}

export const BuildingDetailPanel: React.FC<BuildingDetailPanelProps> = ({
  building,
  onClose,
  onAskAI,
}) => {
  const [activeTrendMetric, setActiveTrendMetric] = useState<'energy' | 'water' | 'carbon' | 'waste'>('energy');

  if (!building) return null;

  const scoreColor =
    building.sustainabilityScore >= 88
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : building.sustainabilityScore >= 75
      ? 'text-amber-700 bg-amber-50 border-amber-200'
      : 'text-rose-700 bg-rose-50 border-rose-200';

  const chartColor =
    activeTrendMetric === 'energy'
      ? { stroke: '#059669', fill: '#d1fae5' }
      : activeTrendMetric === 'water'
      ? { stroke: '#0284c7', fill: '#e0f2fe' }
      : activeTrendMetric === 'carbon'
      ? { stroke: '#475569', fill: '#f1f5f9' }
      : { stroke: '#d97706', fill: '#fef3c7' };

  const chartDataKey =
    activeTrendMetric === 'energy'
      ? 'energyKwh'
      : activeTrendMetric === 'water'
      ? 'waterLiters'
      : activeTrendMetric === 'carbon'
      ? 'carbonKg'
      : 'wasteKg';

  const metricUnit =
    activeTrendMetric === 'energy'
      ? 'kWh'
      : activeTrendMetric === 'water'
      ? 'Liters'
      : activeTrendMetric === 'carbon'
      ? 'kg CO₂e'
      : 'kg';

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[480px] bg-white shadow-panel border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out">
      {/* Top Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
              {building.code}
            </span>
            <span className="text-xs capitalize px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {building.category.replace('_', ' ')}
            </span>
            {building.leedCertification && (
              <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Award className="w-3 h-3 text-emerald-600" />
                LEED {building.leedCertification}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
            {building.name}
          </h2>
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Built {building.yearBuilt}
            </span>
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5" /> {building.floorAreaSqMeters.toLocaleString()} m²
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors focus:outline-none"
          aria-label="Close building detail panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Sustainability Score Gauge */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Sustainability Score
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">
                {building.sustainabilityScore}
              </span>
              <span className="text-sm text-slate-400 font-medium">/100</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {building.sustainabilityScore >= 85
                ? 'High Eco-Efficiency rating. Complies with 2030 net-zero trajectory.'
                : 'Moderate efficiency. Opportunities identified in HVAC & water conservation.'}
            </p>
          </div>

          <div
            className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border font-bold text-lg shadow-sm ${scoreColor}`}
          >
            <span>{building.sustainabilityScore}</span>
            <span className="text-[10px] font-normal uppercase opacity-75">Score</span>
          </div>
        </div>

        {/* Primary CTA: Ask AI about this building */}
        <button
          onClick={() => onAskAI(building)}
          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold text-sm shadow-sm shadow-emerald-700/20 transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>Ask AI about this building</span>
          <ArrowUpRight className="w-4 h-4 opacity-75" />
        </button>

        {/* Key Metrics 4-Grid */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Current Daily Telemetry
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Energy */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-600 mb-1.5">
                <span className="text-xs font-medium">Energy Consumption</span>
                <Zap className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-lg font-bold text-slate-900">
                {building.metrics.energyKwhPerDay.toLocaleString()}{' '}
                <span className="text-xs font-normal text-slate-500">kWh/d</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Peak Load: <span className="font-semibold text-slate-700">{building.metrics.energyPeakKw} kW</span>
              </div>
            </div>

            {/* Waste */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-600 mb-1.5">
                <span className="text-xs font-medium">Waste Generated</span>
                <Trash2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">
                {building.metrics.wasteKgPerDay.toLocaleString()}{' '}
                <span className="text-xs font-normal text-slate-500">kg/d</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Diversion: <span className="font-semibold text-emerald-700">{building.metrics.wasteDiversionPct}%</span>
              </div>
            </div>

            {/* Water */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-600 mb-1.5">
                <span className="text-xs font-medium">Water Usage</span>
                <Droplets className="w-4 h-4 text-sky-500" />
              </div>
              <div className="text-lg font-bold text-slate-900">
                {building.metrics.waterLitersPerDay.toLocaleString()}{' '}
                <span className="text-xs font-normal text-slate-500">L/d</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Recycled: <span className="font-semibold text-sky-700">{building.metrics.waterRecycledPct}%</span>
              </div>
            </div>

            {/* Carbon */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-slate-600 mb-1.5">
                <span className="text-xs font-medium">Carbon Footprint</span>
                <CloudSun className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-lg font-bold text-slate-900">
                {building.metrics.carbonKgCo2ePerDay.toLocaleString()}{' '}
                <span className="text-xs font-normal text-slate-500">kg CO₂e</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Rating:{' '}
                <span className="font-semibold px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-800 text-[10px]">
                  Class {building.metrics.carbonIntensityRating}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Trend Chart */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              7-Day Trend Profile
            </h3>
            {/* Metric Switcher Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
              {(['energy', 'water', 'carbon', 'waste'] as const).map(metric => (
                <button
                  key={metric}
                  onClick={() => setActiveTrendMetric(metric)}
                  className={`px-2 py-0.5 rounded capitalize font-medium transition-colors ${
                    activeTrendMetric === metric
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={building.historicalTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor.stroke} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColor.stroke} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()} ${metricUnit}`, activeTrendMetric.toUpperCase()]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={chartDataKey}
                  stroke={chartColor.stroke}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#trendGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Alerts */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              Active Building Alerts ({building.alerts.length})
            </h3>
          </div>

          {building.alerts.length === 0 ? (
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-800 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All systems operating within baseline parameters. No active alerts.
            </div>
          ) : (
            <div className="space-y-2.5">
              {building.alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    alert.severity === 'critical'
                      ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                      : alert.severity === 'warning'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : 'bg-blue-50/70 border-blue-200 text-blue-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {alert.title}
                    </span>
                    <span className="text-[10px] opacity-75">{alert.timestamp}</span>
                  </div>
                  <p className="opacity-90 leading-relaxed">{alert.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Efficiency Recommendations ({building.recommendations.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {building.recommendations.map(rec => (
              <div
                key={rec.id}
                className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-sm space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-900 leading-snug">
                    {rec.title}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                      rec.impact === 'high'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.impact === 'medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {rec.impact.toUpperCase()} IMPACT
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{rec.description}</p>
                <div className="pt-1 text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                  <span>Estimated Savings:</span>
                  <span className="font-semibold">{rec.estimatedSavings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
