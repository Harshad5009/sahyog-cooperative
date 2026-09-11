import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Siren, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  PhoneCall, 
  Zap, 
  Wrench, 
  HeartHandshake, 
  Tv, 
  Key, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Radio,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { MOCK_WORKERS } from '../../data/mockWorkers';
import confetti from 'canvas-confetti';

const EMERGENCY_SERVICES = [
  {
    id: 'electrical',
    title: 'Emergency Electrician',
    titleHi: 'आपातकालीन इलेक्ट्रीशियन',
    titleMr: 'तातडीचा इलेक्ट्रिशियन',
    icon: Zap,
    desc: 'Sparks, MCB tripping, wire burning smell, immediate short circuit isolation.',
    eta: '12-15 mins',
    basePrice: 399,
    hazardCharge: 150,
    color: 'rose',
    nearbyWorkerCount: 4,
  },
  {
    id: 'plumbing',
    title: 'Burst Pipe & Flood Plumber',
    titleHi: 'पाइप लीकेज व प्लंबर',
    titleMr: 'नळ गळती व पाणी आपत्कालीन',
    icon: Wrench,
    desc: 'Main supply pipe burst, heavy bathroom flooding, drain overflow stoppage.',
    eta: '14-18 mins',
    basePrice: 349,
    hazardCharge: 150,
    color: 'blue',
    nearbyWorkerCount: 5,
  },
  {
    id: 'caregiving',
    title: 'Urgent Patient / Elderly Aid',
    titleHi: 'वरिष्ठ नागरिक / मरीज आपात सहायता',
    titleMr: 'रुग्ण / ज्येष्ठ नागरिक तात्काळ मदत',
    icon: HeartHandshake,
    desc: 'Elderly fall mobility assistance, post-hospital transport attendant, vitals monitor.',
    eta: '15-20 mins',
    basePrice: 699,
    hazardCharge: 100,
    color: 'emerald',
    nearbyWorkerCount: 3,
  },
  {
    id: 'appliance',
    title: 'Critical Appliance Technician',
    titleHi: 'उपकरण तात्कालिक मरम्मत',
    titleMr: 'महत्त्वाची उपकरणे तातडी दुरुस्ती',
    icon: Tv,
    desc: 'Geyser current leakage, refrigerator compressor failure during extreme heat.',
    eta: '20-25 mins',
    basePrice: 449,
    hazardCharge: 100,
    color: 'amber',
    nearbyWorkerCount: 2,
  },
  {
    id: 'carpentry',
    title: 'Lockout & Jammed Door Lock',
    titleHi: 'डोर लॉक जाम व आपात बढ़ई',
    titleMr: 'दरवाजा कुलूप दुरुस्ती व सुतार',
    icon: Key,
    desc: 'Main door deadbolt jammed, broken key in mortise lock, security breach fix.',
    eta: '15-20 mins',
    basePrice: 399,
    hazardCharge: 100,
    color: 'orange',
    nearbyWorkerCount: 3,
  },
];

export const EmergencyPage: React.FC = () => {
  const navigate = useNavigate();
  const { createNewBooking } = useApp();
  const { language, t } = useLanguage();

  const [selectedService, setSelectedService] = useState(EMERGENCY_SERVICES[0]);
  const [customerName, setCustomerName] = useState('Pooja Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98900 12345');
  const [selectedArea, setSelectedArea] = useState('Kothrud, Pune');
  const [streetAddress, setStreetAddress] = useState('Flat 402, Rutuparna Apts, Paud Road');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const [dispatchedBookingId, setDispatchedBookingId] = useState('');

  // Find best available emergency worker
  const onDutyWorker = MOCK_WORKERS.find(
    w => w.primarySkill.toLowerCase().includes(selectedService.id) || w.emergencyDuty
  ) || MOCK_WORKERS[0];

  const totalCost = selectedService.basePrice + selectedService.hazardCharge;

  const handleConfirmSOS = () => {
    const newBk = createNewBooking({
      problemDescription: `EMERGENCY SOS: ${selectedService.title}. Immediate dispatch requested.`,
      aiAnalysis: {
        detectedCategory: selectedService.id,
        subService: selectedService.title,
        urgency: 'emergency',
        requiredSkill: onDutyWorker.primarySkill,
        requiredCertifications: onDutyWorker.certifications.map(c => c.name),
        toolsNeeded: ['Emergency Rapid Tool Kit', 'Diagnostic Safety Multimeter/Sealants'],
        estimatedCostRange: [totalCost, totalCost + 100],
        estimatedDuration: selectedService.eta,
        confidenceScore: 99.4,
        problemSummary: `Critical ${selectedService.title} request in ${selectedArea}. Priority dispatch initiated.`,
        detectedLanguage: language,
      },
      assignedWorker: onDutyWorker,
      address: {
        street: streetAddress,
        area: selectedArea,
        city: 'Pune',
        pincode: '411038',
      },
      date: 'Today (Immediate)',
      timeSlot: 'Next 15-20 Mins',
      totalPrice: totalCost,
      isEmergency: true,
    });

    setDispatchedBookingId(newBk.bookingNumber);
    setIsDispatched(true);
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-surface-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Emergency Red Banner */}
        <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-surface-950 text-white rounded-3xl p-6 sm:p-8 border border-rose-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>Maharashtra Labour Federation • 24/7 Rapid Emergency Response</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white flex items-center gap-3">
                <Siren className="w-8 h-8 text-rose-400 animate-bounce shrink-0" />
                <span>{t.emergencyTitle}</span>
              </h1>
              <p className="text-xs sm:text-sm text-rose-200/90 max-w-2xl leading-relaxed">
                {t.emergencySub} All services follow standardized transparent cooperative pricing with zero surge exploitation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a 
                href="tel:18002667249"
                className="px-5 py-3 bg-surface-900/90 hover:bg-surface-800 text-rose-200 border border-rose-700/60 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Toll-Free: 1800-266-7249</span>
              </a>
            </div>
          </div>
        </div>

        {/* If Dispatched Status View */}
        {isDispatched ? (
          <div className="bg-white rounded-3xl p-8 border border-emerald-300 shadow-xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Specialist Dispatched • Booking #{dispatchedBookingId}
              </span>
              <h2 className="text-2xl font-black text-surface-900 mt-3 font-display">
                Emergency Worker is En Route!
              </h2>
              <p className="text-sm text-surface-600 mt-1 max-w-md mx-auto">
                {onDutyWorker.name} has accepted your request and is driving to your location. Estimated arrival: <span className="font-bold text-rose-600">{selectedService.eta}</span>.
              </p>
            </div>

            {/* Live Worker Details Card */}
            <div className="max-w-md mx-auto bg-surface-50 border border-surface-200 rounded-2xl p-5 flex items-center gap-4 text-left">
              <img 
                src={onDutyWorker.avatar} 
                alt={onDutyWorker.name} 
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-md shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-surface-900 text-sm">{onDutyWorker.name}</h4>
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
                <p className="text-xs text-surface-500 truncate">{onDutyWorker.cooperativeSociety.split('(')[0]}</p>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="font-bold text-amber-600">★ {onDutyWorker.rating}</span>
                  <span className="text-surface-400">•</span>
                  <span className="text-surface-600 font-semibold">{onDutyWorker.completedJobs} jobs done</span>
                </div>
              </div>
              <a 
                href={`tel:${onDutyWorker.phone}`} 
                className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-colors"
                title="Call Worker"
              >
                <PhoneCall className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-surface-100">
              <button
                onClick={() => navigate('/customer/bookings')}
                className="px-6 py-2.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Track on Customer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setIsDispatched(false); setIsConfirmModalOpen(false); }}
                className="px-4 py-2.5 bg-surface-100 hover:bg-surface-200 text-surface-700 text-xs font-semibold rounded-xl"
              >
                Place Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Selection & Dispatch Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Choose Urgent Service */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-surface-900">
                  Select Emergency Service Category
                </h3>
                <span className="text-xs text-surface-500">Instant priority queue</span>
              </div>

              <div className="space-y-3">
                {EMERGENCY_SERVICES.map(svc => {
                  const isSelected = selectedService.id === svc.id;
                  const Icon = svc.icon;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => setSelectedService(svc)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isSelected 
                          ? 'bg-rose-50/70 border-rose-500 shadow-md ring-2 ring-rose-500/20' 
                          : 'bg-white border-surface-200 hover:border-surface-300 hover:bg-surface-50/50'
                      }`}
                    >
                      <div className={`p-3 rounded-xl shrink-0 ${
                        isSelected ? 'bg-rose-600 text-white' : 'bg-surface-100 text-surface-700'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm sm:text-base font-bold text-surface-900">
                            {language === 'mr' ? svc.titleMr : language === 'hi' ? svc.titleHi : svc.title}
                          </h4>
                          <span className="text-xs font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" /> ETA: {svc.eta}
                          </span>
                        </div>
                        <p className="text-xs text-surface-600 line-clamp-2">{svc.desc}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-3 pt-2 border-t border-surface-100 text-xs">
                          <span className="text-surface-700 font-semibold">
                            Base: ₹{svc.basePrice} + Emergency Fee: ₹{svc.hazardCharge} = <strong className="text-surface-900 font-black">₹{svc.basePrice + svc.hazardCharge}</strong>
                          </span>
                          <span className="text-emerald-700 font-bold ml-auto flex items-center gap-1">
                            <Radio className="w-3 h-3 animate-pulse text-emerald-600" />
                            {svc.nearbyWorkerCount} active specialists nearby
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Cols: Rapid Dispatch Lock Form */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-surface-200 shadow-card space-y-5 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-surface-100">
                <h3 className="text-sm font-bold text-surface-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  Dispatch Coordinates & Contact
                </h3>
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  GPS Locked
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-surface-700 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 focus:outline-none focus:border-rose-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-surface-700 block mb-1">Mobile Phone (Emergency SMS Dispatch)</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 focus:outline-none focus:border-rose-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-surface-700 block mb-1">Pune Zone / Sector</label>
                  <select
                    value={selectedArea}
                    onChange={e => setSelectedArea(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-surface-900 focus:outline-none focus:border-rose-500 font-medium cursor-pointer"
                  >
                    <option value="Kothrud, Pune">Kothrud (Zone 4) • Fastest response</option>
                    <option value="Baner & Aundh, Pune">Baner & Aundh (Zone 2)</option>
                    <option value="Shivajinagar, Pune">Shivajinagar (Zone 1)</option>
                    <option value="Hadapsar, Pune">Hadapsar & Magarpatta (Zone 7)</option>
                    <option value="Viman Nagar, Pune">Viman Nagar (Zone 5)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-surface-700 block mb-1">Exact Street Address / Flat No.</label>
                  <textarea
                    rows={2}
                    value={streetAddress}
                    onChange={e => setStreetAddress(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 rounded-xl p-3 text-surface-900 focus:outline-none focus:border-rose-500 font-medium resize-none"
                  />
                </div>
              </div>

              {/* On-Duty Matched Specialist Preview */}
              <div className="p-3.5 bg-surface-50 rounded-2xl border border-surface-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400 block mb-2">
                  Immediate On-Duty Responder Assigned:
                </span>
                <div className="flex items-center gap-3">
                  <img 
                    src={onDutyWorker.avatar} 
                    alt="" 
                    className="w-10 h-10 rounded-xl object-cover border border-surface-300 shrink-0" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-surface-900 text-xs truncate">{onDutyWorker.name}</p>
                    <p className="text-[11px] text-surface-500 truncate">{onDutyWorker.primarySkill} • {onDutyWorker.distanceKm} km away</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                    {onDutyWorker.rating} ★
                  </span>
                </div>
              </div>

              {/* Price Breakdown Pill */}
              <div className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-200 text-xs space-y-1.5">
                <div className="flex justify-between text-surface-700">
                  <span>Standard Service Base</span>
                  <span className="font-semibold">₹{selectedService.basePrice}</span>
                </div>
                <div className="flex justify-between text-surface-700">
                  <span>Rapid Emergency Surcharge</span>
                  <span className="font-semibold">₹{selectedService.hazardCharge}</span>
                </div>
                <div className="pt-2 border-t border-rose-200 flex justify-between font-black text-sm text-surface-900">
                  <span>Total Due on Arrival</span>
                  <span className="text-rose-700">₹{totalCost}</span>
                </div>
                <p className="text-[10px] text-surface-500 pt-1">
                  Includes 80% direct earnings to worker and emergency medical insurance allocation.
                </p>
              </div>

              {/* Dispatch SOS CTA */}
              <button
                onClick={() => setIsConfirmModalOpen(true)}
                className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-rose-900/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <Siren className="w-5 h-5 animate-pulse" />
                <span>Confirm & Dispatch Specialist Now</span>
              </button>

              <p className="text-center text-[11px] text-surface-400">
                Zero cancellation fee within first 3 minutes of request.
              </p>
            </div>

          </div>
        )}

        {/* 2-Step Confirmation Modal */}
        {isConfirmModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-surface-200 space-y-5 animate-scale-up">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <h3 className="text-lg font-black text-surface-900 font-display">
                  Confirm Emergency Dispatch
                </h3>
                <p className="text-xs text-surface-500 mt-1 leading-relaxed">
                  You are about to dispatch an emergency cooperative specialist ({onDutyWorker.name}) to <strong className="text-surface-800">{streetAddress}, {selectedArea}</strong>.
                </p>
              </div>

              <div className="p-3 bg-surface-50 rounded-xl border border-surface-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-surface-500">Service:</span>
                  <span className="font-bold text-surface-900">{selectedService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Expected Arrival:</span>
                  <span className="font-bold text-rose-600">{selectedService.eta}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-500">Standard Charge:</span>
                  <span className="font-bold text-surface-900">₹{totalCost}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="flex-1 py-2.5 bg-surface-100 hover:bg-surface-200 text-surface-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsConfirmModalOpen(false);
                    handleConfirmSOS();
                  }}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <Siren className="w-4 h-4" />
                  <span>Dispatch Specialist</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
