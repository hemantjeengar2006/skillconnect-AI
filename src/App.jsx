import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { LandingPage } from './pages/LandingPage';
import { StudentLogin } from './pages/login/StudentLogin';
import { CollegeLogin } from './pages/login/CollegeLogin';
import { CompanyLogin } from './pages/login/CompanyLogin';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { CollegeDashboard } from './pages/college/CollegeDashboard';
import { CompanyDashboard } from './pages/company/CompanyDashboard';

import { CareerCopilot } from './components/CareerCopilot';

const AppContent = () => {
  const { currentPage, currentRole } = useAuth();
  const isDashboard = currentPage === 'dashboard' && currentRole;

  if (isDashboard) {
    return (
      <>
        <Toast />
        <CareerCopilot />
        {currentRole === 'student' && <StudentDashboard />}
        {currentRole === 'college' && <CollegeDashboard />}
        {currentRole === 'company' && <CompanyDashboard />}
      </>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <Toast />
      <main className="main-content">
        {currentPage === 'login-student' && <StudentLogin />}
        {currentPage === 'login-college' && <CollegeLogin />}
        {currentPage === 'login-company' && <CompanyLogin />}
        {(!currentPage || currentPage === 'gateway') && <LandingPage />}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
