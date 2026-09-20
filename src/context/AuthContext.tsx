import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, bookingsApi, workersApi, adminApi, changeRequestApi, saveSession, clearTokens, loadSession } from '../utils/apiClient';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export type AppRole = 'customer' | 'worker' | 'admin' | 'guest';

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  role: 'CUSTOMER' | 'WORKER' | 'SOCIETY_ADMIN' | 'FEDERATION_ADMIN' | 'SUPER_ADMIN';
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextData {
  // Auth
  authUser: AuthUser | null;
  isAuthenticated: boolean;
  appRole: AppRole;
  setAppRole: (r: AppRole) => void;
  sendOtp: (phone: string, purpose?: 'LOGIN' | 'REGISTER') => Promise<any>;
  login: (phone: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  authLoading: boolean;
  authError: string | null;
  // Bookings
  bookings: any[];
  bookingsLoading: boolean;
  fetchBookings: () => Promise<void>;
  createBooking: (payload: any) => Promise<any>;
  updateBookingStatus: (id: string, status: string) => Promise<any>;
  submitReview: (id: string, payload: any) => Promise<any>;
  // Change Requests
  createChangeRequest: (bookingId: string, payload: any) => Promise<any>;
  respondToChangeRequest: (crId: string, action: 'APPROVED' | 'REJECTED', note?: string) => Promise<any>;
  getChangeRequests: (bookingId: string) => Promise<any>;
  // Worker
  workerProfile: any | null;
  fetchWorkerProfile: () => Promise<void>;
  setAvailability: (isAvailable: boolean, emergencyDuty?: boolean) => Promise<any>;
  updateLocation: (lat: number, lng: number) => Promise<any>;
  getRateCard: (category: string) => Promise<any>;
  // Admin
  adminSummary: any | null;
  fetchAdminSummary: () => Promise<void>;
  adminBookings: any[];
  fetchAdminBookings: (page?: number, status?: string) => Promise<void>;
  adminWorkers: any[];
  fetchAdminWorkers: (page?: number) => Promise<void>;
}

export interface RegisterPayload {
  phone: string;
  otp: string;
  name: string;
  role?: 'CUSTOMER' | 'WORKER';
  languagePreference?: string;
}

// ─────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ── Auth state ─────────────────────────────────────────
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const s = loadSession();
    return s?.user ?? null;
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [appRole, setAppRole] = useState<AppRole>(() => {
    const s = loadSession();
    if (!s?.user) return 'guest';
    const role = s.user.role as string;
    if (role === 'CUSTOMER') return 'customer';
    if (role === 'WORKER') return 'worker';
    return 'admin';
  });

  // ── Data state ─────────────────────────────────────────
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [workerProfile, setWorkerProfile] = useState<any | null>(null);
  const [adminSummary, setAdminSummary] = useState<any | null>(null);
  const [adminBookings, setAdminBookings] = useState<any[]>([]);
  const [adminWorkers, setAdminWorkers] = useState<any[]>([]);

  // ── Helpers ────────────────────────────────────────────
  const run = useCallback(async <T,>(fn: () => Promise<T>): Promise<{ result: T | null; error: string | null }> => {
    try {
      const result = await fn();
      return { result, error: null };
    } catch (e: any) {
      return { result: null, error: e.message ?? 'Request failed' };
    }
  }, []);

  // ── Auth actions ───────────────────────────────────────
  const sendOtp = useCallback(async (phone: string, purpose: 'LOGIN' | 'REGISTER' = 'LOGIN') => {
    setAuthError(null);
    setAuthLoading(true);
    const { result, error } = await run(() => authApi.sendOtp(phone, purpose));
    setAuthLoading(false);
    if (error) setAuthError(error);
    return result;
  }, [run]);

  const login = useCallback(async (phone: string, otp: string) => {
    setAuthError(null);
    setAuthLoading(true);
    const { result, error } = await run(() => authApi.login(phone, otp));
    setAuthLoading(false);
    if (error || !result) {
      setAuthError(error ?? 'Login failed');
      return { success: false, error: error ?? 'Login failed' };
    }
    const res = result as any;
    saveSession(res.data.user, res.data.accessToken, res.data.refreshToken);
    setAuthUser(res.data.user);
    const role = res.data.user.role as string;
    setAppRole(role === 'CUSTOMER' ? 'customer' : role === 'WORKER' ? 'worker' : 'admin');
    return { success: true };
  }, [run]);

  const register = useCallback(async (payload: RegisterPayload) => {
    setAuthError(null);
    setAuthLoading(true);
    const { result, error } = await run(() => authApi.register(payload));
    setAuthLoading(false);
    if (error || !result) {
      setAuthError(error ?? 'Registration failed');
      return { success: false, error: error ?? 'Registration failed' };
    }
    const res = result as any;
    saveSession(res.data.user, res.data.accessToken, res.data.refreshToken);
    setAuthUser(res.data.user);
    const role = res.data.user.role as string;
    setAppRole(role === 'CUSTOMER' ? 'customer' : role === 'WORKER' ? 'worker' : 'admin');
    return { success: true };
  }, [run]);

  const logout = useCallback(() => {
    clearTokens();
    setAuthUser(null);
    setAppRole('guest');
    setBookings([]);
    setWorkerProfile(null);
    setAdminSummary(null);
  }, []);

  // ── Booking actions ────────────────────────────────────
  const fetchBookings = useCallback(async () => {
    setBookingsLoading(true);
    const { result } = await run(() => bookingsApi.getAll());
    setBookingsLoading(false);
    if (result) setBookings((result as any).data ?? []);
  }, [run]);

  const createBooking = useCallback(async (payload: any) => {
    const { result, error } = await run(() => bookingsApi.create(payload));
    if (result) await fetchBookings();
    return { result, error };
  }, [run, fetchBookings]);

  const updateBookingStatus = useCallback(async (id: string, status: string) => {
    const { result, error } = await run(() => bookingsApi.updateStatus(id, status));
    if (result) await fetchBookings();
    return { result, error };
  }, [run, fetchBookings]);

  const submitReview = useCallback(async (id: string, payload: any) => {
    return run(() => bookingsApi.review(id, payload));
  }, [run]);

  // ── Change Request actions ─────────────────────────────
  const createChangeRequest = useCallback(async (bookingId: string, payload: any) => {
    const res = await run(() => changeRequestApi.create(bookingId, payload));
    if (res.result) await fetchBookings();
    return res;
  }, [run, fetchBookings]);

  const respondToChangeRequest = useCallback(async (crId: string, action: 'APPROVED' | 'REJECTED', note?: string) => {
    const res = await run(() => changeRequestApi.respond(crId, action, note));
    if (res.result) await fetchBookings();
    return res;
  }, [run, fetchBookings]);

  const getChangeRequests = useCallback(async (bookingId: string) => {
    return run(() => changeRequestApi.getAll(bookingId));
  }, [run]);

  // ── Worker actions ─────────────────────────────────────
  const fetchWorkerProfile = useCallback(async () => {
    const { result } = await run(() => workersApi.getProfile());
    if (result) setWorkerProfile((result as any).data ?? null);
  }, [run]);

  const setAvailability = useCallback(async (isAvailable: boolean, emergencyDuty?: boolean) => {
    const res = await run(() => workersApi.setAvailability(isAvailable, emergencyDuty));
    if (res.result) await fetchWorkerProfile();
    return res;
  }, [run, fetchWorkerProfile]);

  const updateLocation = useCallback(async (lat: number, lng: number) => {
    return run(() => workersApi.updateLocation(lat, lng));
  }, [run]);

  const getRateCard = useCallback(async (category: string) => {
    return run(() => workersApi.getRateCard(category));
  }, [run]);

  // ── Admin actions ──────────────────────────────────────
  const fetchAdminSummary = useCallback(async () => {
    const { result } = await run(() => adminApi.getSummary());
    if (result) setAdminSummary((result as any).data ?? null);
  }, [run]);

  const fetchAdminBookings = useCallback(async (page = 1, status?: string) => {
    const { result } = await run(() => adminApi.getBookings(page, status));
    if (result) setAdminBookings((result as any).data ?? []);
  }, [run]);

  const fetchAdminWorkers = useCallback(async (page = 1) => {
    const { result } = await run(() => adminApi.getWorkers(page));
    if (result) setAdminWorkers((result as any).data ?? []);
  }, [run]);

  // ── Auto-fetch on auth ─────────────────────────────────
  useEffect(() => {
    if (!authUser) return;
    if (authUser.role === 'CUSTOMER') fetchBookings();
    if (authUser.role === 'WORKER') { fetchWorkerProfile(); fetchBookings(); }
    if (['SOCIETY_ADMIN','FEDERATION_ADMIN','SUPER_ADMIN'].includes(authUser.role)) fetchAdminSummary();
  }, [authUser]);

  const value: AuthContextData = {
    authUser, isAuthenticated: !!authUser, appRole, setAppRole,
    sendOtp, login, register, logout, authLoading, authError,
    bookings, bookingsLoading, fetchBookings, createBooking, updateBookingStatus, submitReview,
    createChangeRequest, respondToChangeRequest, getChangeRequests,
    workerProfile, fetchWorkerProfile, setAvailability, updateLocation, getRateCard,
    adminSummary, fetchAdminSummary,
    adminBookings, fetchAdminBookings,
    adminWorkers, fetchAdminWorkers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
