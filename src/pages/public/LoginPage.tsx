import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'customer' | 'worker' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'customer') navigate('/customer/dashboard');
    else if (role === 'worker') navigate('/worker/dashboard');
    else navigate('/admin/dashboard');
  };

  const roleRoutes = { customer: '/customer/dashboard', worker: '/worker/dashboard', admin: '/admin/dashboard' };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
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
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">Sign in to your Sahyog account</p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-1.5 bg-gray-100 rounded-xl p-1 mb-6">
            {([['customer', '👤 Customer'], ['worker', '👷 Worker'], ['admin', '🏛️ Admin']] as const).map(([r, label]) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  role === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email / Phone</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@federation.coop' : role === 'worker' ? 'worker@email.com' : 'you@email.com'}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-gray-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs font-semibold text-green-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              onClick={() => navigate(roleRoutes[role])}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-green-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>

        {/* Demo shortcuts */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800">
          <p className="font-bold mb-2">🎯 SIH 2026 Demo — Quick Access</p>
          <div className="flex flex-wrap gap-2">
            {(['customer', 'worker', 'admin'] as const).map(r => (
              <button
                key={r}
                onClick={() => navigate(roleRoutes[r])}
                className="px-3 py-1 bg-amber-100 hover:bg-amber-200 rounded-lg font-semibold capitalize transition-colors"
              >
                {r} Portal →
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
