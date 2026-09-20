/**
 * SAHYOG API Client
 * Centralised Axios instance that attaches JWT tokens and handles 401 refresh.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

const getAccessToken = () => localStorage.getItem('sahyog_access_token');
const getRefreshToken = () => localStorage.getItem('sahyog_refresh_token');
const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('sahyog_access_token', access);
  localStorage.setItem('sahyog_refresh_token', refresh);
};
export const clearTokens = () => {
  localStorage.removeItem('sahyog_access_token');
  localStorage.removeItem('sahyog_refresh_token');
  localStorage.removeItem('sahyog_user');
};

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
  refreshQueue.forEach(cb => cb(token));
  refreshQueue = [];
};

/** Core fetch wrapper with auth header injection + silent token refresh */
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  // Silent token refresh on 401
  if (res.status === 401) {
    const refreshTok = getRefreshToken();
    if (!refreshTok) { clearTokens(); throw new Error('Session expired. Please log in again.'); }

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: refreshTok }),
        });
        if (!refreshRes.ok) { clearTokens(); throw new Error('Session expired. Please log in again.'); }
        const { data } = await refreshRes.json();
        setTokens(data.accessToken, data.refreshToken);
        processQueue(data.accessToken);
        isRefreshing = false;
        // Retry original
        return apiFetch<T>(endpoint, options);
      } catch (e) {
        isRefreshing = false;
        clearTokens();
        throw e;
      }
    }

    return new Promise((resolve, reject) => {
      refreshQueue.push(async (newToken: string) => {
        try {
          const retryRes = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: { ...headers, Authorization: `Bearer ${newToken}` },
          });
          resolve(await retryRes.json());
        } catch (e) { reject(e); }
      });
    });
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'API error');
  return data;
}

// ── Auth ────────────────────────────────────────────────────
export const authApi = {
  sendOtp: (phone: string, purpose: 'LOGIN' | 'REGISTER' | 'RESET' = 'LOGIN') =>
    apiFetch('/auth/otp/send', { method: 'POST', body: JSON.stringify({ phone, purpose }) }),

  register: (payload: {
    phone: string; otp: string; name: string;
    role?: 'CUSTOMER' | 'WORKER'; languagePreference?: string; email?: string;
  }) => apiFetch<{ success: boolean; data: { user: any; accessToken: string; refreshToken: string } }>(
    '/auth/register', { method: 'POST', body: JSON.stringify(payload) }
  ),

  login: (phone: string, otp: string) =>
    apiFetch<{ success: boolean; data: { user: any; accessToken: string; refreshToken: string } }>(
      '/auth/login', { method: 'POST', body: JSON.stringify({ phone, otp }) }
    ),
};

// ── Bookings ────────────────────────────────────────────────
export const bookingsApi = {
  getAll: () => apiFetch<{ success: boolean; data: any[] }>('/bookings'),
  getById: (id: string) => apiFetch<{ success: boolean; data: any }>(`/bookings/${id}`),
  create: (payload: any) =>
    apiFetch<{ success: boolean; data: any }>('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  updateStatus: (id: string, status: string) =>
    apiFetch(`/bookings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  review: (id: string, payload: any) =>
    apiFetch(`/bookings/${id}/review`, { method: 'POST', body: JSON.stringify(payload) }),
};

// ── Change Requests ─────────────────────────────────────────
export const changeRequestApi = {
  create: (bookingId: string, payload: { reason: string; additionalAmount: number; materialBreakdown?: any[] }) =>
    apiFetch(`/bookings/${bookingId}/change-requests`, { method: 'POST', body: JSON.stringify(payload) }),
  respond: (crId: string, action: 'APPROVED' | 'REJECTED', responseNote?: string) =>
    apiFetch(`/bookings/change-requests/${crId}/respond`, { method: 'PATCH', body: JSON.stringify({ action, responseNote }) }),
  getAll: (bookingId: string) =>
    apiFetch<{ success: boolean; data: any[] }>(`/bookings/${bookingId}/change-requests`),
};

// ── Workers ─────────────────────────────────────────────────
export const workersApi = {
  getProfile: () => apiFetch('/workers/me'),
  setAvailability: (isAvailable: boolean, emergencyDuty?: boolean) =>
    apiFetch('/workers/me/availability', { method: 'PATCH', body: JSON.stringify({ isAvailable, emergencyDuty }) }),
  updateLocation: (lat: number, lng: number) =>
    apiFetch('/workers/me/location', { method: 'PATCH', body: JSON.stringify({ lat, lng }) }),
  getNearby: (lat: number, lng: number, category?: string, radius?: number) => {
    const params = new URLSearchParams({ lat: String(lat), lng: String(lng), ...(category ? { category } : {}), ...(radius ? { radius: String(radius) } : {}) });
    return apiFetch(`/workers/nearby?${params}`);
  },
  getRateCard: (category: string) => apiFetch<{ success: boolean; data: any }>(`/workers/rate-card?category=${encodeURIComponent(category)}`),
  verifyPassport: (membershipId: string) => apiFetch<{ success: boolean; data: any }>(`/workers/verify/${encodeURIComponent(membershipId)}`),
};

// ── SOS ─────────────────────────────────────────────────────
export const sosApi = {
  trigger: (lat: number, lng: number, bookingId?: string) =>
    apiFetch('/sos', { method: 'POST', body: JSON.stringify({ lat, lng, bookingId, triggerType: 'MANUAL' }) }),
};

// ── Admin ────────────────────────────────────────────────────
export const adminApi = {
  getSummary: () => apiFetch<{ success: boolean; data: any }>('/admin/summary'),
  getBookings: (page = 1, status?: string) => {
    const params = new URLSearchParams({ page: String(page), ...(status ? { status } : {}) });
    return apiFetch<{ success: boolean; data: any[]; meta: any }>(`/admin/bookings?${params}`);
  },
  getWorkers: (page = 1) => apiFetch<{ success: boolean; data: any[]; meta: any }>(`/admin/workers?page=${page}`),
  getDemand: () => apiFetch<{ success: boolean; data: any }>('/admin/demand'),
  reallocateDemand: (recommendationId: string, note?: string) =>
    apiFetch<{ success: boolean; message: string }>('/admin/demand/reallocate', {
      method: 'POST',
      body: JSON.stringify({ recommendationId, note }),
    }),
  getWelfare: () => apiFetch<{ success: boolean; data: any }>('/admin/welfare'),
  getMapData: () => apiFetch<{ success: boolean; data: any }>('/admin/map'),
};

export const saveSession = (user: any, accessToken: string, refreshToken: string) => {
  setTokens(accessToken, refreshToken);
  localStorage.setItem('sahyog_user', JSON.stringify(user));
};

export const loadSession = () => {
  const user = localStorage.getItem('sahyog_user');
  const token = getAccessToken();
  if (!user || !token) return null;
  return { user: JSON.parse(user), token };
};
