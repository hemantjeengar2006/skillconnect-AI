import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Target, CheckCircle2, XCircle, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

export const SkillGapAnalysis = ({ onNavigateToRoadmap, onNavigateToAssessment }) => {
  const { student, updateTargetCareer, careerRoleRequirements } = useAuth();
  
  const currentRoleConfig = careerRoleRequirements[student.targetCareer] || careerRoleRequirements["Python Developer"];
  
  // Categorize
  const matched = [];
  const missing = [];
  const needsImprovement = [];

  currentRoleConfig.required.forEach(req => {
    const foundSkill = student.technicalSkills.find(s => s.name.toLowerCase() === req.toLowerCase());
    if (!foundSkill) {
      missing.push({ name: req, type: "Required" });
    } else if (foundSkill.score < 60 || foundSkill.level === "Basic") {
      needsImprovement.push({ name: req, currentScore: foundSkill.score, currentLevel: foundSkill.level });
    } else {
      matched.push({ name: req, currentScore: foundSkill.score, currentLevel: foundSkill.level });
    }
  });

  // Calculate overall readiness match score
  const totalRequired = currentRoleConfig.required.length;
  const matchPercentage = Math.round(
    ((matched.length * 1.0 + needsImprovement.length * 0.5) / totalRequired) * 100
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Top Banner & Target Role Switcher */}
      <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#0284c7', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              <Target size={14} /> MODULE 5 & 6 • AI SKILL GAP BENCHMARK
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              Real-Time Industry Skill Gap Report
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.86rem', marginTop: '0.25rem' }}>
              Comparing your verified skills with current requirements from 80+ partner tech companies.
            </p>
          </div>

          {/* Target Role Selector */}
          <div style={{ minWidth: '260px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
              Target Career Benchmark:
            </label>
            <select
              value={student.targetCareer}
              onChange={(e) => updateTargetCareer(e.target.value)}
              style={{ fontWeight: 600, color: '#0f172a' }}
            >
              {Object.keys(careerRoleRequirements).map(role => (
                <option key={role} value={role}>{careerRoleRequirements[role].title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Readiness Meter */}
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: matchPercentage >= 75 ? '#16a34a' : '#d97706', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
              {matchPercentage}%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginTop: '0.2rem' }}>
              Career Match Score
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
              <span style={{ fontWeight: 600, color: '#334155' }}>
                Role: <strong>{currentRoleConfig.title}</strong>
              </span>
              <span style={{ color: '#64748b' }}>
                {matched.length} of {totalRequired} core skills fulfilled
              </span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${matchPercentage}%`,
                  backgroundColor: matchPercentage >= 75 ? '#10b981' : '#f59e0b'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {onNavigateToRoadmap && (
              <button onClick={onNavigateToRoadmap} className="btn btn-sm btn-student">
                View Roadmap <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3 Columns: Matched Skills, Improvement Required, Missing Skills */}
      <div className="grid-3">
        {/* Column 1: Matched / Strong Skills */}
        <div className="clean-card" style={{ borderTop: '4px solid #10b981' }}>
          <div className="clean-card-header">
            <span className="clean-card-title" style={{ color: '#065f46' }}>
              <CheckCircle2 size={18} color="#10b981" /> Matched Skills ({matched.length})
            </span>
            <span className="badge badge-green">Ready</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
            Skills you currently possess that meet or exceed industry baseline.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {matched.map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '8px',
                padding: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#065f46' }}>{item.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#047857' }}>Level: {item.currentLevel}</div>
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.75rem' }}>
                  {item.currentScore}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Improvement Needed */}
        <div className="clean-card" style={{ borderTop: '4px solid #f59e0b' }}>
          <div className="clean-card-header">
            <span className="clean-card-title" style={{ color: '#92400e' }}>
              <AlertTriangle size={18} color="#f59e0b" /> Needs Boost ({needsImprovement.length})
            </span>
            <span className="badge badge-yellow">Practice</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
            Skills where practical depth or assessment scores need uplifting.
          </p>

          {needsImprovement.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontSize: '0.84rem' }}>
              No critical intermediate gaps in this category!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {needsImprovement.map((item, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#92400e' }}>{item.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#b45309' }}>Current: {item.currentLevel} ({item.currentScore}%)</div>
                  </div>
                  {onNavigateToAssessment && (
                    <button 
                      onClick={onNavigateToAssessment}
                      className="btn btn-sm btn-outline" 
                      style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
                    >
                      Take Quiz
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 3: Missing Skills */}
        <div className="clean-card" style={{ borderTop: '4px solid #ef4444' }}>
          <div className="clean-card-header">
            <span className="clean-card-title" style={{ color: '#991b1b' }}>
              <XCircle size={18} color="#ef4444" /> Missing Skills ({missing.length})
            </span>
            <span className="badge badge-red">Critical Gap</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
            High-priority technologies demanded by companies but absent in profile.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {missing.map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#991b1b' }}>{item.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#b91c1c' }}>Not yet demonstrated</div>
                </div>
                <span className="badge badge-red" style={{ fontSize: '0.72rem' }}>
                  Missing
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Insights Details */}
      <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
        <div className="clean-card-header">
          <span className="clean-card-title">
            <TrendingUp size={18} color="#0284c7" /> Industry Market Snapshot for {currentRoleConfig.title}
          </span>
          <span className="badge badge-blue">{currentRoleConfig.industryDemand}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Average Fresher Stipend</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{currentRoleConfig.averageStipend}</div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Preferred Nice-to-Have Skills</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
              {currentRoleConfig.preferred.join(", ")}
            </div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Top Hiring Companies</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
              TechCorp, CloudScale, FinTech Pulse
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
