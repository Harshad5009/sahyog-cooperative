import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  CheckCircle2, Clock, AlertTriangle, Filter, Search,
  RefreshCw, Briefcase, Phone, MapPin, Star, Loader2,
  ChevronLeft, ChevronRight, Eye
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  PENDING_MATCH: 'bg-gray-100 text-gray-600',
  ALLOCATED: 'bg-amber-100 text-amber-700',
  ACCEPTED_BY_WORKER: 'bg-blue-100 text-blue-700',
  EN_ROUTE: 'bg-cyan-100 text-cyan-700',
  ARRIVED: 'bg-indigo-100 text-indigo-700',
  IN_PROGRESS: 'bg-violet-100 text-violet-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-600',
  DISPUTED: 'bg-orange-100 text-orange-700',
  REFUNDED: 'bg-pink-100 text-pink-700',
};

const PAYMENT_COLORS: Record<string, string> = {
  PAYMENT_PENDING: 'text-gray-500',
  PAYMENT_HELD: 'text-amber-600',
  ADDITIONAL_REQUESTED: 'text-orange-600',
  PAYMENT_RELEASED: 'text-emerald-600',
  REFUND_INITIATED: 'text-red-500',
  REFUND_COMPLETED: 'text-pink-600',
};

export const AdminBookingsPage: React.FC = () => {
  const { adminBookings, fetchAdminBookings } = useAuth();
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = async (p = page, s = filterStatus) => {
    setLoading(true);
    await fetchAdminBookings(p, s || undefined);
    setLoading(false);
  };

  useEffect(() => { load(1); }, []);

  const filtered = adminBookings.filter(b =>
    !search || b.bookingNumber?.toLowerCase().includes(search.toLowerCase()) ||
    b.serviceCategory?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-surface-900 font-display">Bookings Management</h1>
          <p className="text-xs text-surface-500 mt-0.5">Live bookings from MongoDB · {adminBookings.length} loaded</p>
        </div>
        <button onClick={() => load(1)} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-coop-900 text-white text-xs font-bold rounded-xl hover:bg-coop-800 disabled:opacity-60 transition-colors">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search booking number or category…"
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-surface-200 rounded-xl focus:outline-none focus:border-coop-600" />
        </div>
        <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); load(1, e.target.value); }}
          className="px-3 py-2.5 text-xs bg-white border border-surface-200 rounded-xl focus:outline-none focus:border-coop-600 cursor-pointer">
          <option value="">All Statuses</option>
          {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading && adminBookings.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-surface-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />Loading bookings…
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-surface-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-surface-100 bg-surface-50">
                  {['Booking #', 'Service', 'Date', 'Status', 'Payment', 'Amount', 'Worker Share'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-bold text-surface-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-surface-400">No bookings found</td></tr>
                ) : filtered.map((b: any) => (
                  <tr key={b._id} className="border-b border-surface-50 hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-surface-900">{b.bookingNumber}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-surface-800">{b.serviceCategory}</p>
                      <p className="text-surface-400 truncate max-w-[120px]">{b.subServiceName}</p>
                    </td>
                    <td className="px-4 py-3 text-surface-600 whitespace-nowrap">{b.scheduledDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full font-bold text-[10px] ${STATUS_COLORS[b.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {b.status?.replace(/_/g,' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${PAYMENT_COLORS[b.paymentStatus] ?? 'text-gray-500'}`}>
                        {b.paymentStatus?.replace(/_/g,' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-surface-900">₹{b.totalAmount}</td>
                    <td className="px-4 py-3 font-bold text-emerald-700">₹{b.workerEarnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-surface-100">
            <span className="text-xs text-surface-400">{filtered.length} results</span>
            <div className="flex items-center gap-2">
              <button onClick={() => { setPage(p => Math.max(1, p-1)); load(page-1); }} disabled={page === 1}
                className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 disabled:opacity-40 transition-colors">
                <ChevronLeft className="w-4 h-4 text-surface-600" />
              </button>
              <span className="text-xs font-bold text-surface-700">Page {page}</span>
              <button onClick={() => { setPage(p => p+1); load(page+1); }}
                disabled={adminBookings.length < 20}
                className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 disabled:opacity-40 transition-colors">
                <ChevronRight className="w-4 h-4 text-surface-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
