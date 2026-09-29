import React from 'react';
import { 
  Milestone, 
  Calendar, 
  CheckCircle2, 
  Award, 
  FolderGit2, 
  FileCheck, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { studentCareerTimelineMilestones } from '../../data/skillIntelligenceData';
import { useAuth } from '../../context/AuthContext';

export const StudentCareerTimeline = () => {
  const { student } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Banner */}
      <div className="clean-card" style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
        border: '1px solid #bfdbfe'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <Milestone size={16} /> LIFELONG CAREER VERIFICATION TIMELINE
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Career Milestone Journey
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
              Chronological ledger tracking student credentials, project evidence, assessments, and employer reviews.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', padding: '0.4rem 0.8rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2563eb' }}>{studentCareerTimelineMilestones.length}</div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Milestones</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0.4rem 0.8rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10b981' }}>2025 - 2026</div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Active Window</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Vertical Timeline Card */}
      <div className="clean-card">
        <div className="clean-card-header">
          <span className="clean-card-title">
            <Clock size={18} color="#2563eb" /> Verified Academic & Industry Record
          </span>
          <span className="badge badge-blue">Cryptographically Traceable</span>
        </div>

        <div style={{ position: 'relative', padding: '1.5rem 0.5rem 0.5rem 2rem', marginTop: '0.5rem' }}>
          {/* Vertical central bar */}
          <div style={{
            position: 'absolute',
            top: '25px',
            bottom: '25px',
            left: '35px',
            width: '2px',
            backgroundColor: '#e2e8f0'
          }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {studentCareerTimelineMilestones.map((m, idx) => {
              const isDone = m.status === 'Completed';

              return (
                <div key={m.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', position: 'relative' }}>
                  {/* Timeline icon node */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isDone ? '#2563eb' : '#f59e0b',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxShadow: '0 0 0 4px #ffffff, 0 2px 4px rgba(0,0,0,0.1)',
                    flexShrink: 0
                  }}>
                    {m.type === 'Assessment' ? <Award size={16} /> :
                     m.type === 'Project' ? <FolderGit2 size={16} /> :
                     m.type === 'Certification' ? <FileCheck size={16} /> :
                     m.type === 'Roadmap' ? <TrendingUp size={16} /> : <CheckCircle2 size={16} />}
                  </div>

                  {/* Milestone Card Content */}
                  <div style={{
                    flex: 1,
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: isDone ? '#ffffff' : '#fffbeb',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                          <Calendar size={13} style={{ display: 'inline', marginRight: '0.2rem' }} />
                          {m.date}
                        </span>
                        <span className={`badge ${isDone ? 'badge-blue' : 'badge-yellow'}`} style={{ fontSize: '0.68rem' }}>
                          {m.category}
                        </span>
                      </div>
                      <span className={`badge ${isDone ? 'badge-green' : 'badge-yellow'}`} style={{ fontSize: '0.72rem' }}>
                        {m.badge}
                      </span>
                    </div>

                    <h4 style={{ margin: '0.4rem 0 0.25rem 0', fontSize: '1.02rem', fontWeight: 700, color: '#0f172a' }}>
                      {m.title}
                    </h4>

                    <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: '1.45' }}>
                      {m.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
