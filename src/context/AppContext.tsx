import React, { createContext, useContext, useState } from 'react';
import type { 
  Booking, 
  BookingStatus, 
  Worker, 
  DemandHotspot, 
  AIWorkforceRecommendation, 
  NotificationItem, 
  UserRole, 
  AIAnalysisResult,
  PaymentBreakdown
} from '../types';
import { MOCK_WORKERS } from '../data/mockWorkers';
import { MOCK_BOOKINGS } from '../data/mockBookings';
import { MOCK_DEMAND_HOTSPOTS, MOCK_AI_RECOMMENDATIONS } from '../data/mockDemand';
import { calculatePaymentBreakdown } from '../utils/aiMatchingEngine';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  workers: Worker[];
  bookings: Booking[];
  demandHotspots: DemandHotspot[];
  aiRecommendations: AIWorkforceRecommendation[];
  notifications: NotificationItem[];
  activeWorker: Worker; // Logged in worker (Ramesh Patil by default)
  
  // Actions
  createNewBooking: (data: {
    problemDescription: string;
    aiAnalysis: AIAnalysisResult;
    assignedWorker: Worker;
    address: { street: string; area: string; city: string; pincode: string };
    date: string;
    timeSlot: string;
    totalPrice: number;
    isEmergency?: boolean;
  }) => Booking;
  
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  submitCustomerReview: (bookingId: string, rating: number, feedback: string) => void;
  markNotificationAsRead: (id: string) => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'time' | 'read'>) => void;
  resolveRecommendation: (recId: string) => void;
  reallocateWorkersAction: (fromZone: string, toZone: string, count: number, service: string) => void;
  toggleWorkerAvailability: (workerId: string) => void;
  toggleWorkerEmergencyDuty: (workerId: string) => void;
  
  // Automated Presentation Demo Runner
  isDemoRunning: boolean;
  demoStep: number;
  demoMessage: string;
  runFullDemoScenario: () => void;
  resetDemoScenario: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [workers, setWorkers] = useState<Worker[]>(MOCK_WORKERS);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [demandHotspots, setDemandHotspots] = useState<DemandHotspot[]>(MOCK_DEMAND_HOTSPOTS);
  const [aiRecommendations, setAiRecommendations] = useState<AIWorkforceRecommendation[]>(MOCK_AI_RECOMMENDATIONS);
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Active Job Dispatched',
      message: 'New plumbing repair requested 2.1 km away at Paud Road, Kothrud.',
      time: '10 mins ago',
      read: false,
      type: 'job',
      roleTarget: 'worker',
      actionUrl: '/worker/jobs'
    },
    {
      id: 'notif-2',
      title: 'Welfare Credit Added',
      message: '₹50 credited to your Cooperative Health & Pension reserve for completed task.',
      time: '2 hours ago',
      read: false,
      type: 'welfare',
      roleTarget: 'worker',
      actionUrl: '/worker/welfare'
    },
    {
      id: 'notif-3',
      title: 'Demand Spike Alert (Kothrud)',
      message: 'Plumbing demand is 32% above average. AI recommends deploying 5 nearby reserve workers.',
      time: '25 mins ago',
      read: false,
      type: 'alert',
      roleTarget: 'admin',
      actionUrl: '/admin/map'
    },
    {
      id: 'notif-4',
      title: 'Worker En Route',
      message: 'Ramesh Patil (4.8★) has accepted your service and is on his way.',
      time: '5 mins ago',
      read: false,
      type: 'job',
      roleTarget: 'customer',
      actionUrl: '/customer/bookings'
    }
  ]);

  const activeWorker = workers[0]; // Ramesh Patil

  const addNotification = (item: Omit<NotificationItem, 'id' | 'time' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      time: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const createNewBooking = (data: {
    problemDescription: string;
    aiAnalysis: AIAnalysisResult;
    assignedWorker: Worker;
    address: { street: string; area: string; city: string; pincode: string };
    date: string;
    timeSlot: string;
    totalPrice: number;
    isEmergency?: boolean;
  }): Booking => {
    const paymentBreakdown: PaymentBreakdown = calculatePaymentBreakdown(data.totalPrice);
    
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingNumber: `SHY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceCategory: data.aiAnalysis.detectedCategory,
      subServiceName: data.aiAnalysis.subService,
      customerName: 'Pooja Sharma',
      customerPhone: '+91 98900 12345',
      address: data.address,
      date: data.date,
      timeSlot: data.timeSlot,
      urgency: data.isEmergency ? 'emergency' : data.aiAnalysis.urgency,
      problemDescription: data.problemDescription,
      aiAnalysis: data.aiAnalysis,
      assignedWorker: data.assignedWorker,
      status: 'allocated',
      paymentBreakdown,
      paymentStatus: 'held_in_coop_escrow',
      paymentMethod: 'UPI / Cooperative Escrow',
      createdAt: new Date().toISOString(),
      isEmergency: data.isEmergency,
    };

    setBookings(prev => [newBooking, ...prev]);

    // Update worker's daily workload
    setWorkers(prev => prev.map(w => {
      if (w.id === data.assignedWorker.id) {
        return {
          ...w,
          jobsToday: w.jobsToday + 1,
          completedJobs: w.completedJobs + 1,
        };
      }
      return w;
    }));

    // Trigger notification to worker and customer
    addNotification({
      title: data.isEmergency ? '🚨 Emergency SOS Booking Assigned' : 'New Service Booking Assigned',
      message: `${newBooking.subServiceName} in ${data.address.area}. Assigned to ${data.assignedWorker.name}.`,
      type: data.isEmergency ? 'emergency' : 'job',
      roleTarget: 'worker',
      actionUrl: '/worker/jobs'
    });

    addNotification({
      title: 'Booking Confirmed with Cooperative Worker',
      message: `Assigned verified professional ${data.assignedWorker.name} (${data.assignedWorker.rating}★).`,
      type: 'job',
      roleTarget: 'customer',
      actionUrl: '/customer/bookings'
    });

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const isNowCompleted = status === 'completed';
        return {
          ...b,
          status,
          completedAt: isNowCompleted ? new Date().toISOString() : b.completedAt,
          paymentStatus: isNowCompleted ? 'paid_to_worker' : b.paymentStatus,
        };
      }
      return b;
    }));
  };

  const submitCustomerReview = (bookingId: string, rating: number, feedback: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        // Also update worker rating
        if (b.assignedWorker) {
          setWorkers(wList => wList.map(w => {
            if (w.id === b.assignedWorker?.id) {
              const newTotal = w.totalReviews + 1;
              const newAvg = Number(((w.rating * w.totalReviews + rating) / newTotal).toFixed(2));
              return {
                ...w,
                rating: newAvg,
                totalReviews: newTotal,
              };
            }
            return w;
          }));
        }
        return {
          ...b,
          customerRating: rating,
          customerFeedback: feedback,
        };
      }
      return b;
    }));

    addNotification({
      title: 'Customer Feedback Received',
      message: `5★ Rating submitted for Ramesh Patil. ₹50 cooperative bonus added!`,
      type: 'welfare',
      roleTarget: 'worker',
      actionUrl: '/worker/earnings'
    });
  };

  const resolveRecommendation = (recId: string) => {
    setAiRecommendations(prev => prev.map(r => r.id === recId ? { ...r, resolved: true } : r));
    addNotification({
      title: 'Workforce Reallocation Executed',
      message: 'AI recommendation successfully applied. Geographic workforce rebalanced.',
      type: 'system',
      roleTarget: 'admin',
      actionUrl: '/admin/map'
    });
  };

  const reallocateWorkersAction = (fromZone: string, toZone: string, count: number, service: string) => {
    setDemandHotspots(prev => prev.map(dh => {
      if (dh.zone.includes(toZone)) {
        return {
          ...dh,
          availableWorkers: dh.availableWorkers + count,
          predictedGap: Math.max(0, dh.predictedGap - count),
          actionTaken: true,
        };
      }
      return dh;
    }));

    addNotification({
      title: `Dispatched ${count} Reserve Workers`,
      message: `Transferred ${count} ${service} specialists from ${fromZone} to ${toZone}.`,
      type: 'alert',
      roleTarget: 'admin',
      actionUrl: '/admin/map'
    });
  };

  const toggleWorkerAvailability = (workerId: string) => {
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, isAvailable: !w.isAvailable } : w));
  };

  const toggleWorkerEmergencyDuty = (workerId: string) => {
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, emergencyDuty: !w.emergencyDuty } : w));
  };

  // Automated Interactive Hackathon Scenario Runner
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [demoMessage, setDemoMessage] = useState('');

  const runFullDemoScenario = () => {
    setIsDemoRunning(true);
    setDemoStep(1);
    setDemoMessage('Step 1: Customer submits problem: "My bathroom pipe is leaking heavily..."');

    setTimeout(() => {
      setDemoStep(2);
      setDemoMessage('Step 2: AI categorizes: Plumbing (High Urgency) -> Certified Plumber required.');
    }, 2500);

    setTimeout(() => {
      setDemoStep(3);
      setDemoMessage('Step 3: AI Fair Allocation compares candidates & selects Ramesh Patil (1 job today, nearby).');
    }, 5500);

    setTimeout(() => {
      setDemoStep(4);
      setDemoMessage('Step 4: Booking confirmed! Ramesh receives instant dispatch on Worker Dashboard.');
      updateBookingStatus('bk-demo-001', 'accepted_by_worker');
    }, 8500);

    setTimeout(() => {
      setDemoStep(5);
      setDemoMessage('Step 5: Ramesh reaches location and begins pipe repair.');
      updateBookingStatus('bk-demo-001', 'in_progress');
    }, 11500);

    setTimeout(() => {
      setDemoStep(6);
      setDemoMessage('Step 6: Job completed! Transparent payment generated: ₹800 to Ramesh, ₹50 to Welfare, ₹100 to Cooperative.');
      updateBookingStatus('bk-demo-001', 'completed');
      submitCustomerReview('bk-demo-001', 5, 'Ramesh arrived within 15 mins and fixed the burst pipe cleanly. Amazing cooperative service!');
    }, 15000);

    setTimeout(() => {
      setDemoStep(7);
      setDemoMessage('Step 7: Admin AI Demand Heatmap logs Kothrud surge and recommends rebalancing.');
      setIsDemoRunning(false);
    }, 18500);
  };

  const resetDemoScenario = () => {
    setIsDemoRunning(false);
    setDemoStep(0);
    setDemoMessage('');
    setBookings(MOCK_BOOKINGS);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        workers,
        bookings,
        demandHotspots,
        aiRecommendations,
        notifications,
        activeWorker,
        createNewBooking,
        updateBookingStatus,
        submitCustomerReview,
        markNotificationAsRead,
        addNotification,
        resolveRecommendation,
        reallocateWorkersAction,
        toggleWorkerAvailability,
        toggleWorkerEmergencyDuty,
        isDemoRunning,
        demoStep,
        demoMessage,
        runFullDemoScenario,
        resetDemoScenario,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
