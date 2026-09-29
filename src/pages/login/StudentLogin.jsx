import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, CheckCircle2, UserPlus, LogIn } from 'lucide-react';

export const StudentLogin = () => {
  const { loginAs, registerStudent, navigateToLogin } = useAuth();
  
  // Mode: 'signin' | 'register'
  const [mode, setMode] = useState('signin');

  // Signin fields
  const [email, setEmail] = useState('rahul.sharma@student.edu');
  const [password, setPassword] = useState('••••••••••••');

  // Registration fields (apna khud ka data dalne ke liye)
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCourse, setRegCourse] = useState('BCA');
  const [regSemester, setRegSemester] = useState('5');
  const [regCollege, setRegCollege] = useState('');
  const [regCgpa, setRegCgpa] = useState('8.2');
  const [regTarget, setRegTarget] = useState('Python Developer');
  const [regSkills, setRegSkills] = useState('Python, SQL, HTML, CSS, JavaScript');

  const handleSignIn = (e) => {
    e.preventDefault();
    loginAs('student');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regCollege.trim()) return;

    registerStudent({
      name: regName.trim(),
      email: regEmail.trim(),
      course: regCourse,
      semester: regSemester,
      college: regCollege.trim(),
      cgpa: regCgpa,
      targetCareer: regTarget,
      initialSkills: regSkills
    });
  };

  return (
    <div style={{
      maxWidth: '960px',
      margin: '2rem auto',
      padding: '1rem',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      {/* Top Role Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        padding: '0.65rem 1rem',
        backgroundColor: '#e0f2fe',
        borderRadius: '10px',
        border: '1px solid #bae6fd'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0369a1', fontWeight: 600, fontSize: '0.88rem' }}>
          <GraduationCap size={18} />
          <span>Student Portal Access</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem' }}>
          <button 
            onClick={() => navigateToLogin('college')} 
            style={{ color: '#4338ca', fontWeight: 600, textDecoration: 'underline' }}
          >
            College Login →
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
        {/* Left: Sign In or Register Form */}
        <div style={{ padding: '2.5rem 2rem' }}>
          {/* Tab Switcher between Sign In & Register */}
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
              Sign In (Existing)
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
                backgroundColor: mode === 'register' ? '#0284c7' : 'transparent',
                color: mode === 'register' ? '#ffffff' : '#64748b',
                boxShadow: mode === 'register' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              + Create My Account
            </button>
          </div>

          {/* SIGN IN MODE */}
          {mode === 'signin' && (
            <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                  Student Sign In
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Access your digital portfolio, AI gap reports, and applied internships.
                </p>
              </div>

              <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Student Email or Roll Number
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul.sharma@student.edu"
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

                <button type="submit" className="btn btn-student" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
                  <LogIn size={16} /> Sign In to Dashboard
                </button>
              </form>
            </div>
          )}

          {/* REGISTER MODE (APNA DATA DALEIN) */}
          {mode === 'register' && (
            <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                  Create Custom Student Profile
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Apna khud ka data dalein aur personalized AI skill analysis payein.
                </p>
              </div>

              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aman Gupta, Pooja Verma"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="aman@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Current CGPA *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="e.g. 8.4"
                      value={regCgpa}
                      onChange={(e) => setRegCgpa(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    College / University Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi Technological University, NIT..."
                    value={regCollege}
                    onChange={(e) => setRegCollege(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Course / Branch
                    </label>
                    <select value={regCourse} onChange={(e) => setRegCourse(e.target.value)}>
                      <option value="BCA">BCA</option>
                      <option value="B.Tech CSE">B.Tech CSE</option>
                      <option value="B.Tech IT">B.Tech IT</option>
                      <option value="MCA">MCA</option>
                      <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Current Semester
                    </label>
                    <select value={regSemester} onChange={(e) => setRegSemester(e.target.value)}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                        <option key={s} value={s}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Target Career Goal
                  </label>
                  <select value={regTarget} onChange={(e) => setRegTarget(e.target.value)}>
                    <option value="Python Developer">Python Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack MERN Developer</option>
                    <option value="AI & Data Science Intern">AI & Data Science Engineer</option>
                    <option value="Cloud & DevOps Trainee">Cloud & DevOps Trainee</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Initial Technical Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Python, Java, HTML, CSS, SQL..."
                    value={regSkills}
                    onChange={(e) => setRegSkills(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-student" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
                  <UserPlus size={16} /> Register & Open My Dashboard
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right: Benefits Highlight */}
        <div style={{
          backgroundColor: '#f0f9ff',
          borderLeft: '1px solid #e0f2fe',
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
              backgroundColor: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <GraduationCap size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              Apna Data Save Hoga
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Aap jo bhi details, naye skills, projects, ya certificates add karenge wo sabhi system me permanently save rahenge.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#0284c7" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Custom Data Persistence</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Browser refresh ke baad bhi aapka data surakshit rahega.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#0284c7" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>AI Resume & Skill Gap</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Aapke skills ke hisaab se missing technologies highlight hongi.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="#0284c7" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Real Applications</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Internships me apply karein aur real tracking dekhein.</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '0.85rem',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #bae6fd',
            fontSize: '0.75rem',
            color: '#0369a1',
            lineHeight: 1.4
          }}>
            💾 <strong>Local Storage Enabled:</strong> Any project, certification, or skill you add will be saved directly on your computer.
          </div>
        </div>
      </div>
    </div>
  );
};
