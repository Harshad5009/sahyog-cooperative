import React from 'react';
import { MessageSquare, Cpu, Navigation, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HowItWorks: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      badge: 'Seamless 4-Step Process',
      heading: 'How Sahyog Works',
      subheading: 'From speaking your problem to transparent digital settlement, experience the next generation of cooperative technology.',
      steps: [
        {
          step: '01',
          title: 'Tell us what you need',
          desc: 'Speak or type your household issue in simple Marathi, Hindi, or English. No technical jargon required.',
          icon: MessageSquare,
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        {
          step: '02',
          title: 'AI finds the right cooperative worker',
          desc: 'Our ethical algorithm matches verified professionals based on skill, certification, proximity, and fair daily workload.',
          icon: Cpu,
          color: 'bg-coop-50 text-coop-800 border-coop-200',
        },
        {
          step: '03',
          title: 'Track the service in real time',
          desc: 'Follow your worker’s arrival live on map, inspect their Digital Skill Passport, and verify safety checklist.',
          icon: Navigation,
          color: 'bg-sky-50 text-sky-700 border-sky-200',
        },
        {
          step: '04',
          title: 'Pay securely and rate the service',
          desc: 'Transparent pricing with zero hidden cuts: 80% goes directly to worker wages, and 5% funds health and accident welfare.',
          icon: CreditCard,
          color: 'bg-amber-50 text-amber-800 border-amber-200',
        }
      ],
    },
    hi: {
      badge: 'सहज ४-चरणीय प्रक्रिया',
      heading: 'सहयोग कैसे काम करता है',
      subheading: 'अपनी भाषा में समस्या बताने से लेकर पारदर्शी डिजिटल भुगतान तक, सहकारी तकनीक का नया अनुभव।',
      steps: [
        {
          step: '०१',
          title: 'अपनी समस्या बताएं',
          desc: 'मराठी, हिन्दी या अंग्रेजी में बोलें अथवा लिखें। किसी तकनीकी शब्दावली की आवश्यकता नहीं।',
          icon: MessageSquare,
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        {
          step: '०२',
          title: 'AI सही सहकारी श्रमिक खोजेगा',
          desc: 'हमारा नैतिक एल्गोरिदम कौशल, प्रमाणन, निकटता और निष्पक्ष कार्यभार के आधार पर मिलान करता है।',
          icon: Cpu,
          color: 'bg-coop-50 text-coop-800 border-coop-200',
        },
        {
          step: '०३',
          title: 'रीयल-टाइम में सेवा ट्रैक करें',
          desc: 'मानचित्र पर आगमन देखें, डिजिटल कौशल पासपोर्ट जांचें और सुरक्षा चेकलिस्ट सत्यापित करें।',
          icon: Navigation,
          color: 'bg-sky-50 text-sky-700 border-sky-200',
        },
        {
          step: '०४',
          title: 'सुरक्षित भुगतान व समीक्षा दें',
          desc: 'शून्य छिपा शुल्क: ८०% सीधे श्रमिक के बैंक खाते में और ५% स्वास्थ्य एवं दुर्घटना सुरक्षा कोष में।',
          icon: CreditCard,
          color: 'bg-amber-50 text-amber-800 border-amber-200',
        }
      ],
    },
    mr: {
      badge: 'सोपी ४-टप्प्यांची कार्यपद्धती',
      heading: 'सहयोग कसे चालते',
      subheading: 'आपल्या साध्या भाषेत समस्या सांगण्यापासून ते पारदर्शक डिजिटल देयकापर्यंत, सहकारी तंत्रज्ञानाचा आधुनिक अनुभव.',
      steps: [
        {
          step: '०१',
          title: 'तुमची समस्या सांगा',
          desc: 'मराठी, हिंदी किंवा इंग्रजीत बोला अथवा टाईप करा. कोणतीही तांत्रिक भाषा वापरण्याची गरज नाही.',
          icon: MessageSquare,
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        {
          step: '०२',
          title: 'AI योग्य सहकारी कामगार निवडेल',
          desc: 'आमची प्रणाली कौशल्य, अंतर आणि आजचे काम याचा समतोल साधून योग्य तंत्रज्ञाची जुळणी करते.',
          icon: Cpu,
          color: 'bg-coop-50 text-coop-800 border-coop-200',
        },
        {
          step: '०३',
          title: 'थेट नकाशावर आगमन ट्रॅक करा',
          desc: 'कामगाराचे थेट स्थान पहा, त्यांचा डिजिटल कौशल्य पासपोर्ट तपासा आणि सुरक्षा सूचीची खात्री करा.',
          icon: Navigation,
          color: 'bg-sky-50 text-sky-700 border-sky-200',
        },
        {
          step: '०४',
          title: 'पारदर्शक देयक व कामगार मूल्यमापन',
          desc: 'शून्य छुपा दर: ८०% थेट कामगाराच्या खात्यात आणि ५% अपघात व आरोग्य विमा निधीसाठी सुरक्षित.',
          icon: CreditCard,
          color: 'bg-amber-50 text-amber-800 border-amber-200',
        }
      ],
    },
  };

  const current = content[language] || content.en;

  return (
    <section className="py-20 bg-white border-y border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-3">
            <span>{current.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-coop-950 tracking-tight font-display mb-4">
            {current.heading}
          </h2>
          <p className="text-sm sm:text-base text-surface-600 leading-relaxed">
            {current.subheading}
          </p>
        </div>

        {/* 4 Step Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {current.steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-surface-50 rounded-3xl p-6 border border-surface-200 flex flex-col justify-between hover:shadow-card hover:border-coop-300 transition-all duration-200 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-coop-950 font-mono tracking-tighter">
                      {item.step}
                    </span>
                    <div className={`p-3 rounded-2xl border ${item.color} shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-surface-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-surface-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-200/60 flex items-center gap-1.5 text-xs font-semibold text-coop-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Cooperative Verified Step</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
