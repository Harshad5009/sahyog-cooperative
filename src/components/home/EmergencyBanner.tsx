import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Siren, ArrowRight, MapPin, ShieldAlert, Zap, Radio, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const EmergencyBanner: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handleEmergencySOS = () => {
    navigate('/customer/book', {
      state: {
        isEmergency: true,
        initialProblem: 'EMERGENCY: Immediate burst pipe / electrical short hazard.',
      }
    });
  };

  const bannerText = {
    en: {
      badge: 'Rapid Emergency Response Unit',
      heading: 'Need Help Right Now?',
      desc: 'Burst water pipes, sparking circuit breakers, or critical door locks? Sahyog’s Emergency SOS mode bypasses scheduled queues to dispatch the closest on-duty certified specialist within 15–20 minutes.',
      btn: 'Emergency Service SOS',
      hotline: 'Cooperative Hotline: 1800-266-7249',
      protocol: 'Real-Time Emergency Dispatch Protocol',
      avgResponse: 'Avg Response: 14 Mins',
      steps: [
        { num: '01', title: 'SOS Request', desc: '1-Tap emergency beacon' },
        { num: '02', title: 'GPS Location', desc: 'Instant geofence lock' },
        { num: '03', title: 'Qualified Worker', desc: 'Filtered for active duty' },
        { num: '04', title: 'Instant Notification', desc: 'Direct priority ping' },
        { num: '05', title: 'Worker Accepts', desc: 'Guaranteed 15-min ETA' },
        { num: '06', title: 'Live Arrival Tracking', desc: 'Real-time GPS tracker' },
      ],
    },
    hi: {
      badge: 'त्वरित आपातकालीन प्रतिक्रिया दल',
      heading: 'क्या आपको अभी तत्काल सहायता चाहिए?',
      desc: 'फटा हुआ पानी का पाइप, शॉर्ट सर्किट या ताला जाम? सहयोग आपातकालीन SOS प्रणाली कतारों को छोड़कर १५-२० मिनट में निकटतम ऑन-ड्यूटी प्रमाणित तकनीशियन भेजती है।',
      btn: 'आपातकालीन SOS सेवा',
      hotline: 'सहकारी हेल्पलाइन: 1800-266-7249',
      protocol: 'रीयल-टाइम आपातकालीन प्रेषण प्रणाली',
      avgResponse: 'औसत प्रतिक्रिया: १४ मिनट',
      steps: [
        { num: '०१', title: 'SOS अनुरोध', desc: '१-टैप आपातकालीन संकेत' },
        { num: '०२', title: 'GPS स्थान', desc: 'तत्काल स्थान निर्धारण' },
        { num: '०३', title: 'प्रमाणित श्रमिक', desc: 'ड्यूटी पर उपलब्ध विशेषज्ञ' },
        { num: '०४', title: 'त्वरित सूचना', desc: 'प्राथमिकता संदेश' },
        { num: '०५', title: 'श्रमिक स्वीकृति', desc: '१५ मिनट आगमन समय' },
        { num: '०६', title: 'लाइव ट्रैकिंग', desc: 'जीपीएस लाइव मैप' },
      ],
    },
    mr: {
      badge: 'तातडीची आपत्कालीन प्रतिसाद तुकडी',
      heading: 'आत्ता तातडीने मदत हवी आहे का?',
      desc: 'नळ फुटणे, शॉर्ट सर्किट अथवा कुलूप बिघडणे? सहयोग आपत्कालीन SOS प्रणाली रांगेत न थांबता अवघ्या १५-२० मिनिटांत सर्वात जवळचा ऑन-ड्यूटी कामगार पाठवते.',
      btn: 'आपत्कालीन SOS सेवा',
      hotline: 'सहकारी हेल्पलाईन: 1800-266-7249',
      protocol: 'थेट आपत्कालीन मदत प्रणाली',
      avgResponse: 'सरासरी वेळ: १४ मिनिटे',
      steps: [
        { num: '०१', title: 'SOS विनंती', desc: '१-क्लिक आपत्कालीन सूचना' },
        { num: '०२', title: 'GPS ठिकाण', desc: 'थेट ठिकाण निश्चिती' },
        { num: '०३', title: 'पात्र कामगार', desc: 'उपलब्ध प्रमाणित तज्ज्ञ' },
        { num: '०४', title: 'तातडीचा संदेश', desc: 'प्राधान्याने सूचना' },
        { num: '०५', title: 'कामगार स्वीकार', desc: '१५ मिनिटांत आगमन' },
        { num: '०६', title: 'थेट ट्रॅकिंग', desc: 'नकाशावर थेट स्थान' },
      ],
    },
  };

  const current = bannerText[language] || bannerText.en;

  return (
    <section className="py-16 bg-gradient-to-br from-surface-900 via-surface-950 to-coop-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left CTA Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-bold w-fit">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>{current.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              {current.heading}
            </h2>

            <p className="text-sm text-surface-300 leading-relaxed">
              {current.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleEmergencySOS}
                className="px-6 py-3.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-rose-900/40 flex items-center gap-2 active:scale-95 transition-all"
              >
                <Siren className="w-4 h-4 animate-bounce" />
                <span>{current.btn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:18002667249"
                className="px-4 py-3.5 bg-surface-800 hover:bg-surface-700 text-surface-200 text-xs font-bold rounded-2xl border border-surface-700 flex items-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>{current.hotline}</span>
              </a>
            </div>
          </div>

          {/* Right Flow Visualization */}
          <div className="lg:col-span-7 bg-surface-900/70 backdrop-blur-md rounded-3xl border border-surface-800 p-6 sm:p-7">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-800">
              <span className="text-xs font-bold uppercase tracking-wider text-surface-400 flex items-center gap-2">
                <Radio className="w-4 h-4 text-rose-400" />
                {current.protocol}
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                {current.avgResponse}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {current.steps.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-surface-800/60 border border-surface-700/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-rose-500/40 transition-colors"
                >
                  <span className="text-[10px] font-black text-rose-400/80 font-mono">
                    {s.num}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">{s.title}</h4>
                    <p className="text-[11px] text-surface-400 leading-snug">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
