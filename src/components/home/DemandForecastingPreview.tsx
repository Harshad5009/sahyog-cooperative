import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Sparkles, TrendingUp, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HOURLY_DEMAND_FORECAST } from '../../data/mockDemand';
import { Link } from 'react-router-dom';

export const DemandForecastingPreview: React.FC = () => {
  return (
    <section className="py-20 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Predictive Resource Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-coop-950 tracking-tight font-display">
              Predict Demand Before It Arrives
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-surface-500 max-w-md">
            Federation administrators leverage AI forecasting to anticipate locality surges (weather, municipal shutdowns, festival rushes) and pre-reallocate idle workers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Forecast Chart */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-surface-200 shadow-card flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-sm font-bold text-surface-900">
                  Pune Metropolitan Service Demand Curve (Kothrud & Baner)
                </h3>
                <p className="text-xs text-surface-500">
                  Saturday 08:00 AM – 08:00 PM Predicted vs Available Capacity
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                  <AlertTriangle className="w-3 h-3" />
                  Peak Gap: 34 Workers at 5 PM
                </span>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={HOURLY_DEMAND_FORECAST}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#047857" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#047857" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorAvailable" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    interval={2} 
                  />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      color: '#fff',
                      border: 'none',
                      fontSize: '12px',
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="predictedDemand"
                    name="Predicted Requests"
                    stroke="#047857"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorPredicted)"
                  />
                  <Area
                    type="monotone"
                    dataKey="availableWorkers"
                    name="Active Shift Workers"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAvailable)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-surface-100 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-surface-50 p-2 rounded-xl">
                <span className="text-[10px] text-surface-400 block font-medium">Expected Requests</span>
                <span className="text-sm font-black text-coop-950">486 Jobs</span>
              </div>
              <div className="bg-surface-50 p-2 rounded-xl">
                <span className="text-[10px] text-surface-400 block font-medium">Registered Pool</span>
                <span className="text-sm font-black text-coop-950">1,240 Workers</span>
              </div>
              <div className="bg-emerald-50 p-2 rounded-xl">
                <span className="text-[10px] text-emerald-800 block font-medium">Fulfillment Rate</span>
                <span className="text-sm font-black text-emerald-800">96.4%</span>
              </div>
            </div>
          </div>

          {/* AI Workforce Recommendation Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-coop-950 via-coop-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-elevated border border-coop-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 px-2.5 py-1 bg-emerald-900/60 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Live AI Advisory
                </span>
                <span className="text-xs text-surface-400">Sat 10:00 AM – 02:00 PM</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2 leading-tight">
                Plumbing Shortage in Kothrud Zone
              </h4>

              <p className="text-xs text-emerald-100/80 leading-relaxed mb-4">
                Water valve maintenance in Kothrud will generate an estimated <strong>45 requests</strong> with only <strong>28 available plumbers</strong> scheduled.
              </p>

              <div className="space-y-2 bg-coop-900/60 p-3 rounded-2xl border border-coop-800 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-surface-300">Expected Gap:</span>
                  <span className="font-bold text-rose-300">17 Worker Deficit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-300">Surplus Zone:</span>
                  <span className="font-bold text-emerald-300">Shivajinagar & Warje (8 Idle)</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/80 rounded-2xl border border-emerald-500/30 text-xs text-emerald-200 mb-4 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>AI Action:</strong> Temporarily allocate 5 nearby certified plumbers to Kothrud cluster to maintain &lt;20 min response time.
                </span>
              </div>
            </div>

            <Link
              to="/admin/map"
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-surface-950 font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Review & Deploy on Federation Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
