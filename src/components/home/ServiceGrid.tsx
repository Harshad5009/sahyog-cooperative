import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  Zap, 
  Hammer, 
  Paintbrush, 
  Sparkles, 
  Tv, 
  Trees, 
  HeartHandshake, 
  Car, 
  ShieldCheck, 
  Camera, 
  Building2, 
  ArrowRight 
} from 'lucide-react';
import { MOCK_SERVICES } from '../../data/mockServices';
import { useLanguage } from '../../context/LanguageContext';

export const ServiceGrid: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const iconMap: Record<string, React.ReactNode> = {
    Wrench: <Wrench className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Hammer: <Hammer className="w-5 h-5" />,
    Paintbrush: <Paintbrush className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Tv: <Tv className="w-5 h-5" />,
    Trees: <Trees className="w-5 h-5" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5" />,
    Car: <Car className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
    Camera: <Camera className="w-5 h-5" />,
    Building2: <Building2 className="w-5 h-5" />,
  };

  const textDict = {
    en: {
      badge: 'Cooperative Certified Services',
      heading: 'What do you need help with?',
      subheading: '12+ standardized service disciplines delivered by registered cooperative societies with guaranteed rate transparency.',
      startingFrom: 'Starting from',
      bookNow: 'Book Now',
      popular: 'Popular',
    },
    hi: {
      badge: 'सहकारी प्रमाणित सेवाएँ',
      heading: 'आपको किस सेवा की आवश्यकता है?',
      subheading: 'पंजीकृत सहकारी समितियों द्वारा प्रदान की जाने वाली १२+ मानकीकृत सेवाएँ, पारदर्शी दरों के साथ।',
      startingFrom: 'न्यूनतम शुल्क',
      bookNow: 'अभी बुक करें',
      popular: 'लोकप्रिय',
    },
    mr: {
      badge: 'सहकारी प्रमाणित सेवा',
      heading: 'तुम्हाला कोणत्या सेवेची गरज आहे?',
      subheading: 'नोंदणीकृत सहकारी संस्थांकडून दिली जाणारी १२+ दर्जेदार कामे, संपूर्ण पारदर्शक दरांसह.',
      startingFrom: 'किमान शुल्क',
      bookNow: 'आता बुक करा',
      popular: 'लोकप्रिय',
    },
  };

  const t = textDict[language] || textDict.en;

  const handleServiceSelect = (serviceId: string) => {
    navigate('/customer/book', { state: { initialCategory: serviceId } });
  };

  return (
    <section className="py-20 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-3">
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-coop-950 tracking-tight font-display">
              {t.heading}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-surface-500 max-w-md">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_SERVICES.map(service => {
            const displayName = 
              language === 'hi' ? (service.nameHi || service.name) : 
              language === 'mr' ? (service.nameMr || service.name) : 
              service.name;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-surface-200/80 p-5 shadow-card hover:shadow-elevated hover:border-coop-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-coop-50 border border-coop-200/60 text-coop-700 flex items-center justify-center group-hover:bg-coop-900 group-hover:text-white transition-colors duration-200">
                      {iconMap[service.icon] || <Wrench className="w-5 h-5" />}
                    </div>
                    {service.popular && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                        {t.popular}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-surface-900 mb-1 group-hover:text-coop-800 transition-colors">
                    {displayName}
                  </h3>

                  <p className="text-xs text-surface-500 line-clamp-2 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-surface-400 block font-medium">{t.startingFrom}</span>
                    <span className="text-sm font-extrabold text-surface-900 font-display">
                      ₹{service.basePrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handleServiceSelect(service.id)}
                    className="px-3 py-1.5 bg-coop-50 hover:bg-coop-900 text-coop-800 hover:text-white text-xs font-bold rounded-xl border border-coop-200 hover:border-coop-900 transition-all flex items-center gap-1 shadow-xs"
                  >
                    <span>{t.bookNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
