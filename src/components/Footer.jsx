import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, GraduationCap, Building2, Briefcase } from 'lucide-react';

export const Footer = () => {
  const { navigateToLogin } = useAuth();

  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '2.5rem 1.25rem 2rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
              <Sparkles size={18} color="#2563eb" />
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>SkillBridge</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6, maxWidth: '320px' }}>
              AI-Powered Academia–Industry Collaboration Portal. Bridging the gap between university curriculums and corporate technical expectations.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
              Dedicated Portals
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: '#64748b' }}>
              <span onClick={() => navigateToLogin('student')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <GraduationCap size={14} color="#0284c7" /> Student Login Portal
              </span>
              <span onClick={() => navigateToLogin('college')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Building2 size={14} color="#4f46e5" /> College Administration
              </span>
              <span onClick={() => navigateToLogin('company')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Briefcase size={14} color="#0f766e" /> Industry Recruiter Portal
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
              Core AI Modules
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: '#64748b' }}>
              <span>AI Resume Parsing</span>
              <span>Skill Gap Benchmark</span>
              <span>Learning Roadmaps</span>
              <span>Practical Assessments</span>
              <span>Internship Matching</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
              Institutional Compliance
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', color: '#64748b' }}>
              <span>AICTE & UGC Compliant</span>
              <span>NIRF / NAAC Export Data</span>
              <span>Role-Based Access Control</span>
              <span>Verified Employer Audit</span>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.75rem',
          color: '#94a3b8'
        }}>
          <div>
            © 2026 SkillBridge Platform. All rights reserved. Built for Academia–Industry Collaboration.
          </div>
          <div>
            Simple, Accessible & Modern Architecture
          </div>
        </div>
      </div>
    </footer>
  );
};
