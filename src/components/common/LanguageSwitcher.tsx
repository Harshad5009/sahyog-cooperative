import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { SupportedLanguage } from '../../data/mockTranslations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: SupportedLanguage; label: string; subLabel: string }[] = [
    { code: 'en', label: 'English', subLabel: 'English' },
    { code: 'hi', label: 'हिन्दी', subLabel: 'Hindi' },
    { code: 'mr', label: 'मराठी', subLabel: 'Marathi' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-surface-700 hover:text-coop-900 bg-surface-100 hover:bg-coop-50 rounded-xl border border-surface-200 transition-all"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-coop-700" />
        <span>{currentLangObj.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-elevated border border-surface-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-surface-400">
            Select Language / भाषा
          </div>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-coop-50 hover:text-coop-900 transition-colors"
            >
              <div>
                <p className="font-bold text-surface-800">{lang.label}</p>
                <p className="text-[10px] text-surface-400">{lang.subLabel}</p>
              </div>
              {language === lang.code && (
                <Check className="w-4 h-4 text-coop-600 font-bold shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
