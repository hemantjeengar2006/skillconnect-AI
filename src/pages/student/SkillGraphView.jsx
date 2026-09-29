import React, { useState } from 'react';
import { 
  GitFork, 
  Sparkles, 
  Target,
  FolderGit2
} from 'lucide-react';
import { skillGraphData, projectSkillMappings } from '../../data/skillIntelligenceData';
import { useAuth } from '../../context/AuthContext';

export const SkillGraphView = () => {
  const { student, showToast, updateTargetCareer } = useAuth();
  const [selectedRole, setSelectedRole] = useState(student.targetCareer || "Python Developer");
  const [activeNode, setActiveNode] = useState(null);

  const activeGraph = skillGraphData[selectedRole] || skillGraphData["Python Developer"];

  // Find next logical skill (first skill with status 'gap' or 'learning' marked as recommended)
  const nextLogicalSkill = activeGraph.nodes.find(n => n.recommended) || activeGraph.nodes.find(n => n.status === 'gap');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Top Banner & Career Goal Selector */}
      <div className="clean-card" style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
        border: '1px solid #bbf7d0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <Sparkles size={16} /> AI SKILL GRAPH & CAREER PATH INTELLIGENCE
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Career Architecture: <span style={{ color: '#2563eb' }}>{selectedRole}</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
              Hierarchical mapping of core foundations, frameworks, and next logical skills to master.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Target Role:</span>
            {Object.keys(skillGraphData).map(role => (
              <button
                key={role}
                onClick={() => {
                  setSelectedRole(role);
                  updateTargetCareer(role);
                }}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  border: selectedRole === role ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
                  backgroundColor: selectedRole === role ? '#2563eb' : '#ffffff',
                  color: selectedRole === role ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Next Logical Step Callout */}
        {nextLogicalSkill && (
          <div style={{
            marginTop: '1.25rem',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            backgroundColor: '#eff6ff',
            border: '1.5px solid #93c5fd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Target size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase' }}>
                  AI IDENTIFIED NEXT LOGICAL SKILL
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                  {nextLogicalSkill.name} ({nextLogicalSkill.category})
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Unlocks <strong>4 high-fit internships</strong></span>
              <button
                onClick={() => showToast(`Enrolled in ${nextLogicalSkill.name} learning module!`)}
                className="btn btn-sm btn-student"
              >
                Start Learning Now →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Interactive Visual Graph + Node Deep Dive */}
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Left: Interactive Visual Skill Graph */}
        <div className="clean-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="clean-card-header">
            <span className="clean-card-title">
              <GitFork size={18} color="#2563eb" /> Hierarchical Skill Dependency Tree
            </span>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.74rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#16a34a', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }}></span> Mastered
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#d97706', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d97706' }}></span> Learning
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#dc2626', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626' }}></span> Gap
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
            Click any node below to inspect requirements, evidence, and corresponding mock test modules.
          </p>

          {/* Visual Nodes Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '0.85rem',
            padding: '0.5rem 0'
          }}>
            {activeGraph.nodes.map((node, index) => {
              const isSelected = activeNode?.id === node.id;
              const isRecommended = node.recommended;
              
              const borderCol = node.status === 'mastered' ? '#86efac' :
                                node.status === 'in-progress' || node.status === 'learning' ? '#fde047' : '#fca5a5';
              const bgCol = node.status === 'mastered' ? '#f0fdf4' :
                            node.status === 'in-progress' || node.status === 'learning' ? '#fffbeb' : '#fef2f2';
              const textCol = node.status === 'mastered' ? '#15803d' :
                              node.status === 'in-progress' || node.status === 'learning' ? '#b45309' : '#b91c1c';

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  style={{
                    padding: '0.9rem',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid #2563eb' : `1.5px solid ${borderCol}`,
                    backgroundColor: isSelected ? '#eff6ff' : bgCol,
                    cursor: 'pointer',
                    boxShadow: isRecommended ? '0 0 0 3px rgba(37, 99, 235, 0.15)' : 'none',
                    position: 'relative',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isRecommended && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '10px',
                      backgroundColor: '#2563eb',
                      color: '#ffffff',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.5px'
                    }}>
                      NEXT FOCUS
                    </span>
                  )}

                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
                    {node.category}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>
                    {node.name}
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginTop: '0.65rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#64748b' }}>Mastery</span>
                      <span style={{ fontWeight: 700, color: textCol }}>{node.level}%</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '9999px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
                      <div style={{
                        width: `${node.level}%`,
                        height: '100%',
                        backgroundColor: node.status === 'mastered' ? '#16a34a' : node.status === 'gap' ? '#ef4444' : '#f59e0b',
                        borderRadius: '9999px'
                      }}></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.65rem' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px',
                      backgroundColor: '#ffffff',
                      color: textCol,
                      border: `1px solid ${borderCol}`
                    }}>
                      {node.status === 'mastered' ? '✓ Mastered' : node.status === 'gap' ? '✕ Skill Gap' : '⟳ Learning'}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600 }}>Inspect →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Node Detail Card */}
        <div className="clean-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="clean-card-header">
              <span className="clean-card-title">
                <Target size={18} color="#2563eb" /> Skill Intelligence
              </span>
            </div>

            {activeNode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginTop: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                    {activeNode.category}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0.15rem 0' }}>
                    {activeNode.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.35rem' }}>
                    <span className={`badge ${activeNode.status === 'mastered' ? 'badge-green' : activeNode.status === 'gap' ? 'badge-red' : 'badge-yellow'}`}>
                      {activeNode.status.toUpperCase()} ({activeNode.level}%)
                    </span>
                  </div>
                </div>

                <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Why this matters:</div>
                  <p style={{ margin: 0, color: '#475569', lineHeight: '1.4' }}>
                    Required in <strong>86%</strong> of {selectedRole} job descriptions. Completing this closes a major gap for top-tier hiring partners.
                  </p>
                </div>

                <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 700, color: '#1e40af', marginBottom: '0.25rem' }}>Recommended Milestone:</div>
                  <div style={{ color: '#1e3a8a' }}>
                    Build a real-world project incorporating {activeNode.name} to earn strong demonstration evidence.
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8' }}>
                <Target size={36} style={{ margin: '0 auto 0.5rem auto', opacity: 0.5 }} />
                <p style={{ fontSize: '0.85rem' }}>Select any skill node on the left to see requirements, evidence, and roadmap modules.</p>
              </div>
            )}
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => showToast(`Opened assessment for ${activeNode?.name || 'selected skill'}`)}
              className="btn btn-student"
              style={{ width: '100%' }}
            >
              Take Skill Assessment →
            </button>
            <button
              onClick={() => showToast("Loading recommended capstone project...")}
              className="btn btn-outline"
              style={{ width: '100%' }}
            >
              View Recommended Project
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: Project-to-Skill Mapping (Point 7) */}
      <div className="clean-card">
        <div className="clean-card-header">
          <div>
            <span className="clean-card-title">
              <FolderGit2 size={18} color="#2563eb" /> Project-to-Skill Mapping Engine
            </span>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              AI extracts technologies from student portfolio projects, verifies demonstration evidence, and maps them to career roles.
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: '0.75rem' }}>
          {projectSkillMappings.map(item => (
            <div
              key={item.projectId}
              style={{
                padding: '1.1rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{item.projectTitle}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.35rem' }}>
                    {item.detectedTech.map((tech, i) => (
                      <span key={i} style={{ fontSize: '0.68rem', backgroundColor: '#f1f5f9', color: '#334155', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Extracted Skills with Confidence */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.6rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Demonstrated Evidence Extracted:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {item.extractedSkills.map((sk, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', backgroundColor: '#f8fafc', padding: '0.35rem 0.6rem', borderRadius: '6px' }}>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{sk.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{sk.evidence}</span>
                        <span className={`badge ${sk.confidence === 'Strong' ? 'badge-green' : 'badge-blue'}`} style={{ fontSize: '0.65rem' }}>
                          {sk.confidence}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Boost Contribution */}
              <div style={{ backgroundColor: '#f0fdf4', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px dashed #86efac', fontSize: '0.74rem' }}>
                <div style={{ fontWeight: 700, color: '#166534', marginBottom: '0.2rem' }}>Career Fit Value:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {item.careerMatchContribution.map((cm, cIdx) => (
                    <span key={cIdx} style={{ color: '#15803d', fontWeight: 600 }}>
                      • {cm.role}: <strong>{cm.fitScore}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
