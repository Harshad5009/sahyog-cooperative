import React, { useState } from 'react';
import { ShieldCheck, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

export const CustomerProfilePage: React.FC = () => {
  const [name, setName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 9876543210');
  const [email, setEmail] = useState('priya.sharma@email.com');
  const [area, setArea] = useState('Kothrud, Pune');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h1 className="text-xl font-black text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>My Profile</h1>
        <p className="text-xs text-gray-500">Manage your account details and preferences</p>
      </div>

      {/* Avatar & verification */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-2xl font-black text-green-700">
          PS
        </div>
        <div>
          <p className="font-bold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500 mb-2">{email}</p>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Phone Verified · Aadhaar KYC Done</span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Personal Information</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Service Area</label>
            <input value={area} onChange={e => setArea(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200" />
          </div>
          <button type="submit"
            className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-colors ${saved ? 'bg-green-100 text-green-700' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
            {saved ? '✓ Saved Successfully' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="bg-white border border-red-200 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-red-700 mb-3">Account Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 text-xs font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
            Delete Account
          </button>
          <button className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Download My Data
          </button>
        </div>
      </div>
    </div>
  );
};
