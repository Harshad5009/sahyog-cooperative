import React from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Clock, MapPin, ShieldCheck, Siren, CheckCircle2 } from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { bookings } = useApp();

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-black text-surface-900 font-display">
          Live Service Request Stream & Dispatches
        </h1>
        <p className="text-xs text-surface-500">
          Real-time service orders routed via AI Fair Worker Allocation engine.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-surface-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 border-b border-surface-200 text-[11px] font-bold uppercase text-surface-500">
              <tr>
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer & Area</th>
                <th className="p-4">Service Required</th>
                <th className="p-4">Assigned Specialist</th>
                <th className="p-4">Settlement Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {bookings.map(bk => (
                <tr key={bk.id} className="hover:bg-surface-50/70 transition-colors">
                  <td className="p-4 font-mono font-bold text-surface-900">
                    <div className="flex items-center gap-1.5">
                      {bk.isEmergency && <Siren className="w-3.5 h-3.5 text-rose-600 animate-pulse" />}
                      <span>{bk.bookingNumber}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-surface-900 block">{bk.customerName}</span>
                    <span className="text-[10px] text-surface-500">{bk.address.area}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-coop-800">{bk.subServiceName}</span>
                    <span className="text-[10px] text-surface-400 block">{bk.timeSlot}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={bk.assignedWorker?.avatar}
                        alt={bk.assignedWorker?.name}
                        className="w-7 h-7 rounded-lg object-cover border border-surface-200"
                      />
                      <span className="font-medium text-surface-800">{bk.assignedWorker?.name || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-surface-900 block font-display">₹{bk.paymentBreakdown.totalAmount}</span>
                    <span className="text-[10px] text-emerald-700">₹{bk.paymentBreakdown.workerEarnings} to worker</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-coop-100 text-coop-900">
                      {bk.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
