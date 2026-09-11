import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  CheckCircle2, 
  Siren, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  AlertTriangle,
  PlusCircle,
  Hammer,
  Wrench,
  XCircle
} from 'lucide-react';
import type { Booking } from '../../types';
import { PaymentStatusBadge } from '../../components/common/PaymentStatusBadge';
import { WorkerChangeRequestModal } from '../../components/worker/WorkerChangeRequestModal';

export const WorkerJobsPage: React.FC = () => {
  const { bookings, updateBookingStatus, activeWorker, requestAdditionalWork } = useApp();
  const [tab, setTab] = useState<'active' | 'pending' | 'completed'>('active');
  const [selectedBookingForChange, setSelectedBookingForChange] = useState<Booking | null>(null);

  const pendingJobs = bookings.filter(b => b.status === 'allocated' || b.status === 'pending_ai_match');
  const activeJobs = bookings.filter(b => b.status === 'accepted_by_worker' || b.status === 'en_route' || b.status === 'arrived' || b.status === 'in_progress');
  const completedJobs = bookings.filter(b => b.status === 'completed');

  const currentList = tab === 'pending' ? pendingJobs : tab === 'active' ? activeJobs : completedJobs;

  return (
    <div className="space-y-6">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-900 font-display">
            Assigned Job Dispatches
          </h1>
          <p className="text-xs text-surface-500">
            Accept priority allocations, request on-site additional scope with customer approval, and track escrow payouts.
          </p>
        </div>

        <div className="flex gap-1.5 p-1 bg-white rounded-2xl border border-surface-200 shadow-xs text-xs font-semibold">
          <button
            onClick={() => setTab('active')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              tab === 'active' ? 'bg-coop-900 text-white shadow-xs' : 'text-surface-600 hover:bg-surface-100'
            }`}
          >
            Active & En Route ({activeJobs.length})
          </button>
          <button
            onClick={() => setTab('pending')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              tab === 'pending' ? 'bg-coop-900 text-white shadow-xs' : 'text-surface-600 hover:bg-surface-100'
            }`}
          >
            New Requests ({pendingJobs.length})
          </button>
          <button
            onClick={() => setTab('completed')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              tab === 'completed' ? 'bg-coop-900 text-white shadow-xs' : 'text-surface-600 hover:bg-surface-100'
            }`}
          >
            Completed ({completedJobs.length})
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-5">
        {currentList.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-surface-200 text-center shadow-card">
            <CheckCircle2 className="w-8 h-8 text-surface-300 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-surface-700">No jobs in this category</h4>
            <p className="text-[11px] text-surface-400 mt-0.5">Switch tabs to view other dispatches.</p>
          </div>
        ) : (
          currentList.map(bk => {
            const activeReq = bk.changeRequests && bk.changeRequests[0];

            return (
              <div
                key={bk.id}
                className="bg-white rounded-3xl p-6 border border-surface-200 shadow-card flex flex-col gap-4"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-surface-100">
                  <div className="flex items-center gap-2">
                    {bk.isEmergency && <Siren className="w-4 h-4 text-rose-600 animate-pulse" />}
                    <h3 className="text-sm font-bold text-surface-900">{bk.subServiceName}</h3>
                    <span className="text-[10px] font-mono bg-surface-100 text-surface-600 px-2 py-0.5 rounded">
                      #{bk.bookingNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-coop-100 text-coop-900">
                      {bk.status.replace(/_/g, ' ')}
                    </span>
                    <PaymentStatusBadge status={bk.paymentStatus} size="sm" />
                  </div>
                </div>

                {/* Change Request Status Banner for Worker */}
                {activeReq && (
                  <div className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                    activeReq.status === 'pending'
                      ? 'bg-purple-50 border-purple-200 text-purple-900'
                      : activeReq.status === 'approved'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}>
                    <div className="mt-0.5 shrink-0">
                      {activeReq.status === 'pending' && <AlertTriangle className="w-4 h-4 text-purple-600" />}
                      {activeReq.status === 'approved' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {activeReq.status === 'rejected' && <XCircle className="w-4 h-4 text-rose-600" />}
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold">
                        {activeReq.status === 'pending' && `Change Request of +₹${activeReq.totalExtraAmount} Sent to Customer`}
                        {activeReq.status === 'approved' && `✓ Customer Approved +₹${activeReq.totalExtraAmount}! Total Escrow: ₹${bk.paymentBreakdown.totalAmount}`}
                        {activeReq.status === 'rejected' && `Customer Declined Additional Work. Proceed with original scope.`}
                      </p>
                      <p className="text-[11px] opacity-85">
                        <strong>Reason:</strong> {activeReq.reason} (Labour: ₹{activeReq.labourCost}, Material: ₹{activeReq.materialCost})
                      </p>
                      {activeReq.status === 'pending' && (
                        <p className="text-[10px] text-purple-700 font-semibold pt-0.5">
                          ⚠ Cooperative Governance: Do not collect cash or start unapproved work until customer authorizes in app.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Job Meta Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-surface-400 block mb-0.5">Customer & Phone</span>
                    <p className="font-bold text-surface-900">{bk.customerName}</p>
                    <p className="text-[11px] text-surface-500">{bk.customerPhone}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-surface-400 block mb-0.5">Address</span>
                    <p className="text-surface-800 font-semibold">{bk.address.street}</p>
                    <p className="text-[11px] text-surface-500">{bk.address.area}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-surface-400 block mb-0.5">Your Payout</span>
                    <span className="text-base font-black text-emerald-700 font-display block">
                      ₹{bk.paymentBreakdown.workerEarnings}
                    </span>
                    <span className="text-[10px] text-surface-400">+ ₹{bk.paymentBreakdown.welfareInsurance} to Welfare Vault</span>
                  </div>
                </div>

                <div className="p-3 bg-surface-50 rounded-xl border border-surface-200 text-xs text-surface-700">
                  <span className="font-semibold">Issue: </span>
                  <span>"{bk.problemDescription}"</span>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-100">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${bk.customerPhone}`}
                      className="px-3 py-1.5 bg-surface-100 hover:bg-surface-200 text-surface-800 text-xs font-semibold rounded-xl flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Customer</span>
                    </a>

                    {/* Change Request Button for Active Jobs */}
                    {bk.status !== 'completed' && bk.status !== 'cancelled' && (
                      <button
                        type="button"
                        onClick={() => setSelectedBookingForChange(bk)}
                        className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-purple-700" />
                        <span>Request Additional Work</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {bk.status === 'allocated' && (
                      <button
                        onClick={() => updateBookingStatus(bk.id, 'accepted_by_worker')}
                        className="px-4 py-2 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Accept Job Dispatch
                      </button>
                    )}

                    {bk.status === 'accepted_by_worker' && (
                      <button
                        onClick={() => updateBookingStatus(bk.id, 'en_route')}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Mark En Route
                      </button>
                    )}

                    {bk.status === 'en_route' && (
                      <button
                        onClick={() => updateBookingStatus(bk.id, 'in_progress')}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Start Work (Arrived)
                      </button>
                    )}

                    {bk.status === 'in_progress' && (
                      <button
                        onClick={() => updateBookingStatus(bk.id, 'completed')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Complete & Release ₹{bk.paymentBreakdown.workerEarnings} Payout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Change Request Modal for Worker */}
      {selectedBookingForChange && (
        <WorkerChangeRequestModal
          booking={selectedBookingForChange}
          isOpen={true}
          onClose={() => setSelectedBookingForChange(null)}
          onSubmit={(data) => {
            requestAdditionalWork(selectedBookingForChange.id, data);
            setSelectedBookingForChange(null);
          }}
        />
      )}

    </div>
  );
};
