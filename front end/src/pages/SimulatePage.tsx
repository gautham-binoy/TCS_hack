import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Play,
  RotateCcw,
  Zap,
  Trash2,
  CloudSun,
  DollarSign,
  TreeDeciduous,
  Car,
  Home,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
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
import { SimulationResponse, Building } from '../types';
import { api } from '../services/api';

interface SimulatePageProps {
  buildings: Building[];
}

export const SimulatePage: React.FC<SimulatePageProps> = ({ buildings }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>('scenario-elec-10');
  const [electricityPct, setElectricityPct] = useState<number>(10);
  const [wastePct, setWastePct] = useState<number>(0);
  const [ledPct, setLedPct] = useState<number>(0);
  const [solarKw, setSolarKw] = useState<number>(0);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResponse | null>(null);

  const presetScenarios = [
    {
      id: 'scenario-elec-10',
      title: 'Reduce Electricity by 10%',
      description: 'Campus-wide efficiency policies, HVAC temperature setbacks (+1°C summer / -1°C winter).',
      defaults: { elec: 10, waste: 0, led: 0, solar: 0 },
    },
    {
      id: 'scenario-waste-20',
      title: 'Reduce Plastic Waste by 20%',
      description: 'Comprehensive compost mandates, reusable dining container programs, and sorting audits.',
      defaults: { elec: 0, waste: 20, led: 0, solar: 0 },
    },
    {
      id: 'scenario-led',
      title: 'Replace Conventional Lights with LEDs',
      description: 'Retrofit 65% of legacy fluorescent fixtures with daylight-harvesting smart LED tubes.',
      defaults: { elec: 8.5, waste: 0, led: 65, solar: 0 },
    },
    {
      id: 'scenario-solar-park',
      title: 'North Parking Solar Canopy (+250 kW)',
      description: 'Install 250 kW photovoltaic shade structures with EV charger integration.',
      defaults: { elec: 6.2, waste: 0, led: 0, solar: 250 },
    },
  ];

  const handleSelectPreset = (scenario: (typeof presetScenarios)[0]) => {
    setSelectedScenarioId(scenario.id);
    setElectricityPct(scenario.defaults.elec);
    setWastePct(scenario.defaults.waste);
    setLedPct(scenario.defaults.led);
    setSolarKw(scenario.defaults.solar);
    executeSimulation({
      scenarioId: scenario.id,
      electricityReductionPct: scenario.defaults.elec,
      wasteReductionPct: scenario.defaults.waste,
      ledReplacementPct: scenario.defaults.led,
      solarAdditionKw: scenario.defaults.solar,
      buildingId: selectedBuildingId || undefined,
    });
  };

  const handleCustomChange = (type: 'elec' | 'waste' | 'led' | 'solar', val: number) => {
    setSelectedScenarioId(null); // Switch to custom mode
    if (type === 'elec') setElectricityPct(val);
    if (type === 'waste') setWastePct(val);
    if (type === 'led') setLedPct(val);
    if (type === 'solar') setSolarKw(val);
  };

  const executeSimulation = async (params: {
    scenarioId?: string;
    electricityReductionPct?: number;
    wasteReductionPct?: number;
    ledReplacementPct?: number;
    solarAdditionKw?: number;
    buildingId?: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await api.runSimulation(params);
      setSimulationResult(res);
    } catch (err) {
      console.error('Simulation calculation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunManualSimulation = () => {
    executeSimulation({
      scenarioId: selectedScenarioId || undefined,
      electricityReductionPct: electricityPct,
      wasteReductionPct: wastePct,
      ledReplacementPct: ledPct,
      solarAdditionKw: solarKw,
      buildingId: selectedBuildingId || undefined,
    });
  };

  const handleResetToBaseline = () => {
    setSelectedScenarioId(null);
    setElectricityPct(0);
    setWastePct(0);
    setLedPct(0);
    setSolarKw(0);
    setSelectedBuildingId('');
    executeSimulation({
      electricityReductionPct: 0,
      wasteReductionPct: 0,
      ledReplacementPct: 0,
      solarAdditionKw: 0,
    });
  };

  // Initial simulation run on mount
  useEffect(() => {
    executeSimulation({
      scenarioId: 'scenario-elec-10',
      electricityReductionPct: 10,
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              What-If Scenario Simulator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Predictive Twin
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Simulate campus-wide sustainability interventions and evaluate forecasted energy, waste, and carbon impact.
          </p>
        </div>

        <button
          onClick={handleResetToBaseline}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Baseline</span>
        </button>
      </div>

      {/* Preset Scenarios Cards */}
      <div>
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Curated Scenario Presets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {presetScenarios.map(sc => {
            const isSelected = selectedScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectPreset(sc)}
                className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-subtle'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{sc.title}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{sc.description}</p>
                </div>
                <div className="pt-3 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <span>Apply Preset</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Custom Scenario Parameters</h2>
          </div>

          {/* Scope Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Target Scope:</span>
            <select
              value={selectedBuildingId}
              onChange={e => {
                setSelectedBuildingId(e.target.value);
                setSelectedScenarioId(null);
              }}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              <option value="">Entire Campus Grounds</option>
              {buildings.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Slider 1: Electricity Reduction */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Electricity Reduction</span>
              <span className="font-bold text-emerald-700">{electricityPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={electricityPct}
              onChange={e => handleCustomChange('elec', Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0%</span>
              <span>15%</span>
              <span>30% Max</span>
            </div>
          </div>

          {/* Slider 2: Waste Diversion */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Plastic/Solid Waste Cut</span>
              <span className="font-bold text-emerald-700">{wastePct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={wastePct}
              onChange={e => handleCustomChange('waste', Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0%</span>
              <span>25%</span>
              <span>50% Max</span>
            </div>
          </div>

          {/* Slider 3: LED Retrofit */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">LED Lighting Retrofit</span>
              <span className="font-bold text-emerald-700">{ledPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={ledPct}
              onChange={e => handleCustomChange('led', Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Slider 4: Solar Addition */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">New Solar Photovoltaics</span>
              <span className="font-bold text-emerald-700">{solarKw} kW</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="25"
              value={solarKw}
              onChange={e => handleCustomChange('solar', Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 kW</span>
              <span>250 kW</span>
              <span>500 kW</span>
            </div>
          </div>
        </div>

        {/* Run Simulation Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleRunManualSimulation}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all focus:outline-none"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Simulating Model...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Recalculate Scenario (POST /api/simulation)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulation Results Display */}
      {simulationResult && (
        <div className="space-y-6">
          {/* Official Estimates Banner */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 text-amber-900 text-xs flex items-start sm:items-center gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex-1">
              <span className="font-bold uppercase tracking-wider text-[10px] text-amber-700 mr-2">
                Predictive Estimate:
              </span>
              <span>
                All projected values, resource reductions, and carbon offsets are <strong>estimates</strong> calculated from thermodynamic load profiles, historical telemetry, and EPA emissions factors.
              </span>
            </div>
          </div>

          {/* Current vs Projected Values Comparison Grid */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Baseline vs Projected Impact (Annualized)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Energy Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Electricity Consumption</span>
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400">Current: {(simulationResult.currentValue.energyKwhYear / 1000000).toFixed(2)} GWh/yr</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {(simulationResult.projectedValue.energyKwhYear / 1000000).toFixed(2)}{' '}
                    <span className="text-xs font-normal text-slate-500">GWh/yr</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    -{simulationResult.estimatedReduction.energyPct}% Reduction
                  </span>
                  <span className="text-slate-500 font-medium">
                    ({(simulationResult.estimatedReduction.energyKwh / 1000).toLocaleString()} MWh saved)
                  </span>
                </div>
              </div>

              {/* Waste Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Solid Waste Generated</span>
                  <Trash2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400">Current: {(simulationResult.currentValue.wasteKgYear / 1000).toFixed(0)} Tonnes/yr</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {(simulationResult.projectedValue.wasteKgYear / 1000).toFixed(0)}{' '}
                    <span className="text-xs font-normal text-slate-500">Tonnes/yr</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    -{simulationResult.estimatedReduction.wastePct}% Landfill Cut
                  </span>
                  <span className="text-slate-500 font-medium">
                    ({(simulationResult.estimatedReduction.wasteKg / 1000).toFixed(0)} Tonnes diverted)
                  </span>
                </div>
              </div>

              {/* Carbon Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Carbon Emissions</span>
                  <CloudSun className="w-4 h-4 text-slate-600" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400">Current: {simulationResult.currentValue.carbonTonnesCo2eYear.toLocaleString()} Tonnes/yr</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {simulationResult.projectedValue.carbonTonnesCo2eYear.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-500">Tonnes CO₂e</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    -{simulationResult.estimatedCarbonImpact.carbonPctReduction}% CO₂e
                  </span>
                  <span className="text-slate-500 font-medium">
                    ({simulationResult.estimatedCarbonImpact.carbonTonnesAvoided} Tonnes avoided)
                  </span>
                </div>
              </div>

              {/* Cost Savings Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Operating Cost Impact</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400">Current: ${(simulationResult.currentValue.operatingCostDollarsYear / 1000).toFixed(0)}k/yr</div>
                  <div className="text-2xl font-bold text-emerald-700">
                    -${(simulationResult.estimatedReduction.costSavingsDollars / 1000).toFixed(1)}k{' '}
                    <span className="text-xs font-normal text-slate-500">Savings/yr</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold">
                    -{simulationResult.estimatedReduction.costSavingsPct}% Utility Bill
                  </span>
                  <span className="text-slate-500 font-medium">
                    ${(simulationResult.projectedValue.operatingCostDollarsYear / 1000).toFixed(0)}k remaining
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Equivalencies Grid */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white shadow-panel space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Estimated Ecological Equivalencies
              </span>
              <h4 className="text-lg font-bold text-white mt-1">
                Real-World Impact of Selected Interventions
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <TreeDeciduous className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white">
                    {simulationResult.estimatedCarbonImpact.treesPlantedEquivalent.toLocaleString()}
                  </div>
                  <div className="text-xs text-emerald-200/70">Tree seedlings grown for 10 years</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white">
                    {(simulationResult.estimatedCarbonImpact.passengerCarKmOffset / 1000).toFixed(0)}k
                  </div>
                  <div className="text-xs text-sky-200/70">Passenger vehicle km emissions avoided</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white">
                    {simulationResult.estimatedCarbonImpact.homesPoweredEquivalent}
                  </div>
                  <div className="text-xs text-amber-200/70">Average homes powered for one year</div>
                </div>
              </div>
            </div>
          </div>

          {/* 12-Month Projected Trajectory Chart */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">12-Month Projected Energy Trajectory</h3>
                <p className="text-xs text-slate-500">
                  Monthly Megawatt-hours (MWh) comparing baseline vs modeled scenario implementation
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <span className="w-2.5 h-2.5 rounded bg-slate-300" /> Baseline MWh
                </span>
                <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Projected MWh
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulationResult.timeline} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="baseMwh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="projMwh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} unit=" MWh" />
                  <Tooltip
                    formatter={(val: number, name: string) => [
                      `${val} MWh`,
                      name === 'baselineEnergyMwh' ? 'Baseline Load' : 'Projected Model Load',
                    ]}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="baselineEnergyMwh" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#baseMwh)" />
                  <Area type="monotone" dataKey="projectedEnergyMwh" stroke="#059669" strokeWidth={2.5} fill="url(#projMwh)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
