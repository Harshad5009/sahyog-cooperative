import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, Calendar, PlusCircle, CreditCard, User, ShieldCheck, ArrowLeft, Bell } from 'lucide-react';
import { NotificationDropdown } from '../common/NotificationDropdown';

const navItems = [
  { name: 'Dashboard',    path: '/customer/dashboard', icon: Home },
  { name: 'Book Service', path: '/customer/book',      icon: PlusCircle },
  { name: 'My Bookings',  path: '/customer/bookings',  icon: Calendar },
  { name: 'Payments',     path: '/customer/payments',  icon: CreditCard },
  { name: 'My Profile',   path: '/customer/profile',   icon: User },
];

export const CustomerLayout: React.FC = () => {
  const location = useLocation();
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
          <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
            Customer Portal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/customer/book"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" /> New Booking
          </Link>
          <NotificationDropdown />
          <Link to="/" className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100" title="Back to Site">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-52 shrink-0 gap-4">
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

          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
              <span className="text-xs font-bold text-green-800">Cooperative Guarantee</span>
            </div>
            <p className="text-xs text-green-700 leading-relaxed">
              Every booking supports verified cooperative workers with fair wages & insurance.
            </p>
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
              <span>{item.name.replace('My ', '').split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
