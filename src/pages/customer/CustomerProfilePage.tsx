import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  ShieldCheck, MapPin, Phone, Mail, CheckCircle2, Globe,
  Home, Briefcase, Plus, Trash2, Building2, Award, Save, Loader2, LogOut
} from 'lucide-react';
import type { SupportedLanguage } from '../../data/mockTranslations';

interface SavedAddress {
  id: string;
  tag: string;
  address: string;
  area: string;
  isDefault: boolean;
}

const LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
];

export const CustomerProfilePage: React.FC = () => {
  const { authUser, logout, bookings } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [saved, setSaved] = useState(false);

  const [addresses, setAddresses] = useState<SavedAddress[]>([
    { id: 'addr1', tag: 'Home', address: 'Flat 402, Rutuparna Apts, Paud Road', area: 'Kothrud, Pune - 411038', isDefault: true },
    { id: 'addr2', tag: 'Office', address: 'IT Park Tower 7, Hinjewadi Phase 2', area: 'Hinjewadi, Pune - 411057', isDefault: false },
  ]);

  const [newAddr, setNewAddr] = useState({ tag: '', address: '', area: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const totalSpent = bookings.filter(b => b.status === 'COMPLETED').reduce((s: number, b: any) => s + (b.totalAmount ?? 0), 0);
  const completedCount = bookings.filter(b => b.status === 'COMPLETED').length;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addAddress = () => {
    if (!newAddr.tag || !newAddr.address) return;
    setAddresses(prev => [...prev, { ...newAddr, id: `addr-${Date.now()}`, isDefault: false }]);
    setNewAddr({ tag: '', address: '', area: '' });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-coop-900 to-emerald-900 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-black shrink-0">
            {(authUser?.name ?? 'C').charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-black font-display">{authUser?.name ?? 'Customer'}</h1>
            <p className="text-emerald-300 text-sm flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Sahyog Customer
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: 'Bookings', value: bookings.length },
            { label: 'Completed', value: completedCount },
            { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}` },
          ].map(s => (
            <div key={s.label} className="bg-white/10 rounded-2xl p-3 text-center">
              <p className="text-lg font-black">{s.value}</p>
              <p className="text-[10px] text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white border border-surface-200 rounded-3xl p-5 shadow-card space-y-4">
        <h2 className="text-sm font-bold text-surface-900">Contact Information</h2>
        {[
          { icon: Phone, label: 'Mobile', value: authUser?.phone ?? '—' },
          { icon: Mail, label: 'Email', value: '—' },
        ].map(f => {
          const Icon = f.icon;
          return (
            <div key={f.label} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-surface-100 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-surface-500" />
              </div>
              <div>
                <p className="text-[10px] text-surface-400 font-medium">{f.label}</p>
                <p className="text-xs font-bold text-surface-800">{f.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Language Preference */}
      <div className="bg-white border border-surface-200 rounded-3xl p-5 shadow-card">
        <h2 className="text-sm font-bold text-surface-900 mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-surface-500" /> Language Preference
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => setLanguage(l.code)}
              className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                language === l.code
                  ? 'border-coop-600 bg-coop-50 text-coop-800 shadow-sm'
                  : 'border-surface-200 bg-white text-surface-600 hover:bg-surface-50'
              }`}>
              {l.label}
              {language === l.code && <CheckCircle2 className="w-3.5 h-3.5 inline ml-1.5 text-coop-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="bg-white border border-surface-200 rounded-3xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-surface-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-surface-500" /> Saved Addresses
          </h2>
          <button onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 text-xs font-bold text-coop-700 hover:text-coop-900 transition-colors">
            <Plus className="w-3.5 h-3.5" />{showAddForm ? 'Cancel' : 'Add'}
          </button>
        </div>

        <div className="space-y-2">
          {addresses.map(addr => (
            <div key={addr.id} className="flex items-start justify-between p-3 bg-surface-50 rounded-xl">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-surface-200 rounded-lg mt-0.5">
                  {addr.tag === 'Home' ? <Home className="w-3.5 h-3.5 text-surface-600" /> : <Briefcase className="w-3.5 h-3.5 text-surface-600" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-surface-900">{addr.tag}</p>
                    {addr.isDefault && <span className="text-[9px] font-bold bg-coop-100 text-coop-700 px-1.5 py-0.5 rounded">Default</span>}
                  </div>
                  <p className="text-[10px] text-surface-600 mt-0.5">{addr.address}</p>
                  <p className="text-[10px] text-surface-400">{addr.area}</p>
                </div>
              </div>
              <button onClick={() => setAddresses(a => a.filter(x => x.id !== addr.id))}
                className="p-1.5 text-surface-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {showAddForm && (
          <div className="mt-3 p-4 bg-surface-50 rounded-xl border border-surface-200 space-y-2">
            <input value={newAddr.tag} onChange={e => setNewAddr(n => ({...n, tag: e.target.value}))}
              placeholder="Label (e.g. Home, Office)" className="w-full text-xs border border-surface-200 rounded-xl p-2.5 focus:outline-none focus:border-coop-600" />
            <input value={newAddr.address} onChange={e => setNewAddr(n => ({...n, address: e.target.value}))}
              placeholder="Full address" className="w-full text-xs border border-surface-200 rounded-xl p-2.5 focus:outline-none focus:border-coop-600" />
            <input value={newAddr.area} onChange={e => setNewAddr(n => ({...n, area: e.target.value}))}
              placeholder="Area, City - Pincode" className="w-full text-xs border border-surface-200 rounded-xl p-2.5 focus:outline-none focus:border-coop-600" />
            <button onClick={addAddress}
              className="w-full py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />Save Address
            </button>
          </div>
        )}
      </div>

      {/* Cooperative Info */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-xs text-emerald-900">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-4 h-4 text-emerald-600" />
          <p className="font-bold">About Your Cooperative Network</p>
        </div>
        <p className="text-surface-600 leading-relaxed">
          Every booking you make supports the cooperative worker economy. 80% of your payment goes directly to the worker.
          10% funds worker welfare (insurance, upskilling), 5% builds cooperative capital, and 5% covers platform operations.
          No venture capital extraction — your payments empower workers directly.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl transition-colors shadow-md">
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Profile'}
        </button>
        <button onClick={logout}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-50 transition-colors">
          <LogOut className="w-4 h-4" />Logout
        </button>
      </div>
    </div>
  );
};
