import React, { useState } from 'react';
import { 
  Users, 
  FolderPlus, 
  Search, 
  Award, 
  FolderGit2, 
  CheckCircle2, 
  Filter, 
  Calendar, 
  Sparkles, 
  Building2, 
  ArrowRight,
  TrendingUp,
  Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TalentPoolView = () => {
  const { company, showToast } = useAuth();
  const [selectedPool, setSelectedPool] = useState("Python Backend");
  const [searchTerm, setSearchTerm] = useState("");

  const candidatePools = {
    "Python Backend": [
      {
        id: "c-101",
        name: "Rahul Sharma",
        college: "Apex Institute of Tech",
        course: "BCA (Sem 5)",
        cgpa: 8.4,
        matchScore: 88,
        skills: ["Python (85%)", "SQL (72%)", "Git (68%)"],
        evidence: "Assessment + Project + Credential",
        evidenceLevel: "Strong",
        topProject: "Smart City Traffic Analytics",
        status: "Available for Screening"
      },
      {
        id: "c-102",
        name: "Sneha Reddy",
        college: "Apex Institute of Tech",
        course: "BCA (Sem 5)",
        cgpa: 8.7,
        matchScore: 84,
        skills: ["Python (80%)", "FastAPI (75%)", "PostgreSQL (70%)"],
        evidence: "Assessment + Project",
        evidenceLevel: "Strong",
        topProject: "Campus Lab Allocation API",
        status: "Available for Screening"
      },
      {
        id: "c-103",
        name: "Vikram Malhotra",
        college: "Apex Institute of Tech",
        course: "B.Tech CSE (Sem 7)",
        cgpa: 7.2,
        matchScore: 71,
        skills: ["Python (70%)", "Linux (65%)"],
        evidence: "Assessment Only",
        evidenceLevel: "Moderate",
        topProject: "Automated File Sync Utility",
        status: "Under Skill Enhancement"
      }
    ],
    "Frontend & React": [
      {
        id: "c-201",
        name: "Priya Patel",
        college: "Apex Institute of Tech",
        course: "B.Tech CSE (Sem 7)",
        cgpa: 9.1,
        matchScore: 94,
        skills: ["React (90%)", "TypeScript (85%)", "Redux (82%)"],
        evidence: "Assessment + 3 Production Projects",
        evidenceLevel: "Strong",
        topProject: "Multi-tenant SaaS Dashboard",
        status: "Offer Stage"
      },
      {
        id: "c-202",
        name: "Arjun Mehta",
        college: "Apex Institute of Tech",
        course: "BCA (Sem 5)",
        cgpa: 8.1,
        matchScore: 78,
        skills: ["HTML5 (92%)", "CSS3 (88%)", "React (68%)"],
        evidence: "Project Evidence",
        evidenceLevel: "Moderate",
        topProject: "Portfolio Builder SPA",
        status: "Available for Screening"
      }
    ],
    "AI & Data Science": [
      {
        id: "c-301",
        name: "Aman Verma",
        college: "Apex Institute of Tech",
        course: "MCA (Sem 3)",
        cgpa: 7.8,
        matchScore: 82,
        skills: ["Python (78%)", "Pandas (75%)", "SQL (80%)"],
        evidence: "Assessment + Kaggle Notebooks",
        evidenceLevel: "Strong",
        topProject: "Customer Churn Prediction Model",
        status: "Interview Scheduled"
      }
    ]
  };

  const poolKeys = Object.keys(candidatePools);
  const activeCandidates = candidatePools[selectedPool] || [];

  const filteredCandidates = activeCandidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Banner */}
      <div className="clean-card" style={{
        background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)',
        border: '1px solid #99f6e4'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0f766e', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <Users size={16} /> TALENT POOL & RECRUITMENT PIPELINE
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Curated Candidate Talent Pools
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>
              Group verified candidates into role-specific pools for rapid future requisition matching and placement drives.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={() => showToast("Opening custom pool creator modal...")}
              className="btn btn-sm btn-company"
            >
              <FolderPlus size={14} /> + Create New Pool
            </button>
          </div>
        </div>
      </div>

      {/* Talent Pool Selector & Filter */}
      <div className="clean-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {poolKeys.map(poolName => (
              <button
                key={poolName}
                onClick={() => setSelectedPool(poolName)}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  border: selectedPool === poolName ? '1.5px solid #0f766e' : '1px solid #cbd5e1',
                  backgroundColor: selectedPool === poolName ? '#0f766e' : '#ffffff',
                  color: selectedPool === poolName ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {poolName} ({candidatePools[poolName].length})
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by candidate name or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              outline: 'none',
              minWidth: '240px'
            }}
          />
        </div>

        {/* Candidate Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem'
        }}>
          {filteredCandidates.map(candidate => (
            <div
              key={candidate.id}
              style={{
                padding: '1.15rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.9rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                      {candidate.name}
                    </h4>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>
                      {candidate.course} • CGPA {candidate.cgpa}
                    </div>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: '0.75rem' }}>
                    {candidate.matchScore}% Match
                  </span>
                </div>

                {/* Evidence Level Badge */}
                <div style={{ marginTop: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className={`badge ${candidate.evidenceLevel === 'Strong' ? 'badge-green' : 'badge-yellow'}`} style={{ fontSize: '0.68rem' }}>
                    Evidence: {candidate.evidenceLevel}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    ({candidate.evidence})
                  </span>
                </div>

                {/* Skills tags */}
                <div style={{ marginTop: '0.65rem' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Demonstrated Capabilities:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {candidate.skills.map((s, idx) => (
                      <span key={idx} style={{ fontSize: '0.72rem', backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Project */}
                <div style={{ marginTop: '0.65rem', padding: '0.5rem 0.75rem', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.75rem' }}>
                  <span style={{ color: '#64748b' }}>Portfolio Capstone: </span>
                  <strong style={{ color: '#0f172a' }}>{candidate.topProject}</strong>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                <button
                  onClick={() => showToast(`Invited ${candidate.name} to immediate technical assessment!`)}
                  className="btn btn-sm btn-company"
                  style={{ flex: 1, fontSize: '0.75rem' }}
                >
                  <Mail size={13} /> Direct Interview Invite
                </button>
                <button
                  onClick={() => showToast(`Exported full verified dossier for ${candidate.name}`)}
                  className="btn btn-sm btn-outline"
                  style={{ fontSize: '0.75rem' }}
                >
                  View Dossier →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
