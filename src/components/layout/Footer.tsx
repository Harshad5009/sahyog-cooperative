import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black text-white text-base">Sahyog</span>
                <span className="text-[10px] text-green-400 font-medium block -mt-0.5">Cooperative Services</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              India's first cooperative-owned service marketplace. Fair wages, verified workers, transparent pricing.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span>Registered under Maharashtra Cooperative Societies Act</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'Services', 'How It Works', 'For Workers', 'For Cooperatives', 'About Us'].map(l => (
                <li key={l}>
                  <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Popular Services</h4>
            <ul className="space-y-2 text-sm">
              {['Plumbing', 'Electrical Work', 'Deep Cleaning', 'Carpentry', 'Painting', 'Caregiving'].map(s => (
                <li key={s}>
                  <Link to="/services" className="text-gray-400 hover:text-green-400 transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>Sahyog Federation HQ, Kothrud, Pune, Maharashtra 411038</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                <span>+91 20 4567 8900</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-green-500 shrink-0" />
                <span>support@sahyog.coop</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© 2026 Sahyog Cooperative Services Federation. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/" className="hover:text-gray-300">Terms of Service</Link>
            <Link to="/" className="hover:text-gray-300">Cooperative Charter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
