import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, Leaf, Heart, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  const footerTexts = {
    en: {
      desc: "India's democratic cooperative-owned service marketplace. Fair wages, verified workers, transparent pricing, and zero private commissions.",
      regText: 'Registered under Maharashtra Cooperative Societies Act',
      quickLinks: 'Quick Links',
      popularDisc: 'Popular Disciplines',
      contact: 'Federation Contact',
      copyright: '© 2026 Sahyog Labour Cooperative Societies Federation. SIH Final Evaluation.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      charter: 'Cooperative Charter',
    },
    hi: {
      desc: 'भारत का लोकतांत्रिक सहकारी सेवा मंच। न्यायसंगत पारिश्रमिक, सत्यापित श्रमिक, पारदर्शी दरें एवं शून्य निजी बिचौलिया कमीशन।',
      regText: 'महाराष्ट्र सहकारी संस्था अधिनियम के तहत पंजीकृत',
      quickLinks: 'त्वरित लिंक',
      popularDisc: 'लोकप्रिय सेवाएँ',
      contact: 'महासंघ संपर्क',
      copyright: '© २०२६ सहयोग श्रम सहकारी समिति महासंघ। SIH अंतिम मूल्यांकन।',
      privacy: 'गोपनीयता नीति',
      terms: 'नियम व शर्तें',
      charter: 'सहकारी घोषणापत्र',
    },
    mr: {
      desc: 'भारताची लोकशाही कामगार सहकारी सेवा प्रणाली. न्याय्य वेतन, अधिकृत कामगार, पारदर्शक दर आणि शून्य खासगी कमिशन.',
      regText: 'महाराष्ट्र सहकारी संस्था कायद्यांतर्गत नोंदणीकृत',
      quickLinks: 'महत्त्वाचे दुवे',
      popularDisc: 'लोकप्रिय सेवा प्रकार',
      contact: 'महासंघ संपर्क',
      copyright: '© २०२६ सहयोग कामगार सहकारी संस्था महासंघ. SIH अंतिम मूल्यांकन.',
      privacy: 'गोपनीयता धोरण',
      terms: 'नियम व अटी',
      charter: 'सहकारी सनद',
    },
  };

  const f = footerTexts[language] || footerTexts.en;

  const quickLinksList = [
    { name: t.nav.home, to: '/' },
    { name: t.nav.aboutUs, to: '/about' },
    { name: t.nav.services, to: '/services' },
    { name: t.nav.forWorkers, to: '/for-workers' },
    { name: t.nav.forCooperatives, to: '/for-cooperatives' },
    { name: t.nav.howItWorks, to: '/how-it-works' },
  ];

  return (
    <footer className="bg-teal-950 text-teal-100/80 border-t border-teal-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-xs">
                <Leaf className="w-4 h-4 text-white" strokeWidth={2.3} />
              </div>
              <div className="leading-tight">
                <span className="font-black text-white text-base font-display">{t.appName}</span>
                <span className="text-[10px] text-teal-300 font-medium block -mt-0.5">{t.tagline}</span>
              </div>
            </div>
            <p className="text-xs text-teal-200/70 leading-relaxed">
              {f.desc}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-teal-300 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{f.regText}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">{f.quickLinks}</h4>
            <ul className="space-y-2 text-xs">
              {quickLinksList.map(item => (
                <li key={item.to + item.name}>
                  <Link to={item.to} className="hover:text-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Services */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">{f.popularDisc}</h4>
            <ul className="space-y-2 text-xs">
              {['Electrical Systems', 'Plumbing & Water', 'Carpentry & Woodwork', 'Deep Cleaning', 'Painting & Damp Proofing', 'Elderly Caregiving'].map(s => (
                <li key={s}>
                  <Link to="/services" className="hover:text-white transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">{f.contact}</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2 text-teal-200/70">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>Sahyog Federation HQ, Paud Road, Kothrud, Pune 411038</span>
              </li>
              <li className="flex items-center gap-2 text-teal-200/70">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+91 20 2567 9941 / Toll-Free 1800-266-7249</span>
              </li>
              <li className="flex items-center gap-2 text-teal-200/70">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>support@sahyog.coop</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-teal-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-300/60">
          <span>{f.copyright}</span>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white">{f.privacy}</Link>
            <Link to="/about" className="hover:text-white">{f.terms}</Link>
            <Link to="/about" className="hover:text-white">{f.charter}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
