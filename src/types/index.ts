export type UserRole = 'customer' | 'worker' | 'admin';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'emergency';

export type BookingStatus = 
  | 'pending_ai_match'
  | 'allocated'
  | 'accepted_by_worker'
  | 'en_route'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface ServiceItem {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  category: string;
  icon: string;
  description: string;
  basePrice: number;
  estimatedTime: string;
  popular: boolean;
  subServices: {
    id: string;
    name: string;
    price: number;
    description: string;
  }[];
  checklist: string[];
}

export interface WorkerCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  verified: boolean;
  badgeUrl?: string;
}

export interface WorkerSkill {
  name: string;
  proficiency: number; // 1 to 5
  experienceYears: number;
  certified: boolean;
}

export interface Worker {
  id: string;
  name: string;
  nameHi?: string;
  nameMr?: string;
  avatar: string;
  cooperativeSociety: string;
  membershipId: string;
  primarySkill: string;
  skills: WorkerSkill[];
  certifications: WorkerCertification[];
  experienceYears: number;
  completedJobs: number;
  rating: number;
  totalReviews: number;
  reliabilityScore: number; // percentage, e.g., 94%
  jobsToday: number;
  weeklyWorkloadHours: number;
  distanceKm: number;
  currentLocation: {
    area: string;
    city: string;
    lat: number;
    lng: number;
  };
  isAvailable: boolean;
  emergencyDuty: boolean;
  welfare: {
    insuranceActive: boolean;
    insuranceCoverage: number;
    trainingCredits: number;
    pensionFundBalance: number;
    monthlyBonusEligible: boolean;
  };
  phone: string;
  joiningYear: number;
  kycVerified: boolean;
}

export interface AIAnalysisResult {
  detectedCategory: string;
  subService: string;
  urgency: UrgencyLevel;
  requiredSkill: string;
  requiredCertifications: string[];
  toolsNeeded: string[];
  estimatedCostRange: [number, number];
  estimatedDuration: string;
  confidenceScore: number;
  problemSummary: string;
  detectedLanguage?: 'en' | 'hi' | 'mr';
}

export type PaymentStatus = 
  | 'payment_pending'             // Payment Pending
  | 'payment_protected_held'      // Payment Protected/Held (in Sahyog Escrow)
  | 'additional_amount_requested' // Additional Amount Requested (worker change order pending customer approval)
  | 'payment_released'            // Payment Released (transferred to worker upon completion)
  | 'refund_initiated'            // Refund Initiated
  | 'refund_completed'            // Refund Completed
  // Legacy compatibility
  | 'pending'
  | 'held_in_coop_escrow'
  | 'paid_to_worker'
  | 'refunded';

export interface RateCardPricing {
  baseServiceCharge: number;  // Base service charge (diagnostic / initial safety inspection)
  labourCharge: number;       // Labour charge (certified technician work)
  materialCharge: number;     // Material charge (consumables / spare parts)
  travelCharge: number;       // Travel / visit charge if applicable
  estimatedTotal: number;     // Estimated price before booking
}

export interface ChangeRequest {
  id: string;
  bookingId: string;
  workerId: string;
  workerName: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  labourCost: number;
  materialCost: number;
  materialsList?: string;
  totalExtraAmount: number;
  customerDecisionAt?: string;
  customerDecisionNote?: string;
}

export interface PaymentBreakdown {
  totalAmount: number;
  workerEarnings: number; // ~80%
  welfareInsurance: number; // ~5%
  cooperativeFund: number; // ~10%
  platformOperations: number; // ~5%
  isCustomConfig?: boolean;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  serviceCategory: string;
  subServiceName: string;
  customerName: string;
  customerPhone: string;
  address: {
    street: string;
    area: string;
    city: string;
    pincode: string;
  };
  date: string;
  timeSlot: string;
  urgency: UrgencyLevel;
  problemDescription: string;
  aiAnalysis: AIAnalysisResult;
  assignedWorker?: Worker;
  status: BookingStatus;
  rateCardPricing?: RateCardPricing;
  paymentBreakdown: PaymentBreakdown;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  changeRequests?: ChangeRequest[];
  refundDetails?: {
    amount: number;
    reason: string;
    initiatedAt: string;
    completedAt?: string;
  };
  createdAt: string;
  completedAt?: string;
  customerRating?: number;
  customerFeedback?: string;
  isEmergency?: boolean;
}

export interface DemandHotspot {
  id: string;
  zone: string;
  city: string;
  service: string;
  currentDemandIndex: number; // e.g. +32%
  availableWorkers: number;
  expectedRequests: number;
  predictedGap: number;
  urgency: 'normal' | 'high' | 'critical';
  recommendation: string;
  actionTaken?: boolean;
}

export interface AIWorkforceRecommendation {
  id: string;
  type: 'shortage' | 'reallocation' | 'demand_surge' | 'training' | 'workload_imbalance';
  title: string;
  zone: string;
  service: string;
  severity: 'low' | 'medium' | 'high';
  reason: string;
  impact: string;
  suggestedAction: string;
  actionButtonText: string;
  actionPayload?: any;
  resolved: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'job' | 'welfare' | 'alert' | 'system' | 'emergency';
  roleTarget: 'customer' | 'worker' | 'admin' | 'all';
  actionUrl?: string;
}

export interface WorkerComparisonScore {
  worker: Worker;
  skillMatchScore: number;
  distanceScore: number;
  workloadScore: number;
  reliabilityScore: number;
  compositeScore: number;
  isRecommended: boolean;
  recommendationReason: string;
}
