import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, ChevronDown, Menu, X, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { SupportedLanguage } from '../../data/mockTranslations';

const LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'For Workers', to: '/for-workers' },
    { label: 'For Cooperatives', to: '/for-cooperatives' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Contact', to: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-150 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            {/* Custom Cooperative Leaf Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-xs text-white">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-currentColor stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            
            <div className="leading-tight">
              <span className="text-2xl font-black text-gray-900 tracking-tight font-display">
                Sahyog
              </span>
              <span className="text-[10px] text-gray-400 font-medium block -mt-0.5 whitespace-nowrap">
                Trusted Services. Fair Work. Stronger Cooperatives.
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className={`text-[13px] font-semibold transition-colors relative py-1 ${
                    isActive
                      ? 'text-teal-700 font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-700 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            
            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 border border-gray-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span>{LANGUAGES.find(l => l.code === language)?.label ?? 'English'}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-32 bg-white border border-gray-200 rounded-2xl shadow-xl py-1 z-50 animate-scale-up">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors ${
                        language === l.code ? 'text-teal-700 font-bold bg-teal-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login (Outline Button) */}
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 border border-gray-300 hover:border-gray-400 text-gray-800 text-xs font-bold rounded-xl transition-all hover:bg-gray-50"
            >
              Login
            </Link>

            {/* Sign Up (Solid Green Button) */}
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Sign Up
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="xl:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="xl:hidden py-4 border-t border-gray-100 space-y-2 animate-fade-in">
            {navLinks.map(link => (
              <Link
                key={link.to + link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-xs font-semibold rounded-xl ${
                  location.pathname === link.to ? 'bg-teal-50 text-teal-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between px-3">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Language
              </span>
              <div className="flex gap-1">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all ${
                      language === l.code ? 'bg-teal-700 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Auth Links */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-center text-xs font-bold border border-gray-300 rounded-xl text-gray-800"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-center text-xs font-bold bg-teal-700 text-white rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
