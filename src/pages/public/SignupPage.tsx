import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SignupPage: React.FC = () => {
  const { setCurrentRole } = useApp();
  const navigate = useNavigate();
  const [roleType, setRoleType] = useState<'customer' | 'worker'>('customer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole(roleType);
    if (roleType === 'customer') navigate('/customer/dashboard');
    else navigate('/worker/dashboard');
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
              Create Sahyog Account
            </h1>
            <p className="text-xs text-surface-500 mt-1">
              Join the democratic cooperative gig network.
            </p>
          </div>

          <div className="flex gap-2 p-1 bg-surface-100 rounded-xl mb-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => setRoleType('customer')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                roleType === 'customer' ? 'bg-white text-coop-900 shadow-xs' : 'text-surface-600'
              }`}
            >
              Household Customer
            </button>
            <button
              type="button"
              onClick={() => setRoleType('worker')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                roleType === 'worker' ? 'bg-white text-coop-900 shadow-xs' : 'text-surface-600'
              }`}
            >
              Cooperative Worker
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-3 text-xs">
            <div>
              <label className="text-xs font-bold text-surface-800 block mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-50 border border-surface-200 rounded-xl p-3 focus:outline-none focus:border-coop-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-surface-800 block mb-1">Mobile Number (OTP Verification)</label>
              <input
                type="tel"
                required
                placeholder="+91 98XXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-surface-50 border border-surface-200 rounded-xl p-3 focus:outline-none focus:border-coop-600"
              />
            </div>

            {roleType === 'worker' && (
              <div>
                <label className="text-xs font-bold text-surface-800 block mb-1">Registered Cooperative Society</label>
                <select className="w-full bg-surface-50 border border-surface-200 rounded-xl p-3 focus:outline-none focus:border-coop-600 cursor-pointer">
                  <option>Pune Labour Cooperative Society Ltd.</option>
                  <option>Maharashtra Mahila Kamgar Sahakari Sanstha</option>
                  <option>Kothrud Shramik Sahakari Mandal</option>
                  <option>Sahyadri Motor Kamgar Sahakari Sanstha</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-coop-900 hover:bg-coop-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 mt-4"
            >
              <span>Register & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-surface-100 text-center text-xs text-surface-500 mt-4">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-coop-800 hover:underline">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
