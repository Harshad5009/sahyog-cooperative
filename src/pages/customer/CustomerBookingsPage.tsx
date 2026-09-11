import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Phone, 
  Navigation, 
  CheckCircle2, 
  Star, 
  Siren, 
  FileText, 
  Printer, 
  X,
  Clock,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import type { Booking } from '../../types';

export const CustomerBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus, submitCustomerReview } = useApp();
  const [tab, setTab] = useState<'upcoming' | 'ongoing' | 'completed' | 'cancelled'>('ongoing');
  const [inspectedInvoice, setInspectedInvoice] = useState<Booking | null>(null);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const upcoming = bookings.filter(b => b.status === 'allocated');
  const ongoing = bookings.filter(b => ['accepted_by_worker', 'en_route', 'arrived', 'in_progress'].includes(b.status));
  const completed = bookings.filter(b => b.status === 'completed');
  const cancelled = bookings.filter(b => b.status === 'cancelled');

  const list = 
    tab === 'upcoming' ? upcoming : 
    tab === 'ongoing' ? ongoing : 
    tab === 'completed' ? completed : 
    cancelled;

  const STATUS_COLORS: Record<string, string> = {
    allocated: 'bg-blue-100 text-blue-800',
    accepted_by_worker: 'bg-purple-100 text-purple-800',
    en_route: 'bg-amber-100 text-amber-800',
    arrived: 'bg-orange-100 text-orange-800',
    in_progress: 'bg-emerald-100 text-emerald-800 font-bold',
    completed: 'bg-surface-100 text-surface-700',
    cancelled: 'bg-rose-100 text-rose-800',
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewBooking) {
      submitCustomerReview(reviewBooking.id, reviewRating, reviewComment || 'Great cooperative service!');
      setReviewBooking(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-surface-900 font-display">
            My Service Bookings
          </h1>
          <p className="text-xs text-surface-500">
            Track active dispatches, view GST tax invoices, and rate cooperative technicians.
          </p>
        </div>
        <Link 
          to="/customer/book" 
          className="flex items-center gap-1.5 px-4 py-2 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          + Book New Service
        </Link>
      </div>

      {/* 4 Tabs: Upcoming, Ongoing, Completed, Cancelled */}
      <div className="flex gap-1.5 p-1 bg-surface-100 rounded-2xl w-fit text-xs font-bold">
        {[
          { id: 'ongoing', label: `Ongoing (${ongoing.length})` },
          { id: 'upcoming', label: `Upcoming (${upcoming.length})` },
          { id: 'completed', label: `Completed (${completed.length})` },
          { id: 'cancelled', label: `Cancelled (${cancelled.length})` },
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id as any)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              tab === t.id
                ? 'bg-white text-surface-900 shadow-xs'
                : 'text-surface-500 hover:text-surface-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {list.length === 0 ? (
          <div className="bg-white border border-surface-200 rounded-3xl p-10 text-center space-y-3 shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-surface-300 mx-auto" />
            <p className="text-sm font-bold text-surface-700">No {tab} bookings found</p>
            <p className="text-xs text-surface-400">Need emergency or scheduled repairs at home?</p>
            <Link 
              to="/customer/book" 
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-coop-900 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-coop-800"
            >
              <span>Book a Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          list.map(bk => (
            <div key={bk.id} className="bg-white border border-surface-200 rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <img 
                    src={bk.assignedWorker?.avatar} 
                    alt="" 
                    className="w-12 h-12 rounded-2xl object-cover border border-surface-300 shadow-xs shrink-0" 
                  />
                  <div>
                    <h3 className="font-bold text-surface-900 text-sm sm:text-base">{bk.subServiceName}</h3>
                    <p className="text-xs text-surface-500">{bk.assignedWorker?.name} • #{bk.bookingNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {bk.isEmergency && <Siren className="w-4 h-4 text-rose-600 animate-pulse" />}
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${STATUS_COLORS[bk.status] || 'bg-surface-100 text-surface-700'}`}>
                    {bk.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Service Meta Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-surface-50 p-3.5 rounded-2xl border border-surface-100">
                <div>
                  <span className="text-surface-400 block text-[10px] uppercase font-bold">Scheduled</span>
                  <p className="font-semibold text-surface-800 mt-0.5">{bk.date} • {bk.timeSlot}</p>
                </div>
                <div>
                  <span className="text-surface-400 block text-[10px] uppercase font-bold">Address</span>
                  <p className="font-semibold text-surface-800 mt-0.5 truncate">{bk.address.street}, {bk.address.area}</p>
                </div>
                <div>
                  <span className="text-surface-400 block text-[10px] uppercase font-bold">Customer Paid</span>
                  <p className="font-black text-surface-900 text-sm mt-0.5">₹{bk.paymentBreakdown.totalAmount}</p>
                </div>
                <div>
                  <span className="text-surface-400 block text-[10px] uppercase font-bold">Escrow Guarantee</span>
                  <p className="text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Protected
                  </p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-100 text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${bk.assignedWorker?.phone}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-100 hover:bg-surface-200 text-surface-700 font-semibold rounded-xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Worker</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setInspectedInvoice(bk)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-100 hover:bg-surface-200 text-coop-900 font-bold rounded-xl transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Tax Invoice</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {bk.status !== 'completed' && bk.status !== 'cancelled' && (
                    <button
                      type="button"
                      onClick={() => updateBookingStatus(bk.id, 'completed')}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm & Mark Complete</span>
                    </button>
                  )}

                  {bk.status === 'completed' && !bk.customerRating && (
                    <button
                      type="button"
                      onClick={() => setReviewBooking(bk)}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1"
                    >
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>Rate Specialist</span>
                    </button>
                  )}

                  {bk.customerRating && (
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span>{bk.customerRating}.0 Rating Given</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rating Modal */}
      {reviewBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-surface-200 space-y-4 animate-scale-up">
            <div>
              <h3 className="text-base font-black text-surface-900 font-display">
                Rate {reviewBooking.assignedWorker?.name}
              </h3>
              <p className="text-xs text-surface-500">
                Booking #{reviewBooking.bookingNumber} • {reviewBooking.subServiceName}
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-surface-700">Stars:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setReviewRating(st)}
                      className="p-1 hover:scale-110"
                    >
                      <Star className={`w-6 h-6 ${st <= reviewRating ? 'text-amber-500 fill-amber-500' : 'text-surface-200'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-surface-700 block mb-1">Feedback Comment</label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="How was the punctuality, cleanliness, and service quality?"
                  className="w-full bg-surface-50 border border-surface-200 rounded-xl p-3 text-surface-900 focus:outline-none focus:border-coop-600 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewBooking(null)}
                  className="px-4 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Submit Verified Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tax Invoice Modal */}
      {inspectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-surface-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-surface-200 pb-3">
              <div>
                <span className="text-base font-black text-coop-950 font-display">COOPERATIVE SERVICE RECEIPT</span>
                <p className="text-[11px] text-surface-500">Maharashtra Labour Cooperative Societies Federation</p>
              </div>
              <button
                type="button"
                onClick={() => setInspectedInvoice(null)}
                className="p-1 rounded-lg text-surface-500 hover:bg-surface-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-surface-500">Booking Number:</span>
                <span className="font-mono font-bold text-surface-900">#{inspectedInvoice.bookingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Service:</span>
                <span className="font-bold text-surface-900">{inspectedInvoice.subServiceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Worker Assigned:</span>
                <span className="font-semibold text-surface-900">{inspectedInvoice.assignedWorker?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Date Delivered:</span>
                <span className="font-semibold text-surface-900">{inspectedInvoice.date}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-surface-200 text-sm font-black text-surface-900">
                <span>Total Amount Paid:</span>
                <span className="text-emerald-800">₹{inspectedInvoice.paymentBreakdown.totalAmount}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setInspectedInvoice(null)}
                className="px-4 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 bg-coop-900 hover:bg-coop-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
