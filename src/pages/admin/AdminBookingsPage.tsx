import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Siren, 
  CheckCircle2, 
  Search, 
  Filter, 
  Eye, 
  X,
  FileText,
  User,
  Phone,
  IndianRupee
} from 'lucide-react';
import type { Booking } from '../../types';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useApp();
  const [filterTab, setFilterTab] = useState<'all' | 'pending' | 'assigned' | 'active' | 'completed' | 'cancelled' | 'emergency'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedBooking, setInspectedBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter(bk => {
    // Tab filter
    if (filterTab === 'emergency' && !bk.isEmergency) return false;
    if (filterTab === 'pending' && bk.status !== 'pending_ai_match') return false;
    if (filterTab === 'assigned' && bk.status !== 'allocated') return false;
    if (filterTab === 'active' && !['accepted_by_worker', 'en_route', 'arrived', 'in_progress'].includes(bk.status)) return false;
    if (filterTab === 'completed' && bk.status !== 'completed') return false;
    if (filterTab === 'cancelled' && bk.status !== 'cancelled') return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNumber = bk.bookingNumber.toLowerCase().includes(q);
      const matchCustomer = bk.customerName.toLowerCase().includes(q);
      const matchWorker = bk.assignedWorker?.name.toLowerCase().includes(q) || false;
      const matchService = bk.subServiceName.toLowerCase().includes(q);
      return matchNumber || matchCustomer || matchWorker || matchService;
    }

    return true;
  });

  const getStatusBadge = (status: string, isEmergency?: boolean) => {
    if (isEmergency) return 'bg-rose-100 text-rose-800 border border-rose-300 font-extrabold';
    switch (status) {
      case 'allocated':
        return 'bg-blue-100 text-blue-800';
      case 'accepted_by_worker':
        return 'bg-purple-100 text-purple-800';
      case 'en_route':
        return 'bg-amber-100 text-amber-900';
      case 'arrived':
        return 'bg-orange-100 text-orange-900';
      case 'in_progress':
        return 'bg-emerald-100 text-emerald-900 font-bold';
      case 'completed':
        return 'bg-surface-200 text-surface-800';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-surface-100 text-surface-700';
    }
  };

  const getTabCount = (tab: typeof filterTab) => {
    if (tab === 'all') return bookings.length;
    if (tab === 'emergency') return bookings.filter(b => b.isEmergency).length;
    if (tab === 'pending') return bookings.filter(b => b.status === 'pending_ai_match').length;
    if (tab === 'assigned') return bookings.filter(b => b.status === 'allocated').length;
    if (tab === 'active') return bookings.filter(b => ['accepted_by_worker', 'en_route', 'arrived', 'in_progress'].includes(b.status)).length;
    if (tab === 'completed') return bookings.filter(b => b.status === 'completed').length;
    if (tab === 'cancelled') return bookings.filter(b => b.status === 'cancelled').length;
    return 0;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-900 font-display">
            Live Service Order Stream & Dispatches
          </h1>
          <p className="text-xs text-surface-500">
            Real-time federation oversight of household requests, emergency beacons, and fair worker assignments.
          </p>
        </div>

        <div className="text-xs font-bold text-coop-800 bg-coop-50 px-3 py-1.5 rounded-xl border border-coop-200">
          Total Dispatched: {bookings.length} Orders
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Bookings' },
            { id: 'emergency', label: '🚨 Emergency' },
            { id: 'assigned', label: 'Assigned' },
            { id: 'active', label: 'Active (In Progress)' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map(tab => {
            const count = getTabCount(tab.id as any);
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  filterTab === tab.id
                    ? 'bg-coop-900 text-white shadow-xs'
                    : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  filterTab === tab.id ? 'bg-coop-700 text-white' : 'bg-surface-100 text-surface-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-surface-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, booking ID, worker name, or service..."
            className="w-full bg-white border border-surface-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-surface-900 focus:outline-none focus:border-coop-600 font-medium"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-surface-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 border-b border-surface-200 text-[11px] font-bold uppercase text-surface-500">
              <tr>
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer & Location</th>
                <th className="p-4">Service Scope</th>
                <th className="p-4">Assigned Worker</th>
                <th className="p-4">Payout (80%)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredBookings.map(bk => (
                <tr key={bk.id} className="hover:bg-surface-50/70 transition-colors">
                  <td className="p-4 font-mono font-bold text-surface-900">
                    <div className="flex items-center gap-1.5">
                      {bk.isEmergency && <Siren className="w-3.5 h-3.5 text-rose-600 animate-pulse" />}
                      <span>{bk.bookingNumber}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-surface-900 block">{bk.customerName}</span>
                    <span className="text-[11px] text-surface-500">{bk.address.area}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-coop-900">{bk.subServiceName}</span>
                    <span className="text-[10px] text-surface-400 block">{bk.date} • {bk.timeSlot}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={bk.assignedWorker?.avatar}
                        alt=""
                        className="w-7 h-7 rounded-lg object-cover border border-surface-200"
                      />
                      <div>
                        <span className="font-semibold text-surface-800 block">{bk.assignedWorker?.name || 'Unassigned'}</span>
                        <span className="text-[10px] text-surface-400">{bk.assignedWorker?.primarySkill}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-black text-surface-900 block font-display">₹{bk.paymentBreakdown.totalAmount}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">₹{bk.paymentBreakdown.workerEarnings} to worker</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusBadge(bk.status, bk.isEmergency)}`}>
                      {bk.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => setInspectedBooking(bk)}
                      className="px-2.5 py-1 bg-surface-100 hover:bg-surface-200 text-surface-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Inspector Modal */}
      {inspectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-surface-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-surface-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-coop-800 bg-coop-50 px-2 py-0.5 rounded">
                  Order Telemetry
                </span>
                <h3 className="text-lg font-black text-surface-900 font-display mt-1">
                  Booking #{inspectedBooking.bookingNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedBooking(null)}
                className="p-1 rounded-lg text-surface-500 hover:bg-surface-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-surface-50 rounded-2xl border border-surface-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-surface-500">Customer:</span>
                <span className="font-bold text-surface-900">{inspectedBooking.customerName} ({inspectedBooking.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Service:</span>
                <span className="font-bold text-surface-900">{inspectedBooking.subServiceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Address:</span>
                <span className="font-medium text-surface-800">{inspectedBooking.address.street}, {inspectedBooking.address.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Problem Summary:</span>
                <span className="font-medium text-surface-800 text-right max-w-[200px] truncate">{inspectedBooking.problemDescription}</span>
              </div>
            </div>

            {/* Assigned Worker */}
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3 text-xs">
              <img src={inspectedBooking.assignedWorker?.avatar} alt="" className="w-11 h-11 rounded-xl object-cover border border-emerald-300" />
              <div>
                <p className="font-bold text-surface-900">{inspectedBooking.assignedWorker?.name}</p>
                <p className="text-[11px] text-surface-600">{inspectedBooking.assignedWorker?.cooperativeSociety}</p>
                <p className="text-[11px] text-surface-500">Rating: {inspectedBooking.assignedWorker?.rating} ★ • {inspectedBooking.assignedWorker?.phone}</p>
              </div>
            </div>

            {/* Payment Split */}
            <div className="p-3.5 bg-surface-50 rounded-2xl border border-surface-200 text-xs space-y-1">
              <span className="font-bold text-surface-800 block text-[10px] uppercase">Transparent Payout Ledger:</span>
              <div className="flex justify-between">
                <span className="text-surface-500">Customer Total Paid:</span>
                <span className="font-bold text-surface-900">₹{inspectedBooking.paymentBreakdown.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Worker Take-Home (80%):</span>
                <span className="font-bold text-emerald-800">₹{inspectedBooking.paymentBreakdown.workerEarnings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Cooperative Society (10%):</span>
                <span className="font-bold text-coop-800">₹{inspectedBooking.paymentBreakdown.cooperativeFund}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Welfare & Insurance (5%):</span>
                <span className="font-bold text-amber-800">₹{inspectedBooking.paymentBreakdown.welfareInsurance}</span>
              </div>
            </div>

            {/* Status Change Control */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-surface-600">Quick Update Status:</span>
              <select
                value={inspectedBooking.status}
                onChange={e => {
                  updateBookingStatus(inspectedBooking.id, e.target.value as any);
                  setInspectedBooking({ ...inspectedBooking, status: e.target.value as any });
                }}
                className="bg-surface-100 border border-surface-300 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer"
              >
                <option value="allocated">Allocated</option>
                <option value="accepted_by_worker">Accepted by Worker</option>
                <option value="en_route">En Route</option>
                <option value="arrived">Arrived</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
