import React, { useState } from 'react';
import {
  Activity,
  Zap,
  Trash2,
  Droplets,
  CloudSun,
  Radio,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { OverallMetrics, Building, Alert } from '../types';

interface MonitorPageProps {
  metrics: OverallMetrics | null;
  buildings: Building[];
  alerts: Alert[];
  onSelectBuildingOnMap: (building: Building) => void;
}

export const MonitorPage: React.FC<MonitorPageProps> = ({
  metrics,
  buildings,
  alerts,
  onSelectBuildingOnMap,
}) => {
  const [alertFilter, setAlertFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [sortKey, setSortKey] = useState<'score' | 'energy' | 'waste' | 'water'>('score');

  if (!metrics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <Activity className="w-5 h-5 animate-spin text-emerald-600" />
          <span>Loading campus telemetry streams...</span>
        </div>
      </div>
    );
  }

  // Filtered alerts
  const filteredAlerts =
    alertFilter === 'all'
      ? alerts
      : alerts.filter(a => a.severity === alertFilter);

  // Sorted buildings
  const sortedBuildings = [...buildings].sort((a, b) => {
    if (sortKey === 'score') return b.sustainabilityScore - a.sustainabilityScore;
    if (sortKey === 'energy') return b.metrics.energyKwhPerDay - a.metrics.energyKwhPerDay;
    if (sortKey === 'waste') return b.metrics.wasteKgPerDay - a.metrics.wasteKgPerDay;
    if (sortKey === 'water') return b.metrics.waterLitersPerDay - a.metrics.waterLitersPerDay;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              MACE Sustainability Telemetry Monitor
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Live Stream
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time telemetry, resource intensity benchmarking, and system alerts for Mar Athanasius College of Engineering, Kothamangalam.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/70">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            39 / 42 Sensors Synced
          </span>
          <span className="hidden sm:inline">Refresh rate: 30s</span>
        </div>
      </div>

      {/* 7 Key Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Overall Sustainability Score */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-white border border-emerald-200/80 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Overall Score
            </span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {metrics.sustainabilityScore}
            </span>
            <span className="text-sm text-slate-400 font-medium">/ 100</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{metrics.sustainabilityScoreChange}% vs last quarter</span>
          </div>
        </div>

        {/* 2. Energy Consumption */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Energy Consumption
            </span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {metrics.energy.dailyKwh.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500">kWh/day</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Renewable: <strong className="text-emerald-700">{metrics.energy.renewableSharePct}%</strong></span>
            <span className="text-emerald-600 font-semibold">{metrics.energy.changePct}% vs avg</span>
          </div>
        </div>

        {/* 3. Waste Generated */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Waste Generated
            </span>
            <Trash2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {metrics.waste.dailyKg.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500">kg/day</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Diversion: <strong className="text-emerald-700">{metrics.waste.diversionRatePct}%</strong></span>
            <span className="text-emerald-600 font-semibold">+{metrics.waste.changePct}% target</span>
          </div>
        </div>

        {/* 4. Water Consumption */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Water Consumption
            </span>
            <Droplets className="w-4 h-4 text-sky-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {(metrics.water.dailyLiters / 1000).toFixed(1)}k
            </span>
            <span className="text-xs font-medium text-slate-500">Liters/day</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Harvested: <strong className="text-sky-700">{metrics.water.rainwaterHarvestedPct}%</strong></span>
            <span className="text-sky-600 font-semibold">{metrics.water.changePct}% efficiency</span>
          </div>
        </div>
      </div>

      {/* Row 2: Secondary Status Cards: Carbon, Sensors, Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Carbon Emissions */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">Carbon Intensity</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              {(metrics.carbon.dailyKgCo2e / 1000).toFixed(2)} <span className="text-xs font-normal text-slate-500">Tonnes CO₂e/d</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">
              Net-Zero 2030 trajectory on track ({metrics.carbon.targetReductionProgressPct}% complete)
            </p>
          </div>
          <CloudSun className="w-8 h-8 text-slate-400 opacity-60" />
        </div>

        {/* Active Sensors */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">Active IoT Sensors</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              {metrics.sensors.active} <span className="text-xs font-normal text-slate-500">/ {metrics.sensors.total} nodes online</span>
            </div>
            <p className="text-[11px] text-amber-700 font-medium mt-1">
              {metrics.sensors.warning} node reporting calibration warning
            </p>
          </div>
          <Radio className="w-8 h-8 text-emerald-600 opacity-60" />
        </div>

        {/* Active Alerts */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500">Active System Alerts</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              {metrics.alerts.totalActive} <span className="text-xs font-normal text-slate-500">anomalies detected</span>
            </div>
            <p className="text-[11px] text-rose-700 font-semibold mt-1">
              {metrics.alerts.critical} critical water leak requiring dispatch
            </p>
          </div>
          <AlertTriangle className="w-8 h-8 text-rose-500 opacity-60" />
        </div>
      </div>

      {/* Historical Trend Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Hourly Power Load vs Solar Generation */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Campus Load vs Solar Generation</h2>
              <p className="text-xs text-slate-500">24-hour diurnal curve showing renewable offset</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600" /> Total Load
              </span>
              <span className="flex items-center gap-1.5 font-medium text-amber-600">
                <span className="w-2.5 h-2.5 rounded bg-amber-400" /> Solar Yield
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.historicalTrends.hourlyEnergy} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} unit=" kW" />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value.toLocaleString()} kW`,
                    name === 'consumptionKw' ? 'Campus Grid Draw' : 'Solar Microgrid Generation',
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  }}
                />
                <Area type="monotone" dataKey="consumptionKw" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#loadGrad)" />
                <Area type="monotone" dataKey="solarGenerationKw" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#solarGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Emissions vs 2030 Net-Zero Benchmark */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Carbon Emissions vs Target Trajectory</h2>
              <p className="text-xs text-slate-500">Monthly Tonnes CO₂e compared to 2030 glidepath</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded bg-slate-800" /> Actual
              </span>
              <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                <span className="w-2.5 h-2.5 rounded border border-emerald-500 border-dashed" /> 2030 Target
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.historicalTrends.monthlyEmissions} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} unit=" T" />
                <Tooltip
                  formatter={(val: number, name: string) => [
                    `${val} Tonnes CO₂e`,
                    name === 'actualCo2Tonnes' ? 'Actual Emissions' : 'Glidepath Target',
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Line type="monotone" dataKey="actualCo2Tonnes" stroke="#1e293b" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="targetCo2Tonnes" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Waste Stream Composition */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Waste Stream Diversion Profile</h2>
            <p className="text-xs text-slate-500">79.4% current campus diversion rate</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.historicalTrends.wasteBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {metrics.historicalTrends.wasteBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val}% of total volume`, 'Waste Stream']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Water Usage by Campus Zone */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Water Consumption by Zone</h2>
            <p className="text-xs text-slate-500">Monthly kiloliters across operational zones</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.historicalTrends.waterByZone} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="zone" stroke="#94a3b8" fontSize={10} tickLine={false} angle={-15} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} unit=" kL" />
                <Tooltip
                  formatter={(val: number) => [`${val.toLocaleString()} kL`, 'Monthly Water Usage']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="usageKl" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Building Performance Leaderboard Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Facility Sustainability Leaderboard</h2>
            <p className="text-xs text-slate-500">
              Comparative resource intensity across all monitored campus facilities.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Sort by:</span>
            {(['score', 'energy', 'waste', 'water'] as const).map(key => (
              <button
                key={key}
                onClick={() => setSortKey(key)}
                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                  sortKey === key
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Building Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Energy (kWh/d)</th>
                <th className="py-3 px-4">Waste Diversion</th>
                <th className="py-3 px-4">Water (L/d)</th>
                <th className="py-3 px-4">Carbon Class</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {sortedBuildings.map(bldg => {
                const scoreColor =
                  bldg.sustainabilityScore >= 88
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : bldg.sustainabilityScore >= 75
                    ? 'text-amber-700 bg-amber-50 border-amber-200'
                    : 'text-rose-700 bg-rose-50 border-rose-200';

                return (
                  <tr key={bldg.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{bldg.name}</div>
                      <div className="text-[11px] text-slate-400">{bldg.code} {bldg.leedCertification && `• LEED ${bldg.leedCertification}`}</div>
                    </td>
                    <td className="py-3 px-4 capitalize text-slate-500">
                      {bldg.category.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-md border font-bold text-xs ${scoreColor}`}>
                        {bldg.sustainabilityScore} / 100
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {bldg.metrics.energyKwhPerDay.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-emerald-700 font-semibold">
                      {bldg.metrics.wasteDiversionPct}%
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      {bldg.metrics.waterLitersPerDay.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono font-semibold text-slate-700">
                        Class {bldg.metrics.carbonIntensityRating}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectBuildingOnMap(bldg)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 font-semibold text-xs transition-colors"
                      >
                        <span>View on Map</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Alerts Center */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">Active Campus Sustainability Alerts</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs">
            {(['all', 'critical', 'warning', 'info'] as const).map(sev => (
              <button
                key={sev}
                onClick={() => setAlertFilter(sev)}
                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                  alertFilter === sev
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          {filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                alert.severity === 'critical'
                  ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                  : alert.severity === 'warning'
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : 'bg-blue-50/80 border-blue-200 text-blue-950'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      alert.severity === 'critical'
                        ? 'bg-rose-600 text-white'
                        : alert.severity === 'warning'
                        ? 'bg-amber-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <span className="font-bold text-sm text-slate-900">{alert.title}</span>
                  {alert.buildingName && (
                    <span className="text-slate-500 text-xs">• {alert.buildingName}</span>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed">{alert.description}</p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <span className="text-slate-400 text-[11px]">{alert.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
