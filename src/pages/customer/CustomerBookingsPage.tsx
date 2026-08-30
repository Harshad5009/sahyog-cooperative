import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Phone, Navigation, CheckCircle2, Star, Siren } from 'lucide-react';

export const CustomerBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useApp();
  const [tab, setTab] = useState<'active' | 'completed'>('active');

  const active = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
  const completed = bookings.filter(b => b.status === 'completed');
  const list = tab === 'active' ? active : completed;

  const STATUS_COLORS: Record<string, string> = {
    allocated: 'bg-blue-100 text-blue-800',
    accepted_by_worker: 'bg-purple-100 text-purple-800',
    en_route: 'bg-amber-100 text-amber-800',
    arrived: 'bg-orange-100 text-orange-800',
    in_progress: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>My Bookings</h1>
          <p className="text-xs text-gray-500">Track, manage and review your service requests</p>
        </div>
        <Link to="/customer/book" className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors">
          + New Booking
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit">
        <button onClick={() => setTab('active')} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${tab === 'active' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
          Active ({active.length})
        </button>
        <button onClick={() => setTab('completed')} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${tab === 'completed' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
          Completed ({completed.length})
        </button>
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {list.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
            <CheckCircle2 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No {tab} bookings</p>
            {tab === 'active' && (
              <Link to="/customer/book" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:underline">
                Book a Service <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ) : (
          list.map(bk => (
            <div key={bk.id} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img src={bk.assignedWorker?.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-gray-200" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{bk.subServiceName}</p>
                    <p className="text-xs text-gray-500">{bk.assignedWorker?.name} · #{bk.bookingNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {bk.isEmergency && <Siren className="w-4 h-4 text-red-500 animate-pulse" />}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[bk.status] || 'bg-gray-100 text-gray-700'}`}>
                    {bk.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-4">
                <div><p className="text-gray-400 mb-0.5">Date & Time</p><p className="font-semibold text-gray-800">{bk.date} · {bk.timeSlot}</p></div>
                <div><p className="text-gray-400 mb-0.5">Location</p><p className="font-semibold text-gray-800">{bk.address.area}</p></div>
                <div><p className="text-gray-400 mb-0.5">Total Amount</p><p className="font-bold text-gray-900 text-sm">₹{bk.paymentBreakdown.totalAmount}</p></div>
              </div>

              {tab === 'active' && (
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                  <a href={`tel:${bk.customerPhone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg">
                    <Phone className="w-3.5 h-3.5" /> Call Worker
                  </a>
                  {bk.status !== 'completed' && (
                    <button
                      onClick={() => updateBookingStatus(bk.id, 'completed')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Complete
                    </button>
                  )}
                </div>
              )}

              {tab === 'completed' && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < (bk.customerRating || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    ))}
                    {bk.customerRating && <span className="text-xs text-gray-500 ml-1">{bk.customerRating}.0</span>}
                  </div>
                  <span className="text-xs font-semibold text-green-600">✓ Payment Released to Worker</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
