import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  MapPin, Clock, ArrowRight, Loader2, AlertTriangle,
  Plus, X, CheckCircle2, RefreshCw, Send
} from 'lucide-react';

const JOB_TRANSITIONS: Record<string, string | null> = {
  ALLOCATED: 'ACCEPTED_BY_WORKER',
  ACCEPTED_BY_WORKER: 'EN_ROUTE',
  EN_ROUTE: 'ARRIVED',
  ARRIVED: 'IN_PROGRESS',
  IN_PROGRESS: 'COMPLETED',
};

const STATUS_COLORS: Record<string, string> = {
  PENDING_MATCH: 'bg-gray-100 text-gray-600',
  ALLOCATED: 'bg-amber-100 text-amber-700',
  ACCEPTED_BY_WORKER: 'bg-blue-100 text-blue-700',
  EN_ROUTE: 'bg-cyan-100 text-cyan-700',
  ARRIVED: 'bg-violet-100 text-violet-700',
  IN_PROGRESS: 'bg-purple-100 text-purple-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-600',
};

interface CRForm {
  reason: string;
  additionalAmount: number;
  materialBreakdown: { item: string; cost: number }[];
  labourReason: string;
}

export const WorkerJobsPage: React.FC = () => {
  const { bookings, fetchBookings, updateBookingStatus, createChangeRequest } = useAuth();
  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const [crBookingId, setCrBookingId] = useState<string | null>(null);
  const [crForm, setCrForm] = useState<CRForm>({ reason: '', additionalAmount: 0, materialBreakdown: [], labourReason: '' });
  const [crLoading, setCrLoading] = useState(false);
  const [crSuccess, setCrSuccess] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ item: '', cost: 0 });
  const [tab, setTab] = useState<'active' | 'completed'>('active');

  const load = async () => { setLoading(true); await fetchBookings(); setLoading(false); };
  useEffect(() => { load(); }, []);

  const activeJobs = bookings.filter(b => !['COMPLETED','CANCELLED'].includes(b.status));
  const completedJobs = bookings.filter(b => b.status === 'COMPLETED');

  const handleStatus = async (id: string, status: string) => {
    setStatusUpdating(id);
    await updateBookingStatus(id, status);
    setStatusUpdating(null);
  };

  const addMaterialItem = () => {
    if (!newItem.item || newItem.cost <= 0) return;
    setCrForm(f => ({ ...f, materialBreakdown: [...f.materialBreakdown, { ...newItem }] }));
    setNewItem({ item: '', cost: 0 });
  };

  const removeMaterialItem = (i: number) => {
    setCrForm(f => ({ ...f, materialBreakdown: f.materialBreakdown.filter((_, idx) => idx !== i) }));
  };

  const handleSubmitCR = async () => {
    if (!crBookingId || !crForm.reason || crForm.additionalAmount <= 0) return;
    setCrLoading(true);
    const res = await createChangeRequest(crBookingId, {
      reason: crForm.reason,
      additionalAmount: crForm.additionalAmount,
      materialBreakdown: crForm.materialBreakdown,
      labourReason: crForm.labourReason,
    }) as any;
    setCrLoading(false);
    if (!res?.error) {
      setCrSuccess(crBookingId);
      setCrBookingId(null);
      setCrForm({ reason: '', additionalAmount: 0, materialBreakdown: [], labourReason: '' });
      setTimeout(() => setCrSuccess(null), 5000);
    }
  };

  const displayed = tab === 'active' ? activeJobs : completedJobs;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-surface-900 font-display">My Jobs</h1>
          <p className="text-xs text-surface-500 mt-0.5">Live assigned jobs from SAHYOG platform</p>
        </div>
        <button onClick={load} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-coop-900 text-white text-xs font-bold rounded-xl hover:bg-coop-800 disabled:opacity-60 transition-colors">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />Refresh
        </button>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 p-1 bg-surface-100 rounded-xl">
        {(['active','completed'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-bold capitalize rounded-lg transition-all ${
              tab === t ? 'bg-white text-coop-900 shadow-xs' : 'text-surface-500'
            }`}>
            {t} ({t === 'active' ? activeJobs.length : completedJobs.length})
          </button>
        ))}
      </div>

      {/* Change Request Modal */}
      {crBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-surface-900">Request Additional Amount</h3>
              <button onClick={() => setCrBookingId(null)} className="p-1.5 hover:bg-surface-100 rounded-lg transition-colors">
                <X className="w-4 h-4 text-surface-500" />
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              Customer must approve this request before payment changes. No unilateral price increases.
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-surface-700 block mb-1.5">Reason for additional charge *</label>
                <textarea value={crForm.reason} onChange={e => setCrForm(f => ({...f, reason: e.target.value}))}
                  placeholder="Describe why additional amount is needed…" rows={3}
                  className="w-full border border-surface-200 rounded-xl p-3 focus:outline-none focus:border-coop-600 resize-none" />
              </div>

              <div>
                <label className="font-bold text-surface-700 block mb-1.5">Additional Amount (₹) *</label>
                <input type="number" min={1} value={crForm.additionalAmount || ''}
                  onChange={e => setCrForm(f => ({...f, additionalAmount: Number(e.target.value)}))}
                  placeholder="0"
                  className="w-full border border-surface-200 rounded-xl p-3 focus:outline-none focus:border-coop-600" />
              </div>

              <div>
                <label className="font-bold text-surface-700 block mb-1.5">Material Breakdown (optional)</label>
                <div className="flex gap-2 mb-2">
                  <input value={newItem.item} onChange={e => setNewItem(n => ({...n, item: e.target.value}))}
                    placeholder="Item name" className="flex-1 border border-surface-200 rounded-xl p-2.5 focus:outline-none focus:border-coop-600" />
                  <input type="number" min={1} value={newItem.cost || ''}
                    onChange={e => setNewItem(n => ({...n, cost: Number(e.target.value)}))}
                    placeholder="₹" className="w-20 border border-surface-200 rounded-xl p-2.5 focus:outline-none focus:border-coop-600" />
                  <button onClick={addMaterialItem} className="px-3 py-2 bg-coop-100 hover:bg-coop-200 text-coop-800 rounded-xl font-bold transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                {crForm.materialBreakdown.map((m, i) => (
                  <div key={i} className="flex justify-between items-center bg-surface-50 rounded-lg px-3 py-2 mb-1">
                    <span className="text-surface-700">{m.item}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">₹{m.cost}</span>
                      <button onClick={() => removeMaterialItem(i)} className="text-red-400 hover:text-red-600 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="font-bold text-surface-700 block mb-1.5">Labour reason (optional)</label>
                <input value={crForm.labourReason} onChange={e => setCrForm(f => ({...f, labourReason: e.target.value}))}
                  placeholder="e.g. Extra 2 hours required due to complexity"
                  className="w-full border border-surface-200 rounded-xl p-3 focus:outline-none focus:border-coop-600" />
              </div>

              <button onClick={handleSubmitCR} disabled={crLoading || !crForm.reason || crForm.additionalAmount <= 0}
                className="w-full flex items-center justify-center gap-2 py-3 bg-coop-900 hover:bg-coop-800 disabled:opacity-60 text-white font-bold rounded-xl transition-colors">
                {crLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Send Request to Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jobs List */}
      {loading && bookings.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-surface-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />Loading jobs…
        </div>
      ) : displayed.length === 0 ? (
        <div className="text-center py-16 text-surface-400 text-sm">
          {tab === 'active' ? 'No active jobs. Go online to receive job alerts.' : 'No completed jobs yet.'}
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((b: any) => {
            const nextStatus = JOB_TRANSITIONS[b.status];
            return (
              <div key={b._id} className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-mono font-bold text-surface-500">{b.bookingNumber}</p>
                    <h3 className="text-base font-black text-surface-900 mt-0.5">{b.serviceCategory}</h3>
                    <p className="text-xs text-surface-500">{b.subServiceName}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${STATUS_COLORS[b.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {b.status?.replace(/_/g,' ')}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-surface-500 mb-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{b.address?.area}, {b.address?.city}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{b.scheduledDate} · {b.scheduledTimeSlot}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                  <div>
                    <p className="text-base font-black text-emerald-700">₹{b.workerEarnings}</p>
                    <p className="text-[10px] text-surface-400">your earnings (80%)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Change Request button for IN_PROGRESS */}
                    {b.status === 'IN_PROGRESS' && (
                      <button onClick={() => setCrBookingId(b._id)}
                        className="flex items-center gap-1.5 px-3 py-2 border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold rounded-xl transition-colors">
                        <Plus className="w-3.5 h-3.5" />Request Extra
                      </button>
                    )}
                    {/* Status Transition */}
                    {nextStatus && (
                      <button onClick={() => handleStatus(b._id, nextStatus)} disabled={statusUpdating === b._id}
                        className="flex items-center gap-1.5 px-4 py-2 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-60">
                        {statusUpdating === b._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        {nextStatus.replace(/_/g,' ')}
                      </button>
                    )}
                  </div>
                </div>

                {crSuccess === b._id && (
                  <div className="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />Change request sent to customer for approval.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
