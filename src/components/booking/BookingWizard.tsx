import React, { useState } from 'react';
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
  Zap,
  Hammer,
  Paintbrush,
  Sparkles as CleaningIcon,
  HeartHandshake,
  Car,
  Trees,
  Tv,
  Camera,
  UploadCloud,
  Check, 
  User, 
  Phone, 
  Navigation,
  FileText,
  Printer,
  X,
  QrCode,
  IndianRupee,
  Layers,
  ThumbsUp,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { MOCK_WORKERS } from '../../data/mockWorkers';
import { MOCK_SERVICES } from '../../data/mockServices';
import { analyzeProblemWithAI, calculateFairWorkerScores, calculatePaymentBreakdown } from '../../utils/aiMatchingEngine';
import { calculateRateCardPricing } from '../../utils/pricingAndPayment';
import { RateCardBreakdown } from '../common/RateCardBreakdown';
import { PaymentStatusBadge } from '../common/PaymentStatusBadge';
import type { Worker, AIAnalysisResult, BookingStatus, ServiceItem } from '../../types';
import confetti from 'canvas-confetti';

const SERVICE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  plumbing: Wrench,
  electrical: Zap,
  carpentry: Hammer,
  painting: Paintbrush,
  cleaning: CleaningIcon,
  caregiving: HeartHandshake,
  driver: Car,
  gardening: Trees,
  appliance: Tv,
  technician: Camera,
  pestcontrol: ShieldCheck,
  community: Layers,
};

export const BookingWizard: React.FC = () => {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const { createNewBooking, updateBookingStatus, submitCustomerReview } = useApp();
  const { language, t } = useLanguage();

  const state = routerLocation.state as {
    initialProblem?: string;
    initialCategory?: string;
    initialAnalysis?: AIAnalysisResult;
    isEmergency?: boolean;
    location?: string;
  } | null;

  // 11-Step Linear Wizard State
  const [currentStep, setCurrentStep] = useState<number>(state?.initialCategory ? 2 : 1);

  // Step 1: Selected Category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(state?.initialCategory || 'plumbing');
  const selectedServiceItem: ServiceItem = MOCK_SERVICES.find(s => s.id === selectedCategoryId) || MOCK_SERVICES[0];

  // Step 2: Selected Sub-service
  const [selectedSubServiceId, setSelectedSubServiceId] = useState<string>(selectedServiceItem.subServices[0]?.id || 'p1');
  const activeSubService = selectedServiceItem.subServices.find(sub => sub.id === selectedSubServiceId) || selectedServiceItem.subServices[0];

  // Step 3: Problem Description & Voice/NLP
  const [problemText, setProblemText] = useState<string>(
    state?.initialProblem || `Need professional ${selectedServiceItem.name.toLowerCase()} assistance at home.`
  );
  const [isVoiceSimulating, setIsVoiceSimulating] = useState(false);
  const [isEmergency, setIsEmergency] = useState(state?.isEmergency || false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult>(() => {
    if (state?.initialAnalysis) return state.initialAnalysis;
    return analyzeProblemWithAI(problemText);
  });

  // Step 4: Optional Photo
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Step 5: Date & Time
  const [scheduledDate, setScheduledDate] = useState('Today');
  const [scheduledTime, setScheduledTime] = useState('Morning (09:00 AM - 12:00 PM)');

  // Step 6: Location & Address
  const [selectedArea, setSelectedArea] = useState(state?.location || 'Kothrud, Pune');
  const [streetAddress, setStreetAddress] = useState('Flat 402, Rutuparna Apts, Paud Road');
  const [pincode, setPincode] = useState('411038');
  const [customerName, setCustomerName] = useState('Pooja Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98900 12345');

  // Step 7: Pricing calculation
  const calculatedTotal = (activeSubService?.price || selectedServiceItem.basePrice) + (isEmergency ? 150 : 0);
  const paymentSplit = calculatePaymentBreakdown(calculatedTotal);

  // Step 8: Worker Matching
  const [candidateWorkers, setCandidateWorkers] = useState(() => {
    return calculateFairWorkerScores(MOCK_WORKERS, selectedCategoryId, isEmergency ? 'emergency' : 'medium');
  });
  const [selectedWorker, setSelectedWorker] = useState<Worker>(candidateWorkers[0]?.worker || MOCK_WORKERS[0]);

  // Step 10: Payment Gateway
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim'>('gpay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Step 11: Confirmation & Live Milestone Tracker
  const [createdBookingId, setCreatedBookingId] = useState<string>('');
  const [createdBookingNumber, setCreatedBookingNumber] = useState<string>('');
  const [createdTxnId, setCreatedTxnId] = useState<string>('');
  const [liveStatus, setLiveStatus] = useState<BookingStatus>('allocated');
  const [ratingVal, setRatingVal] = useState(5);
  const [punctualityRating, setPunctualityRating] = useState(5);
  const [professionalismRating, setProfessionalismRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Run AI Analysis helper
  const handlePerformAIAnalysis = () => {
    const res = analyzeProblemWithAI(problemText);
    setAiAnalysis(res);
    const ranked = calculateFairWorkerScores(MOCK_WORKERS, selectedCategoryId, isEmergency ? 'emergency' : res.urgency);
    setCandidateWorkers(ranked);
    if (ranked.length > 0) {
      setSelectedWorker(ranked[0].worker);
    }
    setCurrentStep(4);
  };

  // Simulated Voice Input
  const handleSimulateVoice = () => {
    setIsVoiceSimulating(true);
    setTimeout(() => {
      setProblemText('Kitchen main supply pipeline joint is leaking heavily and floor is flooded.');
      setIsVoiceSimulating(false);
    }, 1200);
  };

  // Simulated Photo Upload
  const handleSimulatePhotoUpload = () => {
    setIsUploadingPhoto(true);
    setTimeout(() => {
      setUploadedPhotoUrl('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600');
      setIsUploadingPhoto(false);
    }, 900);
  };

  // Confirm and proceed through payment
  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const generatedTxn = 'TXN-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      setCreatedTxnId(generatedTxn);

      const newBk = createNewBooking({
        problemDescription: problemText,
        aiAnalysis,
        assignedWorker: selectedWorker,
        address: {
          street: streetAddress,
          area: selectedArea,
          city: 'Pune',
          pincode,
        },
        date: scheduledDate,
        timeSlot: scheduledTime,
        totalPrice: calculatedTotal,
        isEmergency,
      });

      setCreatedBookingId(newBk.id);
      setCreatedBookingNumber(newBk.bookingNumber);
      setIsProcessingPayment(false);
      setCurrentStep(11);
      setLiveStatus('allocated');

      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }, 1400);
  };

  // Milestone Progression
  const handleAdvanceMilestone = () => {
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
        confetti({ particleCount: 130, spread: 80 });
      } catch (e) {}
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (createdBookingId) {
      submitCustomerReview(createdBookingId, ratingVal, feedbackText || 'Outstanding cooperative service, polite and verified technician!');
      setReviewSubmitted(true);
    }
  };

  const stepsList = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Type' },
    { num: 3, label: 'Problem' },
    { num: 4, label: 'Photo' },
    { num: 5, label: 'Date/Time' },
    { num: 6, label: 'Location' },
    { num: 7, label: 'Price' },
    { num: 8, label: 'Worker' },
    { num: 9, label: 'Confirm' },
    { num: 10, label: 'Payment' },
    { num: 11, label: 'Receipt' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-4 px-2 sm:px-4 space-y-6">
      
      {/* 11-Step Progress Header */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-surface-200 shadow-card">
        <div className="flex items-center justify-between overflow-x-auto pb-2 sm:pb-0 scrollbar-none gap-1">
          {stepsList.map((st, idx) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;
            return (
              <React.Fragment key={st.num}>
                <div 
                  onClick={() => { if (currentStep > st.num) setCurrentStep(st.num); }}
                  className={`flex items-center gap-1.5 shrink-0 ${currentStep > st.num ? 'cursor-pointer' : ''}`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-coop-900 text-white ring-4 ring-coop-500/20 scale-105'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-surface-100 text-surface-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : st.num}
                  </div>
                  <span className={`text-[11px] font-semibold hidden md:inline ${
                    isCurrent ? 'text-coop-950 font-bold' : isCompleted ? 'text-emerald-800' : 'text-surface-400'
                  }`}>
                    {st.label}
                  </span>
                </div>
                {idx < stepsList.length - 1 && (
                  <div className={`flex-1 min-w-[12px] h-0.5 mx-1 ${
                    currentStep > idx + 1 ? 'bg-emerald-600' : 'bg-surface-200'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 1: Select Service Category
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-800 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 1 of 11: Service Discovery
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              What service do you need today?
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Select from cooperative certified tradesmen verified by Pune District Labour Federation.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {MOCK_SERVICES.map(svc => {
              const isSelected = selectedCategoryId === svc.id;
              const IconComp = SERVICE_ICONS[svc.category] || Wrench;
              return (
                <div
                  key={svc.id}
                  onClick={() => {
                    setSelectedCategoryId(svc.id);
                    setSelectedSubServiceId(svc.subServices[0]?.id || '');
                  }}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-coop-50/80 border-coop-600 shadow-md ring-2 ring-coop-600/20'
                      : 'bg-white border-surface-200 hover:border-surface-300 hover:bg-surface-50/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-coop-900 text-white' : 'bg-surface-100 text-surface-700'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-surface-900 mb-0.5 line-clamp-1">
                    {language === 'mr' ? svc.nameMr : language === 'hi' ? svc.nameHi : svc.name}
                  </h3>
                  <p className="text-[11px] text-surface-500">From ₹{svc.basePrice}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-surface-100 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Next: Select Service Type</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 2: Select Sub-Service Type
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-800 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 2 of 11: Specific Sub-Service
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Choose Service Scope for {selectedServiceItem.name}
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Standardized cooperative rate card with guaranteed warranty and verified tools.
            </p>
          </div>

          <div className="space-y-3">
            {selectedServiceItem.subServices.map(sub => {
              const isSelected = selectedSubServiceId === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubServiceId(sub.id)}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-600 shadow-sm ring-2 ring-emerald-600/20'
                      : 'bg-white border-surface-200 hover:border-surface-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-surface-300'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <h4 className="font-bold text-sm text-surface-900">{sub.name}</h4>
                    </div>
                    <p className="text-xs text-surface-600 pl-6 leading-relaxed">{sub.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-surface-900 font-display">₹{sub.price}</span>
                    <span className="text-[10px] text-surface-400 block">{selectedServiceItem.estimatedTime}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checklist Assurance */}
          <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 text-xs">
            <span className="font-bold text-surface-800 block mb-2">Cooperative Service Guarantee Included:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-surface-600">
              {selectedServiceItem.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-semibold text-surface-600 hover:text-surface-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Next: Describe Problem</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 3: Describe Problem & AI NLP Parser
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-800 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 3 of 11: Problem Diagnostics
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Describe What Needs Repair
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Our AI engine automatically detects required tools, spare parts, and technician level.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-surface-800">
                  Detailed Issue Description (English, Hindi, Marathi accepted)
                </label>
                <button
                  type="button"
                  onClick={handleSimulateVoice}
                  disabled={isVoiceSimulating}
                  className="text-xs font-bold text-coop-700 hover:text-coop-900 flex items-center gap-1 bg-coop-50 px-2.5 py-1 rounded-lg border border-coop-200 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isVoiceSimulating ? 'Listening to voice...' : 'Speak in Marathi/Hindi'}</span>
                </button>
              </div>

              <textarea
                value={problemText}
                onChange={e => setProblemText(e.target.value)}
                rows={4}
                placeholder="E.g. The bathroom supply tap is continuously dripping and the wall behind it has moisture seepage."
                className="w-full bg-surface-50 border border-surface-200 rounded-2xl p-4 text-xs sm:text-sm text-surface-900 focus:outline-none focus:border-coop-600 font-medium"
              />
            </div>

            {/* Emergency Toggle */}
            <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-600 text-white">
                  <Siren className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-900">Mark as Emergency Priority Dispatch</h4>
                  <p className="text-[11px] text-rose-700">Immediate 15-20 min response for active hazards, pipe bursts, or sparks.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isEmergency}
                onChange={e => setIsEmergency(e.target.checked)}
                className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-xs font-semibold text-surface-600 hover:text-surface-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handlePerformAIAnalysis}
              disabled={!problemText.trim()}
              className="px-6 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <span>Analyze & Continue</span>
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 4: Upload Optional Photo
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-800 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 4 of 11: Photo Inspection (Optional)
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Upload a Photo of the Problem
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Helps the cooperative technician carry the exact PVC fittings, sealants, or MCB ratings beforehand.
            </p>
          </div>

          {uploadedPhotoUrl ? (
            <div className="relative max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-lg">
              <img src={uploadedPhotoUrl} alt="Problem preview" className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2">
                <button
                  type="button"
                  onClick={() => setUploadedPhotoUrl(null)}
                  className="p-1.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow-md"
                  title="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 bg-emerald-950/90 text-white text-[11px] flex items-center justify-between">
                <span className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> AI Scan: Pipe Joint Leak Confirmed
                </span>
                <span className="text-emerald-300 font-mono text-[10px]">98% Confidence</span>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-surface-300 rounded-3xl p-8 text-center space-y-4 hover:border-coop-500 transition-colors">
              <div className="w-14 h-14 bg-surface-100 rounded-2xl flex items-center justify-center mx-auto text-surface-500">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-surface-900">Upload leak / damage photo</h4>
                <p className="text-xs text-surface-500 mt-0.5">Supports JPG, PNG up to 10MB</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSimulatePhotoUpload}
                  disabled={isUploadingPhoto}
                  className="px-4 py-2 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{isUploadingPhoto ? 'Uploading & Scanning...' : 'Simulate Camera Upload'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-4 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 text-xs font-semibold rounded-xl"
                >
                  Skip for Now
                </button>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 text-xs font-semibold text-surface-600 hover:text-surface-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-6 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Next: Select Date & Time</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 5: Date & Time Schedule
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-800 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 5 of 11: Schedule Slot
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              When should the technician arrive?
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Cooperative workers operate on guaranteed punctuality with zero unnotified cancellations.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-surface-800 block mb-2">Select Day</label>
              <div className="grid grid-cols-3 gap-3">
                {['Today', 'Tomorrow', 'Day After Tomorrow'].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setScheduledDate(d)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                      scheduledDate === d
                        ? 'bg-coop-900 text-white border-coop-900 shadow-sm'
                        : 'bg-surface-50 text-surface-700 border-surface-200 hover:bg-surface-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-surface-800 block mb-2">Select Time Window</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Morning (09:00 AM - 12:00 PM)',
                  'Afternoon (12:00 PM - 04:00 PM)',
                  'Evening (04:00 PM - 08:00 PM)',
                ].map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setScheduledTime(slot)}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
                      scheduledTime === slot
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                        : 'bg-white border-surface-200 text-surface-700 hover:bg-surface-50'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-surface-500 mb-1" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 text-xs font-semibold text-surface-600 hover:text-surface-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(6)}
              className="px-6 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Next: Enter Location</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 6: Enter / Select Location
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 6 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-800 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 6 of 11: Service Address
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Where should the worker report?
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Our GIS allocation matches the closest active society technician to minimize transit time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-surface-800 block mb-1">Customer Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 focus:outline-none focus:border-coop-600 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-surface-800 block mb-1">Mobile Contact (for OTP and arrival)</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 focus:outline-none focus:border-coop-600 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-surface-800 block mb-1">Pune Zone / Locality</label>
                <select
                  value={selectedArea}
                  onChange={e => setSelectedArea(e.target.value)}
                  className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 focus:outline-none focus:border-coop-600 font-medium cursor-pointer"
                >
                  <option value="Kothrud, Pune">Kothrud (Zone 4) • High Availability</option>
                  <option value="Baner & Aundh, Pune">Baner & Aundh (Zone 2)</option>
                  <option value="Shivajinagar, Pune">Shivajinagar (Zone 1)</option>
                  <option value="Hadapsar & Magarpatta, Pune">Hadapsar & Magarpatta (Zone 7)</option>
                  <option value="Viman Nagar, Pune">Viman Nagar (Zone 5)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-surface-800 block mb-1">Street Address / Flat No.</label>
                <textarea
                  rows={2}
                  value={streetAddress}
                  onChange={e => setStreetAddress(e.target.value)}
                  className="w-full bg-surface-50 border border-surface-200 rounded-xl p-3 text-surface-900 focus:outline-none focus:border-coop-600 font-medium resize-none"
                />
              </div>

              <div>
                <label className="font-bold text-surface-800 block mb-1">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 focus:outline-none focus:border-coop-600 font-medium"
                />
              </div>
            </div>

            {/* GIS Pinpoint Visual */}
            <div className="bg-surface-900 text-white rounded-2xl p-5 flex flex-col justify-between border border-surface-800 relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[11px] font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>GIS Geofence Locked</span>
                </div>
                <h4 className="text-base font-bold text-white">{selectedArea}</h4>
                <p className="text-xs text-surface-300">
                  {streetAddress}, PIN: {pincode}
                </p>
              </div>

              {/* Simulated Map Visual */}
              <div className="my-4 h-32 bg-surface-800/80 rounded-xl border border-surface-700 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
                <div className="relative flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded text-white mt-1">
                    Your Address
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-surface-400 relative z-10">
                Nearest cooperative depot: <strong>Kothrud Shramik Mandal (1.4 km)</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(5)}
              className="px-4 py-2 text-xs font-semibold text-surface-600 hover:text-surface-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(7)}
              className="px-6 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Next: Fair Wage Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 7: Fair Wage & Estimated Price Breakdown
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 7 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-800 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 7 of 11: Fair Price Architecture
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Transparent Cooperative Economics
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Unlike private aggregators that extract 30–35% margin, Sahyog channels 80% directly to the technician.
            </p>
          </div>

          {/* Standard Clear Rate Card (Base, Labour, Material, Travel, Estimated Price) */}
          <RateCardBreakdown 
            pricing={calculateRateCardPricing(calculatedTotal, isEmergency)}
            serviceName={activeSubService?.name || selectedServiceItem.name}
          />

          {/* Transparent 80/20 Distribution Card */}
          <div className="bg-gradient-to-br from-surface-50 to-coop-50/50 rounded-3xl p-6 border border-surface-200 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-surface-200">
              <div>
                <span className="text-xs text-surface-500 font-semibold block">Total Estimated Cost</span>
                <span className="text-3xl font-black text-surface-900 font-display">₹{calculatedTotal}</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                100% Transparent • Zero Hidden Commission
              </span>
            </div>

            {/* Distribution Visual Bars */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold text-surface-800 mb-1">
                  <span className="text-emerald-700">Worker Direct Earnings (80%)</span>
                  <span>₹{paymentSplit.workerEarnings}</span>
                </div>
                <div className="h-2.5 bg-surface-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-surface-800 mb-1">
                  <span className="text-coop-800">Cooperative Society Development (10%)</span>
                  <span>₹{paymentSplit.cooperativeFund}</span>
                </div>
                <div className="h-2.5 bg-surface-200 rounded-full overflow-hidden">
                  <div className="h-full bg-coop-700 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-surface-800 mb-1">
                  <span className="text-amber-700">Worker Health & Accident Cover (5%)</span>
                  <span>₹{paymentSplit.welfareInsurance}</span>
                </div>
                <div className="h-2.5 bg-surface-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-600 rounded-full" style={{ width: '5%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-surface-800 mb-1">
                  <span className="text-surface-600">Platform Operations & Open Tech (5%)</span>
                  <span>₹{paymentSplit.platformOperations}</span>
                </div>
                <div className="h-2.5 bg-surface-200 rounded-full overflow-hidden">
                  <div className="h-full bg-surface-500 rounded-full" style={{ width: '5%' }} />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-200 flex items-center gap-2 text-[11px] text-surface-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Includes 90-day cooperative service warranty and GST invoice receipt.</span>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(6)}
              className="px-4 py-2 text-xs font-semibold text-surface-600 hover:text-surface-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(8)}
              className="px-6 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Next: AI Matched Workers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 8: Matched Workers with Transparent AI Score
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 8 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-800 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 8 of 11: Transparent AI Allocation
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Recommended Cooperative Specialists
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Every match score is fully explainable. We balance skill verification, proximity, rating, and fair worker workload.
            </p>
          </div>

          <div className="space-y-4">
            {candidateWorkers.slice(0, 3).map((item, idx) => {
              const w = item.worker;
              const isSelected = selectedWorker.id === w.id;
              const matchScore = Math.round(item.compositeScore);

              return (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorker(w)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-600 shadow-md ring-2 ring-emerald-600/20'
                      : 'bg-white border-surface-200 hover:border-surface-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={w.avatar}
                        alt={w.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm sm:text-base text-surface-900">{w.name}</h3>
                          <span className="p-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <p className="text-xs text-surface-500">{w.cooperativeSociety.split('(')[0]}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                          <span className="font-bold text-amber-600 flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-500" /> {w.rating}
                          </span>
                          <span className="text-surface-400">•</span>
                          <span className="text-surface-600 font-semibold">{w.completedJobs} jobs</span>
                          <span className="text-surface-400">•</span>
                          <span className="text-surface-600">{w.distanceKm} km away</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Score Badge */}
                    <div className="flex items-center sm:flex-col items-end gap-1">
                      <div className="px-3 py-1 bg-emerald-600 text-white rounded-xl text-xs font-black flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{matchScore}% Match</span>
                      </div>
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                        {idx === 0 ? 'Top Recommended' : 'Alternative Specialist'}
                      </span>
                    </div>
                  </div>

                  {/* Explainable AI Checklist */}
                  <div className="mt-4 pt-3 border-t border-surface-200/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[11px] text-surface-600">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Skill & NSDC Certification matched</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Available for requested slot</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Balanced workload ({w.jobsToday} jobs today)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(7)}
              className="px-4 py-2 text-xs font-semibold text-surface-600 hover:text-surface-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(9)}
              className="px-6 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Next: Confirm Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 9: Confirm Booking Summary
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 9 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-coop-800 bg-coop-50 px-2.5 py-1 rounded-md">
              Step 9 of 11: Final Confirmation
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Review Service Request Details
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Verify your booking overview before advancing to secure payment escrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Left Summary */}
            <div className="p-5 bg-surface-50 rounded-2xl border border-surface-200 space-y-3">
              <h4 className="font-bold text-surface-900 text-sm">Service & Schedule</h4>
              <div className="flex justify-between py-1 border-b border-surface-200">
                <span className="text-surface-500">Service:</span>
                <span className="font-bold text-surface-900">{selectedServiceItem.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-200">
                <span className="text-surface-500">Sub-Service:</span>
                <span className="font-semibold text-surface-900">{activeSubService?.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-200">
                <span className="text-surface-500">Date & Slot:</span>
                <span className="font-semibold text-surface-900">{scheduledDate} • {scheduledTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-200">
                <span className="text-surface-500">Location:</span>
                <span className="font-semibold text-surface-900">{selectedArea}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-surface-500">Street:</span>
                <span className="font-semibold text-surface-900 truncate max-w-[180px]">{streetAddress}</span>
              </div>
            </div>

            {/* Right Assigned Worker Card */}
            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-3">
              <h4 className="font-bold text-emerald-950 text-sm">Assigned Cooperative Worker</h4>
              <div className="flex items-center gap-3">
                <img src={selectedWorker.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border border-emerald-400" />
                <div>
                  <p className="font-bold text-surface-900">{selectedWorker.name}</p>
                  <p className="text-[11px] text-surface-600">{selectedWorker.cooperativeSociety.split('(')[0]}</p>
                  <p className="text-[11px] font-bold text-amber-700">★ {selectedWorker.rating} ({selectedWorker.completedJobs} jobs)</p>
                </div>
              </div>
              <div className="pt-2 border-t border-emerald-200 flex justify-between font-black text-sm">
                <span>Payable Amount:</span>
                <span className="text-emerald-800">₹{calculatedTotal}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(8)}
              className="px-4 py-2 text-xs font-semibold text-surface-600 hover:text-surface-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(10)}
              className="px-6 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Proceed to Digital Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 10: Realistic Payment Gateway (Simulated)
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 10 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
              Step 10 of 11: Digital Payment Escrow
            </span>
            <h2 className="text-2xl font-black text-surface-900 mt-2 font-display">
              Safe Simulated Digital Payment
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              Payments are safely held in cooperative escrow and released directly to the worker upon job completion.
            </p>
          </div>

          {/* Payment Method Tabs */}
          <div className="flex gap-2 border-b border-surface-200 pb-3 text-xs">
            {[
              { id: 'upi', label: 'UPI (QR / Apps)' },
              { id: 'card', label: 'Credit / Debit Card' },
              { id: 'netbanking', label: 'Net Banking' },
              { id: 'wallet', label: 'Cooperative Escrow' },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  paymentMethod === m.id
                    ? 'bg-coop-900 text-white shadow-xs'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Tab 1: UPI */}
          {paymentMethod === 'upi' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-4 bg-surface-50 rounded-2xl border border-surface-200 text-xs">
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-surface-200 text-center space-y-2">
                <div className="w-36 h-36 bg-surface-900 rounded-xl p-2 flex items-center justify-center text-white">
                  <div className="w-full h-full border-2 border-white rounded grid grid-cols-3 gap-1 p-1">
                    <div className="bg-white rounded-xs" />
                    <div className="bg-surface-700" />
                    <div className="bg-white rounded-xs" />
                    <div className="bg-surface-700" />
                    <div className="bg-white" />
                    <div className="bg-surface-700" />
                    <div className="bg-white rounded-xs" />
                    <div className="bg-surface-700" />
                    <div className="bg-white rounded-xs" />
                  </div>
                </div>
                <span className="font-bold text-surface-800">Scan QR via Google Pay / PhonePe / Paytm</span>
                <span className="text-[10px] text-surface-400 font-mono">UPI ID: sahyog.coop@icici</span>
              </div>

              <div className="space-y-3">
                <span className="font-bold text-surface-800 block">Or select UPI app to pay ₹{calculatedTotal}:</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'gpay', name: 'Google Pay' },
                    { id: 'phonepe', name: 'PhonePe' },
                    { id: 'paytm', name: 'Paytm' },
                    { id: 'bhim', name: 'BHIM UPI' },
                  ].map(app => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setUpiApp(app.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                        upiApp === app.id
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-600/20'
                          : 'bg-white border-surface-200 hover:bg-surface-100'
                      }`}
                    >
                      {app.name}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-surface-500">
                  Demo Payment Mode: Simulates instant cooperative ledger verification.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Card */}
          {paymentMethod === 'card' && (
            <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 text-xs space-y-3 max-w-md">
              <div>
                <label className="font-bold text-surface-700 block mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="4111 •••• •••• 4242"
                  defaultValue="4111 5678 9012 3456"
                  className="w-full bg-white border border-surface-200 rounded-xl px-3 py-2 text-surface-900 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-surface-700 block mb-1">Valid Thru</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="08/29"
                    className="w-full bg-white border border-surface-200 rounded-xl px-3 py-2 text-surface-900 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-surface-700 block mb-1">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    defaultValue="888"
                    className="w-full bg-white border border-surface-200 rounded-xl px-3 py-2 text-surface-900 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Net Banking */}
          {paymentMethod === 'netbanking' && (
            <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 text-xs space-y-3">
              <span className="font-bold text-surface-800 block">Select Cooperative or Scheduled Bank:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'State Bank of India',
                  'HDFC Bank',
                  'Bank of Maharashtra',
                  'Pune District Central Co-op Bank',
                  'ICICI Bank',
                  'Shamrao Vithal Co-op Bank',
                ].map(bank => (
                  <button
                    key={bank}
                    type="button"
                    className="p-2.5 bg-white hover:bg-surface-100 border border-surface-200 rounded-xl text-left font-medium"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Wallet Escrow */}
          {paymentMethod === 'wallet' && (
            <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 text-xs space-y-2">
              <h4 className="font-bold text-surface-900">Sahyog Cooperative Escrow Guarantee</h4>
              <p className="text-surface-600">
                Your ₹{calculatedTotal} payment is kept protected under the Maharashtra Cooperative Societies Act. Money is transferred to {selectedWorker.name} only after you share the 4-digit completion code.
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(9)}
              className="px-4 py-2 text-xs font-semibold text-surface-600 hover:text-surface-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleProcessPayment}
              disabled={isProcessingPayment}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isProcessingPayment ? 'Authorizing Escrow...' : `Pay ₹${calculatedTotal} Securely`}</span>
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          STEP 11: Booking Confirmation, Live Tracking & Printable Invoice
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {currentStep === 11 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-card space-y-8 animate-fade-in">
          
          {/* Top Success Pill */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Booking Confirmed • #{createdBookingNumber}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-surface-900 font-display">
              Cooperative Specialist Allocated!
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 max-w-md mx-auto">
              Transaction ID: <span className="font-mono font-bold text-surface-800">{createdTxnId}</span>. Your service order has been committed to the federation ledger.
            </p>

            {/* Evaluation Feature: Prominent Payment Status Display */}
            <div className="pt-2 flex justify-center">
              <PaymentStatusBadge 
                status={liveStatus === 'completed' ? 'payment_released' : 'payment_protected_held'} 
                showDescription={true}
                size="md" 
              />
            </div>
          </div>

          {/* Live Milestone Tracker */}
          <div className="bg-surface-50 rounded-2xl p-5 border border-surface-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-surface-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-coop-700 animate-pulse" />
                Live Service Fulfillment Milestones
              </h3>
              <button
                type="button"
                onClick={handleAdvanceMilestone}
                disabled={liveStatus === 'completed'}
                className="px-3 py-1.5 bg-coop-900 hover:bg-coop-800 text-white text-[11px] font-bold rounded-xl transition-all shadow-xs disabled:opacity-40"
              >
                {liveStatus === 'completed' ? '✓ Completed' : 'Simulate Next Milestone →'}
              </button>
            </div>

            {/* Steps Timeline */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              {[
                { key: 'allocated', label: 'Allocated' },
                { key: 'accepted_by_worker', label: 'Accepted' },
                { key: 'en_route', label: 'En Route' },
                { key: 'arrived', label: 'Arrived' },
                { key: 'in_progress', label: 'In Progress' },
                { key: 'completed', label: 'Finished' },
              ].map((st, i) => {
                const statusOrder = ['allocated', 'accepted_by_worker', 'en_route', 'arrived', 'in_progress', 'completed'];
                const currentIndex = statusOrder.indexOf(liveStatus);
                const stepIndex = statusOrder.indexOf(st.key);
                const isPassed = stepIndex <= currentIndex;

                return (
                  <div
                    key={st.key}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 ${
                      isPassed ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' : 'bg-white border-surface-200 text-surface-400'
                    }`}
                  >
                    <span className="text-[10px] font-mono">{i + 1}</span>
                    <span className="text-[11px]">{st.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Worker Card & Invoice Print Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-surface-200 flex items-center gap-4">
              <img src={selectedWorker.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover border border-surface-300 shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-surface-900 text-sm">{selectedWorker.name}</h4>
                <p className="text-xs text-surface-500">{selectedWorker.primarySkill}</p>
                <p className="text-[11px] text-surface-600 font-semibold">{selectedWorker.phone}</p>
              </div>
              <a
                href={`tel:${selectedWorker.phone}`}
                className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-colors"
                title="Call Worker"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 flex items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-surface-900 text-sm">Download GST Tax Invoice</h4>
                <p className="text-xs text-surface-500">Official cooperative society tax receipt</p>
              </div>
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(true)}
                className="px-4 py-2 bg-coop-900 hover:bg-coop-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 shrink-0"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View / Print Invoice</span>
              </button>
            </div>
          </div>

          {/* Rating & Review Modal after Completion */}
          {liveStatus === 'completed' && (
            <div className="p-6 bg-emerald-50/70 border border-emerald-300 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-emerald-950">Customer Rating & Service Review</h3>
                  <p className="text-xs text-surface-600">Your feedback helps cooperative workers earn training credits.</p>
                </div>
                {reviewSubmitted && (
                  <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-300">
                    ✓ Feedback Submitted
                  </span>
                )}
              </div>

              {!reviewSubmitted ? (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-surface-700">Overall Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingVal(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star className={`w-5 h-5 ${star <= ratingVal ? 'text-amber-500 fill-amber-500' : 'text-surface-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    placeholder="Write a brief comment (e.g. Arrived exactly on time, clean work, respectful behaviour)..."
                    className="w-full bg-white border border-surface-200 rounded-xl px-3.5 py-2 text-xs text-surface-900 focus:outline-none focus:border-emerald-600"
                  />

                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    Submit Verified Review
                  </button>
                </form>
              ) : (
                <p className="text-xs text-emerald-900 font-medium">
                  Thank you! Your 5★ review and patron patronage points have been credited to {selectedWorker.name}'s Sahyog Passport.
                </p>
              )}
            </div>
          )}

          {/* Footer Navigation Link */}
          <div className="pt-4 border-t border-surface-100 flex items-center justify-between">
            <button
              onClick={() => navigate('/customer/bookings')}
              className="px-5 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Go to Customer Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 text-xs font-semibold rounded-xl"
            >
              Book Another Service
            </button>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════════════════
          Printable GST Invoice Modal
          ═════════════════════════════════════════════════════════════════════════════════════ */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-surface-200 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Invoice Header */}
            <div className="flex items-start justify-between border-b border-surface-200 pb-4">
              <div>
                <span className="text-base font-black text-coop-950 font-display">SAHYOG COOPERATIVE TAX INVOICE</span>
                <p className="text-[11px] text-surface-500">Maharashtra Labour Cooperative Societies Federation</p>
                <p className="text-[10px] text-surface-400 font-mono">GSTIN: 27AABCS1234F1Z8 • Reg No: MCS/PUN/2024/8892</p>
              </div>
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(false)}
                className="p-1 rounded-lg hover:bg-surface-100 text-surface-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bill Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-surface-400 block text-[10px] uppercase">Invoice To:</span>
                <span className="font-bold text-surface-900">{customerName}</span>
                <p className="text-surface-500">{streetAddress}, {selectedArea}</p>
                <p className="text-surface-500">{customerPhone}</p>
              </div>
              <div className="text-right">
                <span className="text-surface-400 block text-[10px] uppercase">Invoice Details:</span>
                <span className="font-bold text-surface-900 font-mono">#{createdBookingNumber || 'BK-DEMO-99'}</span>
                <p className="text-surface-500 font-mono">Txn: {createdTxnId || 'TXN-7749A'}</p>
                <p className="text-surface-500">Date: {scheduledDate}</p>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-200 text-surface-500 text-[10px] uppercase">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                <tr>
                  <td className="py-2.5">
                    <span className="font-bold text-surface-900">{selectedServiceItem.name}</span>
                    <span className="text-surface-500 block text-[11px]">{activeSubService?.name}</span>
                  </td>
                  <td className="py-2.5 text-right font-semibold">₹{activeSubService?.price || selectedServiceItem.basePrice}</td>
                </tr>
                {isEmergency && (
                  <tr>
                    <td className="py-2 text-rose-700 font-medium">Rapid Emergency Surcharge (Standard Hazard Fee)</td>
                    <td className="py-2 text-right text-rose-700 font-semibold">₹150</td>
                  </tr>
                )}
                <tr className="bg-surface-50 font-bold">
                  <td className="py-2.5 px-2">Total Customer Paid (Incl GST)</td>
                  <td className="py-2.5 px-2 text-right text-surface-900 font-black">₹{calculatedTotal}</td>
                </tr>
              </tbody>
            </table>

            {/* Transparent Breakdown in Invoice */}
            <div className="p-3 bg-surface-50 rounded-xl border border-surface-200 text-[11px] space-y-1">
              <span className="font-bold text-surface-800 block text-[10px] uppercase">Cooperative Transparent Allocation:</span>
              <div className="flex justify-between text-surface-600">
                <span>Worker Direct Earning (80%):</span>
                <span className="font-bold">₹{paymentSplit.workerEarnings}</span>
              </div>
              <div className="flex justify-between text-surface-600">
                <span>Welfare & Health Insurance Fund (5%):</span>
                <span>₹{paymentSplit.welfareInsurance}</span>
              </div>
              <div className="flex justify-between text-surface-600">
                <span>Cooperative Society Operations (10%):</span>
                <span>₹{paymentSplit.cooperativeFund}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(false)}
                className="px-4 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 bg-coop-900 hover:bg-coop-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Tax Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
