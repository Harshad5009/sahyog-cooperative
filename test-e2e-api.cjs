// End-to-End API Test Suite for SAHYOG
const http = require('http');

const BASE_URL = 'http://localhost:5000';

function request(path, method = 'GET', body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const data = body ? JSON.stringify(body) : null;
    if (data) headers['Content-Length'] = Buffer.byteLength(data);

    const req = http.request(url, { method, headers }, (res) => {
      let raw = '';
      res.on('data', (chunk) => raw += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(raw); } catch (e) { json = raw; }
        resolve({ status: res.statusCode, data: json });
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

let passed = 0;
let failed = 0;

function assert(condition, message, details = '') {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ ${message}`);
    if (details) console.error(`     Details:`, typeof details === 'object' ? JSON.stringify(details) : details);
    failed++;
  }
}

async function runTests() {
  console.log('🚀 Starting Comprehensive SAHYOG End-to-End API Test Suite...\n');

  // 1. Health check
  console.log('--- 1. System Health ---');
  try {
    const health = await request('/health');
    assert(health.status === 200 && health.data.status === 'ok', 'GET /health returns 200 OK', health.data);
  } catch (err) {
    assert(false, 'GET /health failed to connect', err.message);
  }

  // 2. Auth Flow - Customer
  console.log('\n--- 2. Customer Auth Flow ---');
  let customerToken = null;
  const customerPhone = '9800000001';
  try {
    const otpRes = await request('/api/auth/otp/send', 'POST', { phone: customerPhone, purpose: 'LOGIN' });
    assert(otpRes.status === 200 && otpRes.data.success, 'POST /api/auth/otp/send for customer returns 200', otpRes.data);

    const loginRes = await request('/api/auth/login', 'POST', { phone: customerPhone, otp: '123456' });
    assert(loginRes.status === 200 && loginRes.data.success && loginRes.data.data.accessToken, 'POST /api/auth/login for customer returns accessToken', loginRes.data);
    customerToken = loginRes.data.data?.accessToken;
  } catch (err) {
    assert(false, 'Customer Auth Flow failed', err.message);
  }

  // 3. Auth Flow - Worker
  console.log('\n--- 3. Worker Auth Flow ---');
  let workerToken = null;
  const workerPhone = '9800000100';
  try {
    const otpRes = await request('/api/auth/otp/send', 'POST', { phone: workerPhone, purpose: 'LOGIN' });
    assert(otpRes.status === 200 && otpRes.data.success, 'POST /api/auth/otp/send for worker returns 200', otpRes.data);

    const loginRes = await request('/api/auth/login', 'POST', { phone: workerPhone, otp: '123456' });
    assert(loginRes.status === 200 && loginRes.data.success && loginRes.data.data.accessToken, 'POST /api/auth/login for worker returns accessToken', loginRes.data);
    workerToken = loginRes.data.data?.accessToken;
  } catch (err) {
    assert(false, 'Worker Auth Flow failed', err.message);
  }

  // 4. Auth Flow - Admin
  console.log('\n--- 4. Admin Auth Flow ---');
  let adminToken = null;
  const adminPhone = '9800000000';
  try {
    const otpRes = await request('/api/auth/otp/send', 'POST', { phone: adminPhone, purpose: 'LOGIN' });
    assert(otpRes.status === 200 && otpRes.data.success, 'POST /api/auth/otp/send for admin returns 200', otpRes.data);

    const loginRes = await request('/api/auth/login', 'POST', { phone: adminPhone, otp: '123456' });
    assert(loginRes.status === 200 && loginRes.data.success && loginRes.data.data.accessToken, 'POST /api/auth/login for admin returns accessToken', loginRes.data);
    adminToken = loginRes.data.data?.accessToken;
  } catch (err) {
    assert(false, 'Admin Auth Flow failed', err.message);
  }

  // 5. Worker Discovery & Rate Cards
  console.log('\n--- 5. Worker Discovery & Rate Cards ---');
  try {
    const workersRes = await request('/api/workers?category=Plumbing', 'GET', null, customerToken);
    assert(workersRes.status === 200 && Array.isArray(workersRes.data.data), 'GET /api/workers?category=Plumbing returns workers list', workersRes.data);

    const rateCardRes = await request('/api/workers/rate-card?category=Plumbing', 'GET', null, customerToken);
    assert(rateCardRes.status === 200 && rateCardRes.data.success, 'GET /api/workers/rate-card returns 200 with pricing', rateCardRes.data);
  } catch (err) {
    assert(false, 'Worker discovery endpoints failed', err.message);
  }

  // 6. Customer Bookings Flow
  console.log('\n--- 6. Customer Bookings Flow ---');
  let createdBookingId = null;
  try {
    const myBookings = await request('/api/bookings', 'GET', null, customerToken);
    assert(myBookings.status === 200 && myBookings.data.success, 'GET /api/bookings returns customer bookings', myBookings.data);

    const myBookingsAlias = await request('/api/bookings/my-bookings', 'GET', null, customerToken);
    assert(myBookingsAlias.status === 200 && myBookingsAlias.data.success, 'GET /api/bookings/my-bookings returns customer bookings', myBookingsAlias.data);

    // Create a new booking
    const newBookingRes = await request('/api/bookings', 'POST', {
      serviceCategory: 'Plumbing',
      subServiceName: 'Pipe Leakage Repair',
      problemDescription: 'Kitchen pipe is leaking water under the sink continuously',
      address: {
        street: 'Flat 402, Building 4, Shiv Krupa',
        area: 'Shivajinagar',
        city: 'Pune',
        pincode: '411005'
      },
      scheduledDate: '2026-09-25',
      scheduledTimeSlot: '10:00 AM - 12:00 PM',
      urgency: 'medium',
      isEmergency: false,
    }, customerToken);

    assert(newBookingRes.status === 201 && newBookingRes.data.success, 'POST /api/bookings creates booking and allocates worker', newBookingRes.data);
    createdBookingId = newBookingRes.data.data?._id;

    if (createdBookingId) {
      const getSingle = await request(`/api/bookings/${createdBookingId}`, 'GET', null, customerToken);
      assert(getSingle.status === 200 && getSingle.data.success, `GET /api/bookings/${createdBookingId} returns booking details`, getSingle.data);
    }
  } catch (err) {
    assert(false, 'Customer Bookings Flow failed', err.message);
  }

  // 7. Worker Profile & Actions
  console.log('\n--- 7. Worker Profile & Actions ---');
  try {
    const profileMe = await request('/api/workers/me', 'GET', null, workerToken);
    assert(profileMe.status === 200 && profileMe.data.success, 'GET /api/workers/me returns worker profile', profileMe.data);

    const profileAlias = await request('/api/workers/profile', 'GET', null, workerToken);
    assert(profileAlias.status === 200 && profileAlias.data.success, 'GET /api/workers/profile alias returns worker profile', profileAlias.data);

    const toggleRes = await request('/api/workers/me/availability', 'PATCH', { isAvailable: true, emergencyDuty: true }, workerToken);
    assert(toggleRes.status === 200 && toggleRes.data.success, 'PATCH /api/workers/me/availability toggles status', toggleRes.data);

    const locRes = await request('/api/workers/me/location', 'PATCH', { lat: 18.5204, lng: 73.8567 }, workerToken);
    assert(locRes.status === 200 && locRes.data.success, 'PATCH /api/workers/me/location updates coordinates', locRes.data);
  } catch (err) {
    assert(false, 'Worker actions failed', err.message);
  }

  // 8. SOS Emergency System
  console.log('\n--- 8. SOS Emergency System ---');
  let alertId = null;
  try {
    const sosRes = await request('/api/sos', 'POST', {
      lat: 18.5204,
      lng: 73.8567,
      batteryLevel: 90,
      address: 'Near Deccan Gymkhana, Pune',
      triggerType: 'MANUAL',
      natureOfEmergency: 'Medical / Physical Distress'
    }, workerToken);

    assert(sosRes.status === 201 && sosRes.data.success, 'POST /api/sos triggers emergency alert successfully', sosRes.data);
    alertId = sosRes.data.data?._id;

    const sosListRes = await request('/api/sos/active', 'GET', null, adminToken);
    assert(sosListRes.status === 200 && sosListRes.data.success && Array.isArray(sosListRes.data.data), 'GET /api/sos/active returns active alerts for admin', sosListRes.data);

    if (alertId) {
      const resolveRes = await request(`/api/sos/${alertId}/resolve`, 'PATCH', {}, adminToken);
      assert(resolveRes.status === 200 && resolveRes.data.success, `PATCH /api/sos/${alertId}/resolve marks alert as resolved`, resolveRes.data);
    }
  } catch (err) {
    assert(false, 'SOS Emergency System failed', err.message);
  }

  // 9. Admin Dashboard & Analytics
  console.log('\n--- 9. Admin Dashboard & Analytics ---');
  try {
    const summaryRes = await request('/api/admin/summary', 'GET', null, adminToken);
    assert(summaryRes.status === 200 && summaryRes.data.success, 'GET /api/admin/summary returns cooperative KPIs', summaryRes.data);

    const adminBookingsRes = await request('/api/admin/bookings', 'GET', null, adminToken);
    assert(adminBookingsRes.status === 200 && adminBookingsRes.data.success, 'GET /api/admin/bookings returns booking records', adminBookingsRes.data);

    const adminWorkersRes = await request('/api/admin/workers', 'GET', null, adminToken);
    assert(adminWorkersRes.status === 200 && adminWorkersRes.data.success, 'GET /api/admin/workers returns all registered workers', adminWorkersRes.data);

    const demandRes = await request('/api/admin/demand', 'GET', null, adminToken);
    assert(demandRes.status === 200 && demandRes.data.success, 'GET /api/admin/demand returns demand forecasts', demandRes.data);

    const welfareRes = await request('/api/admin/welfare', 'GET', null, adminToken);
    assert(welfareRes.status === 200 && welfareRes.data.success, 'GET /api/admin/welfare returns 80/10/5/5 distribution ledger', welfareRes.data);

    const mapRes = await request('/api/admin/map', 'GET', null, adminToken);
    assert(mapRes.status === 200 && mapRes.data.success, 'GET /api/admin/map returns live geo-telemetry data', mapRes.data);
  } catch (err) {
    assert(false, 'Admin Dashboard endpoints failed', err.message);
  }

  console.log('\n========================================');
  console.log(`🏁 Total Passed: ${passed} | Total Failed: ${failed}`);
  console.log('========================================');
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
