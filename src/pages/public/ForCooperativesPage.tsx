import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, ShieldCheck, BarChart3, Scale, BookOpen } from 'lucide-react';

const FEATURES = [
  { icon: BarChart3, title: 'AI Demand Forecasting', desc: 'Predict workforce shortages before they happen. Our model forecasts hourly demand by district and service category.' },
  { icon: Scale, title: 'Gini Fair Allocation', desc: 'Workload distributed with a Gini coefficient of 0.18 — ensuring every member gets fair, consistent work.' },
  { icon: ShieldCheck, title: 'Digital Welfare Vault', desc: 'Manage the collective insurance pool, training subsidies, and emergency advance claims in one dashboard.' },
  { icon: Users, title: 'GIS Workforce Map', desc: 'Real-time geographic view of all active workers, demand hotspots, and automatic reallocation recommendations.' },
];

export const ForCooperativesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-900 py-16 px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">For Cooperative Federations</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          AI-Powered Federation Management
        </h1>
        <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8">
          Sahyog gives cooperative societies the digital tools to manage workers, forecast demand, ensure welfare compliance, and scale with technology.
        </p>
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors">
          View Admin Demo <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-green-600 rounded-3xl p-8 text-center text-white">
          <h2 className="text-xl font-black mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Register Your Cooperative Society
          </h2>
          <p className="text-green-100 text-sm mb-6">Onboarding is free for registered Maharashtra cooperative societies.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors">
            Apply for Federation Membership <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
