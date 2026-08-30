import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, ChevronDown, Menu, X, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { SupportedLanguage } from '../../data/mockTranslations';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'For Workers', to: '/for-workers' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/about' },
];

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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white">
                <circle cx="16" cy="10" r="4" />
                <circle cx="8"  cy="20" r="3" />
                <circle cx="24" cy="20" r="3" />
                <path d="M16 14 L8 17 M16 14 L24 17" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="text-lg font-black text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Sahyog
              </span>
              <span className="text-[10px] text-green-600 font-semibold block -mt-0.5">
                Cooperative Services
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? 'text-green-700 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <div className="h-0.5 bg-green-600 rounded-full mt-0.5" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">
                  {LANGUAGES.find(l => l.code === language)?.label ?? 'English'}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === l.code
                          ? 'text-green-700 font-semibold bg-green-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login / Sign Up */}
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <User className="w-4 h-4" />
              Login / Sign Up
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-2">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-green-50 text-green-700 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
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
                    onClick={() => setLanguage(l.code)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all ${
                      language === l.code
                        ? 'bg-green-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Login / Sign Up Button */}
            <div className="pt-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl shadow-xs"
              >
                <User className="w-4 h-4" />
                <span>Login / Sign Up</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
