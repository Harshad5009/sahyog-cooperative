import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Users, Briefcase, TrendingUp, Shield, DollarSign, AlertTriangle, Map, Sparkles, ArrowRight, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DISTRICT_WORKFORCE_STATS, SERVICE_DEMAND_DISTRIBUTION } from '../../data/mockDemand';

export const AdminDashboard: React.FC = () => {
  const { aiRecommendations } = useApp();
  const unresolvedRecs = aiRecommendations.filter(r => !r.resolved);

  const kpis = [
    { label: 'Active Workers', value: '1,240', sub: 'Across 8 societies', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: "Today's Jobs", value: '486', sub: '96.4% fulfillment', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+14%' },
    { label: 'Utilization', value: '78%', sub: 'Balanced capacity', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: "Today's Revenue", value: '₹4.82L', sub: '80% to workers', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Demand Hotspots', value: '3', sub: 'Kothrud critical', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Welfare Reserve', value: '₹38.4L', sub: 'Solvent & audited', icon: Shield, color: 'text-gray-700', bg: 'bg-gray-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-green-400 mb-1">Maharashtra Labour Federation · Pune Central</p>
          <h1 className="text-xl font-black text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Federation Command Center
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">Coordinating 1,240 verified cooperative workers across 8 Pune zones</p>
        </div>
        <Link to="/admin/map" className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors">
          <Map className="w-4 h-4" /> GIS Live Map
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className={`w-9 h-9 ${k.bg} rounded-xl flex items-center justify-center mb-3`}>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <p className="text-xl font-black text-gray-900">{k.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Bar chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Workforce by District</h2>
              <p className="text-xs text-gray-500">Active workers vs jobs today</p>
            </div>
            <Link to="/admin/analytics" className="text-xs font-semibold text-green-600 hover:underline">Full Analytics →</Link>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DISTRICT_WORKFORCE_STATS} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="district" tick={{ fontSize: 8, fill: '#6b7280' }} interval={0} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '10px', color: '#fff', fontSize: '11px', border: 'none' }} />
                <Bar dataKey="activeWorkers" name="Workers" fill="#16a34a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="jobsToday" name="Jobs" fill="#86efac" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Service Demand Split</h2>
          <p className="text-xs text-gray-500 mb-4">By category today</p>
          <div className="h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SERVICE_DEMAND_DISTRIBUTION} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {SERVICE_DEMAND_DISTRIBUTION.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '10px', color: '#fff', fontSize: '11px', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            {SERVICE_DEMAND_DISTRIBUTION.slice(0, 4).map(s => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-gray-600 truncate">{s.name} ({s.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Alerts */}
      {unresolvedRecs.length > 0 && (
        <div className="bg-white border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h2 className="text-sm font-bold text-gray-900">AI Workforce Advisor Alerts ({unresolvedRecs.length})</h2>
            </div>
            <Link to="/admin/demand" className="text-xs font-semibold text-green-600 hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unresolvedRecs.slice(0, 2).map(rec => (
              <div key={rec.id} className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-gray-900">{rec.title}</h3>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${rec.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>
                    {rec.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{rec.suggestedAction}</p>
                <Link to="/admin/demand" className="text-xs font-bold text-green-700 flex items-center gap-1 hover:underline">
                  Review & Apply <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
