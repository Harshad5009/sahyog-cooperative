import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, ChevronDown, Menu, X, User, Siren, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import type { SupportedLanguage } from '../../data/mockTranslations';

const LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { currentRole, setCurrentRole } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.services, to: '/services' },
    { label: t.nav.howItWorks, to: '/how-it-works' },
    { label: t.nav.forWorkers, to: '/for-workers' },
    { label: t.nav.forCooperatives, to: '/for-cooperatives' },
    { label: t.nav.aboutUs, to: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-surface-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 bg-coop-900 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white">
                <circle cx="16" cy="10" r="4" />
                <circle cx="8"  cy="20" r="3" />
                <circle cx="24" cy="20" r="3" />
                <path d="M16 14 L8 17 M16 14 L24 17" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-surface-950 font-display tracking-tight">
                  {t.appName}
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  SIH 2026
                </span>
              </div>
              <span className="text-[10px] text-coop-700 font-semibold block -mt-0.5">
                Labour Cooperative Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                  location.pathname === link.to
                    ? 'text-coop-900 bg-coop-50 font-bold'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Prominent Emergency SOS Button */}
            <Link
              to="/emergency"
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-rose-900/20 flex items-center gap-1.5 active:scale-95 animate-pulse"
              title="24/7 Rapid Emergency Dispatch"
            >
              <Siren className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.nav.emergency}</span>
              <span className="sm:hidden">SOS</span>
            </Link>

            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-surface-700 hover:text-surface-900 rounded-xl hover:bg-surface-100 transition-colors border border-surface-200 font-medium"
              >
                <Globe className="w-3.5 h-3.5 text-surface-500" />
                <span>
                  {LANGUAGES.find(l => l.code === language)?.label ?? 'English'}
                </span>
                <ChevronDown className="w-3 h-3 text-surface-400" />
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-surface-200 rounded-2xl shadow-xl py-1.5 z-50 animate-scale-up">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors ${
                        language === l.code
                          ? 'text-coop-900 font-bold bg-coop-50'
                          : 'text-surface-700 hover:bg-surface-50'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Portals Quick Links */}
            <div className="hidden xl:flex items-center gap-1 bg-surface-100 p-1 rounded-xl border border-surface-200 text-[11px]">
              <Link 
                to="/customer/dashboard" 
                onClick={() => setCurrentRole('customer')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                  currentRole === 'customer' && location.pathname.startsWith('/customer')
                    ? 'bg-white text-surface-900 shadow-xs'
                    : 'text-surface-600 hover:text-surface-900'
                }`}
              >
                Customer
              </Link>
              <Link 
                to="/worker/dashboard" 
                onClick={() => setCurrentRole('worker')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                  currentRole === 'worker' && location.pathname.startsWith('/worker')
                    ? 'bg-white text-surface-900 shadow-xs'
                    : 'text-surface-600 hover:text-surface-900'
                }`}
              >
                Worker
              </Link>
              <Link 
                to="/admin/dashboard" 
                onClick={() => setCurrentRole('admin')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                  currentRole === 'admin' && location.pathname.startsWith('/admin')
                    ? 'bg-white text-surface-900 shadow-xs'
                    : 'text-surface-600 hover:text-surface-900'
                }`}
              >
                Admin
              </Link>
            </div>

            {/* Login / Dashboard Link */}
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.nav.login}</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-surface-100 text-surface-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="lg:hidden pb-4 border-t border-surface-200 pt-3 space-y-2 animate-fade-in">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-xs rounded-xl font-semibold transition-colors ${
                  location.pathname === link.to
                    ? 'bg-coop-50 text-coop-900 font-bold'
                    : 'text-surface-700 hover:bg-surface-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Emergency SOS Mobile Pill */}
            <Link
              to="/emergency"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md"
            >
              <Siren className="w-4 h-4" />
              <span>{t.emergencyTitle}</span>
            </Link>

            {/* Mobile Language Switcher */}
            <div className="pt-2 border-t border-surface-100 flex items-center justify-between px-3">
              <span className="text-xs font-semibold text-surface-500 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Language
              </span>
              <div className="flex gap-1">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all ${
                      language === l.code
                        ? 'bg-coop-900 text-white shadow-xs'
                        : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Portals Quick Jump */}
            <div className="pt-2 border-t border-surface-100 grid grid-cols-3 gap-1.5">
              <Link
                to="/customer/dashboard"
                onClick={() => { setCurrentRole('customer'); setMenuOpen(false); }}
                className="py-2 text-center text-xs font-semibold bg-surface-100 rounded-xl text-surface-800"
              >
                Customer App
              </Link>
              <Link
                to="/worker/dashboard"
                onClick={() => { setCurrentRole('worker'); setMenuOpen(false); }}
                className="py-2 text-center text-xs font-semibold bg-surface-100 rounded-xl text-surface-800"
              >
                Worker App
              </Link>
              <Link
                to="/admin/dashboard"
                onClick={() => { setCurrentRole('admin'); setMenuOpen(false); }}
                className="py-2 text-center text-xs font-semibold bg-surface-100 rounded-xl text-surface-800"
              >
                Admin Federation
              </Link>
            </div>

            {/* Mobile Login Button */}
            <div className="pt-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                <User className="w-4 h-4" />
                <span>{t.nav.login} / Register</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
