import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Award, 
  FolderGit2, 
  FileCheck, 
  MessageSquare,
  HelpCircle,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SkillVerificationConfidence = ({ onNavigateToAssessment, onNavigateToProjects }) => {
  const { student, showToast } = useAuth();

  // Compute evidence for each skill
  const skillEvidenceList = student.technicalSkills.map(skill => {
    const hasAssessment = skill.verified;
    const hasProject = student.projects.some(p => p.tech.some(t => t.toLowerCase().includes(skill.name.toLowerCase())));
    const hasCert = student.certifications.some(c => c.title.toLowerCase().includes(skill.name.toLowerCase()));
    const hasFeedback = student.feedbackReceived.length > 0 && (skill.name.toLowerCase() === 'python' || skill.name.toLowerCase() === 'sql');

    const proofsCount = (hasAssessment ? 1 : 0) + (hasProject ? 1 : 0) + (hasCert ? 1 : 0) + (hasFeedback ? 1 : 0);

    let confidence = "Limited";
    let badgeClass = "badge-yellow";
    if (proofsCount >= 3) {
      confidence = "Strong";
      badgeClass = "badge-green";
    } else if (proofsCount >= 1) {
      confidence = "Moderate";
      badgeClass = "badge-blue";
    }

    return {
      ...skill,
      hasAssessment,
      hasProject,
      hasCert,
      hasFeedback,
      proofsCount,
      confidence,
      badgeClass
    };
  });

  const strongCount = skillEvidenceList.filter(s => s.confidence === 'Strong').length;
  const modCount = skillEvidenceList.filter(s => s.confidence === 'Moderate').length;
  const limCount = skillEvidenceList.filter(s => s.confidence === 'Limited').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Overview Banner */}
      <div className="clean-card" style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)',
        border: '1px solid #a7f3d0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <ShieldCheck size={16} /> EVIDENCE-BACKED SKILL CONFIDENCE ENGINE
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Self-Declared vs Demonstrated Verification
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
              Companies prioritize verified capabilities. Every skill is triangulated across Assessments, Projects, Certifications, and Employer Feedback.
            </p>
          </div>

          {/* Quick Counter Pills */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ padding: '0.5rem 0.9rem', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1px solid #86efac', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>{strongCount}</div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#15803d', textTransform: 'uppercase' }}>Strong Evidence</div>
            </div>
            <div style={{ padding: '0.5rem 0.9rem', borderRadius: '8px', backgroundColor: '#eff6ff', border: '1px solid #93c5fd', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>{modCount}</div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase' }}>Moderate Evidence</div>
            </div>
            <div style={{ padding: '0.5rem 0.9rem', borderRadius: '8px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#d97706' }}>{limCount}</div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>Self-Declared Only</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Evidence Table Card */}
      <div className="clean-card">
        <div className="clean-card-header">
          <span className="clean-card-title">
            <Award size={18} color="#059669" /> Triangulated Skill Evidence Matrix
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Showing {skillEvidenceList.length} skills in your active digital profile
          </span>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '0.5rem' }}>
          <table className="clean-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                <th style={{ padding: '0.75rem 0.5rem' }}>Skill Name</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Proficiency Level</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Assessment</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Project Proof</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Certification</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Industry Feedback</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Evidence Confidence</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {skillEvidenceList.map((skill, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: '#0f172a' }}>
                    {skill.name}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#334155', fontWeight: 500 }}>
                      {skill.level} ({skill.score}%)
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                    {skill.hasAssessment ? (
                      <span style={{ color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600, fontSize: '0.75rem' }}>
                        <CheckCircle2 size={15} /> Verified
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                    {skill.hasProject ? (
                      <span style={{ color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600, fontSize: '0.75rem' }}>
                        <CheckCircle2 size={15} /> Included
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                    {skill.hasCert ? (
                      <span style={{ color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600, fontSize: '0.75rem' }}>
                        <CheckCircle2 size={15} /> Credential
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                    {skill.hasFeedback ? (
                      <span style={{ color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600, fontSize: '0.75rem' }}>
                        <CheckCircle2 size={15} /> Mentor Endorsed
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                    <span className={`badge ${skill.badgeClass}`}>
                      {skill.confidence} ({skill.proofsCount}/4)
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                    {skill.confidence !== 'Strong' ? (
                      <button
                        onClick={() => {
                          if (onNavigateToAssessment) onNavigateToAssessment();
                          else showToast(`Opening verification test for ${skill.name}`);
                        }}
                        className="btn btn-sm btn-outline"
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}
                      >
                        + Verify Skill
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600 }}>✓ Optimal</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Opportunity Readiness Card (Point 11) */}
      <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
        <div className="clean-card-header">
          <span className="clean-card-title">
            <ShieldCheck size={18} color="#2563eb" /> Opportunity Readiness Assessment
          </span>
          <span className="badge badge-blue">Grounded Evaluation</span>
        </div>

        <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 1rem 0' }}>
          Honest suitability assessment for <strong>{student.targetCareer} Internships</strong>. We evaluate demonstrated evidence rather than arbitrary claims.
        </p>

        <div className="grid-2">
          <div style={{ padding: '1rem', borderRadius: '10px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <div style={{ fontWeight: 700, color: '#166534', fontSize: '0.88rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} /> Strong In Required Areas (3/5):
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#15803d', lineHeight: '1.6' }}>
              <li><strong>Python Core & OOP</strong>: Verified via 85% assessment & Smart City traffic analytics project.</li>
              <li><strong>SQL Database Architecture</strong>: Backed by Infosys Springboard certification & 72% test score.</li>
              <li><strong>Version Control (Git)</strong>: Verified through active GitHub repository commits.</li>
            </ul>
          </div>

          <div style={{ padding: '1rem', borderRadius: '10px', backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
            <div style={{ fontWeight: 700, color: '#991b1b', fontSize: '0.88rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertTriangle size={16} /> Needs Demonstration Before Applying (2/5):
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#b91c1c', lineHeight: '1.6' }}>
              <li><strong>Django Framework</strong>: Required by 80% of hiring partners. Currently missing project proof.</li>
              <li><strong>REST API Design & Swagger</strong>: Needs a deployed endpoint demonstration.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
