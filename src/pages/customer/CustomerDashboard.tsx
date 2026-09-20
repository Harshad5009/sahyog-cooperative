import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Plus, Briefcase, Clock, CheckCircle2, ArrowRight,
  Star, MapPin, Loader2, RefreshCw, Siren, ShieldCheck
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { bookings, fetchBookings, authUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const load = async () => { setLoading(true); await fetchBookings(); setLoading(false); };
  useEffect(() => { load(); }, []);

  const active = bookings.filter(b => !['COMPLETED','CANCELLED'].includes(b.status));
  const completed = bookings.filter(b => b.status === 'COMPLETED');
  const pending = bookings.filter(b => b.paymentStatus === 'PAYMENT_PENDING');

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-coop-900 via-coop-800 to-emerald-900 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider mb-1">SAHYOG Customer Portal</p>
            <h1 className="text-xl font-black font-display">
              Namaste, {authUser?.name ?? 'Customer'} 👋
            </h1>
            <p className="text-sm text-emerald-200/80 mt-1">Your trusted cooperative service network is ready.</p>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-emerald-300" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: 'Active', value: active.length, color: 'bg-white/10' },
            { label: 'Completed', value: completed.length, color: 'bg-white/10' },
            { label: 'Pending Pay', value: pending.length, color: pending.length > 0 ? 'bg-amber-500/30' : 'bg-white/10' },
          ].map(s => (
            <div key={s.label} className={`${s.color} rounded-2xl p-3 text-center`}>
              <p className="text-xl font-black">{loading ? '…' : s.value}</p>
              <p className="text-[10px] text-white/70 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Book Service', icon: Plus, to: '/customer/book', color: 'bg-coop-900 text-white', text: 'text-white' },
          { label: 'My Bookings', icon: Briefcase, to: '/customer/bookings', color: 'bg-white border border-surface-200', text: 'text-coop-800' },
          { label: 'Payments', icon: Clock, to: '/customer/payments', color: 'bg-white border border-surface-200', text: 'text-coop-800' },
          { label: 'Emergency', icon: Siren, to: '/emergency', color: 'bg-red-600 text-white', text: 'text-white' },
        ].map(a => {
          const Icon = a.icon;
          return (
            <Link key={a.label} to={a.to}
              className={`${a.color} rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5`}>
              <Icon className={`w-5 h-5 ${a.text}`} />
              <span className={`text-xs font-bold ${a.text}`}>{a.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Active Bookings */}
      {active.length > 0 && (
        <div className="bg-white border border-surface-200 rounded-3xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
            <h2 className="text-sm font-black text-surface-900 font-display">Active Bookings</h2>
            <Link to="/customer/bookings" className="text-xs font-bold text-coop-700 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-surface-50">
            {active.slice(0, 3).map((b: any) => (
              <div key={b._id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-surface-900 font-mono">{b.bookingNumber}</p>
                  <p className="text-sm font-semibold text-surface-700">{b.serviceCategory}</p>
                  <div className="flex items-center gap-2 text-[10px] text-surface-400 mt-1">
                    <MapPin className="w-3 h-3" />{b.address?.area}
                    <Clock className="w-3 h-3 ml-1" />{b.scheduledDate}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    b.status === 'IN_PROGRESS' ? 'bg-purple-100 text-purple-700' :
                    b.status === 'EN_ROUTE' ? 'bg-cyan-100 text-cyan-700' :
                    b.status === 'ALLOCATED' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>{b.status?.replace(/_/g,' ')}</span>
                  <p className="text-sm font-black text-surface-900 mt-1">₹{b.totalAmount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Completed */}
      {completed.length > 0 && (
        <div className="bg-white border border-surface-200 rounded-3xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
            <h2 className="text-sm font-black text-surface-900 font-display">Completed Services</h2>
            <Link to="/customer/bookings" className="text-xs font-bold text-coop-700 hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-surface-50">
            {completed.slice(0, 3).map((b: any) => (
              <div key={b._id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-surface-800">{b.serviceCategory}</p>
                  <p className="text-[10px] text-surface-400">{b.scheduledDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-600">₹{b.totalAmount}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {bookings.length === 0 && !loading && (
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-coop-100 flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8 text-coop-700" />
          </div>
          <div>
            <h3 className="text-base font-black text-surface-900 font-display">No bookings yet</h3>
            <p className="text-xs text-surface-400 mt-1">Book your first cooperative service today</p>
          </div>
          <Link to="/customer/book"
            className="inline-flex items-center gap-2 px-6 py-3 bg-coop-900 text-white text-sm font-bold rounded-2xl hover:bg-coop-800 transition-colors shadow-md">
            <Plus className="w-4 h-4" />Book a Service
          </Link>
        </div>
      )}
    </div>
  );
};
