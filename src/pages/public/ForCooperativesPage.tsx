import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Scale, ShieldCheck, Users, Building2, Sprout, TrendingUp } from 'lucide-react';

const FEATURES = [
  { icon: BarChart3, title: 'AI Demand Forecasting', desc: 'Predict workforce shortages before they happen. Our model forecasts hourly demand by district and service category.', bg: 'bg-teal-50', color: 'text-teal-700' },
  { icon: Scale, title: 'Gini Fair Allocation', desc: 'Workload distributed with a Gini coefficient of 0.18 — ensuring every member gets fair, consistent work.', bg: 'bg-blue-50', color: 'text-blue-700' },
  { icon: ShieldCheck, title: 'Digital Welfare Vault', desc: 'Manage the collective insurance pool, training subsidies, and emergency advance claims in one dashboard.', bg: 'bg-emerald-50', color: 'text-emerald-700' },
  { icon: Users, title: 'GIS Workforce Map', desc: 'Real-time geographic view of all active workers, demand hotspots, and automatic reallocation recommendations.', bg: 'bg-indigo-50', color: 'text-indigo-700' },
];

const STATS = [
  { value: '12', label: 'Partner Cooperatives', icon: Building2 },
  { value: '2,500+', label: 'Member Workers', icon: Users },
  { value: '₹2.4Cr', label: 'Monthly Wages Paid', icon: TrendingUp },
  { value: '98%', label: 'Service Completion', icon: ShieldCheck },
];

export const ForCooperativesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-teal-950 py-16 px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-800 border border-teal-700 rounded-full text-xs font-bold text-teal-200 mb-4">
          <Building2 className="w-3.5 h-3.5" />
          <span>For Cooperative Federations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 font-display">
          AI-Powered Federation Management
        </h1>
        <p className="text-base text-teal-300 max-w-2xl mx-auto mb-8">
          Sahyog gives cooperative societies the digital tools to manage workers, forecast demand, ensure welfare compliance, and scale with technology.
        </p>
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-teal-900/40">
          View Admin Demo <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Row */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="text-center bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <Icon className="w-5 h-5 text-teal-700 mx-auto mb-2" />
                <p className="text-xl font-black text-gray-900 font-display">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-10 font-display">
          Platform Capabilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {FEATURES.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-teal-300 transition-all">
                <div className={`w-10 h-10 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-display">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA card */}
        <div className="bg-teal-950 rounded-3xl p-8 text-center text-white border border-teal-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-teal-700 rounded-2xl flex items-center justify-center">
                <Sprout className="w-6 h-6 text-emerald-300" />
              </div>
            </div>
            <h2 className="text-xl font-black mb-3 font-display">
              Register Your Cooperative Society
            </h2>
            <p className="text-teal-300 text-sm mb-6">Onboarding is free for registered Maharashtra cooperative societies.</p>
            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-800 font-bold rounded-xl hover:bg-teal-50 transition-colors shadow-md">
              Apply for Federation Membership <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
