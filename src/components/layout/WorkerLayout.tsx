import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, Briefcase, DollarSign, Award, Shield, User, ShieldCheck, ArrowLeft, ToggleLeft, ToggleRight, Siren } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationDropdown } from '../common/NotificationDropdown';

const navItems = [
  { name: 'Dashboard',  path: '/worker/dashboard', icon: Home },
  { name: 'My Jobs',    path: '/worker/jobs',      icon: Briefcase },
  { name: 'Earnings',   path: '/worker/earnings',  icon: DollarSign },
  { name: 'Skills',     path: '/worker/skills',    icon: Award },
  { name: 'Welfare',    path: '/worker/welfare',   icon: Shield },
  { name: 'Profile',    path: '/worker/profile',   icon: User },
];

export const WorkerLayout: React.FC = () => {
  const location = useLocation();
  const { activeWorker, bookings } = useApp();
  const [online, setOnline] = useState(true);
  const activeJobs = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-gray-900 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Sahyog</span>
          </Link>
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            Worker Portal
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Online Toggle */}
          <button
            onClick={() => setOnline(!online)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              online
                ? 'bg-green-50 text-green-700 border-green-300'
                : 'bg-gray-100 text-gray-500 border-gray-300'
            }`}
          >
            {online ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            {online ? 'Online' : 'Offline'}
          </button>

          {activeJobs.length > 0 && (
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-1 rounded-lg">
              {activeJobs.length} Active Job{activeJobs.length > 1 ? 's' : ''}
            </span>
          )}

          <NotificationDropdown />
          <Link to="/" className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-52 shrink-0 gap-4">
          {/* Worker info card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
            <img
              src={activeWorker.avatar}
              alt={activeWorker.name}
              className="w-14 h-14 rounded-xl object-cover mx-auto mb-2 border-2 border-green-200"
            />
            <p className="font-bold text-gray-900 text-sm">{activeWorker.name}</p>
            <p className="text-xs text-gray-500">{activeWorker.primarySkill}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className={`w-2 h-2 rounded-full ${online ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={`text-[10px] font-semibold ${online ? 'text-green-600' : 'text-gray-400'}`}>
                {online ? 'Available' : 'Offline'}
              </span>
            </div>
          </div>

          <nav className="bg-white rounded-2xl border border-gray-200 p-2 flex flex-col gap-0.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Welfare summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-blue-800 mb-1">Welfare Cover Active</p>
            <p className="text-xs text-blue-700">₹5 Lakh Health & Accident Insurance via Cooperative Society</p>
          </div>
        </aside>

        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 flex">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center gap-1 py-2 text-[10px] font-semibold transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
