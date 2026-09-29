import React, { useState, useEffect } from 'react';
import { ShieldCheck, Eye, Lock, AlertTriangle, CheckCircle2, UserCheck, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../services/api';

export const SecurityPrivacySettings = () => {
  const { student, showToast } = useAuth();
  const [visibility, setVisibility] = useState(student.profileVisibility || "Verified Companies");
  const [fraudFlags, setFraudFlags] = useState([]);

  useEffect(() => {
    apiClient.getFraudFlags().then(data => {
      if (data) setFraudFlags(data);
    });
  }, []);

  const visibilityOptions = [
    { id: "Only Me", desc: "Private draft. No employers or recruiters can view profile credentials." },
    { id: "College", desc: "Visible exclusively to college Placement Cell / TPO for cohort reviews." },
    { id: "Verified Companies", desc: "Accessible only by vetted and signed enterprise industry partners." },
    { id: "Public Portfolio", desc: "Public showcase URL suitable for sharing on LinkedIn or resumes." }
  ];

  const handleUpdateVisibility = (optId) => {
    setVisibility(optId);
    apiClient.updateVisibility(student.id, optId);
    showToast(`Profile visibility successfully updated to "${optId}"`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Banner */}
      <div className="clean-card" style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
        border: '1px solid #86efac'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <ShieldCheck size={16} /> DATA PRIVACY & COMPLIANCE (POINT 32)
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Profile Visibility & RBAC Controls
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
              Consent-based credential sharing, role-based access control (RBAC), and fraud detection guardrails.
            </p>
          </div>

          <div style={{ padding: '0.5rem 0.9rem', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', fontSize: '0.78rem' }}>
            <span style={{ color: '#64748b' }}>Active Status: </span>
            <strong style={{ color: '#16a34a' }}>🛡️ Protected by RBAC & JWT</strong>
          </div>
        </div>
      </div>

      {/* Profile Visibility Controls */}
      <div className="clean-card">
        <div className="clean-card-header">
          <span className="clean-card-title">
            <Eye size={18} color="#2563eb" /> Granular Profile Visibility Settings
          </span>
          <span className="badge badge-green">Student Controlled</span>
        </div>

        <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
          Control who can discover your verified assessments, projects, and career roadmaps:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.9rem' }}>
          {visibilityOptions.map(opt => (
            <div
              key={opt.id}
              onClick={() => handleUpdateVisibility(opt.id)}
              style={{
                padding: '1rem',
                borderRadius: '10px',
                border: visibility === opt.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: visibility === opt.id ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.5rem',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{opt.id}</span>
                  {visibility === opt.id && (
                    <span style={{ color: '#2563eb' }}><CheckCircle2 size={18} /></span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b', lineHeight: '1.4' }}>
                  {opt.desc}
                </p>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <span className={`badge ${visibility === opt.id ? 'badge-blue' : 'badge-yellow'}`} style={{ fontSize: '0.68rem' }}>
                  {visibility === opt.id ? 'Active Selected' : 'Click to Set'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Fraud & Inconsistency Detection Guardrails (Point 24) */}
      <div className="clean-card">
        <div className="clean-card-header">
          <span className="clean-card-title">
            <ShieldAlert size={18} color="#dc2626" /> AI Fraud & Fake Profile Detection Guardrail
          </span>
          <span className="badge badge-yellow">Admin Scrutiny Loop</span>
        </div>

        <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 1rem 0' }}>
          To prevent synthetic or fraudulent resumes in campus drives, our AI heuristic flags suspicious inconsistencies for human administrator verification without auto-banning students:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {fraudFlags.map(f => (
            <div
              key={f.id}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                backgroundColor: '#fffafb',
                border: '1.5px solid #fecaca',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 700, color: '#991b1b', fontSize: '0.88rem' }}>{f.userName}</span>
                  <span className="badge badge-red">{f.flagType}</span>
                  <span style={{ fontSize: '0.72rem', color: '#b91c1c' }}>Suspicion Score: {f.suspicionScore}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                  {f.details} • <strong>Workflow:</strong> {f.actionTaken}
                </div>
              </div>

              <span className="badge badge-yellow" style={{ fontSize: '0.72rem' }}>
                {f.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
