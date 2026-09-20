import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Wallet, TrendingUp, CheckCircle2, Clock, AlertCircle, RefreshCw, Loader2,
  ArrowUpRight, ChevronDown, ChevronUp, Shield, Building2
} from 'lucide-react';

const PAYMENT_META: Record<string, { label: string; color: string; dot: string }> = {
  PAYMENT_PENDING: { label: 'Pending', color: 'text-gray-500', dot: 'bg-gray-400' },
  PAYMENT_HELD: { label: 'Protected/Held', color: 'text-amber-600', dot: 'bg-amber-400' },
  ADDITIONAL_REQUESTED: { label: 'Extra Amount Requested', color: 'text-orange-600', dot: 'bg-orange-400' },
  PAYMENT_RELEASED: { label: 'Released', color: 'text-emerald-600', dot: 'bg-emerald-400' },
  REFUND_INITIATED: { label: 'Refund Initiated', color: 'text-red-500', dot: 'bg-red-400' },
  REFUND_COMPLETED: { label: 'Refund Completed', color: 'text-pink-600', dot: 'bg-pink-400' },
};

export const CustomerPaymentsPage: React.FC = () => {
  const { bookings, fetchBookings } = useAuth();
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => { setLoading(true); await fetchBookings(); setLoading(false); };
  useEffect(() => { load(); }, []);

  const totalSpent = bookings.filter(b => b.status === 'COMPLETED').reduce((sum: number, b: any) => sum + (b.totalAmount ?? 0), 0);
  const pending = bookings.filter(b => b.paymentStatus === 'PAYMENT_PENDING').length;
  const held = bookings.filter(b => b.paymentStatus === 'PAYMENT_HELD').length;
  const released = bookings.filter(b => b.paymentStatus === 'PAYMENT_RELEASED').length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-surface-900 font-display">Payments</h1>
          <p className="text-xs text-surface-500 mt-0.5">Transparent payment tracking from SAHYOG platform</p>
        </div>
        <button onClick={load} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-coop-900 text-white text-xs font-bold rounded-xl hover:bg-coop-800 disabled:opacity-60 transition-colors">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, icon: Wallet, color: 'text-coop-700', bg: 'bg-coop-50' },
          { label: 'Pending', value: pending, icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100' },
          { label: 'Held/Protected', value: held, icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Released', value: released, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
              <div className={`w-8 h-8 ${s.bg} rounded-xl flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-lg font-black text-surface-900">{loading ? '…' : s.value}</p>
              <p className="text-[10px] text-surface-400 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Cooperative Payment Explainer */}
      <div className="bg-gradient-to-r from-emerald-50 to-coop-50 border border-emerald-200 rounded-2xl p-4 text-xs">
        <p className="font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
          <Building2 className="w-4 h-4" /> Cooperative Payment Split (Every Booking)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { pct: '80%', label: 'Worker Earnings', color: 'text-emerald-700 bg-emerald-100' },
            { pct: '10%', label: 'Worker Welfare', color: 'text-blue-700 bg-blue-100' },
            { pct: '5%', label: 'Cooperative Fund', color: 'text-purple-700 bg-purple-100' },
            { pct: '5%', label: 'Platform Ops', color: 'text-amber-700 bg-amber-100' },
          ].map(s => (
            <div key={s.label} className={`${s.color} rounded-xl p-2 text-center`}>
              <p className="text-base font-black">{s.pct}</p>
              <p className="text-[9px] font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      {loading && bookings.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-surface-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />Loading transactions…
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12 text-surface-400 text-sm">No transactions yet</div>
      ) : (
        <div className="bg-white border border-surface-200 rounded-3xl shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-surface-100">
            <h2 className="text-sm font-bold text-surface-900">Transaction History</h2>
          </div>
          <div className="divide-y divide-surface-50">
            {bookings.map((b: any) => {
              const pm = PAYMENT_META[b.paymentStatus] ?? { label: b.paymentStatus, color: 'text-gray-500', dot: 'bg-gray-400' };
              const isOpen = expanded === b._id;
              return (
                <div key={b._id}>
                  <button onClick={() => setExpanded(isOpen ? null : b._id)}
                    className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-surface-50 transition-colors text-left">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${pm.dot}`} />
                      <div>
                        <p className="text-xs font-bold text-surface-900">{b.serviceCategory}</p>
                        <p className="text-[10px] text-surface-400 font-mono">{b.bookingNumber} · {b.scheduledDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`text-xs font-bold ${pm.color}`}>{pm.label}</p>
                        <p className="text-sm font-black text-surface-900">₹{b.totalAmount}</p>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-surface-400" /> : <ChevronDown className="w-4 h-4 text-surface-400" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 bg-surface-50 space-y-2">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        {[
                          ['Base Charge', `₹${b.baseServiceCharge}`],
                          ['Labour', `₹${b.labourCharge}`],
                          ['Material', `₹${b.materialCharge}`],
                          ['Travel', `₹${b.travelCharge}`],
                          ['Worker Share (80%)', `₹${b.workerEarnings}`],
                          ['Welfare (10%)', `₹${b.welfareContribution}`],
                          ['Coop Fund (5%)', `₹${b.cooperativeFund}`],
                          ['Platform (5%)', `₹${b.platformOperations}`],
                        ].map(([l, v]) => (
                          <div key={l} className="flex justify-between text-surface-600 py-0.5 border-b border-surface-100">
                            <span>{l}</span><span className="font-semibold">{v}</span>
                          </div>
                        ))}
                      </div>
                      {b.paymentStatus === 'ADDITIONAL_REQUESTED' && (
                        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-800">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>Worker has requested an additional amount. Go to <strong>My Bookings</strong> to approve or reject.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
