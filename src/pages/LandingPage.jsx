import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LiveIndustryDemand } from '../components/LiveIndustryDemand';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Target, 
  Compass, 
  Award, 
  TrendingUp, 
  ShieldCheck
} from 'lucide-react';

export const LandingPage = () => {
  const { navigateToLogin } = useAuth();

  return (
    <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)',
        borderBottom: '1px solid #e2e8f0',
        padding: '3.5rem 1.25rem 3rem'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#ffffff',
            border: '1px solid #bfdbfe',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#2563eb',
            marginBottom: '1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Sparkles size={15} /> AI-Powered Academia–Industry Collaboration Platform
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            color: '#0f172a',
            marginBottom: '1rem',
            letterSpacing: '-0.03em'
          }}>
            Bridging the Gap Between <br />
            <span style={{ color: '#2563eb' }}>What Students Learn</span> & <span style={{ color: '#0f766e' }}>What Industry Requires</span>
          </h1>

          <p style={{
            maxWidth: '750px',
            margin: '0 auto 2.5rem',
            fontSize: '1.05rem',
            color: '#64748b',
            lineHeight: 1.6
          }}>
            A unified digital ecosystem powered by AI skill mapping, resume parsing, skill gap analysis, personalized roadmaps, and verified internship matching.
          </p>

          {/* 3 MAIN DOORS: Dedicated Login Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            textAlign: 'left',
            marginTop: '1.5rem'
          }}>
            {/* Door 1: Student */}
            <div className="role-card-door student" style={{
              backgroundColor: '#ffffff',
              border: '2px solid #bae6fd',
              borderRadius: '16px',
              padding: '1.75rem',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284c7',
                  marginBottom: '1rem'
                }}>
                  <GraduationCap size={26} />
                </div>
                <div className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>Role 1</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                  Student Portal
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  Build your verified career profile, extract skills via AI resume parser, identify gaps, and apply to high-match internships.
                </p>
                <div style={{ fontSize: '0.78rem', color: '#0369a1', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span>✓ AI Resume Parsing</span>
                  <span>✓ Gap Analysis & Roadmap</span>
                  <span>✓ Skill Assessments</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigateToLogin('student')}
                  className="btn btn-student"
                  style={{ width: '100%' }}
                >
                  Go to Student Login <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Door 2: College */}
            <div className="role-card-door college" style={{
              backgroundColor: '#ffffff',
              border: '2px solid #c7d2fe',
              borderRadius: '16px',
              padding: '1.75rem',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#eef2ff',
                  border: '1px solid #c7d2fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4f46e5',
                  marginBottom: '1rem'
                }}>
                  <Building2 size={26} />
                </div>
                <div className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Role 2</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                  College / University
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  Monitor cohort skills across BCA, CSE & MCA, view live industry demand heatmaps, and schedule campus placement drives.
                </p>
                <div style={{ fontSize: '0.78rem', color: '#4338ca', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span>✓ Department Analytics</span>
                  <span>✓ Cohort Gap Alerts</span>
                  <span>✓ Placement Coordination</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigateToLogin('college')}
                  className="btn btn-college"
                  style={{ width: '100%' }}
                >
                  Go to College Login <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Door 3: Company */}
            <div className="role-card-door company" style={{
              backgroundColor: '#ffffff',
              border: '2px solid #99f6e4',
              borderRadius: '16px',
              padding: '1.75rem',
              boxShadow: '0 4px 12px rgba(15, 118, 110, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#f0fdfa',
                  border: '1px solid #99f6e4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f766e',
                  marginBottom: '1rem'
                }}>
                  <Briefcase size={26} />
                </div>
                <div className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Role 3</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                  Industry / Company
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  Post requirements, filter students with exact verified skills, review applicants in pipeline, and provide structured feedback.
                </p>
                <div style={{ fontSize: '0.78rem', color: '#0f766e', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span>✓ Precision Skill Search</span>
                  <span>✓ Application Pipeline</span>
                  <span>✓ Structured Feedback</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigateToLogin('company')}
                  className="btn btn-company"
                  style={{ width: '100%' }}
                >
                  Go to Company Login <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Unique Concept: Skill-to-Career Bridge */}
      <section style={{ padding: '3.5rem 1.25rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-blue badge-pop" style={{ marginBottom: '0.5rem' }}>CORE INNOVATION</div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
            The "Skill-to-Career Bridge" Workflow
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '650px', margin: '0.4rem auto 0' }}>
            Not just another job board. A complete closed-loop ecosystem from skill diagnosis to full placement.
          </p>
        </div>

        {/* Linear Step Flow */}
        <div className="workflow-steps-grid">
          {[
            { step: "1", title: "Student Skill", desc: "Profile & Resume Upload", icon: <FileText size={18} /> },
            { step: "2", title: "AI Skill Mapping", desc: "Entity & NLP Extraction", icon: <Sparkles size={18} /> },
            { step: "3", title: "Industry Standard", desc: "Real Employer Criteria", icon: <Target size={18} /> },
            { step: "4", title: "Skill Gap Report", desc: "Matched vs Missing", icon: <TrendingUp size={18} /> },
            { step: "5", title: "Learning Roadmap", desc: "Targeted Phased Steps", icon: <Compass size={18} /> },
            { step: "6", title: "Internship Match", desc: "High-Confidence Fit", icon: <Briefcase size={18} /> },
            { step: "7", title: "Placement & Feedback", desc: "Verified Evaluation", icon: <Award size={18} /> }
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              className="workflow-step-btn"
              title={`${item.title} - ${item.desc}`}
            >
              <div className="workflow-step-icon-wrap">
                {item.icon}
              </div>
              <div className="workflow-step-title">
                {item.title}
              </div>
              <div className="workflow-step-desc">
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Live Industry Demand Intelligence Section */}
      <section style={{ padding: '0 1.25rem 3.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <LiveIndustryDemand />
      </section>

      {/* Feature Highlights Grid */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '3.5rem 1.25rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
              Built for Modern Academia & Tech Industries
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.4rem' }}>
              Clean, simple, and transparent tools for every stakeholder.
            </p>
          </div>

          <div className="grid-3">
            <div className="clean-card">
              <div style={{ color: '#0284c7', marginBottom: '0.75rem' }}>
                <FileText size={28} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                AI Resume Analyzer
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                Converts unstructured PDF resumes into structured skill vectors, programming proficiencies, and project histories.
              </p>
            </div>

            <div className="clean-card">
              <div style={{ color: '#4f46e5', marginBottom: '0.75rem' }}>
                <Target size={28} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Skill Gap Visualizer
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                Compare your current skills with industry postings like Python Backend or MERN Stack, revealing exact missing requirements.
              </p>
            </div>

            <div className="clean-card">
              <div style={{ color: '#0f766e', marginBottom: '0.75rem' }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Interactive Assessments
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                Take timed benchmark quizzes to verify practical knowledge and earn validated badges for recruiters.
              </p>
            </div>

            <div className="clean-card">
              <div style={{ color: '#0284c7', marginBottom: '0.75rem' }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Personalized Roadmaps
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                Structured week-by-week learning steps with targeted milestones, curated documentation, and project deliverables.
              </p>
            </div>

            <div className="clean-card">
              <div style={{ color: '#4f46e5', marginBottom: '0.75rem' }}>
                <TrendingUp size={28} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                College Cohort Analytics
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                Colleges can monitor department-wide readiness across BCA, B.Tech, and MCA to arrange workshops before campus drives.
              </p>
            </div>

            <div className="clean-card">
              <div style={{ color: '#0f766e', marginBottom: '0.75rem' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Transparent Application Pipeline
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                Track applications from Applied to Review, Shortlisted, Interview, and Offer with 360-degree company evaluation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
