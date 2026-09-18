import React, { useState, useEffect } from 'react';
import {
  Map,
  Activity,
  Sparkles,
  Sliders,
  Leaf,
  Wifi,
  WifiOff,
  Server,
  ChevronRight,
  Menu,
  X,
  Compass,
} from 'lucide-react';
import { getMockMode, setMockMode, subscribeApiStatus, API_BASE_URL } from '../../services/api';

export type TabType = 'campus' | 'monitor' | 'ai' | 'simulate';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  sustainabilityScore?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  sustainabilityScore = 86,
}) => {
  const [useMock, setUseMock] = useState(getMockMode());
  const [liveStatus, setLiveStatus] = useState<'connected' | 'offline' | 'untested'>('untested');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    return subscribeApiStatus((mock, status) => {
      setUseMock(mock);
      setLiveStatus(status);
    });
  }, []);

  const handleToggleMock = () => {
    const nextVal = !useMock;
    setUseMock(nextVal);
    setMockMode(nextVal);
  };

  const navItems = [
    { id: 'campus' as TabType, label: 'Campus', icon: Map, badge: 'Interactive Map' },
    { id: 'monitor' as TabType, label: 'Monitor', icon: Activity, badge: 'Telemetry' },
    { id: 'ai' as TabType, label: 'Ask AI', icon: Sparkles, badge: 'Campus Intel' },
    { id: 'simulate' as TabType, label: 'Simulate', icon: Sliders, badge: 'What-If Engine' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('campus')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-slate-900 tracking-tight">MACE EcoTwin</span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200/60">
                    Live Twin
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">Mar Athanasius College of Engineering, Kothamangalam</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/70">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Status Controls: Score Pill + Mock/API Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Sustainability Score Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/70 text-emerald-900">
              <Compass className="w-4 h-4 text-emerald-600" />
              <div className="text-xs">
                <span className="font-medium text-slate-600 mr-1">Campus Score:</span>
                <span className="font-bold text-emerald-700">{sustainabilityScore}</span>
                <span className="text-slate-400 text-[10px]">/100</span>
              </div>
            </div>

            {/* API Mode Selector Switch */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <button
                type="button"
                onClick={handleToggleMock}
                title={`Click to switch between Mock API and Real Backend API (${API_BASE_URL})`}
                className="flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors hover:bg-slate-50 focus:outline-none"
                style={{
                  borderColor: useMock ? '#e2e8f0' : liveStatus === 'connected' ? '#86efac' : '#fca5a5',
                  backgroundColor: useMock ? '#f8fafc' : liveStatus === 'connected' ? '#f0fdf4' : '#fef2f2',
                }}
              >
                {useMock ? (
                  <>
                    <Server className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-700">Mock Mode</span>
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                  </>
                ) : (
                  <>
                    {liveStatus === 'connected' ? (
                      <>
                        <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-800">Live API</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3.5 h-3.5 text-rose-500" />
                        <span className="text-rose-700">Backend Offline</span>
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">API Connection:</span>
            <button
              onClick={handleToggleMock}
              className="px-2.5 py-1 rounded border border-slate-200 bg-slate-50 text-slate-700 font-medium"
            >
              {useMock ? 'Using Mock Data (Switch)' : 'Targeting Live API'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
