import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Building2,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  X,
} from 'lucide-react';
import { Building, AIQueryResponse } from '../types';
import { api } from '../services/api';

interface AIPageProps {
  selectedBuildingContext: Building | null;
  onClearBuildingContext: () => void;
  onSelectBuildingContext: (building: Building | null) => void;
  buildings: Building[];
  onNavigateToMapLocation: (coords: [number, number], buildingId?: string) => void;
}

interface QueryHistoryItem {
  id: string;
  query: string;
  buildingContextName?: string;
  timestamp: string;
  response: AIQueryResponse;
}

export const AIPage: React.FC<AIPageProps> = ({
  selectedBuildingContext,
  onClearBuildingContext,
  onSelectBuildingContext,
  buildings,
  onNavigateToMapLocation,
}) => {
  const [queryInput, setQueryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<AIQueryResponse | null>(null);
  const [history, setHistory] = useState<QueryHistoryItem[]>([]);

  const suggestedQuestions = [
    'Which building consumes the most energy at MACE?',
    'Where are the waste bins on MACE campus?',
    'What is the current solar output across MACE rooftops?',
    'Why is Mechanical Workshop energy demand high?',
    'How can MACE achieve net-zero carbon emissions?',
  ];

  // If a building is selected, trigger an initial automated analysis if no response yet
  useEffect(() => {
    if (selectedBuildingContext && !currentResponse) {
      handleSendQuery(`Provide a full sustainability and telemetry assessment for ${selectedBuildingContext.name}`);
    }
  }, [selectedBuildingContext]);

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    setIsLoading(true);
    setQueryInput(queryText);

    try {
      const resp = await api.queryAI({
        query: queryText,
        buildingId: selectedBuildingContext?.id,
      });

      setCurrentResponse(resp);

      // Add to session history
      const newItem: QueryHistoryItem = {
        id: `q-${Date.now()}`,
        query: queryText,
        buildingContextName: selectedBuildingContext?.name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        response: resp,
      };
      setHistory(prev => [newItem, ...prev.slice(0, 8)]);
    } catch (err) {
      console.error('AI Query failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendQuery(queryInput);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dedicated Campus Intelligence Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-panel relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Campus Intelligence Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            MACE Campus Intelligence
          </h1>
          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
            Ask anything about Mar Athanasius College of Engineering. Real-time telemetry synthesis, root-cause anomaly detection, and Gemini-powered conservation insights.
          </p>
        </div>

        {/* Active Context Selector Bar */}
        <div className="mt-6 pt-4 border-t border-emerald-700/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-emerald-200/70 font-medium">Analysis Context:</span>
            {selectedBuildingContext ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-800/80 text-emerald-100 border border-emerald-500/40 font-semibold shadow-xs">
                <Building2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Building: {selectedBuildingContext.name}</span>
                <button
                  onClick={onClearBuildingContext}
                  className="hover:text-rose-300 ml-1 focus:outline-none"
                  title="Clear building context (switch to campus-wide)"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 text-emerald-200 border border-slate-700 font-semibold">
                <span>Entire MACE Campus (All 9 Blocks & Facilities)</span>
              </div>
            )}
          </div>

          {/* Quick Context Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-emerald-200/70">Focus Facility:</span>
            <select
              value={selectedBuildingContext?.id || ''}
              onChange={e => {
                const bldg = buildings.find(b => b.id === e.target.value) || null;
                onSelectBuildingContext(bldg);
              }}
              className="bg-slate-800/90 text-white text-xs rounded-lg px-2.5 py-1.5 border border-emerald-700/60 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            >
              <option value="">Campus-Wide Scope</option>
              {buildings.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Suggested Questions Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Suggested Inquiries</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(q)}
              className="text-left p-3.5 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 shadow-subtle text-xs font-medium text-slate-800 transition-all hover:translate-y-[-1px] flex items-center justify-between group"
            >
              <span>{q}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0 ml-2" />
            </button>
          ))}
          {selectedBuildingContext && (
            <button
              onClick={() => handleSendQuery(`What are the primary energy savings recommendations for ${selectedBuildingContext.name}?`)}
              className="text-left p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-300 text-xs font-medium text-emerald-900 transition-all flex items-center justify-between group"
            >
              <span>How can we optimize {selectedBuildingContext.code}?</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Query Input Box */}
      <form onSubmit={handleFormSubmit} className="relative">
        <div className="relative flex items-center shadow-panel rounded-2xl bg-white border border-slate-200 overflow-hidden focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <input
            type="text"
            value={queryInput}
            onChange={e => setQueryInput(e.target.value)}
            placeholder={
              selectedBuildingContext
                ? `Ask anything about ${selectedBuildingContext.name}...`
                : 'Ask anything about campus sustainability, sensors, waste, or energy...'
            }
            className="w-full px-5 py-4 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            disabled={isLoading}
          />
          <div className="pr-3 flex items-center gap-2">
            {queryInput && (
              <button
                type="button"
                onClick={() => setQueryInput('')}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading || !queryInput.trim()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all focus:outline-none"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Rendered AI Response Display */}
      {currentResponse && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-subtle space-y-6 animate-in fade-in duration-200">
          {/* Top Response Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Intelligence Synthesis & Telemetry Match
              </span>
            </div>
            <span className="text-xs text-slate-400">Response protocol: POST /api/ai/query</span>
          </div>

          {/* 1. Answer Synthesis Text */}
          <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {currentResponse.answer}
          </div>

          {/* 2. Referenced Locations Cards */}
          {currentResponse.locations && currentResponse.locations.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Referenced Spatial Locations ({currentResponse.locations.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentResponse.locations.map(loc => (
                  <div
                    key={loc.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {loc.type.replace('_', ' ')}
                        </span>
                        {loc.highlightMetric && (
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {loc.highlightMetric}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{loc.name}</h4>
                    </div>

                    <button
                      onClick={() => onNavigateToMapLocation(loc.coordinates, loc.type === 'building' ? loc.id : undefined)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <span>Locate on Campus Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Highlighted Telemetry Metrics Grid */}
          {currentResponse.metrics && currentResponse.metrics.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Extracted Telemetry Metrics</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentResponse.metrics.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500">{m.label}</span>
                    <div className="text-lg font-bold text-slate-900 mt-0.5">{m.value}</div>
                    {m.change && (
                      <span
                        className={`text-[11px] font-semibold mt-1 inline-block ${
                          m.status === 'positive'
                            ? 'text-emerald-700'
                            : m.status === 'negative'
                            ? 'text-rose-700'
                            : m.status === 'warning'
                            ? 'text-amber-700'
                            : 'text-slate-600'
                        }`}
                      >
                        {m.change}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Actionable Recommendations */}
          {currentResponse.recommendations && currentResponse.recommendations.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Identified Conservation Strategies</span>
              </div>
              <div className="space-y-2">
                {currentResponse.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. System Alerts */}
          {currentResponse.alerts && currentResponse.alerts.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>Correlated Anomalies</span>
              </div>
              <div className="space-y-2">
                {currentResponse.alerts.map((alt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 text-xs text-rose-900 font-medium"
                  >
                    {alt}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Query Session History */}
      {history.length > 1 && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Session Query Log
            </span>
            <span>{history.length} Queries</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {history.map(item => (
              <div key={item.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <button
                    onClick={() => {
                      setQueryInput(item.query);
                      setCurrentResponse(item.response);
                    }}
                    className="font-semibold text-slate-800 hover:text-emerald-700 text-left transition-colors"
                  >
                    {item.query}
                  </button>
                  {item.buildingContextName && (
                    <div className="text-[10px] text-slate-400">Context: {item.buildingContextName}</div>
                  )}
                </div>
                <span className="text-slate-400 text-[11px] shrink-0 ml-3">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
