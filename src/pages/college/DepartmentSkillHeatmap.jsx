import React, { useState } from 'react';
import { 
  Building2, 
  Flame, 
  Send, 
  X, 
  Handshake
} from 'lucide-react';
import { collegeHeatmapMatrix } from '../../data/skillIntelligenceData';
import { useAuth } from '../../context/AuthContext';

export const DepartmentSkillHeatmap = () => {
  const { showToast } = useAuth();
  const [selectedCell, setSelectedCell] = useState(null);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [collabPartner, setCollabPartner] = useState("TechCorp Solutions");
  const [collabType, setCollabType] = useState("Industry Hands-on Workshop");
  const [collabDuration, setCollabDuration] = useState("2 Days (16 Hours)");
  const [collabNotes, setCollabNotes] = useState("");

  const handleCellClick = (dept, skillId, skillData, skillName) => {
    setSelectedCell({ dept, skillId, skillData, skillName });
    if (skillData.status === 'red' || skillData.status === 'yellow') {
      setCollabNotes(`Urgent institutional curriculum enhancement: Address the ${skillData.score}% average proficiency gap in ${skillName} for ${dept} students.`);
      setShowCollabModal(true);
    } else {
      showToast(`${dept} has strong verified proficiency in ${skillName} (${skillData.score}%)`);
    }
  };

  const handleSendCollaboration = (e) => {
    e.preventDefault();
    showToast(`Collaboration proposal for "${selectedCell?.skillName}" sent to ${collabPartner}!`);
    setShowCollabModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Banner */}
      <div className="clean-card" style={{
        background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)',
        border: '1px solid #c7d2fe'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4f46e5', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <Building2 size={16} /> INSTITUTIONAL CURRICULUM INTELLIGENCE
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Department Skill Proficiency Heatmap
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
              Live cross-departmental benchmarking identifying acute curriculum skill gaps before placement season.
            </p>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '0.75rem', backgroundColor: '#ffffff', padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#16a34a', fontWeight: 600 }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#10b981' }}></span> High (&gt;70%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#d97706', fontWeight: 600 }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#f59e0b' }}></span> Moderate (50-70%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#dc2626', fontWeight: 600 }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#ef4444' }}></span> Critical Gap (&lt;50%)
            </span>
          </div>
        </div>
      </div>

      {/* Heatmap Table Card */}
      <div className="clean-card">
        <div className="clean-card-header">
          <span className="clean-card-title">
            <Flame size={18} color="#4f46e5" /> Multi-Department Skill Heatmap Matrix
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Click on any highlighted cell to dispatch an Industry Collaboration Proposal
          </span>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '0.5rem' }}>
          <table className="clean-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '6px', fontSize: '0.82rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', color: '#475569', fontWeight: 700, backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                  Skill Area
                </th>
                {collegeHeatmapMatrix.departments.map(dept => (
                  <th key={dept} style={{ padding: '0.6rem 0.8rem', textAlign: 'center', color: '#0f172a', fontWeight: 700, backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
                    {dept}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {collegeHeatmapMatrix.skills.map(sk => (
                <tr key={sk.id}>
                  <td style={{ padding: '0.75rem 0.85rem', fontWeight: 700, color: '#0f172a', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                    {sk.name}
                  </td>
                  {collegeHeatmapMatrix.departments.map(dept => {
                    const cell = collegeHeatmapMatrix.matrix[dept]?.[sk.id];
                    if (!cell) return <td key={dept}>—</td>;

                    const isRed = cell.status === 'red';
                    const isYellow = cell.status === 'yellow';

                    const bg = isRed ? '#fef2f2' : isYellow ? '#fffbeb' : '#f0fdf4';
                    const border = isRed ? '1.5px solid #fecaca' : isYellow ? '1px solid #fde68a' : '1px solid #bbf7d0';
                    const textColor = isRed ? '#991b1b' : isYellow ? '#92400e' : '#166534';
                    const iconColor = isRed ? '#ef4444' : isYellow ? '#f59e0b' : '#10b981';

                    return (
                      <td
                        key={dept}
                        onClick={() => handleCellClick(dept, sk.id, cell, sk.name)}
                        style={{
                          padding: '0.65rem',
                          textAlign: 'center',
                          backgroundColor: bg,
                          border: border,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: iconColor }}></span>
                          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: textColor }}>{cell.score}%</span>
                        </div>
                        <div style={{ fontSize: '0.66rem', color: '#64748b', marginTop: '0.15rem' }}>
                          {cell.studentsTested} evaluated
                        </div>
                        {cell.urgentTraining && (
                          <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#dc2626', marginTop: '0.2rem', textTransform: 'uppercase' }}>
                            Trigger Collab ⚡
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collaboration Request Modal (Point 15) */}
      {showCollabModal && selectedCell && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '520px',
            width: '100%',
            padding: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Handshake size={18} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Industry Collaboration Proposal</h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Dispatch training request to partner companies</span>
                </div>
              </div>
              <button onClick={() => setShowCollabModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendCollaboration} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', fontSize: '0.8rem', color: '#991b1b' }}>
                <strong>Detected Acute Skill Gap:</strong> {selectedCell.dept} students scored an average of {selectedCell.skillData.score}% in <strong>{selectedCell.skillName}</strong>.
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>Partner Company</label>
                <select
                  value={collabPartner}
                  onChange={(e) => setCollabPartner(e.target.value)}
                  style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', marginTop: '0.2rem' }}
                >
                  <option value="TechCorp Solutions">TechCorp Solutions Pvt Ltd (Bangalore)</option>
                  <option value="CloudScale Systems">CloudScale Systems (Enterprise Cloud)</option>
                  <option value="NextGen AI Labs">NextGen AI Labs (Deep Learning & RAG)</option>
                  <option value="FinTech Pulse">FinTech Pulse (Financial Microservices)</option>
                </select>
              </div>

              <div className="grid-2" style={{ gap: '0.65rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>Program Format</label>
                  <select
                    value={collabType}
                    onChange={(e) => setCollabType(e.target.value)}
                    style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', marginTop: '0.2rem' }}
                  >
                    <option>Industry Hands-on Workshop</option>
                    <option>48-Hour Hackathon Mentorship</option>
                    <option>Guest Lecture by Senior Architect</option>
                    <option>Curriculum Review & Lab Alignment</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>Target Duration</label>
                  <select
                    value={collabDuration}
                    onChange={(e) => setCollabDuration(e.target.value)}
                    style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', marginTop: '0.2rem' }}
                  >
                    <option>2 Days (16 Hours)</option>
                    <option>1 Week Intensive Bootcamp</option>
                    <option>Weekend 8-Hour Masterclass</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>Proposal Context & Objectives</label>
                <textarea
                  rows={3}
                  value={collabNotes}
                  onChange={(e) => setCollabNotes(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', marginTop: '0.2rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowCollabModal(false)} className="btn btn-outline btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-college btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Send size={14} /> Transmit Request to Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
