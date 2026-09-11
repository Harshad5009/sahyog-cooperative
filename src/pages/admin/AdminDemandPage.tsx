import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  Layers,
  Zap,
  Info,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import { WorkforceAdvisor } from '../../components/admin/WorkforceAdvisor';
import { HOURLY_DEMAND_FORECAST } from '../../data/mockDemand';
import { useApp } from '../../context/AppContext';

interface CategoryDemandForecast {
  category: string;
  level: 'High' | 'Medium' | 'Low';
  percentChange: string;
  expectedRequests: number;
  availableWorkers: number;
  deficit: number;
  seasonalityDriver: string;
}

export const AdminDemandPage: React.FC = () => {
  const { reallocateWorkersAction } = useApp();
  const [timeHorizon, setTimeHorizon] = useState<'today' | 'tomorrow' | '7days' | '30days'>('today');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [allocationDone, setAllocationDone] = useState(false);

  const forecastData: Record<string, CategoryDemandForecast[]> = {
    today: [
      { category: 'Plumbing & Water', level: 'High', percentChange: '+18%', expectedRequests: 142, availableWorkers: 98, deficit: 44, seasonalityDriver: 'Morning peak & high water-tank float issues' },
      { category: 'Electrical & MCB', level: 'Medium', percentChange: '+7%', expectedRequests: 110, availableWorkers: 104, deficit: 6, seasonalityDriver: 'Inverter switchover & fan balancing' },
      { category: 'Deep Cleaning', level: 'High', percentChange: '+23%', expectedRequests: 86, availableWorkers: 62, deficit: 24, seasonalityDriver: 'Weekend pre-booking surge' },
      { category: 'Carpentry & Joinery', level: 'Low', percentChange: '-3%', expectedRequests: 45, availableWorkers: 50, deficit: 0, seasonalityDriver: 'Normal scheduled wardrobe maintenance' },
      { category: 'Caregiving & Patient', level: 'High', percentChange: '+14%', expectedRequests: 58, availableWorkers: 42, deficit: 16, seasonalityDriver: 'Elderly morning routine accompaniment' },
      { category: 'Appliance Repair', level: 'Medium', percentChange: '+9%', expectedRequests: 64, availableWorkers: 58, deficit: 6, seasonalityDriver: 'AC foam pump servicing demand' },
    ],
    tomorrow: [
      { category: 'Plumbing & Water', level: 'High', percentChange: '+22%', expectedRequests: 168, availableWorkers: 110, deficit: 58, seasonalityDriver: 'Sunday household maintenance surge' },
      { category: 'Electrical & MCB', level: 'High', percentChange: '+15%', expectedRequests: 135, availableWorkers: 108, deficit: 27, seasonalityDriver: 'Heavy appliance testing' },
      { category: 'Deep Cleaning', level: 'High', percentChange: '+31%', expectedRequests: 112, availableWorkers: 70, deficit: 42, seasonalityDriver: 'Full weekend home deep scrub' },
      { category: 'Carpentry & Joinery', level: 'Medium', percentChange: '+5%', expectedRequests: 54, availableWorkers: 50, deficit: 4, seasonalityDriver: 'Modular kitchen door hinge adjust' },
      { category: 'Caregiving & Patient', level: 'Medium', percentChange: '+8%', expectedRequests: 50, availableWorkers: 46, deficit: 4, seasonalityDriver: 'Family weekend doctor escort' },
      { category: 'Appliance Repair', level: 'High', percentChange: '+18%', expectedRequests: 82, availableWorkers: 60, deficit: 22, seasonalityDriver: 'Washing machine drum drainage backlog' },
    ],
    '7days': [
      { category: 'Plumbing & Water', level: 'High', percentChange: '+19%', expectedRequests: 980, availableWorkers: 810, deficit: 170, seasonalityDriver: 'Municipal pipeline pressure variation' },
      { category: 'Electrical & MCB', level: 'Medium', percentChange: '+11%', expectedRequests: 740, availableWorkers: 720, deficit: 20, seasonalityDriver: 'Monsoon pre-wiring audits' },
      { category: 'Deep Cleaning', level: 'High', percentChange: '+28%', expectedRequests: 620, availableWorkers: 480, deficit: 140, seasonalityDriver: 'Festival celebration prep' },
      { category: 'Carpentry & Joinery', level: 'Low', percentChange: '+2%', expectedRequests: 320, availableWorkers: 340, deficit: 0, seasonalityDriver: 'Standard joinery replacements' },
      { category: 'Caregiving & Patient', level: 'Medium', percentChange: '+10%', expectedRequests: 390, availableWorkers: 360, deficit: 30, seasonalityDriver: 'Ongoing chronic patient support' },
      { category: 'Appliance Repair', level: 'High', percentChange: '+16%', expectedRequests: 490, availableWorkers: 410, deficit: 80, seasonalityDriver: 'Water geyser winter service surge' },
    ],
    '30days': [
      { category: 'Plumbing & Water', level: 'High', percentChange: '+25%', expectedRequests: 4200, availableWorkers: 3500, deficit: 700, seasonalityDriver: 'Post-monsoon drainage clearing' },
      { category: 'Electrical & MCB', level: 'Medium', percentChange: '+12%', expectedRequests: 3100, availableWorkers: 2900, deficit: 200, seasonalityDriver: 'Commercial housing society contracts' },
      { category: 'Deep Cleaning', level: 'High', percentChange: '+35%', expectedRequests: 2800, availableWorkers: 2000, deficit: 800, seasonalityDriver: 'Diwali & festive pre-cleaning' },
      { category: 'Carpentry & Joinery', level: 'Medium', percentChange: '+8%', expectedRequests: 1400, availableWorkers: 1350, deficit: 50, seasonalityDriver: 'Plywood furnishing & polishing' },
      { category: 'Caregiving & Patient', level: 'Medium', percentChange: '+9%', expectedRequests: 1600, availableWorkers: 1520, deficit: 80, seasonalityDriver: 'Geriatric rehabilitation admissions' },
      { category: 'Appliance Repair', level: 'High', percentChange: '+20%', expectedRequests: 2100, availableWorkers: 1750, deficit: 350, seasonalityDriver: 'Seasonal cooling to heating transition' },
    ],
  };

  const currentList = forecastData[timeHorizon];

  const handleDeployWorkers = () => {
    reallocateWorkersAction('Zone 3 (Bavdhan)', 'Zone 4 (Kothrud)', 6, 'Plumbing & Water');
    setAllocationDone(true);
    setTimeout(() => setAllocationDone(false), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header with Time Horizons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Predictive Resource Planning</span>
          </div>
          <h1 className="text-2xl font-black text-surface-900 font-display">
            AI Demand Forecaster & Workforce Allocation
          </h1>
          <p className="text-xs text-surface-500 max-w-xl">
            Anticipate municipal shortages, weather-driven surges, and festival rushes to pre-allocate cooperative specialists before wait times spike.
          </p>
        </div>

        {/* Time Horizon Switcher */}
        <div className="flex items-center gap-1 bg-surface-100 p-1.5 rounded-2xl border border-surface-200 text-xs self-start md:self-auto">
          {[
            { id: 'today', label: 'Today' },
            { id: 'tomorrow', label: 'Tomorrow' },
            { id: '7days', label: 'Next 7 Days' },
            { id: '30days', label: 'Next 30 Days' },
          ].map(th => (
            <button
              key={th.id}
              type="button"
              onClick={() => setTimeHorizon(th.id as any)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                timeHorizon === th.id
                  ? 'bg-coop-900 text-white shadow-xs'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              {th.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── EXPLAINABLE AI FORMULA BAR ─── */}
      <div className="bg-surface-900 text-white rounded-3xl p-5 sm:p-6 border border-surface-800 shadow-card">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-2">
          Forecasting Model Architecture (ML Regression + Society Heuristics)
        </span>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
          <span className="px-3 py-1.5 bg-surface-800 rounded-xl border border-surface-700">Historical Demand (3 Yrs)</span>
          <span className="text-emerald-400 text-base">+</span>
          <span className="px-3 py-1.5 bg-surface-800 rounded-xl border border-surface-700">Live Active Bookings</span>
          <span className="text-emerald-400 text-base">+</span>
          <span className="px-3 py-1.5 bg-surface-800 rounded-xl border border-surface-700">Weather & Seasonality</span>
          <span className="text-emerald-400 text-base">+</span>
          <span className="px-3 py-1.5 bg-surface-800 rounded-xl border border-surface-700">Ward GIS Location</span>
          <span className="text-emerald-400 text-base">=</span>
          <span className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl shadow-md font-black">
            Predicted Demand Gap
          </span>
        </div>
        <p className="text-[11px] text-surface-400 mt-3">
          Note: Production ML models consume open municipal weather radar and sensor telemetry. Demo values shown for hackathon evaluation.
        </p>
      </div>

      {/* ─── AI WORKFORCE ALLOCATION RECOMMENDATION CARD ─── */}
      <div className="bg-gradient-to-br from-emerald-50 to-coop-50/70 border-2 border-emerald-500 rounded-3xl p-6 shadow-elevated space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
            <h3 className="text-sm font-bold text-emerald-950 font-display">
              AI Recommendation: Cross-Zone Workforce Allocation
            </h3>
          </div>
          <span className="px-3 py-1 bg-emerald-200 text-emerald-900 rounded-full text-xs font-black">
            Actionable Optimization
          </span>
        </div>

        {/* Explainable Pipeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-white rounded-2xl border border-emerald-200 shadow-xs">
            <span className="text-[10px] font-bold text-rose-700 uppercase block mb-1">1. Demand Surge</span>
            <p className="font-bold text-surface-900 text-sm">Zone 4 (Kothrud)</p>
            <p className="text-surface-500 text-[11px]">+32% Plumbing surge due to morning valve maintenance</p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-emerald-200 shadow-xs">
            <span className="text-[10px] font-bold text-surface-500 uppercase block mb-1">2. Idle Workforce</span>
            <p className="font-bold text-surface-900 text-sm">Zone 3 (Bavdhan)</p>
            <p className="text-surface-500 text-[11px]">18 registered plumbers currently idle (surplus capacity)</p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-emerald-200 shadow-xs">
            <span className="text-[10px] font-bold text-emerald-700 uppercase block mb-1">3. AI Recommendation</span>
            <p className="font-bold text-emerald-900 text-sm">Deploy 6 Specialists</p>
            <p className="text-surface-500 text-[11px]">Reallocate from Bavdhan to Kothrud (transit time: 11 mins)</p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-emerald-200 shadow-xs">
            <span className="text-[10px] font-bold text-emerald-700 uppercase block mb-1">4. Expected Outcome</span>
            <p className="font-bold text-emerald-900 text-sm">Wait Time: -18 Mins</p>
            <p className="text-surface-500 text-[11px]">Fulfillment rate improves from 74% to 98%</p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-emerald-900 font-medium">
            {allocationDone ? '✓ 6 Specialists successfully notified and rerouted via SMS beacon.' : 'Awaiting federation administrative dispatch confirmation.'}
          </span>
          <button
            type="button"
            onClick={handleDeployWorkers}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Deploy 6 Additional Plumbers Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ─── CATEGORY BREAKDOWN GRID ─── */}
      <div className="bg-white rounded-3xl border border-surface-200 shadow-card p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-surface-900">
              Discipline Demand Projections ({timeHorizon.toUpperCase()})
            </h3>
            <p className="text-xs text-surface-500">
              Anticipated service request volumes vs cooperative society capacity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentList.map(item => (
            <div
              key={item.category}
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                item.level === 'High' 
                  ? 'bg-rose-50/40 border-rose-200' 
                  : item.level === 'Medium' 
                  ? 'bg-amber-50/40 border-amber-200' 
                  : 'bg-surface-50 border-surface-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-sm text-surface-900">{item.category}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    item.level === 'High' 
                      ? 'bg-rose-100 text-rose-800' 
                      : item.level === 'Medium' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-surface-200 text-surface-700'
                  }`}>
                    {item.level} Demand ({item.percentChange})
                  </span>
                </div>
                <p className="text-[11px] text-surface-500 line-clamp-1">{item.seasonalityDriver}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-surface-200/80 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-surface-500">Expected Requests:</span>
                  <span className="font-bold text-surface-900">{item.expectedRequests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Available Workers:</span>
                  <span className="font-bold text-surface-900">{item.availableWorkers}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-surface-100 font-bold">
                  <span className="text-surface-600">Capacity Deficit:</span>
                  <span className={item.deficit > 0 ? 'text-rose-600' : 'text-emerald-700'}>
                    {item.deficit > 0 ? `-${item.deficit} Workers Needed` : 'Sufficient'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── HOURLY CURVE & WORKFORCE ADVISOR ─── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
        <div>
          <h3 className="text-sm font-bold text-surface-900">
            Hourly Surge Telemetry Curve (Pune Metro Zone)
          </h3>
          <p className="text-xs text-surface-500">Predicted service requests vs active on-duty worker capacity</p>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HOURLY_DEMAND_FORECAST} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f766e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0f766e" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="availableGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} interval={2} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px', border: 'none' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="predictedDemand" name="Predicted Requests" stroke="#0f766e" strokeWidth={2.5} fill="url(#predictedGrad)" />
              <Area type="monotone" dataKey="availableWorkers" name="Available On-Duty Workers" stroke="#16a34a" strokeWidth={2.5} fill="url(#availableGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Workforce Advisor Component */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
        <WorkforceAdvisor />
      </div>

    </div>
  );
};
