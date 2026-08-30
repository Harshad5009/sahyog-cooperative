import type { Booking } from '../types';
import { MOCK_WORKERS } from './mockWorkers';

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk-demo-001',
    bookingNumber: 'SHY-2026-8902',
    serviceCategory: 'plumbing',
    subServiceName: 'Pipe Leakage & Burst Repair',
    customerName: 'Aditi Deshpande',
    customerPhone: '+91 98230 11984',
    address: {
      street: 'Flat 402, Rutuparna Apartments, Paud Road',
      area: 'Kothrud',
      city: 'Pune',
      pincode: '411038'
    },
    date: 'Today',
    timeSlot: 'Immediate (Emergency SOS)',
    urgency: 'high',
    problemDescription: 'My bathroom pipe is leaking heavily and water is spreading across the floor.',
    aiAnalysis: {
      detectedCategory: 'plumbing',
      subService: 'Pipe Leakage & Burst Repair',
      urgency: 'high',
      requiredSkill: 'Certified Plumber Level 4',
      requiredCertifications: ['NSDC Master Plumbing Level 4', 'Municipal Water Safety License'],
      toolsNeeded: ['Pipe Wrench 12"', 'Teflon Sealant', 'PVC Cutters', 'Pressure Gauge'],
      estimatedCostRange: [349, 499],
      estimatedDuration: '45-60 mins',
      confidenceScore: 98.4,
      problemSummary: 'High-pressure concealed/pipe joint burst requiring rapid isolation & sealant fitting.',
      detectedLanguage: 'en'
    },
    assignedWorker: MOCK_WORKERS[0], // Ramesh Patil
    status: 'en_route',
    paymentBreakdown: {
      totalAmount: 1000,
      workerEarnings: 800, // 80%
      welfareInsurance: 50, // 5%
      cooperativeFund: 100, // 10%
      platformOperations: 50, // 5%
    },
    paymentStatus: 'held_in_coop_escrow',
    paymentMethod: 'UPI (Google Pay / PhonePe)',
    createdAt: '2026-08-30T10:15:00Z',
    isEmergency: true,
  },
  {
    id: 'bk-past-002',
    bookingNumber: 'SHY-2026-7841',
    serviceCategory: 'electrical',
    subServiceName: 'Short Circuit & MCB Tripping Fix',
    customerName: 'Rohit Joshi',
    customerPhone: '+91 94220 55198',
    address: {
      street: 'Bungalow 14, Prabhat Road, Lane 8',
      area: 'Deccan Gymkhana',
      city: 'Pune',
      pincode: '411004'
    },
    date: '28 Aug 2026',
    timeSlot: '02:00 PM - 03:30 PM',
    urgency: 'medium',
    problemDescription: 'Main hall MCB keeps tripping whenever air conditioner and geyser are switched on simultaneously.',
    aiAnalysis: {
      detectedCategory: 'electrical',
      subService: 'Short Circuit & MCB Tripping Fix',
      urgency: 'medium',
      requiredSkill: 'Licensed Wireman',
      requiredCertifications: ['Govt. Electrical Wireman Supervisor License'],
      toolsNeeded: ['Multimeter', 'Insulated Screwdrivers', 'Phase Tester'],
      estimatedCostRange: [399, 649],
      estimatedDuration: '60 mins',
      confidenceScore: 96.2,
      problemSummary: 'Load distribution imbalance on 16A breaker circuit requiring phase redistribution.',
    },
    assignedWorker: MOCK_WORKERS[2], // Ganesh Shinde
    status: 'completed',
    paymentBreakdown: {
      totalAmount: 850,
      workerEarnings: 680,
      welfareInsurance: 42.5,
      cooperativeFund: 85,
      platformOperations: 42.5,
    },
    paymentStatus: 'paid_to_worker',
    paymentMethod: 'Cooperative Escrow Wallet',
    createdAt: '2026-08-28T13:40:00Z',
    completedAt: '2026-08-28T15:20:00Z',
    customerRating: 5,
    customerFeedback: 'Ganesh was exceptionally punctual, diagnosed the load imbalance in 15 minutes, and showed me the transparent rate card upfront. Very proud to support a cooperative worker!',
  },
  {
    id: 'bk-past-003',
    bookingNumber: 'SHY-2026-6410',
    serviceCategory: 'cleaning',
    subServiceName: 'Intensive Bathroom Deep Scrubbing',
    customerName: 'Meenakshi Iyer',
    customerPhone: '+91 98811 00234',
    address: {
      street: 'Flat 904, Amanora Gateway Towers',
      area: 'Hadapsar',
      city: 'Pune',
      pincode: '411028'
    },
    date: '25 Aug 2026',
    timeSlot: '10:00 AM - 12:30 PM',
    urgency: 'low',
    problemDescription: 'Deep cleaning and hard water tile descaling for two master bathrooms.',
    aiAnalysis: {
      detectedCategory: 'cleaning',
      subService: 'Intensive Bathroom Deep Scrubbing',
      urgency: 'low',
      requiredSkill: 'Sanitation Specialist',
      requiredCertifications: ['Professional Sanitation & Chemical Safety Level 3'],
      toolsNeeded: ['High Pressure Steamer', 'Eco Descaling Acid', 'Buffing Pads'],
      estimatedCostRange: [499, 899],
      estimatedDuration: '90 mins',
      confidenceScore: 99.1,
      problemSummary: 'Hard water scale and tile grout restoration.',
    },
    assignedWorker: MOCK_WORKERS[3], // Sunita Jadhav
    status: 'completed',
    paymentBreakdown: {
      totalAmount: 1200,
      workerEarnings: 960,
      welfareInsurance: 60,
      cooperativeFund: 120,
      platformOperations: 60,
    },
    paymentStatus: 'paid_to_worker',
    paymentMethod: 'UPI',
    createdAt: '2026-08-25T09:00:00Z',
    completedAt: '2026-08-25T12:15:00Z',
    customerRating: 5,
    customerFeedback: 'Sunita did a fantastic job with complete eco-friendly products. The bathrooms look brand new.',
  }
];
