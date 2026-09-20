import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { changeRequestApi } from '../../utils/apiClient';
import {
  Plus, Clock, MapPin, Star, CheckCircle2, AlertCircle,
  ChevronDown, ChevronUp, Loader2, RefreshCw, ArrowRight,
  Siren, AlertTriangle, X, Send
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  PENDING_MATCH: 'bg-amber-100 text-amber-700',
  ALLOCATED: 'bg-blue-100 text-blue-700',
  ACCEPTED_BY_WORKER: 'bg-indigo-100 text-indigo-700',
  EN_ROUTE: 'bg-cyan-100 text-cyan-700',
  ARRIVED: 'bg-violet-100 text-violet-700',
  IN_PROGRESS: 'bg-purple-100 text-purple-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-600',
  DISPUTED: 'bg-orange-100 text-orange-700',
};

const PAYMENT_LABELS: Record<string, { label: string; color: string }> = {
  PAYMENT_PENDING: { label: 'Payment Pending', color: 'text-gray-500' },
  PAYMENT_HELD: { label: 'Payment Protected/Held', color: 'text-amber-600' },
  ADDITIONAL_REQUESTED: { label: 'Additional Amount Requested', color: 'text-orange-600' },
  PAYMENT_RELEASED: { label: 'Payment Released', color: 'text-emerald-600' },
  REFUND_INITIATED: { label: 'Refund Initiated', color: 'text-red-500' },
  REFUND_COMPLETED: { label: 'Refund Completed', color: 'text-pink-600' },
};

interface ReviewForm { rating: number; comment: string; timeliness: number; qualityOfWork: number; professionalism: number; cleanliness: number; }

export const CustomerBookingsPage: React.FC = () => {
  const { bookings, fetchBookings, submitReview, respondToChangeRequest } = useAuth();
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [crMap, setCrMap] = useState<Record<string, any[]>>({});
  const [crLoading, setCrLoading] = useState<string | null>(null);
  const [reviewBooking, setReviewBooking] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState<ReviewForm>({ rating: 5, comment: '', timeliness: 5, qualityOfWork: 5, professionalism: 5, cleanliness: 5 });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const { getChangeRequests } = useAuth();

  const load = async () => { setLoading(true); await fetchBookings(); setLoading(false); };
  useEffect(() => { load(); }, []);

  const loadCr = async (bookingId: string) => {
    setCrLoading(bookingId);
    const res = await getChangeRequests(bookingId) as any;
    if (res?.result?.data) setCrMap(prev => ({ ...prev, [bookingId]: res.result.data }));
    setCrLoading(null);
  };

  const handleExpand = async (id: string) => {
    const next = expanded === id ? null : id;
    setExpanded(next);
    if (next && !crMap[next]) await loadCr(next);
  };

  const handleCrRespond = async (crId: string, bookingId: string, action: 'APPROVED' | 'REJECTED') => {
    await respondToChangeRequest(crId, action);
    await loadCr(bookingId);
    await fetchBookings();
  };

  const handleSubmitReview = async (bookingId: string) => {
    setReviewLoading(true);
    await submitReview(bookingId, reviewForm);
    setReviewLoading(false);
    setReviewBooking(null);
    setReviewSuccess(bookingId);
    setTimeout(() => setReviewSuccess(null), 4000);
  };

  const displayed = bookings.filter(b => !filterStatus || b.status === filterStatus);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-surface-900 font-display">My Bookings</h1>
          <p className="text-xs text-surface-500 mt-0.5">Live data from SAHYOG platform · {bookings.length} bookings</p>
        </div>
        <div className="flex gap-2">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-surface-200 rounded-xl focus:outline-none cursor-pointer">
            <option value="">All</option>
            {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
          </select>
          <button onClick={load} disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 bg-coop-900 text-white text-xs font-bold rounded-xl hover:bg-coop-800 disabled:opacity-60 transition-colors">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />Refresh
          </button>
        </div>
      </div>

      {loading && bookings.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-surface-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />Loading bookings…
        </div>
      ) : displayed.length === 0 ? (
        <div className="text-center py-16 text-surface-400 text-sm">No bookings found</div>
      ) : (
        <div className="space-y-3">
          {displayed.map((b: any) => {
            const pmeta = PAYMENT_LABELS[b.paymentStatus] ?? { label: b.paymentStatus, color: 'text-gray-500' };
            const isOpen = expanded === b._id;
            const crs: any[] = crMap[b._id] ?? [];
            const pendingCr = crs.find(c => c.status === 'PENDING_APPROVAL');

            return (
              <div key={b._id} className={`bg-white border rounded-2xl shadow-xs overflow-hidden transition-all ${
                pendingCr ? 'border-orange-300' : 'border-surface-200'
              }`}>
                {/* Change Request Alert Banner */}
                {pendingCr && (
                  <div className="bg-orange-50 border-b border-orange-200 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-orange-800">
                      <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
                      <span><strong>Additional ₹{pendingCr.additionalAmount} requested</strong> — {pendingCr.reason}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleCrRespond(pendingCr._id, b._id, 'APPROVED')}
                        className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                        Approve
                      </button>
                      <button onClick={() => handleCrRespond(pendingCr._id, b._id, 'REJECTED')}
                        className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded-lg hover:bg-red-200 transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-black text-surface-900 font-mono">{b.bookingNumber}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[b.status] ?? 'bg-gray-100 text-gray-600'}`}>
                          {b.status?.replace(/_/g,' ')}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-surface-800 mt-1">{b.serviceCategory}</p>
                      <p className="text-xs text-surface-500">{b.scheduledDate} · {b.scheduledTimeSlot}</p>
                    </div>
                    <button onClick={() => handleExpand(b._id)} className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-surface-500" /> : <ChevronDown className="w-4 h-4 text-surface-500" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-surface-400" />
                      <span className="text-xs text-surface-500">{b.address?.area}, {b.address?.city}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${pmeta.color}`}>{pmeta.label}</span>
                      <span className="text-sm font-black text-surface-900">₹{b.totalAmount}</span>
                    </div>
                  </div>

                  {/* Rate Card Breakdown */}
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-surface-100 space-y-4">
                      {/* Pricing */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-surface-50 rounded-xl p-3 space-y-1">
                          <p className="font-bold text-surface-700 mb-2">Rate Card</p>
                          {[
                            ['Base Charge', b.baseServiceCharge],
                            ['Labour', b.labourCharge],
                            ['Material', b.materialCharge],
                            ['Travel', b.travelCharge],
                          ].map(([l, v]) => (
                            <div key={l as string} className="flex justify-between text-surface-600">
                              <span>{l}</span><span className="font-semibold">₹{v}</span>
                            </div>
                          ))}
                          <div className="flex justify-between font-black text-surface-900 pt-1 border-t border-surface-200">
                            <span>Total</span><span>₹{b.totalAmount}</span>
                          </div>
                        </div>
                        <div className="bg-emerald-50 rounded-xl p-3 space-y-1">
                          <p className="font-bold text-emerald-800 mb-2">Payment Split (80/10/5/5)</p>
                          {[
                            ['Worker (80%)', b.workerEarnings, 'text-emerald-700'],
                            ['Welfare (10%)', b.welfareContribution, 'text-blue-600'],
                            ['Coop Fund (5%)', b.cooperativeFund, 'text-purple-600'],
                            ['Platform (5%)', b.platformOperations, 'text-amber-600'],
                          ].map(([l, v, c]) => (
                            <div key={l as string} className={`flex justify-between ${c}`}>
                              <span className="text-surface-600">{l}</span><span className="font-bold">₹{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Change Request history */}
                      {crLoading === b._id ? (
                        <div className="flex items-center gap-2 text-xs text-surface-400"><Loader2 className="w-3.5 h-3.5 animate-spin" />Loading requests…</div>
                      ) : crs.length > 0 ? (
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-surface-700">Change Requests</p>
                          {crs.map((cr: any) => (
                            <div key={cr._id} className={`text-xs p-3 rounded-xl border ${
                              cr.status === 'APPROVED' ? 'bg-emerald-50 border-emerald-200' :
                              cr.status === 'REJECTED' ? 'bg-red-50 border-red-200' :
                              'bg-orange-50 border-orange-200'
                            }`}>
                              <div className="flex justify-between font-bold mb-1">
                                <span>+₹{cr.additionalAmount} requested</span>
                                <span className={cr.status === 'APPROVED' ? 'text-emerald-700' : cr.status === 'REJECTED' ? 'text-red-700' : 'text-orange-700'}>
                                  {cr.status}
                                </span>
                              </div>
                              <p className="text-surface-600">{cr.reason}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {/* Review section */}
                      {b.status === 'COMPLETED' && !reviewSuccess && (
                        <div>
                          {reviewBooking === b._id ? (
                            <div className="bg-surface-50 rounded-xl p-4 space-y-3">
                              <p className="text-xs font-bold text-surface-800">Rate this service</p>
                              <div className="flex gap-1">
                                {[1,2,3,4,5].map(n => (
                                  <button key={n} onClick={() => setReviewForm(f => ({...f, rating: n}))}
                                    className={`text-xl transition-transform hover:scale-110 ${n <= reviewForm.rating ? 'text-amber-400' : 'text-surface-300'}`}>★</button>
                                ))}
                              </div>
                              <textarea value={reviewForm.comment} onChange={e => setReviewForm(f => ({...f, comment: e.target.value}))}
                                placeholder="Share your experience…" rows={2}
                                className="w-full text-xs border border-surface-200 rounded-xl p-3 focus:outline-none focus:border-coop-600 resize-none" />
                              <div className="flex gap-2">
                                <button onClick={() => handleSubmitReview(b._id)} disabled={reviewLoading}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-coop-900 text-white text-xs font-bold rounded-xl hover:bg-coop-800 disabled:opacity-60 transition-colors">
                                  {reviewLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                                  Submit Review
                                </button>
                                <button onClick={() => setReviewBooking(null)} className="px-3 py-2 bg-surface-200 rounded-xl hover:bg-surface-300 transition-colors">
                                  <X className="w-3.5 h-3.5 text-surface-600" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button onClick={() => setReviewBooking(b._id)}
                              className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-amber-300 hover:border-amber-400 text-amber-700 text-xs font-bold rounded-xl transition-colors hover:bg-amber-50">
                              <Star className="w-3.5 h-3.5" />Rate this service
                            </button>
                          )}
                        </div>
                      )}

                      {reviewSuccess === b._id && (
                        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-700">
                          <CheckCircle2 className="w-4 h-4" /><span>Review submitted! Thank you.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
