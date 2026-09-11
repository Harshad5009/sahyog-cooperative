import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Globe, 
  Home, 
  Briefcase, 
  Plus, 
  Trash2,
  Building2,
  Award
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { SupportedLanguage } from '../../data/mockTranslations';

interface SavedAddress {
  id: string;
  tag: string;
  address: string;
  area: string;
  isDefault: boolean;
}

export const CustomerProfilePage: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [name, setName] = useState('Pooja Sharma');
  const [phone, setPhone] = useState('+91 98900 12345');
  const [email, setEmail] = useState('pooja.sharma@pune.ac.in');
  const [primaryArea, setPrimaryArea] = useState('Kothrud, Pune');
  const [saved, setSaved] = useState(false);

  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: 'addr1',
      tag: 'Home',
      address: 'Flat 402, Rutuparna Apts, Paud Road',
      area: 'Kothrud, Pune - 411038',
      isDefault: true,
    },
    {
      id: 'addr2',
      tag: 'Office',
      address: 'Tech Park 4, Baner High Street',
      area: 'Baner, Pune - 411045',
      isDefault: false,
    },
    {
      id: 'addr3',
      tag: 'Parents',
      address: '12, Shanti Kunj, Near Deccan Gymkhana',
      area: 'Shivajinagar, Pune - 411004',
      isDefault: false,
    },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-surface-900 font-display">
          Customer Account & Preferences
        </h1>
        <p className="text-xs text-surface-500">
          Manage your verified credentials, saved addresses, language, and cooperative patron dividends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Avatar & Cooperative Membership */}
        <div className="space-y-4">
          <div className="bg-white border border-surface-200 rounded-3xl p-5 shadow-card text-center space-y-3">
            <div className="w-20 h-20 bg-coop-900 text-white rounded-3xl flex items-center justify-center text-2xl font-black mx-auto shadow-md">
              PS
            </div>
            <div>
              <h2 className="font-bold text-surface-900 text-base">{name}</h2>
              <p className="text-xs text-surface-500">{email}</p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aadhaar Verified Citizen</span>
            </div>

            <div className="pt-3 border-t border-surface-100 text-left text-xs space-y-1.5 text-surface-600">
              <div className="flex justify-between">
                <span>Member Since:</span>
                <span className="font-bold text-surface-800">August 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Services Booked:</span>
                <span className="font-bold text-surface-800">14 Jobs</span>
              </div>
              <div className="flex justify-between">
                <span>Patronage Dividend:</span>
                <span className="font-bold text-emerald-700">₹640 Credited</span>
              </div>
            </div>
          </div>

          {/* Preferred Language Card */}
          <div className="bg-white border border-surface-200 rounded-3xl p-5 shadow-card space-y-3 text-xs">
            <h3 className="font-bold text-surface-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-coop-700" />
              <span>Preferred Communication Language</span>
            </h3>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'mr', label: 'मराठी' },
              ].map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code as SupportedLanguage)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    language === lang.code
                      ? 'bg-coop-900 text-white border-coop-900 shadow-xs'
                      : 'bg-surface-50 text-surface-700 border-surface-200 hover:bg-surface-100'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Profile Form & Saved Addresses */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Edit Form */}
          <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-surface-900">Personal Information</h3>
            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-surface-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 font-medium focus:outline-none focus:border-coop-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-surface-700 mb-1">Mobile Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 font-medium focus:outline-none focus:border-coop-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-surface-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 font-medium focus:outline-none focus:border-coop-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-surface-700 mb-1">Default Service Area</label>
                  <input
                    type="text"
                    value={primaryArea}
                    onChange={e => setPrimaryArea(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 font-medium focus:outline-none focus:border-coop-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-xs ${
                  saved ? 'bg-emerald-100 text-emerald-800' : 'bg-coop-900 hover:bg-coop-800 text-white'
                }`}
              >
                {saved ? '✓ Profile Preferences Saved' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Saved Addresses List */}
          <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-surface-900">Saved Addresses</h3>
                <p className="text-xs text-surface-500">Quick 1-tap selection during booking</p>
              </div>
            </div>

            <div className="space-y-3">
              {addresses.map(addr => (
                <div
                  key={addr.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${
                    addr.isDefault
                      ? 'bg-emerald-50/70 border-emerald-400'
                      : 'bg-surface-50 border-surface-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-xl border border-surface-200 shrink-0 text-coop-800">
                      {addr.tag === 'Home' ? <Home className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-surface-900">{addr.tag}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                            Default Address
                          </span>
                        )}
                      </div>
                      <p className="text-surface-600 mt-0.5">{addr.address}</p>
                      <p className="text-surface-400 text-[11px]">{addr.area}</p>
                    </div>
                  </div>

                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => setDefaultAddress(addr.id)}
                      className="px-3 py-1 bg-white hover:bg-surface-100 text-surface-700 rounded-lg border border-surface-200 font-semibold shrink-0"
                    >
                      Make Default
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
