import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/DashboardLayout';
import { ResumeAnalyzer } from './ResumeAnalyzer';
import { SkillGapAnalysis } from './SkillGapAnalysis';
import { LearningRoadmap } from './LearningRoadmap';
import { SkillAssessments } from './SkillAssessments';
import { InternshipMatching } from './InternshipMatching';
import { DigitalProfile } from './DigitalProfile';
import { SkillGraphView } from './SkillGraphView';
import { MockInterviewSimulator } from './MockInterviewSimulator';
import { SkillVerificationConfidence } from './SkillVerificationConfidence';
import { StudentCareerTimeline } from './StudentCareerTimeline';
import { ProjectGenerator } from './ProjectGenerator';
import { SecurityPrivacySettings } from '../../components/SecurityPrivacySettings';
import { LiveIndustryDemand } from '../../components/LiveIndustryDemand';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  Compass, 
  Award, 
  Briefcase, 
  User, 
  Sparkles, 
  TrendingUp, 
  Clock,
  GitFork,
  Bot,
  ShieldCheck,
  Milestone,
  Flame,
  FolderPlus,
  Lock,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const StudentDashboard = () => {
  const { student } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const verifiedSkillsCount = student.technicalSkills.filter(s => s.verified).length;

  const menuItems = [
    { id: 'overview', label: 'My Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'graph', label: 'AI Skill Graph & Path', icon: <GitFork size={18} />, badge: 'AI' },
    { id: 'mockInterview', label: 'AI Mock Interview', icon: <Bot size={18} />, badge: 'Interactive' },
    { id: 'verification', label: 'Skill Verification', icon: <ShieldCheck size={18} />, badge: `${verifiedSkillsCount} Verified` },
    { id: 'projectGen', label: 'AI Project Generator', icon: <FolderPlus size={18} />, badge: 'Blueprint' },
    { id: 'timeline', label: 'Career Timeline', icon: <Milestone size={18} /> },
    { id: 'market', label: 'Live Industry Demand', icon: <Flame size={18} />, badge: 'Live' },
    { id: 'resume', label: 'AI Resume Analyzer', icon: <FileText size={18} /> },
    { id: 'gap', label: 'Skill Gap Analysis', icon: <Target size={18} /> },
    { id: 'roadmap', label: 'Learning Roadmap', icon: <Compass size={18} /> },
    { id: 'assessments', label: 'Skill Assessments', icon: <Award size={18} />, badge: verifiedSkillsCount },
    { id: 'internships', label: 'Internships & Tracking', icon: <Briefcase size={18} />, badge: student.applications.length },
    { id: 'profile', label: 'Digital Career Profile', icon: <User size={18} /> },
    { id: 'privacy', label: 'Security & Privacy', icon: <Lock size={18} /> }
  ];

  const getTabTitle = () => {
    switch (activeTab) {
      case 'graph': return `AI Skill Graph & Path Intelligence: ${student.targetCareer}`;
      case 'mockInterview': return 'AI Technical Mock Interview Simulator';
      case 'verification': return 'Evidence-Backed Skill Confidence & Verification';
      case 'projectGen': return 'AI Project Generator & Gap Blueprints';
      case 'timeline': return 'Lifelong Career & Credential Timeline';
      case 'market': return 'Live Industry Skill Demand Engine';
      case 'resume': return 'AI Resume Analyzer (NLP Parser)';
      case 'gap': return `Skill Gap Benchmark: ${student.targetCareer}`;
      case 'roadmap': return 'Personalized Learning Roadmap';
      case 'assessments': return 'Verified Skill Assessments';
      case 'internships': return 'AI Matched Internships & Applications';
      case 'profile': return 'Digital Career Profile & Credentials';
      case 'privacy': return 'Data Privacy, Visibility & RBAC Guardrails';
      case 'overview':
      default: return 'Student Career Dashboard';
    }
  };

  return (
    <DashboardLayout
      role="student"
      title={getTabTitle()}
      menuItems={menuItems}
      activeItem={activeTab}
      onSelect={setActiveTab}
      headerActions={
        activeTab !== 'gap' && (
          <button
            onClick={() => setActiveTab('gap')}
            className="btn btn-sm btn-student"
          >
            <Target size={14} /> View Skill Gap
          </button>
        )
      }
    >
      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
          {/* POINT 29: STUDENT DASHBOARD EXECUTIVE SNAPSHOT */}
          <div className="clean-card" style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #334155', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                  Career Intelligence Snapshot (Point 29 Blueprint)
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: '0.2rem 0 0 0' }}>
                  👋 Welcome, {student.name.split(' ')[0]}
                </h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Career Goal:</span>
                <span style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '0.3rem 0.8rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem' }}>
                  {student.targetCareer}
                </span>
              </div>
            </div>

            <div className="grid-3" style={{ gap: '1.25rem' }}>
              {/* Skill Profile Meter */}
              <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Skill Profile Readiness</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>78%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#334155', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: '78%', height: '100%', backgroundColor: '#38bdf8', borderRadius: '999px' }}></div>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.5rem', fontFamily: 'monospace' }}>
                  ███████████████░░░ 78%
                </div>
              </div>

              {/* Skill Gaps List */}
              <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '0.78rem', color: '#f87171', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  🔴 Skill Gaps (Point 29)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>React.js</span>
                    <span style={{ color: '#fca5a5', fontWeight: 700 }}>Learn</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Node.js</span>
                    <span style={{ color: '#fde047', fontWeight: 700 }}>Improve</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Docker</span>
                    <span style={{ color: '#fca5a5', fontWeight: 700 }}>Learn</span>
                  </div>
                </div>
              </div>

              {/* Recommended Action Summary */}
              <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '0.78rem', color: '#4ade80', fontWeight: 700, marginBottom: '0.5rem' }}>
                  🎯 Recommended
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <div>• <strong>3</strong> Internships</div>
                  <div>• <strong>2</strong> Projects</div>
                  <div>• <strong>4</strong> Learning Resources</div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Assessments & Notifications */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>📊 Assessments:</div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <span style={{ backgroundColor: '#064e3b', color: '#6ee7b7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    Python: 82%
                  </span>
                  <span style={{ backgroundColor: '#064e3b', color: '#6ee7b7', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    SQL: 76%
                  </span>
                </div>
              </div>

              <div style={{ backgroundColor: '#1e293b', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  🔔 <strong>Notifications:</strong> New internship available
                </div>
                <button onClick={() => setActiveTab('internships')} style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                  View →
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid-4">
            <div className="stat-box">
              <div className="stat-icon-wrapper" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <TrendingUp size={22} />
              </div>
              <div>
                <div className="stat-val" style={{ color: '#2563eb' }}>78%</div>
                <div className="stat-label">Profile Readiness</div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-wrapper" style={{ backgroundColor: '#ecfdf5', color: '#16a34a' }}>
                <Award size={22} />
              </div>
              <div>
                <div className="stat-val" style={{ color: '#16a34a' }}>
                  {verifiedSkillsCount} / {student.technicalSkills.length}
                </div>
                <div className="stat-label">Verified Skills</div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-wrapper" style={{ backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
                <Briefcase size={22} />
              </div>
              <div>
                <div className="stat-val" style={{ color: '#7c3aed' }}>{student.applications.length}</div>
                <div className="stat-label">Active Applications</div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-wrapper" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                <Sparkles size={22} />
              </div>
              <div>
                <div className="stat-val" style={{ color: '#d97706' }}>4</div>
                <div className="stat-label">Missing Skills to Learn</div>
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid-2">
            {/* Quick Skill Gap Glance */}
            <div className="clean-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="clean-card-header">
                  <span className="clean-card-title">
                    <Target size={18} color="#0284c7" /> AI Skill Gap Snapshot ({student.targetCareer})
                  </span>
                  <span className="badge badge-yellow">Action Needed</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '1rem' }}>
                  Based on target career requirements, here are the top technologies you need to acquire for maximum placement conversion:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: '#fef2f2', borderRadius: '6px', fontSize: '0.82rem' }}>
                    <span style={{ fontWeight: 600, color: '#991b1b' }}>Django Backend Framework</span>
                    <span className="badge badge-red">Missing (Priority 1)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: '#fef2f2', borderRadius: '6px', fontSize: '0.82rem' }}>
                    <span style={{ fontWeight: 600, color: '#991b1b' }}>RESTful APIs & Swagger</span>
                    <span className="badge badge-red">Missing (Priority 2)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: '#fffbeb', borderRadius: '6px', fontSize: '0.82rem' }}>
                    <span style={{ fontWeight: 600, color: '#92400e' }}>Data Structures & Algorithms (DSA)</span>
                    <span className="badge badge-yellow">45% (Needs Boost)</span>
                  </div>
                </div>
              </div>

              <button onClick={() => setActiveTab('gap')} className="btn btn-outline" style={{ width: '100%' }}>
                View Complete Skill Gap Report & Recommendations →
              </button>
            </div>

            {/* Quick Application Pipeline Glance */}
            <div className="clean-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="clean-card-header">
                  <span className="clean-card-title">
                    <Clock size={18} color="#0284c7" /> Application Pipeline Snapshot
                  </span>
                  <span className="badge badge-blue">Updated Today</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '1rem' }}>
                  Latest updates from partner employers reviewing your credentials:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  {student.applications.map(app => (
                    <div key={app.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.6rem 0.75rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.82rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.role}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{app.company}</div>
                      </div>
                      <span className={`badge ${
                        app.status === 'Shortlisted' ? 'badge-blue' :
                        app.status === 'Interview' ? 'badge-purple' : 'badge-yellow'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setActiveTab('internships')} className="btn btn-student" style={{ width: '100%' }}>
                Explore 5 More High-Fit Internships →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: AI SKILL GRAPH */}
      {activeTab === 'graph' && <SkillGraphView />}

      {/* TAB: AI MOCK INTERVIEW */}
      {activeTab === 'mockInterview' && <MockInterviewSimulator />}

      {/* TAB: SKILL VERIFICATION & CONFIDENCE */}
      {activeTab === 'verification' && (
        <SkillVerificationConfidence
          onNavigateToAssessment={() => setActiveTab('assessments')}
          onNavigateToProjects={() => setActiveTab('profile')}
        />
      )}

      {/* TAB: STUDENT CAREER TIMELINE */}
      {activeTab === 'timeline' && <StudentCareerTimeline />}

      {/* TAB: LIVE INDUSTRY DEMAND */}
      {activeTab === 'market' && <LiveIndustryDemand />}

      {/* TAB 2: AI RESUME ANALYZER */}
      {activeTab === 'resume' && <ResumeAnalyzer />}

      {/* TAB 3: SKILL GAP ANALYSIS */}
      {activeTab === 'gap' && (
        <SkillGapAnalysis
          onNavigateToRoadmap={() => setActiveTab('roadmap')}
          onNavigateToAssessment={() => setActiveTab('assessments')}
        />
      )}

      {/* TAB 4: LEARNING ROADMAP */}
      {activeTab === 'roadmap' && <LearningRoadmap />}

      {/* TAB 5: SKILL ASSESSMENTS */}
      {activeTab === 'assessments' && <SkillAssessments />}

      {/* TAB 6: INTERNSHIPS & TRACKING */}
      {activeTab === 'internships' && <InternshipMatching />}

      {/* TAB 7: DIGITAL PROFILE */}
      {activeTab === 'profile' && (
        <DigitalProfile onNavigateToResume={() => setActiveTab('resume')} />
      )}

      {/* TAB: AI PROJECT GENERATOR (POINT 13) */}
      {activeTab === 'projectGen' && <ProjectGenerator />}

      {/* TAB: SECURITY & PRIVACY (POINT 32 & 24) */}
      {activeTab === 'privacy' && <SecurityPrivacySettings />}
    </DashboardLayout>
  );
};
