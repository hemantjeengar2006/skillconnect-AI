import React, { useState } from 'react';
import { 
  TrendingUp, 
  Flame, 
  Building2, 
  GraduationCap, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Filter
} from 'lucide-react';
import { liveIndustrySkillDemand } from '../data/skillIntelligenceData';
import { useAuth } from '../context/AuthContext';

export const LiveIndustryDemand = ({ title = "Live Industry Skill Demand Engine", subtitle = "Real-time demand signals synthesized from 45+ hiring partners & live job requisitions" }) => {
  const { showToast } = useAuth();
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const domains = ['All', 'Backend / AI', 'Frontend', 'DevOps / Infra', 'Database', 'Core CS'];

  const filteredSkills = liveIndustrySkillDemand.filter(item => {
    const matchesDomain = selectedDomain === 'All' || item.domain === selectedDomain;
    const matchesSearch = item.skill.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.topCompanies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="clean-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.35rem', 
              fontSize: '0.72rem', 
              fontWeight: 700, 
              color: '#dc2626', 
              backgroundColor: '#fef2f2', 
              padding: '0.2rem 0.6rem', 
              borderRadius: '9999px',
              border: '1px solid #fee2e2'
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 1.5s infinite' }}></span>
              LIVE MARKET ENGINE
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Updated hourly from verified employer requisitions</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{title}</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', margin: 0 }}>{subtitle}</p>
        </div>

        {/* Pulse Stats Pill */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          backgroundColor: '#f8fafc',
          padding: '0.6rem 1rem',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Active Roles Tracked</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>34,200+</div>
          </div>
          <div style={{ width: '1px', height: '24px', backgroundColor: '#cbd5e1' }}></div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Top Surge Sector</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#16a34a' }}>Cloud & AI (+68%)</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {domains.map(dom => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                padding: '0.35rem 0.8rem',
                borderRadius: '8px',
                border: selectedDomain === dom ? '1px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: selectedDomain === dom ? '#eff6ff' : '#ffffff',
                color: selectedDomain === dom ? '#1d4ed8' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {dom}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter skill or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            fontSize: '0.82rem',
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            outline: 'none',
            minWidth: '220px'
          }}
        />
      </div>

      {/* Live Market Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '1rem'
      }}>
        {filteredSkills.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '1.1rem',
              borderRadius: '12px',
              border: item.urgency === 'critical' ? '1.5px solid #fca5a5' : '1px solid #e2e8f0',
              backgroundColor: item.urgency === 'critical' ? '#fffafb' : '#ffffff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.85rem',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{item.skill}</h4>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500 }}>{item.domain}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    backgroundColor: item.trend === 'up' ? '#ecfdf5' : '#f8fafc',
                    color: item.trend === 'up' ? '#15803d' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}>
                    {item.trend === 'up' ? '↑' : '→'} {item.growth30d}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>30d demand surge</span>
                </div>
              </div>

              {/* Metric stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', fontSize: '0.78rem' }}>
                <span style={{ color: '#64748b' }}>Live Requisitions:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{item.activeOpenings.toLocaleString()} vacancies</span>
              </div>

              {/* Top Employers Hiring */}
              <div style={{ marginTop: '0.65rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: 600 }}>HIRING PARTNERS:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {item.topCompanies.map((c, i) => (
                    <span key={i} style={{
                      fontSize: '0.68rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      backgroundColor: '#f1f5f9',
                      color: '#334155',
                      fontWeight: 500
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* College & Student Actionable Insight */}
              <div style={{
                marginTop: '0.75rem',
                padding: '0.6rem 0.75rem',
                borderRadius: '8px',
                backgroundColor: '#f0fdf4',
                border: '1px dashed #86efac',
                fontSize: '0.75rem',
                color: '#166534',
                lineHeight: '1.35'
              }}>
                <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.15rem' }}>
                  <GraduationCap size={13} /> Curriculum / Workshop Trigger:
                </div>
                {item.collegeWorkshopRecommendation}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
              <button
                onClick={() => showToast(`Added ${item.skill} into your personal learning roadmap!`)}
                className="btn btn-sm btn-outline"
                style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}
              >
                + Add to Roadmap
              </button>
              <button
                onClick={() => showToast(`Viewing active internship openings requiring ${item.skill}`)}
                className="btn btn-sm btn-student"
                style={{ fontSize: '0.75rem', padding: '0.4rem 0.7rem' }}
              >
                Explore Jobs →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
