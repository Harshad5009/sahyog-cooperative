import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, Sprout, Heart, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-950 text-teal-100/80 border-t border-teal-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-xs">
                <Sprout className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <span className="font-black text-white text-base font-display">Sahyog</span>
                <span className="text-[10px] text-teal-300 font-medium block -mt-0.5">Cooperative Services</span>
              </div>
            </div>
            <p className="text-xs text-teal-200/70 leading-relaxed">
              India's democratic cooperative-owned service marketplace. Fair wages, verified workers, transparent pricing, and zero commissions.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-teal-300 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Registered under Maharashtra Cooperative Societies Act</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Home', to: '/' },
                { name: 'About Sahyog', to: '/about' },
                { name: 'Browse Services', to: '/services' },
                { name: 'For Workers', to: '/for-workers' },
                { name: 'For Cooperatives', to: '/for-cooperatives' },
                { name: 'How It Works', to: '/how-it-works' },
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.to} className="hover:text-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Services */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">Popular Disciplines</h4>
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
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3.5">Federation Contact</h4>
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
          <span>© 2026 Sahyog Labour Cooperative Societies Federation. SIH Final Evaluation.</span>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white">Terms of Service</Link>
            <Link to="/about" className="hover:text-white">Cooperative Charter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
