import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, ShieldCheck, ArrowRight, CheckCircle2, Phone, KeyRound, User, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type Step = 'info' | 'otp';

export const SignupPage: React.FC = () => {
  const { sendOtp, register, authLoading, authError } = useAuth();
  const navigate = useNavigate();

  const [roleType, setRoleType] = useState<'CUSTOMER' | 'WORKER'>('CUSTOMER');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');
  const [step, setStep] = useState<Step>('info');
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (name.trim().length < 2) { setLocalError('Enter your full name (at least 2 characters)'); return; }
    if (!/^[6-9]\d{9}$/.test(phone)) { setLocalError('Enter a valid 10-digit Indian mobile number'); return; }
    const res = await sendOtp(phone, 'REGISTER') as any;
    if (res) {
      if (res.devOtp) setDevOtp(res.devOtp);
      setStep('otp');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (otp.length !== 6) { setLocalError('Enter the 6-digit OTP'); return; }
    const result = await register({ phone, otp, name: name.trim(), role: roleType, languagePreference: lang });
    if (result.success) {
      navigate(roleType === 'CUSTOMER' ? '/customer/dashboard' : '/worker/dashboard');
    } else {
      setLocalError(result.error ?? 'Registration failed');
    }
  };

  return (
    <div className="pt-28 pb-20 bg-surface-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-coop-900 flex items-center justify-center text-white mx-auto mb-3 shadow-md">
              <Users className="w-6 h-6 text-emerald-300" />
            </div>
            <h1 className="text-2xl font-black text-coop-950 font-display">
              {step === 'info' ? 'Create Sahyog Account' : 'Verify Your Number'}
            </h1>
            <p className="text-xs text-surface-500 mt-1">
              {step === 'info' ? 'Join the democratic cooperative gig network.' : `OTP sent to +91 ${phone}`}
            </p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-2 p-1 bg-surface-100 rounded-xl mb-4 text-xs font-bold">
            <button type="button" onClick={() => setRoleType('CUSTOMER')}
              className={`flex-1 py-2 rounded-lg transition-all ${roleType === 'CUSTOMER' ? 'bg-white text-coop-900 shadow-xs' : 'text-surface-600'}`}>
              Household Customer
            </button>
            <button type="button" onClick={() => setRoleType('WORKER')}
              className={`flex-1 py-2 rounded-lg transition-all ${roleType === 'WORKER' ? 'bg-white text-coop-900 shadow-xs' : 'text-surface-600'}`}>
              Cooperative Worker
            </button>
          </div>

          {/* Error */}
          {(localError || authError) && (
            <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{localError || authError}</span>
            </div>
          )}

          {/* Step 1: Info */}
          {step === 'info' && (
            <form onSubmit={handleSendOtp} className="space-y-3 text-xs">
              <div>
                <label className="text-xs font-bold text-surface-800 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" required placeholder="Your full name" value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-9 p-3 focus:outline-none focus:border-coop-600" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-surface-800 block mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="tel" required placeholder="98XXXXXXXX" maxLength={10}
                    value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,'').slice(0,10))}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-9 p-3 focus:outline-none focus:border-coop-600" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-surface-800 block mb-1">Preferred Language</label>
                <select value={lang} onChange={e => setLang(e.target.value as any)}
                  className="w-full bg-surface-50 border border-surface-200 rounded-xl p-3 focus:outline-none focus:border-coop-600 cursor-pointer">
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="mr">मराठी</option>
                </select>
              </div>
              <button type="submit" disabled={authLoading}
                className="w-full py-3 bg-coop-900 hover:bg-coop-800 disabled:opacity-60 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 mt-4">
                {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Send OTP</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <form onSubmit={handleRegister} className="space-y-3 text-xs">
              {devOtp && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Dev OTP: <strong className="font-mono text-sm">{devOtp}</strong></span>
                </div>
              )}
              <div>
                <label className="text-xs font-bold text-surface-800 block mb-1">6-Digit OTP</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                    placeholder="123456" maxLength={6}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-9 p-3 focus:outline-none focus:border-coop-600 tracking-[0.5em] font-mono" />
                </div>
              </div>
              <button type="submit" disabled={authLoading}
                className="w-full py-3 bg-coop-900 hover:bg-coop-800 disabled:opacity-60 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 mt-4">
                {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Verify & Register</span><ArrowRight className="w-4 h-4" /></>}
              </button>
              <button type="button" onClick={() => { setStep('info'); setOtp(''); }} className="w-full text-xs text-gray-500 hover:text-gray-700 font-medium text-center">
                ← Edit details
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-surface-100 text-center text-xs text-surface-500 mt-4">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-coop-800 hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
