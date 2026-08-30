import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Star, 
  CreditCard, 
  Siren, 
  Wrench, 
  Mic, 
  Volume2, 
  Check, 
  User, 
  Phone, 
  Navigation,
  ThumbsUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { MOCK_WORKERS } from '../../data/mockWorkers';
import { MOCK_SERVICES } from '../../data/mockServices';
import { analyzeProblemWithAI, calculateFairWorkerScores, calculatePaymentBreakdown } from '../../utils/aiMatchingEngine';
import type { Worker, AIAnalysisResult, BookingStatus } from '../../types';
import confetti from 'canvas-confetti';

export const BookingWizard: React.FC = () => {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const { createNewBooking, updateBookingStatus, submitCustomerReview } = useApp();
  const { language } = useLanguage();

  const state = routerLocation.state as {
    initialProblem?: string;
    initialCategory?: string;
    initialAnalysis?: AIAnalysisResult;
    isEmergency?: boolean;
    location?: string;
  } | null;

  // Multi-step Wizard State (1 to 7)
  const [currentStep, setCurrentStep] = useState<number>(state?.initialAnalysis ? 2 : 1);
  
  // Step 1: Problem
  const [problemText, setProblemText] = useState(state?.initialProblem || 'My kitchen tap is leaking and needs urgent repair.');
  const [isEmergency, setIsEmergency] = useState(state?.isEmergency || false);
  const [selectedServiceId, setSelectedServiceId] = useState(state?.initialCategory || 'plumbing');
  
  // Step 2: AI Analysis
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult>(() => {
    if (state?.initialAnalysis) return state.initialAnalysis;
    return analyzeProblemWithAI(problemText);
  });

  // Step 3: Date, Time & Address
  const [scheduledDate, setScheduledDate] = useState('Today');
  const [scheduledTime, setScheduledTime] = useState('Immediate / Next Available Slot');
  const [streetAddress, setStreetAddress] = useState('Flat 402, Rutuparna Apts, Paud Road');
  const [selectedArea, setSelectedArea] = useState(state?.location || 'Kothrud, Pune');
  const [customerName, setCustomerName] = useState('Pooja Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98900 12345');

  // Step 4: Worker Selection
  const [candidateWorkers, setCandidateWorkers] = useState(() => {
    return calculateFairWorkerScores(MOCK_WORKERS, aiAnalysis.detectedCategory, isEmergency ? 'emergency' : aiAnalysis.urgency);
  });
  const [selectedWorker, setSelectedWorker] = useState<Worker>(candidateWorkers[0]?.worker || MOCK_WORKERS[0]);

  // Step 5 & 6: Pricing & Payment
  const serviceItem = MOCK_SERVICES.find(s => s.id === aiAnalysis.detectedCategory) || MOCK_SERVICES[0];
  const calculatedTotal = isEmergency ? serviceItem.basePrice + 150 : serviceItem.basePrice;
  const paymentSplit = calculatePaymentBreakdown(calculatedTotal);
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay / PhonePe / Paytm)');

  // Step 7: Live Tracking & Booking Simulation
  const [createdBookingId, setCreatedBookingId] = useState<string>('');
  const [liveStatus, setLiveStatus] = useState<BookingStatus>('allocated');
  const [ratingVal, setRatingVal] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Recalculate AI analysis when problem text changes
  const handleRunAIAnalysis = () => {
    const res = analyzeProblemWithAI(problemText);
    setAiAnalysis(res);
    const ranked = calculateFairWorkerScores(MOCK_WORKERS, res.detectedCategory, isEmergency ? 'emergency' : res.urgency);
    setCandidateWorkers(ranked);
    if (ranked.length > 0) {
      setSelectedWorker(ranked[0].worker);
    }
    setCurrentStep(2);
  };

  const handleConfirmAndPay = () => {
    const newBk = createNewBooking({
      problemDescription: problemText,
      aiAnalysis,
      assignedWorker: selectedWorker,
      address: {
        street: streetAddress,
        area: selectedArea,
        city: 'Pune',
        pincode: '411038',
      },
      date: scheduledDate,
      timeSlot: scheduledTime,
      totalPrice: calculatedTotal,
      isEmergency,
    });

    setCreatedBookingId(newBk.id);
    setCurrentStep(7);
    setLiveStatus('allocated');

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  // Simulation controls for Step 7 Live Tracker
  const handleSimulateStatusNext = () => {
    if (liveStatus === 'allocated') {
      setLiveStatus('accepted_by_worker');
      if (createdBookingId) updateBookingStatus(createdBookingId, 'accepted_by_worker');
    } else if (liveStatus === 'accepted_by_worker') {
      setLiveStatus('en_route');
      if (createdBookingId) updateBookingStatus(createdBookingId, 'en_route');
    } else if (liveStatus === 'en_route') {
      setLiveStatus('arrived');
      if (createdBookingId) updateBookingStatus(createdBookingId, 'arrived');
    } else if (liveStatus === 'arrived') {
      setLiveStatus('in_progress');
      if (createdBookingId) updateBookingStatus(createdBookingId, 'in_progress');
    } else if (liveStatus === 'in_progress') {
      setLiveStatus('completed');
      if (createdBookingId) updateBookingStatus(createdBookingId, 'completed');
      try {
        confetti({ particleCount: 120, spread: 80 });
      } catch (e) {}
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (createdBookingId) {
      submitCustomerReview(createdBookingId, ratingVal, feedbackText || 'Excellent, punctual, and professional cooperative service!');
      setReviewSubmitted(true);
    }
  };

  const stepsList = [
    { num: 1, label: 'Problem' },
    { num: 2, label: 'AI Diagnosis' },
    { num: 3, label: 'Schedule' },
    { num: 4, label: 'Worker Match' },
    { num: 5, label: 'Summary' },
    { num: 6, label: 'Payment' },
    { num: 7, label: 'Live Tracking' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-4">
      
      {/* Wizard Progress Bar */}
      <div className="bg-white rounded-2xl p-4 border border-surface-200 shadow-card mb-6">
        <div className="flex items-center justify-between">
          {stepsList.map((st, idx) => (
            <React.Fragment key={st.num}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep === st.num
                      ? 'bg-coop-900 text-white ring-4 ring-coop-500/20'
                      : currentStep > st.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-surface-100 text-surface-400'
                  }`}
                >
                  {currentStep > st.num ? <Check className="w-4 h-4" /> : st.num}
                </div>
                <span className={`hidden md:inline text-xs font-semibold ${
                  currentStep === st.num ? 'text-coop-950 font-bold' : 'text-surface-500'
                }`}>
                  {st.label}
                </span>
              </div>
              {idx < stepsList.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1.5 sm:mx-3 ${
                  currentStep > idx + 1 ? 'bg-emerald-600' : 'bg-surface-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP 1: Describe Problem */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-700 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 1 of 7
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Describe What You Need Help With
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Type or select your household concern. Our AI will automatically parse the required skills and equipment.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-surface-800 block mb-1.5">
                Problem Description (Natural Language)
              </label>
              <textarea
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                rows={4}
                placeholder="E.g. My bathroom pipe is leaking heavily and water is spreading across the floor."
                className="w-full bg-surface-50 border border-surface-200 text-surface-900 text-sm rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-coop-500/20 focus:border-coop-600 transition-all resize-none"
              />
            </div>

            {/* Emergency SOS Toggle */}
            <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-600 text-white">
                  <Siren className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-900">Mark as Emergency SOS Request</h4>
                  <p className="text-[11px] text-rose-700">Immediate dispatch within 15–20 mins (Burst pipes, sparking power, lockouts).</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isEmergency}
                onChange={(e) => setIsEmergency(e.target.checked)}
                className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
              />
            </div>

            {/* Quick Presets */}
            <div>
              <span className="text-xs font-semibold text-surface-500 block mb-2">
                Or pick a common issue:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Bathroom concealed pipe joint burst and water spreading',
                  'Main circuit breaker trips constantly with electrical sparks',
                  'Main door mortise lock jammed and key stuck',
                  'Urgent elder companion care and patient mobility support'
                ].map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setProblemText(preset)}
                    className="px-3 py-1.5 bg-surface-100 hover:bg-coop-50 text-surface-700 hover:text-coop-900 rounded-xl text-xs font-medium border border-surface-200 transition-all"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-surface-100 flex justify-end">
            <button
              onClick={handleRunAIAnalysis}
              disabled={!problemText.trim()}
              className="px-6 py-3 bg-gradient-to-r from-coop-900 to-coop-800 hover:from-coop-800 hover:to-coop-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <span>Analyze with AI</span>
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AI Diagnosis & Categorization */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Step 2 of 7: AI Diagnosis
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              AI Diagnostic Decomposition
            </h2>
            <p className="text-xs text-surface-500 mt-1">
              Parsed from your statement with <strong>{aiAnalysis.confidenceScore}% confidence</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-surface-200">
                <span className="text-surface-500">Service Category:</span>
                <span className="font-bold text-surface-900 uppercase">{aiAnalysis.detectedCategory}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-200">
                <span className="text-surface-500">Detected Sub-Service:</span>
                <span className="font-bold text-emerald-800">{aiAnalysis.subService}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-200">
                <span className="text-surface-500">Urgency Level:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[11px] uppercase ${
                  aiAnalysis.urgency === 'high' || isEmergency
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isEmergency ? 'Emergency SOS' : aiAnalysis.urgency}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-surface-500">Estimated Duration:</span>
                <span className="font-bold text-surface-900">{aiAnalysis.estimatedDuration}</span>
              </div>
            </div>

            <div className="p-4 bg-coop-950 text-white rounded-2xl border border-coop-900 space-y-3 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Mandatory Qualifications Required</span>
              </div>
              <p className="text-[11px] text-surface-300 leading-relaxed">
                Skill required: <strong>{aiAnalysis.requiredSkill}</strong>
              </p>
              <div className="pt-2 border-t border-coop-900">
                <span className="text-[10px] text-surface-400 block mb-1">Required Certifications:</span>
                <div className="flex flex-wrap gap-1.5">
                  {aiAnalysis.requiredCertifications.map((cert, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-coop-900 text-emerald-300 text-[10px] rounded border border-emerald-500/20 font-semibold">
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-surface-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 text-xs font-bold text-surface-600 hover:text-surface-900 rounded-xl hover:bg-surface-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Confirm & Set Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Date, Time & Address */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-700 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 3 of 7: Schedule & Location
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              When & Where Do You Need Service?
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-surface-800 block mb-1.5">
                  Select Date
                </label>
                <div className="flex gap-2">
                  {['Today', 'Tomorrow', 'Day After'].map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setScheduledDate(d)}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                        scheduledDate === d
                          ? 'bg-coop-900 text-white border-coop-900 shadow-xs'
                          : 'bg-surface-50 text-surface-700 border-surface-200 hover:bg-surface-100'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-surface-800 block mb-1.5">
                  Time Slot
                </label>
                <select
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full bg-surface-50 border border-surface-200 text-surface-900 text-xs font-semibold rounded-xl p-3 focus:outline-none focus:border-coop-600 cursor-pointer"
                >
                  <option value="Immediate / Next Available Slot">Immediate (Earliest Available Worker)</option>
                  <option value="10:00 AM - 12:00 PM">10:00 AM – 12:00 PM (Morning Slot)</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM – 04:00 PM (Afternoon Slot)</option>
                  <option value="05:00 PM - 07:00 PM">05:00 PM – 07:00 PM (Evening Slot)</option>
                </select>
              </div>
            </div>

            {/* Address fields */}
            <div className="pt-2">
              <label className="text-xs font-bold text-surface-800 block mb-1.5">
                Service Address (Street / Flat)
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="Flat No, Building, Road"
                className="w-full bg-surface-50 border border-surface-200 text-surface-900 text-xs rounded-xl p-3 focus:outline-none focus:border-coop-600 mb-3"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-surface-800 block mb-1">Locality / Zone</label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 text-surface-900 text-xs font-semibold rounded-xl p-3 focus:outline-none focus:border-coop-600 cursor-pointer"
                  >
                    <option value="Kothrud, Pune">Kothrud, Pune (Zone 4)</option>
                    <option value="Baner, Pune">Baner, Pune (Zone 2)</option>
                    <option value="Hadapsar, Pune">Hadapsar, Pune (Zone 7)</option>
                    <option value="Shivajinagar, Pune">Shivajinagar, Pune (Zone 1)</option>
                    <option value="Viman Nagar, Pune">Viman Nagar, Pune (Zone 5)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-surface-800 block mb-1">Customer Contact</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 text-surface-900 text-xs rounded-xl p-3 focus:outline-none focus:border-coop-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-surface-100 mt-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2.5 text-xs font-bold text-surface-600 hover:text-surface-900 rounded-xl hover:bg-surface-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Match Qualified Workers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: AI Fair Worker Matching */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Step 4 of 7: Fair Allocation Engine
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Recommended Cooperative Professionals
            </h2>
            <p className="text-xs text-surface-500 mt-1">
              Ranked using proximity, certifications, reliability, and democratic workload balancing.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {candidateWorkers.slice(0, 3).map((item, idx) => {
              const w = item.worker;
              const isSelected = selectedWorker.id === w.id;

              return (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorker(w)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-coop-50/60 border-coop-500 shadow-md ring-2 ring-coop-500/20'
                      : 'bg-surface-50 border-surface-200 hover:border-surface-300'
                  }`}
                >
                  {item.isRecommended && (
                    <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider bg-coop-900 text-emerald-300 px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      Top Fair Match
                    </span>
                  )}

                  <div className="flex items-start gap-4">
                    <img
                      src={w.avatar}
                      alt={w.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-coop-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-sm font-bold text-surface-900 truncate">
                          {w.name}
                        </h4>
                        <ShieldCheck className="w-4 h-4 text-coop-600 shrink-0" />
                      </div>

                      <p className="text-xs text-coop-700 font-medium">
                        {w.cooperativeSociety.split('(')[0]}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-surface-600">
                        <span className="font-bold text-amber-600 flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {w.rating} ({w.totalReviews})
                        </span>
                        <span>•</span>
                        <span>{w.distanceKm} km away</span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-700">{w.jobsToday} Jobs Today</span>
                      </div>

                      <p className="text-[11px] text-surface-500 mt-2 bg-white/80 p-2 rounded-xl border border-surface-200/80 leading-relaxed">
                        {item.recommendationReason}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-surface-100">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2.5 text-xs font-bold text-surface-600 hover:text-surface-900 rounded-xl hover:bg-surface-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-6 py-3 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Review Booking Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Booking Summary Confirmation */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-700 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 5 of 7: Review & Confirm
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Confirm Service Booking
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-surface-200">
                <span className="text-surface-500">Service:</span>
                <span className="font-bold text-surface-900">{aiAnalysis.subService}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-200">
                <span className="text-surface-500">Assigned Professional:</span>
                <span className="font-bold text-coop-800">{selectedWorker.name} ({selectedWorker.cooperativeSociety.split('(')[0]})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-200">
                <span className="text-surface-500">Schedule:</span>
                <span className="font-bold text-surface-900">{scheduledDate} • {scheduledTime}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-surface-500">Address:</span>
                <span className="font-bold text-surface-900">{streetAddress}, {selectedArea}</span>
              </div>
            </div>

            {/* Transparent Rate Box */}
            <div className="p-4 bg-coop-50 rounded-2xl border border-coop-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-coop-900 block">Total Cooperative Standard Fare</span>
                <span className="text-[11px] text-coop-700">Includes 90-day warranty & post-service cleanup.</span>
              </div>
              <span className="text-2xl font-black text-coop-950 font-display">
                ₹{calculatedTotal}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-surface-100">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2.5 text-xs font-bold text-surface-600 hover:text-surface-900 rounded-xl hover:bg-surface-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(6)}
              className="px-6 py-3 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Transparent Payment */}
      {currentStep === 6 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Step 6 of 7: Payment & Escrow
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Transparent Cooperative Settlement
            </h2>
            <p className="text-xs text-surface-500 mt-1">
              Your payment is held in safe cooperative escrow and released to the worker upon completion.
            </p>
          </div>

          {/* Breakdown Card */}
          <div className="p-5 bg-surface-50 rounded-2xl border border-surface-200 mb-6 space-y-3 text-xs">
            <div className="flex justify-between font-bold text-surface-900 pb-2 border-b border-surface-200 text-sm">
              <span>Total Service Amount:</span>
              <span>₹{calculatedTotal}</span>
            </div>
            <div className="flex justify-between text-emerald-800">
              <span>Worker Direct Wages (80%):</span>
              <span className="font-bold">₹{paymentSplit.workerEarnings}</span>
            </div>
            <div className="flex justify-between text-amber-800">
              <span>Worker Health & Accident Welfare (5%):</span>
              <span className="font-bold">₹{paymentSplit.welfareInsurance}</span>
            </div>
            <div className="flex justify-between text-coop-800">
              <span>Cooperative Society Local Fund (10%):</span>
              <span className="font-bold">₹{paymentSplit.cooperativeFund}</span>
            </div>
            <div className="flex justify-between text-surface-500">
              <span>Platform & AI Operations (5%):</span>
              <span className="font-bold">₹{paymentSplit.platformOperations}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2 mb-6">
            <label className="text-xs font-bold text-surface-800 block mb-1">
              Select Payment Method
            </label>
            {['UPI (Google Pay / PhonePe / Paytm)', 'Cooperative Escrow Wallet', 'Credit / Debit Card'].map(pm => (
              <label
                key={pm}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  paymentMethod === pm
                    ? 'bg-coop-50 border-coop-400 text-coop-950 font-bold'
                    : 'bg-white border-surface-200 text-surface-700'
                }`}
              >
                <span>{pm}</span>
                <input
                  type="radio"
                  name="payment_method"
                  checked={paymentMethod === pm}
                  onChange={() => setPaymentMethod(pm)}
                  className="w-4 h-4 text-coop-600 accent-coop-600"
                />
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-surface-100">
            <button
              onClick={() => setCurrentStep(5)}
              className="px-4 py-2.5 text-xs font-bold text-surface-600 hover:text-surface-900 rounded-xl hover:bg-surface-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleConfirmAndPay}
              className="px-7 py-3 bg-gradient-to-r from-coop-900 to-emerald-700 hover:from-coop-800 hover:to-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Authorize & Book (₹{calculatedTotal})</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: Live Service Tracking & Completion Simulator */}
      {currentStep === 7 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-2">
              <Check className="w-3.5 h-3.5" />
              <span>Booking Confirmed & Dispatched</span>
            </div>
            <h2 className="text-2xl font-black text-surface-900 font-display">
              Live Service Status Tracker
            </h2>
            <p className="text-xs text-surface-500 mt-1">
              Booking ID: <strong>{createdBookingId || 'SHY-2026-8902'}</strong> • {selectedWorker.name} assigned
            </p>
          </div>

          {/* Progress Timeline Stepper */}
          <div className="bg-surface-50 rounded-2xl p-5 border border-surface-200 mb-6">
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {[
                { key: 'allocated', label: 'Allocated' },
                { key: 'accepted_by_worker', label: 'Accepted' },
                { key: 'en_route', label: 'En Route' },
                { key: 'in_progress', label: 'In Progress' },
                { key: 'completed', label: 'Completed' },
              ].map((s, idx) => {
                const statusOrder = ['allocated', 'accepted_by_worker', 'en_route', 'arrived', 'in_progress', 'completed'];
                const isPassed = statusOrder.indexOf(liveStatus) >= statusOrder.indexOf(s.key);
                const isCurrent = liveStatus === s.key;

                return (
                  <div key={s.key} className="flex flex-col items-center gap-1.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCurrent
                        ? 'bg-coop-900 text-white ring-4 ring-coop-500/20 animate-pulse'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-surface-200 text-surface-400'
                    }`}>
                      {isPassed ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span className={`text-[11px] font-semibold ${isPassed ? 'text-surface-900 font-bold' : 'text-surface-400'}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assigned Worker Live Card */}
          <div className="p-5 bg-coop-950 text-white rounded-2xl border border-coop-900 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedWorker.avatar}
                alt={selectedWorker.name}
                className="w-14 h-14 rounded-2xl object-cover border border-emerald-500/40 shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {selectedWorker.name}
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </h4>
                <p className="text-xs text-emerald-300 font-medium">{selectedWorker.primarySkill}</p>
                <p className="text-[11px] text-surface-400 mt-0.5">{selectedWorker.cooperativeSociety}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${selectedWorker.phone}`}
                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-surface-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Worker</span>
              </a>
            </div>
          </div>

          {/* Interactive Flow Step Advancer */}
          {liveStatus !== 'completed' ? (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-950 block">Presentation Simulator:</span>
                <span className="text-[11px] text-emerald-800">
                  Current Status: <strong>{liveStatus.replace(/_/g, ' ').toUpperCase()}</strong>
                </span>
              </div>
              <button
                onClick={handleSimulateStatusNext}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <span>Advance Next Stage →</span>
              </button>
            </div>
          ) : (
            /* Completed Rating Form */
            <div className="p-5 bg-surface-50 rounded-2xl border border-surface-200">
              <h4 className="text-sm font-bold text-surface-900 mb-1">
                Rate & Review {selectedWorker.name}
              </h4>
              <p className="text-xs text-surface-500 mb-4">
                Your rating directly updates Ramesh's Digital Skill Passport and cooperative bonus eligibility.
              </p>

              {!reviewSubmitted ? (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingVal(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= ratingVal ? 'fill-amber-400 text-amber-400' : 'text-surface-300'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-surface-700 ml-2">{ratingVal}.0 / 5.0</span>
                  </div>

                  <input
                    type="text"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="E.g. Ramesh was exceptionally punctual and fixed the pipe in 20 minutes!"
                    className="w-full bg-white border border-surface-200 text-xs rounded-xl p-3 focus:outline-none focus:border-coop-600"
                  />

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-sm"
                  >
                    Submit Feedback & Complete Escrow
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-700" />
                  <span>Thank you! Your 5-star review has been credited to the cooperative society registry.</span>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-surface-100 flex justify-between">
            <button
              onClick={() => navigate('/customer/bookings')}
              className="text-xs font-bold text-coop-800 hover:underline"
            >
              ← View in My Bookings List
            </button>
            <button
              onClick={() => navigate('/customer/dashboard')}
              className="text-xs font-bold text-surface-600 hover:text-surface-900"
            >
              Go to Customer Dashboard →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
