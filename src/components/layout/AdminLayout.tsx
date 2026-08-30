import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, TrendingUp, Map, BarChart3, Shield, ShieldCheck, ArrowLeft, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationDropdown } from '../common/NotificationDropdown';

const navItems = [
  { name: 'Dashboard',  path: '/admin/dashboard',  icon: LayoutDashboard },
  { name: 'Workers',    path: '/admin/workers',    icon: Users },
  { name: 'Bookings',   path: '/admin/bookings',   icon: Briefcase },
  { name: 'Demand AI',  path: '/admin/demand',     icon: TrendingUp },
  { name: 'GIS Map',    path: '/admin/map',        icon: Map },
  { name: 'Analytics',  path: '/admin/analytics',  icon: BarChart3 },
  { name: 'Welfare',    path: '/admin/welfare',    icon: Shield },
];

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { aiRecommendations } = useApp();
  const unresolvedCount = aiRecommendations.filter(r => !r.resolved).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-green-400" />
            </div>
            <span className="font-black text-gray-900 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Sahyog</span>
          </Link>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
            Federation Admin
          </span>
        </div>

        <div className="flex items-center gap-2">
          {unresolvedCount > 0 && (
            <Link
              to="/admin/demand"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold rounded-lg"
            >
              <Bell className="w-3.5 h-3.5" />
              {unresolvedCount} AI Alert{unresolvedCount > 1 ? 's' : ''}
            </Link>
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
          <div className="bg-gray-900 rounded-2xl p-4 text-center">
            <ShieldCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-white">Maharashtra Labour</p>
            <p className="text-[10px] text-gray-400">Cooperative Federation</p>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-[10px] text-gray-500">Pune Central Command</p>
            </div>
          </div>

          <nav className="bg-white rounded-2xl border border-gray-200 p-2 flex flex-col gap-0.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const hasAlert = item.path === '/admin/demand' && unresolvedCount > 0;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {hasAlert && (
                    <span className="w-5 h-5 text-[10px] font-black bg-amber-500 text-white rounded-full flex items-center justify-center">
                      {unresolvedCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-green-800 mb-1">Platform Status</p>
            <div className="space-y-1.5 text-xs text-green-700">
              <div className="flex justify-between"><span>Workers Online</span><span className="font-bold">1,240</span></div>
              <div className="flex justify-between"><span>Jobs Today</span><span className="font-bold">486</span></div>
              <div className="flex justify-between"><span>Utilization</span><span className="font-bold text-green-600">78%</span></div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 flex">
        {navItems.slice(0, 5).map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center gap-1 py-2 text-[10px] font-semibold transition-colors ${
                isActive ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
