import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, Star, Sparkles, Search, MapPin, Send } from 'lucide-react';

export const InternshipMatching = () => {
  const { student, internships, applyToInternship } = useAuth();
  const [subTab, setSubTab] = useState('match'); // 'match' | 'tracker' | 'feedback'
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate Match Score for an internship
  const calculateMatch = (internship) => {
    const studentSkills = student.technicalSkills.map(s => s.name.toLowerCase());
    const matched = [];
    const missing = [];

    internship.requiredSkills.forEach(req => {
      if (studentSkills.includes(req.toLowerCase())) {
        matched.push(req);
      } else {
        missing.push(req);
      }
    });

    const score = Math.round((matched.length / internship.requiredSkills.length) * 100);
    return { score, matched, missing };
  };

  const filteredInternships = internships.filter(item => 
    item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stagesList = ["Applied", "Under Review", "Shortlisted", "Assessment", "Interview", "Selected"];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Subnav Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '0.5rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setSubTab('match')}
            className={`btn btn-sm ${subTab === 'match' ? 'btn-student' : 'btn-outline'}`}
          >
            <Sparkles size={15} /> AI Matched Internships ({internships.length})
          </button>
          <button
            onClick={() => setSubTab('tracker')}
            className={`btn btn-sm ${subTab === 'tracker' ? 'btn-student' : 'btn-outline'}`}
          >
            <Clock size={15} /> My Applications Tracker ({student.applications.length})
          </button>
          <button
            onClick={() => setSubTab('feedback')}
            className={`btn btn-sm ${subTab === 'feedback' ? 'btn-student' : 'btn-outline'}`}
          >
            <Star size={15} /> Industry Evaluations ({student.feedbackReceived.length})
          </button>
        </div>

        {subTab === 'match' && (
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Search by skill or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2rem', fontSize: '0.82rem' }}
            />
          </div>
        )}
      </div>

      {/* VIEW 1: AI MATCHED INTERNSHIPS */}
      {subTab === 'match' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredInternships.map(internship => {
            const { score, matched, missing } = calculateMatch(internship);
            const isApplied = student.applications.some(a => a.internshipId === internship.id);

            return (
              <div 
                key={internship.id}
                className="clean-card"
                style={{
                  borderLeft: score >= 75 ? '5px solid #10b981' : score >= 50 ? '5px solid #f59e0b' : '5px solid #cbd5e1'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      backgroundColor: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}>
                      {internship.companyLogo || "🏢"}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                          {internship.role}
                        </h3>
                        <span className="badge badge-neutral">{internship.mode}</span>
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0284c7', marginTop: '0.15rem' }}>
                        {internship.company}
                      </div>
                      <div style={{ display: 'flex', gap: '0.85rem', fontSize: '0.78rem', color: '#64748b', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <MapPin size={13} /> {internship.location}
                        </span>
                        <span>•</span>
                        <span>Stipend: <strong>{internship.stipend}</strong></span>
                        <span>•</span>
                        <span>Duration: {internship.duration}</span>
                        <span>•</span>
                        <span>{internship.openings} Openings</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Match Meter */}
                  <div style={{
                    backgroundColor: score >= 75 ? '#ecfdf5' : score >= 50 ? '#fffbeb' : '#f8fafc',
                    border: `1px solid ${score >= 75 ? '#a7f3d0' : score >= 50 ? '#fde68a' : '#e2e8f0'}`,
                    padding: '0.65rem 1rem',
                    borderRadius: '10px',
                    textAlign: 'center',
                    minWidth: '120px'
                  }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: score >= 75 ? '#065f46' : score >= 50 ? '#92400e' : '#64748b' }}>
                      {score}%
                    </div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: score >= 75 ? '#047857' : '#b45309' }}>
                      {score >= 75 ? "High Fit" : score >= 50 ? "Moderate Fit" : "Skill Gap"}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {internship.description}
                </p>

                {/* Transparent Match Breakdown */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#166534', marginBottom: '0.35rem' }}>
                      ✓ Your Matched Skills ({matched.length}):
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {matched.map((m, idx) => (
                        <span key={idx} className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                          ✓ {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.35rem' }}>
                      ✗ Skills To Improve ({missing.length}):
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {missing.length === 0 ? (
                        <span style={{ fontSize: '0.75rem', color: '#16a34a' }}>All required skills matched!</span>
                      ) : (
                        missing.map((m, idx) => (
                          <span key={idx} className="badge badge-red" style={{ fontSize: '0.72rem' }}>
                            ✗ {m}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Apply Action */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Eligibility: {internship.eligibility}
                  </span>

                  <div>
                    {isApplied ? (
                      <span className="badge badge-green" style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}>
                        ✓ Application Submitted
                      </span>
                    ) : (
                      <button
                        onClick={() => applyToInternship(internship.id)}
                        className="btn btn-student"
                      >
                        <Send size={15} /> Apply via Portal Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: APPLICATION TRACKER */}
      {subTab === 'tracker' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
              Live Application Pipeline Tracking
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Real-time synchronization with participating employers and college placement cells.
            </p>
          </div>

          {student.applications.map(app => (
            <div key={app.id} className="clean-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                    {app.role}
                  </h4>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0284c7' }}>
                    {app.company}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                    Applied on: {app.appliedDate} • Location: {app.location} • Stipend: {app.stipend}
                  </div>
                </div>

                <span className={`badge ${
                  app.status === 'Selected' ? 'badge-green' :
                  app.status === 'Interview' ? 'badge-purple' :
                  app.status === 'Shortlisted' ? 'badge-blue' : 'badge-yellow'
                }`} style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                  Current Status: {app.status}
                </span>
              </div>

              {/* Progress Steps Visualizer */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '0.5rem',
                backgroundColor: '#f8fafc',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0'
              }}>
                {stagesList.map((stageName, sIdx) => {
                  const isCurrent = app.stageIndex === sIdx;
                  const isPast = app.stageIndex > sIdx;

                  return (
                    <div key={sIdx} style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        margin: '0 auto 0.35rem',
                        backgroundColor: isPast ? '#10b981' : isCurrent ? '#3b82f6' : '#e2e8f0',
                        color: isPast || isCurrent ? '#ffffff' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {isPast ? "✓" : sIdx + 1}
                      </div>
                      <div style={{
                        fontSize: '0.72rem',
                        fontWeight: isCurrent ? 700 : 500,
                        color: isCurrent ? '#2563eb' : isPast ? '#166534' : '#94a3b8'
                      }}>
                        {stageName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: INDUSTRY FEEDBACK */}
      {subTab === 'feedback' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
              Structured Company Evaluations & Mentorship
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Feedback submitted by partner enterprise mentors becomes a permanent asset on your verified academic profile.
            </p>
          </div>

          {student.feedbackReceived.map((fb, idx) => (
            <div key={idx} className="clean-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                    {fb.company}
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Evaluated by: <strong>{fb.reviewer}</strong> on {fb.date}
                  </div>
                </div>
                <span className="badge badge-green">Official Verification</span>
              </div>

              {/* 5-Star Ratings Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '0.75rem',
                backgroundColor: '#f8fafc',
                padding: '0.85rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Technical Skills</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
                    ⭐ {fb.technicalSkills}/5
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Problem Solving</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
                    ⭐ {fb.problemSolving}/5
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Communication</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
                    ⭐ {fb.communication}/5
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Teamwork</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
                    ⭐ {fb.teamwork}/5
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Professionalism</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
                    ⭐ {fb.professionalism}/5
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div style={{
                backgroundColor: '#f1f5f9',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: '#334155',
                lineHeight: 1.5,
                borderLeft: '4px solid #0284c7'
              }}>
                "{fb.comments}"
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
