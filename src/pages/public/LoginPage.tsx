import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Phone, KeyRound, ArrowRight, Users, UserCheck, Landmark, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type Step = 'phone' | 'otp';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { sendOtp, login, authLoading, authError } = useAuth();

  const [role, setRole] = useState<'customer' | 'worker' | 'admin'>('customer');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<Step>('phone');
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const roleRoutes = { customer: '/customer/dashboard', worker: '/worker/dashboard', admin: '/admin/dashboard' };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!/^[6-9]\d{9}$/.test(phone)) { setLocalError('Enter a valid 10-digit Indian mobile number'); return; }
    const res = await sendOtp(phone, 'LOGIN') as any;
    if (res) {
      if (res.devOtp) setDevOtp(res.devOtp);
      setStep('otp');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (otp.length !== 6) { setLocalError('Enter the 6-digit OTP'); return; }
    const result = await login(phone, otp);
    if (result.success) {
      navigate(roleRoutes[role]);
    } else {
      setLocalError(result.error ?? 'Login failed');
    }
  };

  const quickLogin = async (testPhone: string, testRole: 'customer' | 'worker' | 'admin') => {
    setRole(testRole);
    setPhone(testPhone);
    const res = await sendOtp(testPhone, 'LOGIN') as any;
    if (res) {
      const testOtp = res.devOtp ?? '123456';
      const result = await login(testPhone, testOtp);
      if (result.success) navigate(roleRoutes[testRole]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="font-black text-gray-900 text-lg block leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Sahyog</span>
                <span className="text-[10px] text-green-600 font-medium">Cooperative Services</span>
              </div>
            </Link>
            <h1 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {step === 'phone' ? 'Welcome back' : 'Enter OTP'}
            </h1>
            <p className="text-sm text-gray-500">
              {step === 'phone' ? 'Sign in via OTP on your mobile' : `OTP sent to +91 ${phone}`}
            </p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-1.5 bg-gray-100 rounded-xl p-1 mb-6">
            {([
              { id: 'customer', label: 'Customer', icon: Users },
              { id: 'worker', label: 'Worker', icon: UserCheck },
              { id: 'admin', label: 'Admin', icon: Landmark },
            ] as const).map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => setRole(item.id)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    role === item.id ? 'bg-white text-teal-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                  <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Error */}
          {(localError || authError) && (
            <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{localError || authError}</span>
            </div>
          )}

          {/* Step 1: Phone */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,'').slice(0,10))}
                    placeholder="98XXXXXXXX" maxLength={10}
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50" />
                </div>
              </div>
              <button type="submit" disabled={authLoading}
                className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
                {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Send OTP</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {devOtp && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Dev mode OTP: <strong className="font-mono text-sm">{devOtp}</strong></span>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">6-Digit OTP</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                    placeholder="123456" maxLength={6}
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 tracking-[0.5em] font-mono" />
                </div>
              </div>
              <button type="submit" disabled={authLoading}
                className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
                {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Verify & Sign In</span><ArrowRight className="w-4 h-4" /></>}
              </button>
              <button type="button" onClick={() => { setStep('phone'); setOtp(''); }} className="w-full text-xs text-gray-500 hover:text-gray-700 font-medium">
                ← Change number
              </button>
            </form>
          )}

          <p className="text-center text-xs text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-green-600 hover:underline">Register here</Link>
          </p>
        </div>

        {/* SIH Quick Access */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800">
          <div className="flex items-center gap-1.5 font-bold mb-3 text-amber-900">
            <CheckCircle2 className="w-4 h-4 text-amber-700" />
            <span>SIH 2026 Evaluation — One-Click Portal Access</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => quickLogin('9800000001', 'customer')} disabled={authLoading}
              className="py-2 px-3 bg-amber-100/80 hover:bg-amber-200 text-amber-950 rounded-lg font-bold transition-colors disabled:opacity-50">
              {authLoading ? '…' : 'Customer →'}
            </button>
            <button onClick={() => quickLogin('9800000100', 'worker')} disabled={authLoading}
              className="py-2 px-3 bg-amber-100/80 hover:bg-amber-200 text-amber-950 rounded-lg font-bold transition-colors disabled:opacity-50">
              {authLoading ? '…' : 'Worker →'}
            </button>
            <button onClick={() => quickLogin('9800000001', 'admin')} disabled={authLoading}
              className="py-2 px-3 bg-amber-100/80 hover:bg-amber-200 text-amber-950 rounded-lg font-bold transition-colors disabled:opacity-50">
              {authLoading ? '…' : 'Admin →'}
            </button>
          </div>
          <p className="text-[10px] text-amber-700 mt-2">Dev OTP auto-filled • Phone: 9800000001 (customer/admin) | 9800000100 (worker)</p>
        </div>
      </div>
    </div>
  );
};
