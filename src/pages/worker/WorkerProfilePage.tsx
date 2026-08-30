import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, User, MapPin, Phone, Building2, CheckCircle2, Wrench } from 'lucide-react';

export const WorkerProfilePage: React.FC = () => {
  const { activeWorker } = useApp();
  const [phone, setPhone] = useState(activeWorker.phone);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      <div>
        <h1 className="text-2xl font-black text-surface-900 font-display">
          Worker KYC & Cooperative Identity
        </h1>
        <p className="text-xs text-surface-500">
          Government Aadhaar eKYC, Police clearance verification, and Society membership status.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
        
        {/* Verification Status Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-6 border-b border-surface-100">
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Aadhaar eKYC Verified
          </span>
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Police Verification Certified
          </span>
          <span className="px-3 py-1.5 bg-coop-50 text-coop-800 text-xs font-bold rounded-xl border border-coop-200 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-coop-700" />
            Cooperative Shareholder #842
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-surface-800 block mb-1">Full Name</label>
              <input
                type="text"
                disabled
                value={activeWorker.name}
                className="w-full bg-surface-100 border border-surface-200 p-3 rounded-xl font-medium text-xs text-surface-700"
              />
            </div>
            <div>
              <label className="font-bold text-surface-800 block mb-1">Membership ID</label>
              <input
                type="text"
                disabled
                value={activeWorker.membershipId}
                className="w-full bg-surface-100 border border-surface-200 p-3 rounded-xl font-mono text-xs text-surface-700"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-surface-800 block mb-1">Affiliated Labour Cooperative</label>
            <input
              type="text"
              disabled
              value={activeWorker.cooperativeSociety}
              className="w-full bg-surface-100 border border-surface-200 p-3 rounded-xl font-medium text-xs text-surface-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-surface-800 block mb-1">Mobile Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-surface-50 border border-surface-200 p-3 rounded-xl font-medium text-xs text-surface-900 focus:border-coop-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-surface-800 block mb-1">Primary Operating Zone</label>
              <input
                type="text"
                disabled
                value={`${activeWorker.currentLocation.area}, ${activeWorker.currentLocation.city}`}
                className="w-full bg-surface-100 border border-surface-200 p-3 rounded-xl font-medium text-xs text-surface-700"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-coop-900 hover:bg-coop-800 text-white font-bold rounded-xl shadow-xs"
            >
              {saved ? 'Updated Successfully' : 'Save Details'}
            </button>
          </div>
        </form>
      </div>

      {/* Safety Equipment & Tool Inventory */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
        <h3 className="text-sm font-bold text-surface-900 mb-3 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-coop-700" />
          Cooperative Inspected Tool Inventory
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-surface-700">
          <div className="p-2.5 bg-surface-50 rounded-xl border border-surface-200 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Heavy-Duty Pipe Wrench (12" & 18")</span>
          </div>
          <div className="p-2.5 bg-surface-50 rounded-xl border border-surface-200 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rotary Cordless Hammer Drill</span>
          </div>
          <div className="p-2.5 bg-surface-50 rounded-xl border border-surface-200 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Digital Water Pressure Tester</span>
          </div>
          <div className="p-2.5 bg-surface-50 rounded-xl border border-surface-200 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>ISI Safety Boots & Eye Goggles</span>
          </div>
        </div>
      </div>

    </div>
  );
};
