import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Wallet, TrendingUp, Calendar, CheckCircle2, RefreshCw, Loader2, Building2, Shield, Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const WorkerEarningsPage: React.FC = () => {
  const { bookings, fetchBookings, workerProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const load = async () => { setLoading(true); await fetchBookings(); setLoading(false); };
  useEffect(() => { load(); }, []);

  const completed = bookings.filter(b => b.status === 'COMPLETED');
  const totalEarnings = completed.reduce((s: number, b: any) => s + (b.workerEarnings ?? 0), 0);
  const totalWelfare = completed.reduce((s: number, b: any) => s + (b.welfareContribution ?? 0), 0);
  const totalCoop = completed.reduce((s: number, b: any) => s + (b.cooperativeFund ?? 0), 0);
  const totalRevenue = completed.reduce((s: number, b: any) => s + (b.totalAmount ?? 0), 0);

  // Monthly chart data from bookings
  const monthlyMap: Record<string, number> = {};
  completed.forEach((b: any) => {
    if (!b.scheduledDate) return;
    const month = b.scheduledDate.slice(0, 7); // YYYY-MM
    monthlyMap[month] = (monthlyMap[month] ?? 0) + (b.workerEarnings ?? 0);
  });
  const chartData = Object.entries(monthlyMap).sort().slice(-6).map(([month, earnings]) => ({
    month: new Date(month + '-01').toLocaleString('default', { month: 'short' }),
    earnings,
  }));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-surface-900 font-display">My Earnings</h1>
          <p className="text-xs text-surface-500 mt-0.5">Real earnings from completed jobs</p>
        </div>
        <button onClick={load} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-coop-900 text-white text-xs font-bold rounded-xl hover:bg-coop-800 disabled:opacity-60 transition-colors">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Earned', value: `₹${totalEarnings.toLocaleString()}`, sub: '80% of billings', icon: Wallet, color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'Welfare Credit', value: `₹${totalWelfare.toLocaleString()}`, sub: '10% to fund', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Coop Capital', value: `₹${totalCoop.toLocaleString()}`, sub: '5% society', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Jobs Done', value: completed.length, sub: `Rating ${workerProfile?.ratingAverage?.toFixed(1) ?? '—'}★`, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
              <div className={`w-8 h-8 ${s.bg} rounded-xl flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-lg font-black text-surface-900">{loading ? '…' : s.value}</p>
              <p className="text-xs font-bold text-surface-700 mt-0.5">{s.label}</p>
              <p className="text-[10px] text-surface-400">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="bg-white border border-surface-200 rounded-3xl p-5 shadow-card">
          <h2 className="text-sm font-bold text-surface-900 mb-4">Monthly Earnings Trend</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '11px', border: 'none' }} formatter={(v: any) => [`₹${v}`, 'Earnings']} />
                <Bar dataKey="earnings" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Transaction list */}
      <div className="bg-white border border-surface-200 rounded-3xl shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-100">
          <h2 className="text-sm font-bold text-surface-900">Completed Job History</h2>
        </div>
        {completed.length === 0 ? (
          <div className="text-center py-10 text-surface-400 text-xs">No completed jobs yet</div>
        ) : (
          <div className="divide-y divide-surface-50">
            {completed.map((b: any) => (
              <div key={b._id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-surface-900">{b.serviceCategory}</p>
                  <p className="text-[10px] text-surface-400 font-mono">{b.bookingNumber} · {b.scheduledDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-700">₹{b.workerEarnings}</p>
                  <p className="text-[10px] text-surface-400">of ₹{b.totalAmount}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
