import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  LogOut, 
  Sparkles
} from 'lucide-react';

import { NotificationCenter } from './NotificationCenter';

export const Navbar = () => {
  const { currentRole, currentPage, setCurrentPage, navigateToLogin, logout, student, college, company } = useAuth();

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Brand */}
        <div 
          onClick={() => setCurrentPage('gateway')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 2px 5px rgba(37, 99, 235, 0.3)'
          }}>
            <Sparkles size={21} />
          </div>
          <div>
            <div style={{
              fontSize: '1.08rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#0f172a',
              lineHeight: 1.15,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              SkillBridge AI
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#2563eb',
                backgroundColor: '#eff6ff',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid #dbeafe'
              }}>SIH EDITION</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>
              Academia to Industry Career Intelligence Platform
            </div>
          </div>
        </div>

        {/* Dynamic Center / Right Navigation */}
        {!currentRole ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCurrentPage('gateway')}
              className={`btn btn-sm ${currentPage === 'gateway' ? 'btn-outline' : ''}`}
              style={{ fontWeight: 600, color: '#475569' }}
            >
              Overview
            </button>
            
            {/* 3 Dedicated Login Buttons for clear direct navigation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#f1f5f9',
              padding: '0.25rem',
              borderRadius: '8px'
            }}>
              <button
                onClick={() => navigateToLogin('student')}
                className={`btn btn-sm ${currentPage === 'login-student' ? 'btn-student' : 'btn-outline'}`}
                style={{
                  border: currentPage === 'login-student' ? 'none' : 'transparent',
                  backgroundColor: currentPage === 'login-student' ? 'var(--student-brand)' : 'transparent',
                  color: currentPage === 'login-student' ? '#ffffff' : '#0369a1'
                }}
              >
                <GraduationCap size={15} />
                Student Login
              </button>

              <button
                onClick={() => navigateToLogin('college')}
                className={`btn btn-sm ${currentPage === 'login-college' ? 'btn-college' : 'btn-outline'}`}
                style={{
                  border: currentPage === 'login-college' ? 'none' : 'transparent',
                  backgroundColor: currentPage === 'login-college' ? 'var(--college-brand)' : 'transparent',
                  color: currentPage === 'login-college' ? '#ffffff' : '#4338ca'
                }}
              >
                <Building2 size={15} />
                College Login
              </button>

              <button
                onClick={() => navigateToLogin('company')}
                className={`btn btn-sm ${currentPage === 'login-company' ? 'btn-company' : 'btn-outline'}`}
                style={{
                  border: currentPage === 'login-company' ? 'none' : 'transparent',
                  backgroundColor: currentPage === 'login-company' ? 'var(--company-brand)' : 'transparent',
                  color: currentPage === 'login-company' ? '#ffffff' : '#0f766e'
                }}
              >
                <Briefcase size={15} />
                Company Login
              </button>
            </div>
          </div>
        ) : (
          /* When Logged In: Role Status & Fast Persona Switcher */
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Real-time Centralized Notification Center (Point 18) */}
            <NotificationCenter />

            {/* Active Role Identifier */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              backgroundColor: 
                currentRole === 'student' ? 'var(--student-bg)' :
                currentRole === 'college' ? 'var(--college-bg)' : 'var(--company-bg)',
              border: `1px solid ${
                currentRole === 'student' ? '#bae6fd' :
                currentRole === 'college' ? '#c7d2fe' : '#99f6e4'
              }`
            }}>
              {currentRole === 'student' && <GraduationCap size={16} color="var(--student-brand)" />}
              {currentRole === 'college' && <Building2 size={16} color="var(--college-brand)" />}
              {currentRole === 'company' && <Briefcase size={16} color="var(--company-brand)" />}
              
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
                  {currentRole === 'student' ? student.name : currentRole === 'college' ? college.institutionName : company.name}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                  {currentRole === 'student' ? `${student.course} • Sem ${student.semester}` : 
                   currentRole === 'college' ? 'College TPO Portal' : 'Industry Partner Portal'}
                </div>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={logout}
              className="btn btn-sm btn-outline"
              title="Sign Out"
              style={{ color: '#dc2626', borderColor: '#fecaca', fontWeight: 600 }}
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
