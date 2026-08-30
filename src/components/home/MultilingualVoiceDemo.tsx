import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, Check, ArrowRight, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MultilingualVoiceDemo: React.FC = () => {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState<'mr' | 'hi' | 'en'>('mr');
  const [isPlaying, setIsPlaying] = useState(false);

  const voiceDemos = {
    mr: {
      langName: 'मराठी (Marathi)',
      audioText: '“माझ्या घरातील नळ खराब झाला आहे आणि पाणी खूप गळत आहे.”',
      convertedService: 'प्लंबिंग सेवा (Plumbing & Water Systems)',
      detectedIssue: 'नळ खराब / पाइप लीकेज (Pipe & Tap Joint Breach)',
      urgency: 'तातडीचे (High)',
      requiredSkill: 'प्रमाणित प्लंबर (Certified Plumber)',
    },
    hi: {
      langName: 'हिन्दी (Hindi)',
      audioText: '“रसोई का नल टपक रहा है और पानी भर रहा है, जल्द ठीक कराएं।”',
      convertedService: 'प्लंबिंग सेवा (Plumbing & Water Systems)',
      detectedIssue: 'रसोई सिंक पाइप लीकेज (Kitchen Sink Leakage)',
      urgency: 'मध्यम (Medium)',
      requiredSkill: 'सत्यापित प्लंबर (Certified Plumber)',
    },
    en: {
      langName: 'English',
      audioText: '“My bathroom pipe is leaking and water is spreading across the floor.”',
      convertedService: 'Plumbing & Water Systems',
      detectedIssue: 'High-pressure bathroom concealed leakage',
      urgency: 'High',
      requiredSkill: 'Certified Plumber Level 4',
    }
  };

  const currentDemo = voiceDemos[activeLang];

  const handleSimulatePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const handleBookFromVoice = () => {
    navigate('/customer/book', {
      state: {
        initialProblem: currentDemo.audioText.replace(/[“”]/g, ''),
      }
    });
  };

  return (
    <section className="py-20 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coop-100 text-coop-800 rounded-full text-xs font-bold mb-3">
            <Languages className="w-3.5 h-3.5" />
            <span>Inclusive Regional Voice Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-coop-950 tracking-tight font-display mb-4">
            Voice-First Accessibility for Bharat
          </h2>
          <p className="text-sm sm:text-base text-surface-600 leading-relaxed">
            Citizens and senior citizens who cannot type technical terms can simply speak in their mother tongue. Sahyog’s speech engine translates local regional dialects into formal cooperative service tickets.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
          
          {/* Language Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {(['mr', 'hi', 'en'] as const).map(code => (
              <button
                key={code}
                onClick={() => setActiveLang(code)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeLang === code
                    ? 'bg-coop-900 text-white shadow-md'
                    : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                }`}
              >
                <span>{voiceDemos[code].langName}</span>
                {activeLang === code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            ))}
          </div>

          {/* Voice Wave Visualizer & Audio Prompt */}
          <div className="bg-surface-50 rounded-2xl p-6 border border-surface-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleSimulatePlay}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all shrink-0 ${
                  isPlaying
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-coop-900 text-emerald-300 hover:bg-coop-800'
                }`}
                title="Play Audio Sample"
              >
                {isPlaying ? <Mic className="w-6 h-6 animate-bounce" /> : <Volume2 className="w-6 h-6" />}
              </button>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400 block mb-1">
                  Audio Speech Input (Voice Transcription)
                </span>
                <p className="text-base sm:text-lg font-bold text-surface-900 italic font-display">
                  {currentDemo.audioText}
                </p>
              </div>
            </div>

            {/* Simulated Animated Waveform */}
            <div className="flex items-center gap-1 h-10 px-3 bg-white rounded-xl border border-surface-200 shrink-0">
              {[40, 75, 90, 60, 100, 45, 80, 50, 95, 30].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${isPlaying ? Math.max(20, Math.round(h * Math.random())) : h * 0.4}%` }}
                  className="w-1 bg-coop-600 rounded-full transition-all duration-150"
                />
              ))}
            </div>
          </div>

          {/* AI Structured Conversion Output */}
          <div className="bg-coop-950 text-white rounded-2xl p-5 border border-coop-900 shadow-md">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-coop-900">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Real-Time NLP Ticket Standardization
              </span>
              <span className="text-[10px] text-surface-400 font-mono">Status: 99.2% Accuracy</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-surface-400 block text-[10px]">Identified Service</span>
                <span className="font-bold text-white text-xs">{currentDemo.convertedService}</span>
              </div>
              <div>
                <span className="text-surface-400 block text-[10px]">Detected Issue</span>
                <span className="font-bold text-emerald-300 text-xs">{currentDemo.detectedIssue}</span>
              </div>
              <div>
                <span className="text-surface-400 block text-[10px]">Urgency Level</span>
                <span className="font-bold text-amber-300 text-xs">{currentDemo.urgency}</span>
              </div>
              <div>
                <span className="text-surface-400 block text-[10px]">Assigned Skill Category</span>
                <span className="font-bold text-surface-200 text-xs">{currentDemo.requiredSkill}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-coop-900 flex justify-end">
              <button
                onClick={handleBookFromVoice}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-surface-950 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>Book This Spoken Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
