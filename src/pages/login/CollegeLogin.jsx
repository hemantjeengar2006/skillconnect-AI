import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Building2, CheckCircle2, UserPlus, LogIn } from 'lucide-react';

export const CollegeLogin = () => {
  const { loginAs, registerCollege, navigateToLogin } = useAuth();
  
  const [mode, setMode] = useState('signin'); // 'signin' | 'register'

  // Signin fields
  const [email, setEmail] = useState('tpo@aits.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [department, setDepartment] = useState('Training & Placement Cell (TPO)');

  // Registration fields
  const [instName, setInstName] = useState('');
  const [instCode, setInstCode] = useState('');
  const [deanName, setDeanName] = useState('');
  const [tpoEmail, setTpoEmail] = useState('');
  const [location, setLocation] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    loginAs('college');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!instName.trim() || !deanName.trim() || !tpoEmail.trim()) return;

    registerCollege({
      institutionName: instName.trim(),
      code: instCode.trim() || `INST-${Date.now().toString().slice(-4)}`,
      deanTPO: deanName.trim(),
      tpoEmail: tpoEmail.trim(),
      location: location.trim() || "Main Campus"
    });
  };

  return (
    <div style={{
      maxWidth: '960px',
      margin: '2rem auto',
      padding: '1rem',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      {/* Role Indicator Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        padding: '0.65rem 1rem',
        backgroundColor: '#eef2ff',
        borderRadius: '10px',
        border: '1px solid #c7d2fe'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4338ca', fontWeight: 600, fontSize: '0.88rem' }}>
          <Building2 size={18} />
          <span>College / University Administration Portal</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem' }}>
          <button 
            onClick={() => navigateToLogin('student')} 
            style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'underline' }}
          >
            ← Student Login
          </button>
          <button 
            onClick={() => navigateToLogin('company')} 
            style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'underline' }}
          >
            Company Login →
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: '2rem',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden'
      }}>
        {/* Left: Login or Register Form */}
        <div style={{ padding: '2.5rem 2rem' }}>
          {/* Mode Switcher */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '0.25rem',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <button
              type="button"
              onClick={() => setMode('signin')}
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                borderRadius: '6px',
                backgroundColor: mode === 'signin' ? '#ffffff' : 'transparent',
                color: mode === 'signin' ? '#0f172a' : '#64748b',
                boxShadow: mode === 'signin' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Sign In (Apex Institute)
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                borderRadius: '6px',
                backgroundColor: mode === 'register' ? '#4f46e5' : 'transparent',
                color: mode === 'register' ? '#ffffff' : '#64748b',
                boxShadow: mode === 'register' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              + Register My College
            </button>
          </div>

          {/* SIGN IN */}
          {mode === 'signin' && (
            <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                  Institutional Sign In
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Monitor cohort skills, track placements, and coordinate with hiring companies.
                </p>
              </div>

              <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    University / Institutional Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tpo@aits.edu.in"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Department / Designation
                  </label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option value="Training & Placement Cell (TPO)">Training & Placement Cell (TPO)</option>
                    <option value="Head of Department - BCA">Head of Department - BCA</option>
                    <option value="Head of Department - B.Tech CSE">Head of Department - B.Tech CSE</option>
                    <option value="Dean of Academics">Dean of Academics</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Security Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-college" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
                  <LogIn size={16} /> Sign In to College Portal
                </button>
              </form>
            </div>
          )}

          {/* REGISTER NEW COLLEGE (APNA COLLEGE DALEIN) */}
          {mode === 'register' && (
            <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                  Register Custom Institution
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Apne college ya university ka data enter karke dashboard manage karein.
                </p>
              </div>

              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    College / University Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Institute of Technology, Delhi"
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Institution Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. NIT-2026"
                      value={instCode}
                      onChange={(e) => setInstCode(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Campus Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. New Delhi, Karnataka"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Dean / TPO Officer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Verma (Head - TPO)"
                    value={deanName}
                    onChange={(e) => setDeanName(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Official TPO Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tpo@university.edu.in"
                    value={tpoEmail}
                    onChange={(e) => setTpoEmail(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-college" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
                  <UserPlus size={16} /> Register College & Open Portal
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right: Benefits Highlight */}
        <div style={{
          backgroundColor: '#f5f3ff',
          borderLeft: '1px solid #ede9fe',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Building2 size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              Academic TPO Management
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Aap apne students ko monitor kar sakte hain, naye placement drives announce kar sakte hain aur skill gaps identify kar sakte hain.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#4f46e5" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Add Custom Drives</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Apne campus ke liye naye company recruitment drives schedule karein.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#4f46e5" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Cohort Monitoring</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Students ke CGPA, top skills aur readiness levels track karein.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#4f46e5" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Exportable NIRF Data</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Placement records ko 1-click me export karein.</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '0.85rem',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #c7d2fe',
            fontSize: '0.75rem',
            color: '#4338ca',
            lineHeight: 1.4
          }}>
            🛡️ <strong>Encrypted Data:</strong> Har institution ka data locally store rehta hai.
          </div>
        </div>
      </div>
    </div>
  );
};
