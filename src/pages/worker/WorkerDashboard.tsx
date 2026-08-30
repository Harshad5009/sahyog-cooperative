import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2, Phone, Navigation, Star, Shield, Award, Wallet } from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const { activeWorker, bookings, updateBookingStatus } = useApp();
  const activeJobs = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
  const todayEarned = bookings.filter(b => b.status === 'completed').reduce((a, b) => a + b.paymentBreakdown.workerEarnings, 0) + 800;

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={activeWorker.avatar} alt={activeWorker.name} className="w-12 h-12 rounded-xl object-cover border border-gray-200" />
          <div>
            <h1 className="text-base font-black text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Good morning, {activeWorker.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs text-gray-500">{activeWorker.cooperativeSociety.split('(')[0].trim()}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-semibold text-green-600">Online & Available</span>
            </div>
          </div>
        </div>
        <Link to="/worker/jobs" className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors">
          View Job Queue ({activeJobs.length}) <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Today's Earnings", value: `₹${todayEarned}`, icon: Wallet, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Customer Rating', value: `${activeWorker.rating} ★`, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Reliability Score', value: `${activeWorker.reliabilityScore}%`, icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pension Reserve', value: `₹${(activeWorker.welfare.pensionFundBalance/1000).toFixed(1)}k`, icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-lg font-black text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Active Job Card */}
      {activeJobs.length > 0 ? (
        <div className="bg-white border-2 border-green-300 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h2 className="text-sm font-bold text-gray-900">Active Job Dispatch</h2>
            <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">#{activeJobs[0].bookingNumber}</span>
            <span className="ml-auto text-xs font-bold px-2.5 py-1 bg-green-100 text-green-800 rounded-full">
              {activeJobs[0].status.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Service & Customer</p>
              <p className="font-bold text-gray-900">{activeJobs[0].subServiceName}</p>
              <p className="text-xs text-gray-600">{activeJobs[0].customerName} · {activeJobs[0].customerPhone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Location</p>
              <p className="font-semibold text-gray-800">{activeJobs[0].address.street}</p>
              <p className="text-xs text-gray-500">{activeJobs[0].address.area} · ~2.1 km</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Your Payout</p>
              <p className="text-xl font-black text-green-700">₹{activeJobs[0].paymentBreakdown.workerEarnings}</p>
              <p className="text-xs text-gray-400">+ ₹{activeJobs[0].paymentBreakdown.welfareInsurance} welfare</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 mb-4">
            <span className="font-semibold">Customer Issue: </span>
            "{activeJobs[0].problemDescription}"
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
            <a href={`tel:${activeJobs[0].customerPhone}`} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg">
              <Phone className="w-3.5 h-3.5" /> Call Customer
            </a>
            <button onClick={() => alert('Opening maps navigation...')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg">
              <Navigation className="w-3.5 h-3.5" /> Navigate
            </button>
            <button
              onClick={() => updateBookingStatus(activeJobs[0].id, 'completed')}
              className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Mark Completed & Release Payout
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm font-bold text-green-800">All jobs completed!</p>
          <p className="text-xs text-green-600 mt-1">You are online and ready for new cooperative allocations.</p>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/worker/skills" className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-green-300 hover:shadow-sm transition-all">
          <Award className="w-5 h-5 text-amber-600 mb-2" />
          <p className="text-sm font-bold text-gray-900">Digital Skill Passport</p>
          <p className="text-xs text-gray-500 mt-1">3 NSDC verified credentials</p>
          <p className="text-xs font-semibold text-green-600 mt-3">View Passport →</p>
        </Link>
        <Link to="/worker/welfare" className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-sm transition-all">
          <Shield className="w-5 h-5 text-blue-600 mb-2" />
          <p className="text-sm font-bold text-gray-900">Welfare Vault</p>
          <p className="text-xs text-gray-500 mt-1">₹5 Lakh insurance active</p>
          <p className="text-xs font-semibold text-blue-600 mt-3">Manage Welfare →</p>
        </Link>
      </div>
    </div>
  );
};
