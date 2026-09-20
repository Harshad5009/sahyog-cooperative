/**
 * useApi — React hook that bridges the existing AppContext state
 * with the real SAHYOG backend. Components can import this hook
 * to migrate to live data one-by-one without breaking the existing UI.
 */

import { useState, useCallback } from 'react';
import {
  authApi, bookingsApi, changeRequestApi, workersApi, sosApi, adminApi,
  saveSession, clearTokens, loadSession,
} from '../utils/apiClient';

export interface ApiUser {
  id: string;
  name: string;
  phone: string;
  role: 'CUSTOMER' | 'WORKER' | 'SOCIETY_ADMIN' | 'FEDERATION_ADMIN' | 'SUPER_ADMIN';
}

export const useApi = () => {
  const [user, setUser] = useState<ApiUser | null>(() => {
    const s = loadSession();
    return s?.user ?? null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      return result;
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Auth ────────────────────────────────────────────────────
  const sendOtp = useCallback((phone: string, purpose: 'LOGIN' | 'REGISTER' = 'LOGIN') =>
    run(() => authApi.sendOtp(phone, purpose)), [run]);

  const register = useCallback(async (payload: Parameters<typeof authApi.register>[0]) => {
    const res = await run(() => authApi.register(payload));
    if (res?.data) {
      saveSession(res.data.user, res.data.accessToken, res.data.refreshToken);
      setUser(res.data.user);
    }
    return res;
  }, [run]);

  const login = useCallback(async (phone: string, otp: string) => {
    const res = await run(() => authApi.login(phone, otp));
    if (res?.data) {
      saveSession(res.data.user, res.data.accessToken, res.data.refreshToken);
      setUser(res.data.user);
    }
    return res;
  }, [run]);

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  // ── Bookings ────────────────────────────────────────────────
  const getMyBookings = useCallback(() => run(() => bookingsApi.getAll()), [run]);
  const getBookingById = useCallback((id: string) => run(() => bookingsApi.getById(id)), [run]);
  const createBooking = useCallback((payload: any) => run(() => bookingsApi.create(payload)), [run]);
  const updateBookingStatus = useCallback((id: string, status: string) =>
    run(() => bookingsApi.updateStatus(id, status)), [run]);
  const submitReview = useCallback((id: string, payload: any) =>
    run(() => bookingsApi.review(id, payload)), [run]);

  // ── Change Requests ─────────────────────────────────────────
  const createChangeRequest = useCallback((bookingId: string, payload: any) =>
    run(() => changeRequestApi.create(bookingId, payload)), [run]);
  const respondToChangeRequest = useCallback((crId: string, action: 'APPROVED' | 'REJECTED', note?: string) =>
    run(() => changeRequestApi.respond(crId, action, note)), [run]);

  // ── Workers ─────────────────────────────────────────────────
  const getWorkerProfile = useCallback(() => run(() => workersApi.getProfile()), [run]);
  const setAvailability = useCallback((isAvailable: boolean, emergencyDuty?: boolean) =>
    run(() => workersApi.setAvailability(isAvailable, emergencyDuty)), [run]);
  const updateLocation = useCallback((lat: number, lng: number) =>
    run(() => workersApi.updateLocation(lat, lng)), [run]);
  const getRateCard = useCallback((category: string) =>
    run(() => workersApi.getRateCard(category)), [run]);

  // ── SOS ─────────────────────────────────────────────────────
  const triggerSos = useCallback((lat: number, lng: number, bookingId?: string) =>
    run(() => sosApi.trigger(lat, lng, bookingId)), [run]);

  // ── Admin ────────────────────────────────────────────────────
  const getAdminSummary = useCallback(() => run(() => adminApi.getSummary()), [run]);
  const getAdminBookings = useCallback((page?: number, status?: string) =>
    run(() => adminApi.getBookings(page, status)), [run]);
  const getAdminWorkers = useCallback((page?: number) =>
    run(() => adminApi.getWorkers(page)), [run]);

  return {
    // State
    user, loading, error, isAuthenticated: !!user,
    // Auth
    sendOtp, register, login, logout,
    // Bookings
    getMyBookings, getBookingById, createBooking, updateBookingStatus, submitReview,
    // Change Requests
    createChangeRequest, respondToChangeRequest,
    // Workers
    getWorkerProfile, setAvailability, updateLocation, getRateCard,
    // SOS
    triggerSos,
    // Admin
    getAdminSummary, getAdminBookings, getAdminWorkers,
  };
};
