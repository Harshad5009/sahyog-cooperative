import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { WorkerLayout } from './components/layout/WorkerLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { DemoFlowController } from './components/common/DemoFlowController';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { ForWorkersPage } from './pages/public/ForWorkersPage';
import { ForCooperativesPage } from './pages/public/ForCooperativesPage';
import { AboutPage } from './pages/public/AboutPage';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';
import { EmergencyPage } from './pages/public/EmergencyPage';
import { VerifyWorkerPage } from './pages/public/VerifyWorkerPage';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { CustomerBookingPage } from './pages/customer/CustomerBookingPage';
import { CustomerBookingsPage } from './pages/customer/CustomerBookingsPage';
import { CustomerPaymentsPage } from './pages/customer/CustomerPaymentsPage';
import { CustomerProfilePage } from './pages/customer/CustomerProfilePage';

// Worker Pages
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { WorkerJobsPage } from './pages/worker/WorkerJobsPage';
import { WorkerEarningsPage } from './pages/worker/WorkerEarningsPage';
import { WorkerSkillsPage } from './pages/worker/WorkerSkillsPage';
import { WorkerWelfarePage } from './pages/worker/WorkerWelfarePage';
import { WorkerProfilePage } from './pages/worker/WorkerProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminWorkersPage } from './pages/admin/AdminWorkersPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminDemandPage } from './pages/admin/AdminDemandPage';
import { AdminMapPage } from './pages/admin/AdminMapPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminWelfarePage } from './pages/admin/AdminWelfarePage';

// Public layout wrapper
const PublicLayoutWrapper = () => (
  <div className="min-h-screen flex flex-col bg-surface-50 text-surface-900">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayoutWrapper />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/for-workers" element={<ForWorkersPage />} />
                <Route path="/for-cooperatives" element={<ForCooperativesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/emergency" element={<EmergencyPage />} />
                <Route path="/verify/worker/:membershipId" element={<VerifyWorkerPage />} />
                <Route path="/verify/:membershipId" element={<VerifyWorkerPage />} />
              </Route>

              {/* Customer Portal */}
              <Route path="/customer" element={<CustomerLayout />}>
                <Route path="dashboard" element={<CustomerDashboard />} />
                <Route path="book" element={<CustomerBookingPage />} />
                <Route path="bookings" element={<CustomerBookingsPage />} />
                <Route path="payments" element={<CustomerPaymentsPage />} />
                <Route path="profile" element={<CustomerProfilePage />} />
              </Route>

              {/* Worker Portal */}
              <Route path="/worker" element={<WorkerLayout />}>
                <Route path="dashboard" element={<WorkerDashboard />} />
                <Route path="jobs" element={<WorkerJobsPage />} />
                <Route path="earnings" element={<WorkerEarningsPage />} />
                <Route path="skills" element={<WorkerSkillsPage />} />
                <Route path="welfare" element={<WorkerWelfarePage />} />
                <Route path="profile" element={<WorkerProfilePage />} />
              </Route>

              {/* Federation Admin Portal */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="workers" element={<AdminWorkersPage />} />
                <Route path="bookings" element={<AdminBookingsPage />} />
                <Route path="demand" element={<AdminDemandPage />} />
                <Route path="map" element={<AdminMapPage />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="welfare" element={<AdminWelfarePage />} />
              </Route>
            </Routes>

            {/* Global SIH Demo Floating Controller */}
            <DemoFlowController />
          </Router>
        </AppProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
