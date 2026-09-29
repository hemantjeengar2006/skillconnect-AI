import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, CheckCircle2, UserPlus, LogIn } from 'lucide-react';

export const CompanyLogin = () => {
  const { loginAs, registerCompany, navigateToLogin } = useAuth();
  
  const [mode, setMode] = useState('signin'); // 'signin' | 'register'

  // Signin fields
  const [email, setEmail] = useState('recruitment@techcorpsolutions.com');
  const [companyName, setCompanyName] = useState('TechCorp Solutions Pvt Ltd');
  const [password, setPassword] = useState('••••••••••••');

  // Registration fields
  const [regCompName, setRegCompName] = useState('');
  const [regDomain, setRegDomain] = useState('Software Engineering & AI');
  const [regRecruiter, setRegRecruiter] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regLocation, setRegLocation] = useState('Bangalore / Remote');

  const handleSignIn = (e) => {
    e.preventDefault();
    loginAs('company');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regCompName.trim() || !regRecruiter.trim() || !regEmail.trim()) return;

    registerCompany({
      name: regCompName.trim(),
      domain: regDomain,
      contactPerson: regRecruiter.trim(),
      email: regEmail.trim(),
      headquarters: regLocation.trim()
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
        backgroundColor: '#f0fdfa',
        borderRadius: '10px',
        border: '1px solid #99f6e4'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f766e', fontWeight: 600, fontSize: '0.88rem' }}>
          <Briefcase size={18} />
          <span>Industry & Recruiter Portal</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem' }}>
          <button 
            onClick={() => navigateToLogin('student')} 
            style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'underline' }}
          >
            ← Student Login
          </button>
          <button 
            onClick={() => navigateToLogin('college')} 
            style={{ color: '#4338ca', fontWeight: 600, textDecoration: 'underline' }}
          >
            College Login →
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
              Sign In (TechCorp)
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
                backgroundColor: mode === 'register' ? '#0f766e' : 'transparent',
                color: mode === 'register' ? '#ffffff' : '#64748b',
                boxShadow: mode === 'register' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              + Register My Company
            </button>
          </div>

          {/* SIGN IN */}
          {mode === 'signin' && (
            <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                  Industry Partner Sign In
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Discover verified student talent, post internships, and evaluate candidates.
                </p>
              </div>

              <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="recruitment@techcorpsolutions.com"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-company" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
                  <LogIn size={16} /> Sign In to Company Dashboard
                </button>
              </form>
            </div>
          )}

          {/* REGISTER NEW COMPANY (APNI COMPANY DALEIN) */}
          {mode === 'register' && (
            <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                  Register Custom Company
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Apni company ka data dalein, requirements post karein aur hiring manage karein.
                </p>
              </div>

              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Company Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Infoware Technologies, ByteForge Labs..."
                    value={regCompName}
                    onChange={(e) => setRegCompName(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Industry Domain
                    </label>
                    <select value={regDomain} onChange={(e) => setRegDomain(e.target.value)}>
                      <option value="Software Engineering & AI">Software Engineering & AI</option>
                      <option value="FinTech & Banking">FinTech & Banking</option>
                      <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="EdTech">EdTech</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Headquarters City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bangalore, Pune, Remote"
                      value={regLocation}
                      onChange={(e) => setRegLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Recruiter / Talent Lead Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Nair (Lead Recruiter)"
                    value={regRecruiter}
                    onChange={(e) => setRegRecruiter(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Official Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="careers@mycompany.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-company" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
                  <UserPlus size={16} /> Register Company & Open Dashboard
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right: Benefits Highlight */}
        <div style={{
          backgroundColor: '#f0fdfa',
          borderLeft: '1px solid #ccfbf1',
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
              backgroundColor: '#0f766e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Briefcase size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              Precision Campus Hiring
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Apne required skills define karein aur verified student profiles me se direct candidate search karein.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#0f766e" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Post Real Internships</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Custom stipend, duration aur tech stack ke sath post karein.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#0f766e" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Application Pipeline</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Applied students ko review, shortlist aur interview rounds me move karein.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#0f766e" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Submit Evaluations</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Candidates ko 5-star ratings aur structured review dekar save karein.</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '0.85rem',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #99f6e4',
            fontSize: '0.75rem',
            color: '#0f766e',
            lineHeight: 1.4
          }}>
            💼 <strong>Saved Locally:</strong> Har custom post aur feedback localStorage me surakshit rahega.
          </div>
        </div>
      </div>
    </div>
  );
};
