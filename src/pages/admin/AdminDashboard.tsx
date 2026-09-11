import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  UserCheck, 
  Activity, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  AlertTriangle, 
  Map, 
  Sparkles, 
  ArrowRight, 
  BarChart3, 
  Siren, 
  Star,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DISTRICT_WORKFORCE_STATS, SERVICE_DEMAND_DISTRIBUTION } from '../../data/mockDemand';

export const AdminDashboard: React.FC = () => {
  const { aiRecommendations, bookings } = useApp();
  const unresolvedRecs = aiRecommendations.filter(r => !r.resolved);
  const activeEmergencyBookings = bookings.filter(b => b.isEmergency && b.status !== 'completed' && b.status !== 'cancelled');

  // 10 Official Required KPIs
  const tenKpis = [
    { label: 'Total Workers', value: '1,240', sub: '8 Cooperative Societies', icon: Users, color: 'text-coop-700', bg: 'bg-coop-50' },
    { label: 'Verified Workers', value: '1,180', sub: '95.1% KYC & NSDC Certified', icon: UserCheck, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Active On-Duty', value: '890', sub: 'Currently logged in', icon: Activity, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Total Customers', value: '14,250', sub: '+18% MoM growth', icon: Users, color: 'text-purple-700', bg: 'bg-purple-50' },
    { label: 'Active Bookings', value: '38', sub: '12 en route right now', icon: Briefcase, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Completed Services', value: '52,400', sub: '99.2% fulfillment rate', icon: CheckCircle2, color: 'text-emerald-800', bg: 'bg-emerald-50' },
    { label: 'Emergency Requests', value: activeEmergencyBookings.length ? `${activeEmergencyBookings.length} Active` : '4 Active', sub: '14-min avg response', icon: Siren, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Worker Direct Pay', value: '₹3.84 Cr', sub: '80% net take-home', icon: DollarSign, color: 'text-emerald-800', bg: 'bg-emerald-50' },
    { label: 'Coop Revenue', value: '₹48.2 L', sub: '10% society capital reserve', icon: Building2, color: 'text-coop-800', bg: 'bg-coop-50' },
    { label: 'Customer Satisfaction', value: '4.9 ★', sub: 'From 18,400+ verified ratings', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Federation Command Header */}
      <div className="bg-surface-900 rounded-3xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-surface-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Maharashtra State Labour Federation • Pune Metropolitan Command
            </p>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-display">
            Federation Central Command Center
          </h1>
          <p className="text-xs sm:text-sm text-surface-400 mt-1">
            Democratic oversight of 8 registered primary societies, 1,240 verified specialists, and live GIS emergency dispatches.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link 
            to="/admin/map" 
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-surface-950 font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Map className="w-4 h-4" />
            <span>Live GIS Radar</span>
          </Link>
          <Link 
            to="/admin/demand" 
            className="px-4 py-2.5 bg-surface-800 hover:bg-surface-700 text-white font-bold text-xs rounded-xl transition-all border border-surface-700 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI Demand Forecaster</span>
          </Link>
        </div>
      </div>

      {/* 10 KPIs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {tenKpis.map(k => {
          const IconComp = k.icon;
          return (
            <div key={k.label} className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
              <div className={`w-8 h-8 ${k.bg} rounded-xl flex items-center justify-center mb-2.5`}>
                <IconComp className={`w-4 h-4 ${k.color}`} />
              </div>
              <span className="text-lg sm:text-xl font-black text-surface-900 font-display block leading-tight">
                {k.value}
              </span>
              <p className="text-xs font-bold text-surface-800 mt-1">{k.label}</p>
              <p className="text-[10px] text-surface-400 mt-0.5">{k.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Workforce Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-surface-200 rounded-3xl p-5 sm:p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-surface-900">Workforce & Job Volume by Municipal Zone</h2>
              <p className="text-xs text-surface-500">Active verified workers vs completed orders today</p>
            </div>
            <Link to="/admin/analytics" className="text-xs font-bold text-coop-800 hover:underline flex items-center gap-1">
              <span>Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DISTRICT_WORKFORCE_STATS} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="district" tick={{ fontSize: 9, fill: '#64748b' }} interval={0} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '11px', border: 'none' }} />
                <Bar dataKey="activeWorkers" name="Workers" fill="#0f766e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="jobsToday" name="Jobs Done" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demand Share Pie Chart */}
        <div className="bg-white border border-surface-200 rounded-3xl p-5 sm:p-6 shadow-card flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-surface-900 mb-0.5">Service Category Share</h2>
            <p className="text-xs text-surface-500 mb-3">Live request volume breakdown</p>
          </div>
          <div className="h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SERVICE_DEMAND_DISTRIBUTION} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {SERVICE_DEMAND_DISTRIBUTION.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '11px', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[10px] pt-2 border-t border-surface-100">
            {SERVICE_DEMAND_DISTRIBUTION.slice(0, 4).map(s => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-surface-700 truncate">{s.name} ({s.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency & AI Reallocation Quick Alerts */}
      <div className="p-5 bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 rounded-3xl border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-600 text-white rounded-2xl shadow-md shrink-0">
            <Siren className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-surface-900">
              Live Priority Dispatch Channel Active
            </h3>
            <p className="text-xs text-surface-600">
              {activeEmergencyBookings.length} emergency requests logged. Average response: 14 minutes. Zero SLA breaches recorded today.
            </p>
          </div>
        </div>

        <Link
          to="/admin/bookings"
          className="px-4 py-2 bg-surface-900 hover:bg-surface-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
        >
          View Bookings Queue →
        </Link>
      </div>

    </div>
  );
};
