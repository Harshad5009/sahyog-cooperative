import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Mic, 
  Image as ImageIcon, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Users, 
  CheckCircle2,
  Zap,
  Volume2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { analyzeProblemWithAI } from '../../utils/aiMatchingEngine';
import { Badge } from '../common/Badge';

export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [location, setLocation] = useState('Kothrud, Pune');
  const [selectedCategory, setSelectedCategory] = useState('plumbing');
  const [problemText, setProblemText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleVoicePrompts = {
    en: 'My kitchen tap is leaking heavily and needs urgent repair.',
    hi: 'रसोई का नल टपक रहा है और पानी भर रहा है, जल्द ठीक कराएं।',
    mr: 'माझ्या घरातील नळ खराब झाला असून पाणी गळत आहे.',
  };

  const heroContent = {
    en: {
      pillBadge: 'SIH 2026 Cooperative Workforce Initiative',
      pillVerified: '100% Verified Federations',
      title1: 'Trusted Services.',
      titleGradient: 'Empowered Workers.',
      title2: 'Stronger Communities.',
      locationLabel: 'Your Location',
      serviceLabel: 'Service',
      describeLabel: 'Describe your problem in everyday words',
      aiBadge: 'AI Multi-Lingual',
      voicePrompt: 'Try Voice Sample (EN)',
      examplesLabel: 'Quick examples:',
      ex1: 'Blocked sink drain',
      ex2: 'Sparking switchboard',
      ex3: 'Deep house cleaning',
      metricWorkers: 'Verified Coop Workers',
      metricWelfare: 'Accident & Welfare Cover',
      metricCommission: 'Retained by Worker',
      metricRating: 'Patron Trust Rating',
    },
    hi: {
      pillBadge: 'SIH 2026 सहकारी कार्यबल पहल',
      pillVerified: '१००% सत्यापित महासंघ',
      title1: 'विश्वसनीय सेवाएँ।',
      titleGradient: 'सशक्त श्रमिक।',
      title2: 'सुदृढ़ समाज।',
      locationLabel: 'आपका स्थान',
      serviceLabel: 'सेवा चुनें',
      describeLabel: 'अपनी समस्या को साधारण शब्दों में बताएं',
      aiBadge: 'AI बहुभाषी',
      voicePrompt: 'आवाज नमूना (HI)',
      examplesLabel: 'त्वरित उदाहरण:',
      ex1: 'रसोई का जाम सिंक',
      ex2: 'शॉर्ट सर्किट स्विचबोर्ड',
      ex3: 'पूरे घर की डीप सफाई',
      metricWorkers: 'सत्यापित सहकारी श्रमिक',
      metricWelfare: 'दुर्घटना व स्वास्थ्य बीमा',
      metricCommission: 'श्रमिक को सीधे भुगतान',
      metricRating: 'ग्राहक संतुष्टि रेटिंग',
    },
    mr: {
      pillBadge: 'SIH 2026 कामगार सहकारी उपक्रम',
      pillVerified: '१००% अधिकृत महासंघ',
      title1: 'विश्वसनीय सेवा.',
      titleGradient: 'सक्षम कामगार.',
      title2: 'सुदृढ समाज.',
      locationLabel: 'तुमचे ठिकाण',
      serviceLabel: 'सेवा निवडा',
      describeLabel: 'तुमची समस्या साध्या शब्दांत सांगा',
      aiBadge: 'AI बहुभाषिक',
      voicePrompt: 'आवाज नमुना (MR)',
      examplesLabel: 'उदाहरणे:',
      ex1: 'तुंबलेला सिंक नळ',
      ex2: 'स्पार्किंग होणारा बोर्ड',
      ex3: 'घराची सखोल स्वच्छता',
      metricWorkers: 'नोंदणीकृत सहकारी कामगार',
      metricWelfare: 'अपघात व कल्याण सुरक्षा',
      metricCommission: 'थेट कामगारास मोबदला',
      metricRating: 'ग्राहक विश्वास रेटिंग',
    },
  };

  const currentHero = heroContent[language] || heroContent.en;

  const handleVoiceSimulate = () => {
    setIsListening(true);
    setTimeout(() => {
      setProblemText(sampleVoicePrompts[language]);
      setIsListening(false);
    }, 1200);
  };

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeProblemWithAI(problemText);
      setIsAnalyzing(false);
      navigate('/customer/book', { state: { initialProblem: problemText, initialAnalysis: result, location } });
    }, 600);
  };

  const handleQuickBook = () => {
    navigate('/customer/book', { state: { initialCategory: selectedCategory, location } });
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-coop-50/60 via-surface-50 to-surface-50">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-coop-200/80 shadow-subtle text-xs font-semibold text-coop-900">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{currentHero.pillBadge}</span>
            <span className="text-surface-300">•</span>
            <span className="text-coop-700 font-bold">{currentHero.pillVerified}</span>
          </div>
        </div>

        {/* Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-coop-950 tracking-tight font-display leading-[1.15] mb-6">
            {currentHero.title1} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-coop-800 via-coop-700 to-emerald-600 bg-clip-text text-transparent">
              {currentHero.titleGradient}
            </span> <br className="hidden sm:inline" />
            {currentHero.title2}
          </h1>
          <p className="text-base sm:text-lg text-surface-600 font-normal leading-relaxed max-w-2xl mx-auto">
            {t.subTagline}
          </p>
        </div>

        {/* Hero Interactive Booking & AI Panel */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-elevated border border-surface-200/80 p-5 sm:p-7 backdrop-blur-md mb-16">
          
          {/* Quick Dropdown Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-5 pb-5 border-b border-surface-100">
            {/* Location Selector */}
            <div className="sm:col-span-5 relative">
              <label className="text-[11px] font-bold text-surface-500 uppercase tracking-wider block mb-1">
                {currentHero.locationLabel}
              </label>
              <div className="flex items-center gap-2 bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-xs font-semibold text-surface-800">
                <MapPin className="w-4 h-4 text-coop-600 shrink-0" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent w-full focus:outline-none text-xs font-semibold text-surface-800 cursor-pointer"
                >
                  <option value="Kothrud, Pune">Kothrud, Pune (Zone 4)</option>
                  <option value="Baner, Pune">Baner, Pune (Zone 2)</option>
                  <option value="Hadapsar, Pune">Hadapsar, Pune (Zone 7)</option>
                  <option value="Shivajinagar, Pune">Shivajinagar, Pune (Zone 1)</option>
                  <option value="Viman Nagar, Pune">Viman Nagar, Pune (Zone 5)</option>
                  <option value="Pimpri-Chinchwad, Pune">Pimpri-Chinchwad (Zone 8)</option>
                </select>
              </div>
            </div>

            {/* Service Category Selector */}
            <div className="sm:col-span-4 relative">
              <label className="text-[11px] font-bold text-surface-500 uppercase tracking-wider block mb-1">
                {currentHero.serviceLabel}
              </label>
              <div className="flex items-center gap-2 bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-xs font-semibold text-surface-800">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent w-full focus:outline-none text-xs font-semibold text-surface-800 cursor-pointer"
                >
                  <option value="plumbing">Plumbing & Water</option>
                  <option value="electrical">Electrical & Power</option>
                  <option value="carpentry">Carpentry & Woodwork</option>
                  <option value="cleaning">Deep Cleaning</option>
                  <option value="appliance">Appliance Repair</option>
                  <option value="caregiving">Elderly Care</option>
                  <option value="driver">On-Demand Driver</option>
                  <option value="gardening">Gardening</option>
                </select>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="sm:col-span-3 flex items-end">
              <button
                onClick={handleQuickBook}
                className="w-full bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>{t.bookService}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI "Tell Us Your Problem" Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-coop-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>{currentHero.describeLabel}</span>
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {currentHero.aiBadge}
                </span>
              </label>

              <button
                type="button"
                onClick={handleVoiceSimulate}
                className="text-[11px] font-semibold text-coop-700 hover:text-coop-900 flex items-center gap-1 bg-coop-50 hover:bg-coop-100 px-2.5 py-1 rounded-lg transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{currentHero.voicePrompt}</span>
              </button>
            </div>

            <form onSubmit={handleAISubmit} className="relative">
              <textarea
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder={t.describeProblemPlaceholder}
                rows={3}
                className="w-full bg-surface-50 border border-surface-200 text-surface-900 placeholder:text-surface-400 text-sm rounded-2xl p-4 pr-24 focus:outline-none focus:ring-2 focus:ring-coop-500/20 focus:border-coop-600 transition-all resize-none"
              />

              {/* Action buttons inside textarea */}
              <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleVoiceSimulate}
                  className={`p-2 rounded-xl border transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                      : 'bg-white text-surface-500 hover:text-coop-700 border-surface-200 hover:border-coop-300'
                  }`}
                  title="Voice Input (Marathi / Hindi / English)"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setProblemText(sampleVoicePrompts[language])}
                  className="p-2 rounded-xl bg-white text-surface-500 hover:text-coop-700 border border-surface-200 hover:border-coop-300 transition-all"
                  title="Attach Photo / Leak Image"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!problemText.trim() || isAnalyzing}
                  className="px-4 py-2 bg-gradient-to-r from-coop-900 to-coop-800 hover:from-coop-800 hover:to-coop-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-40 flex items-center gap-1.5"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    <>
                      <span>{t.findRightWorker}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* AI Presets / Quick Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span className="text-[11px] text-surface-400 font-medium">{currentHero.examplesLabel}</span>
              <button
                type="button"
                onClick={() => setProblemText(sampleVoicePrompts[language])}
                className="px-2.5 py-1 bg-surface-100 hover:bg-coop-50 text-surface-700 hover:text-coop-900 rounded-lg transition-colors text-[11px] font-medium"
              >
                {currentHero.ex1}
              </button>
              <button
                type="button"
                onClick={() => setProblemText(sampleVoicePrompts[language])}
                className="px-2.5 py-1 bg-surface-100 hover:bg-coop-50 text-surface-700 hover:text-coop-900 rounded-lg transition-colors text-[11px] font-medium"
              >
                {currentHero.ex2}
              </button>
              <button
                type="button"
                onClick={() => setProblemText(sampleVoicePrompts[language])}
                className="px-2.5 py-1 bg-surface-100 hover:bg-coop-50 text-surface-700 hover:text-coop-900 rounded-lg transition-colors text-[11px] font-medium"
              >
                {currentHero.ex3}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Trust Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-surface-200/80 rounded-2xl p-4 shadow-subtle flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-coop-100 text-coop-800 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black text-surface-900 block font-display">
                10,000+
              </span>
              <span className="text-[11px] text-surface-500 font-semibold">
                {currentHero.metricWorkers}
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-surface-200/80 rounded-2xl p-4 shadow-subtle flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-coop-100 text-coop-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black text-surface-900 block font-display">
                ₹5,00,000
              </span>
              <span className="text-[11px] text-surface-500 font-semibold">
                {currentHero.metricWelfare}
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-surface-200/80 rounded-2xl p-4 shadow-subtle flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-coop-100 text-coop-800 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black text-surface-900 block font-display">
                80%
              </span>
              <span className="text-[11px] text-surface-500 font-semibold">
                {currentHero.metricCommission}
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-surface-200/80 rounded-2xl p-4 shadow-subtle flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-coop-100 text-coop-800 shrink-0">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black text-surface-900 block font-display">
                4.8★
              </span>
              <span className="text-[11px] text-surface-500 font-semibold">
                {currentHero.metricRating}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
