import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Compass, BookOpen } from 'lucide-react';

export const LearningRoadmap = () => {
  const { student, roadmapTemplates, showToast } = useAuth();
  
  // Use target career roadmap or fallback
  const rawPhases = roadmapTemplates[student.targetCareer] || roadmapTemplates["Python Developer"] || [];
  
  // Local state for interactive checkboxes
  const [completedMilestones, setCompletedMilestones] = useState({
    "0-0": true,
    "0-1": true
  });

  const toggleMilestone = (phaseIdx, milestoneIdx) => {
    const key = `${phaseIdx}-${milestoneIdx}`;
    const willBeChecked = !completedMilestones[key];
    setCompletedMilestones(prev => ({ ...prev, [key]: !prev[key] }));
    if (showToast) {
      showToast(willBeChecked ? "Milestone marked as complete! 🎉" : "Milestone updated", "info");
    }
  };

  // Calculate total milestones
  let totalCount = 0;
  let finishedCount = 0;
  rawPhases.forEach((phase, pIdx) => {
    phase.milestones.forEach((_, mIdx) => {
      totalCount++;
      if (completedMilestones[`${pIdx}-${mIdx}`]) finishedCount++;
    });
  });

  const progressPercent = Math.round((finishedCount / totalCount) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Top Header Card */}
      <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#0284c7', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              <Compass size={14} /> MODULE 7 • AI PERSONALIZED LEARNING PATHWAY
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              Personalized Learning Roadmap: {student.targetCareer}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.86rem', marginTop: '0.25rem' }}>
              Specially synthesized by AI to systematically bridge your missing skills in <strong>Django, REST APIs, and Docker</strong>.
            </p>
          </div>

          <div style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '10px',
            padding: '0.65rem 1rem',
            textAlign: 'right'
          }}>
            <span style={{ fontSize: '0.72rem', color: '#0369a1', fontWeight: 600, display: 'block' }}>Roadmap Completion</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7', fontFamily: 'var(--font-heading)' }}>
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginBottom: '0.35rem' }}>
            <span>Milestones Achieved: {finishedCount} of {totalCount}</span>
            <span>Target: 10 Weeks to Full Industry Readiness</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%`, backgroundColor: '#0284c7' }} />
          </div>
        </div>
      </div>

      {/* Phased Roadmap Sequence */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {rawPhases.map((phase, pIdx) => {
          const isCurrentPhase = pIdx === 0;

          return (
            <div 
              key={pIdx} 
              className="clean-card"
              style={{
                borderLeft: isCurrentPhase ? '5px solid #0284c7' : '1px solid #e2e8f0',
                backgroundColor: isCurrentPhase ? '#ffffff' : '#fcfcfd'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span className={`badge ${isCurrentPhase ? 'badge-blue' : 'badge-neutral'}`}>
                      {phase.duration}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: isCurrentPhase ? '#0284c7' : '#94a3b8', fontWeight: 700 }}>
                      {isCurrentPhase ? "CURRENT FOCUS" : "UPCOMING PHASE"}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                    {phase.phase}
                  </h3>
                </div>

                <div style={{
                  backgroundColor: '#f1f5f9',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#475569'
                }}>
                  🎯 Recommended Project: {phase.recommendedAction}
                </div>
              </div>

              {/* Milestones list with checkboxes */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                  Core Milestones & Practical Exercises:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {phase.milestones.map((milestone, mIdx) => {
                    const isChecked = !!completedMilestones[`${pIdx}-${mIdx}`];

                    return (
                      <div
                        key={mIdx}
                        onClick={() => toggleMilestone(pIdx, mIdx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          backgroundColor: isChecked ? '#f0fdf4' : '#f8fafc',
                          border: `1px solid ${isChecked ? '#bbf7d0' : '#e2e8f0'}`,
                          padding: '0.6rem 0.85rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          style={{ width: '16px', height: '16px', accentColor: '#10b981', cursor: 'pointer', pointerEvents: 'none' }}
                        />
                        <span style={{
                          fontSize: '0.85rem',
                          color: isChecked ? '#166534' : '#334155',
                          textDecoration: isChecked ? 'line-through' : 'none',
                          fontWeight: isChecked ? 500 : 500
                        }}>
                          {milestone}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Curated Resources */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Curated Learning Resources:</span>
                {phase.resources.map((res, rIdx) => (
                  <span key={rIdx} className="badge badge-neutral" style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <BookOpen size={12} /> {res}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
