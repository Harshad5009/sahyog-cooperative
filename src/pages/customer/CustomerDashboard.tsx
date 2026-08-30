import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, BookOpen, Clock, Star, TrendingUp, Users, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerDashboard: React.FC = () => {
  const { bookings } = useApp();
  const activeBookings = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Good morning, Priya 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Your cooperative service hub — Kothrud, Pune</p>
        </div>
        <Link
          to="/customer/book"
          className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors"
        >
          Book a Service <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: bookings.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Services', value: activeBookings.length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Completed', value: completedBookings.length, icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Avg Rating Given', value: '4.8 ★', icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-xl font-black text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Active Bookings */}
      {activeBookings.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Active Service Dispatches
          </h2>
          <div className="space-y-3">
            {activeBookings.map(bk => (
              <div key={bk.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl gap-4">
                <div className="flex items-center gap-3">
                  <img src={bk.assignedWorker?.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-green-200" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{bk.subServiceName}</p>
                    <p className="text-xs text-gray-500">{bk.assignedWorker?.name} · {bk.address.area}</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-green-600 text-white rounded-full whitespace-nowrap">
                  {bk.status.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Book Service', icon: '🔧', to: '/customer/book', color: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' },
            { label: 'My Bookings', icon: '📋', to: '/customer/bookings', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
            { label: 'Payments', icon: '💳', to: '/customer/payments', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' },
            { label: 'My Profile', icon: '👤', to: '/customer/profile', color: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100' },
          ].map(a => (
            <Link key={a.label} to={a.to} className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center text-xs font-semibold transition-colors ${a.color}`}>
              <span className="text-2xl">{a.icon}</span>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Completed */}
      {completedBookings.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">Recent Services</h2>
            <Link to="/customer/bookings" className="text-xs font-semibold text-green-600 hover:underline">View All</Link>
          </div>
          <div className="space-y-2">
            {completedBookings.slice(0, 3).map(bk => (
              <div key={bk.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <img src={bk.assignedWorker?.avatar} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{bk.subServiceName}</p>
                    <p className="text-[10px] text-gray-500">{bk.date} · {bk.assignedWorker?.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900">₹{bk.paymentBreakdown.totalAmount}</p>
                  <span className="text-[10px] text-green-600 font-semibold">Paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cooperative banner */}
      <div className="bg-gray-900 rounded-2xl p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-white mb-1">Your booking supports cooperative workers</p>
          <p className="text-xs text-gray-400">Every ₹100 paid: ₹80 to worker, ₹5 welfare, ₹10 cooperative, ₹5 ops</p>
        </div>
        <Link to="/how-it-works" className="shrink-0 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-colors">
          Learn More
        </Link>
      </div>
    </div>
  );
};
