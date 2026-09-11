import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, ChevronDown, Menu, X, Leaf, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { SupportedLanguage } from '../../data/mockTranslations';

const LANGUAGES: { code: SupportedLanguage; label: string; subLabel: string }[] = [
  { code: 'en', label: 'English', subLabel: 'English' },
  { code: 'hi', label: 'हिन्दी', subLabel: 'Hindi' },
  { code: 'mr', label: 'मराठी', subLabel: 'Marathi' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.aboutUs, to: '/about' },
    { label: t.nav.services, to: '/services' },
    { label: t.nav.forWorkers, to: '/for-workers' },
    { label: t.nav.forCooperatives, to: '/for-cooperatives' },
    { label: t.nav.howItWorks, to: '/how-it-works' },
  ];

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            {/* Custom Cooperative Leaf Logo with visible Lucide Leaf icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xs text-white shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-5 h-5 text-white" strokeWidth={2.3} />
            </div>
            
            <div className="leading-tight">
              <span className="text-2xl font-black text-gray-900 tracking-tight font-display">
                {t.appName}
              </span>
              <span className="text-[10px] text-teal-800/80 font-medium block -mt-0.5 whitespace-nowrap">
                {t.tagline}
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
            
            {/* Language Selector Dropdown */}
            <div className="relative hidden sm:block" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 border border-gray-200 transition-colors shadow-xs"
                aria-label="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-teal-700" />
                <span>{currentLang.label}</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-40 bg-white border border-gray-200 rounded-2xl shadow-xl py-1.5 z-50 animate-scale-up">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 mb-1">
                    Select Language / भाषा
                  </div>
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { 
                        setLanguage(l.code); 
                        setLangOpen(false); 
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
                        language === l.code 
                          ? 'text-teal-800 font-bold bg-teal-50/80' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div>
                        <span className="block font-medium">{l.label}</span>
                        <span className="text-[10px] text-gray-400">{l.subLabel}</span>
                      </div>
                      {language === l.code && (
                        <Check className="w-3.5 h-3.5 text-teal-700 stroke-[2.5]" />
                      )}
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
              {t.nav.login}
            </Link>

            {/* Sign Up (Solid Green Button) */}
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              {t.nav.signup}
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
                <Globe className="w-3.5 h-3.5 text-teal-700" /> भाषा / Language
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
                {t.nav.login}
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-center text-xs font-bold bg-teal-700 text-white rounded-xl"
              >
                {t.nav.signup}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
