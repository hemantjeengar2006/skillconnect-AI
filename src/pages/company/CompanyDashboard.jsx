import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/DashboardLayout';
import { TalentPoolView } from './TalentPoolView';
import { LiveIndustryDemand } from '../../components/LiveIndustryDemand';
import { 
  LayoutDashboard, 
  Users, 
  Search, 
  PlusCircle, 
  Briefcase, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare,
  Sparkles,
  Flame
} from 'lucide-react';

export const CompanyDashboard = () => {
  const { 
    company, 
    internships, 
    postNewInternship, 
    updateCompanyApplicantStatus, 
    submitInternshipFeedback, 
    showToast 
  } = useAuth();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'talentPool' | 'pipeline' | 'search' | 'openings' | 'market' | 'post'
  const [statusFilter, setStatusFilter] = useState('All');
  const [candidateSkillSearch, setCandidateSkillSearch] = useState('');
  const [candidateDeptFilter, setCandidateDeptFilter] = useState('All');

  // Feedback Modal State
  const [selectedAppForFeedback, setSelectedAppForFeedback] = useState(null);
  const [techRating, setTechRating] = useState(5);
  const [problemRating, setProblemRating] = useState(4);
  const [commRating, setCommRating] = useState(4);
  const [teamRating, setTeamRating] = useState(5);
  const [profRating, setProfRating] = useState(5);
  const [feedbackComments, setFeedbackComments] = useState('');

  // Post internship form state
  const [newRole, setNewRole] = useState('');
  const [newLocation, setNewLocation] = useState('Bangalore (Hybrid)');
  const [newStipend, setNewStipend] = useState('₹25,000 / month');
  const [newDuration, setNewDuration] = useState('6 Months');
  const [newOpenings, setNewOpenings] = useState(3);
  const [newRequiredSkills, setNewRequiredSkills] = useState('Python, SQL, Django, REST API, Git');
  const [newEligibility, setNewEligibility] = useState('BCA / B.Tech CSE / MCA');
  const [newDescription, setNewDescription] = useState('');

  const myCompanyPostings = internships.filter(i => 
    i.company?.toLowerCase() === company.name?.toLowerCase()
  );

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'talentPool', label: 'Curated Talent Pools', icon: <Users size={18} />, badge: 'AI Filtered' },
    { id: 'pipeline', label: 'Applicant Pipeline', icon: <Briefcase size={18} />, badge: company.companyApplications.length },
    { id: 'search', label: 'Candidate Search', icon: <Search size={18} /> },
    { id: 'market', label: 'Market Demand Signals', icon: <Flame size={18} />, badge: 'Live' },
    { id: 'openings', label: 'Active Postings', icon: <Briefcase size={18} />, badge: myCompanyPostings.length },
    { id: 'post', label: 'Post Opening', icon: <PlusCircle size={18} /> }
  ];

  const handlePostInternship = (e) => {
    e.preventDefault();
    if (!newRole.trim()) return;

    postNewInternship({
      role: newRole,
      category: "Python Developer",
      location: newLocation,
      mode: newLocation.includes('Remote') ? 'Remote' : 'Hybrid',
      duration: newDuration,
      stipend: newStipend,
      openings: parseInt(newOpenings, 10) || 2,
      requiredSkills: newRequiredSkills.split(',').map(s => s.trim()),
      preferredSkills: ["Docker", "AWS"],
      eligibility: newEligibility,
      description: newDescription || `Exciting opportunity at ${company.name} for hands-on software development with high pre-placement conversion rate.`
    });

    setNewRole('');
    setNewDescription('');
    setActiveTab('pipeline');
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!selectedAppForFeedback) return;

    submitInternshipFeedback(selectedAppForFeedback.id, {
      technicalSkills: techRating,
      problemSolving: problemRating,
      communication: commRating,
      teamwork: teamRating,
      professionalism: profRating,
      comments: feedbackComments || "Demonstrated solid engineering fundamentals and enthusiasm throughout the evaluation."
    });

    setSelectedAppForFeedback(null);
    setFeedbackComments('');
  };

  const filteredApplicants = company.companyApplications.filter(app => {
    if (statusFilter !== 'All' && app.status !== statusFilter) return false;
    return true;
  });

  const getTabTitle = () => {
    switch (activeTab) {
      case 'talentPool': return 'Curated Candidate Talent Pools & Pipeline';
      case 'market': return 'Live Industry Market Demand Signals';
      case 'pipeline': return 'Applicant Tracking Pipeline';
      case 'search': return 'AI Candidate Talent Search';
      case 'openings': return 'Active Internship Openings';
      case 'post': return 'Post New Internship Requirement';
      case 'overview':
      default: return 'Recruiter Overview & Analytics';
    }
  };

  return (
    <DashboardLayout
      role="company"
      title={getTabTitle()}
      menuItems={menuItems}
      activeItem={activeTab}
      onSelect={setActiveTab}
      headerActions={
        activeTab !== 'post' && (
          <button
            onClick={() => setActiveTab('post')}
            className="btn btn-sm btn-company"
          >
            <PlusCircle size={15} /> Post Opening
          </button>
        )
      }
    >
      {/* VIEW: TALENT POOLS */}
      {activeTab === 'talentPool' && <TalentPoolView />}

      {/* VIEW: LIVE INDUSTRY DEMAND */}
      {activeTab === 'market' && (
        <LiveIndustryDemand
          title="Industry Requisition Demand Insights"
          subtitle="Benchmark your company's skill requirements against cross-industry hiring patterns"
        />
      )}

      {/* VIEW 1: RECRUITER OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
          {/* Key Metric KPI Cards */}
          <div className="grid-4">
            <div className="stat-box">
              <div className="stat-icon-wrapper" style={{ backgroundColor: '#f0fdfa', color: '#0f766e' }}>
                <Briefcase size={22} />
              </div>
              <div>
                <div className="stat-val" style={{ color: '#0f766e' }}>{company.activeInternshipCount}</div>
                <div className="stat-label">Active Openings</div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-wrapper" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <Users size={22} />
              </div>
              <div>
                <div className="stat-val" style={{ color: '#2563eb' }}>{company.companyApplications.length}</div>
                <div className="stat-label">Total Applicants</div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-wrapper" style={{ backgroundColor: '#ecfdf5', color: '#16a34a' }}>
                <CheckCircle2 size={22} />
              </div>
              <div>
                <div className="stat-val" style={{ color: '#16a34a' }}>{company.shortlistedCandidates}</div>
                <div className="stat-label">Shortlisted Candidates</div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-icon-wrapper" style={{ backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
                <Sparkles size={22} />
              </div>
              <div>
                <div className="stat-val" style={{ color: '#7c3aed' }}>94%</div>
                <div className="stat-label">Avg Skill Match Fit</div>
              </div>
            </div>
          </div>

          {/* Hiring Funnel & Recent Applicants Grid */}
          <div className="grid-2">
            {/* Hiring Pipeline Funnel Visualizer */}
            <div className="clean-card">
              <div className="clean-card-header">
                <span className="clean-card-title">
                  <TrendingUp size={18} color="#0f766e" /> Recruitment Funnel Conversion
                </span>
                <span className="badge badge-green">Live Pipeline</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { stage: "Applications Received", count: 640, pct: 100, color: "#3b82f6" },
                  { stage: "Screened / Assessed", count: 210, pct: 33, color: "#6366f1" },
                  { stage: "Shortlisted for Interview", count: 75, pct: 12, color: "#8b5cf6" },
                  { stage: "Final Technical Round", count: 28, pct: 4.5, color: "#f59e0b" },
                  { stage: "Internship Offers Extended", count: 14, pct: 2.2, color: "#10b981" }
                ].map((step, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{step.stage}</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{step.count} candidates ({step.pct}%)</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{ width: `${step.pct}%`, backgroundColor: step.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Skills Demand Catalog */}
            <div className="clean-card">
              <div className="clean-card-header">
                <span className="clean-card-title">
                  <Sparkles size={18} color="#0f766e" /> Mandatory Required Skills
                </span>
                <button onClick={() => setActiveTab('search')} className="btn btn-sm btn-outline" style={{ fontSize: '0.75rem' }}>
                  Search Matches →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {company.requiredSkillsCatalog.map((sk, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.6rem 0.85rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{sk.name}</span>
                      {sk.mandatory && <span className="badge badge-red" style={{ fontSize: '0.68rem' }}>Mandatory</span>}
                    </div>
                    <span className="badge badge-blue">Target Match: {sk.weight}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Candidates Table */}
          <div className="clean-card">
            <div className="clean-card-header">
              <span className="clean-card-title">
                <Users size={18} color="#0f766e" /> Recent Candidate Applications
              </span>
              <button onClick={() => setActiveTab('pipeline')} className="btn btn-sm btn-outline" style={{ fontSize: '0.75rem' }}>
                View All in Pipeline ({company.companyApplications.length}) →
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ padding: '0.65rem 0.5rem' }}>Candidate</th>
                    <th style={{ padding: '0.65rem 0.5rem' }}>Applied Role</th>
                    <th style={{ padding: '0.65rem 0.5rem' }}>Course & College</th>
                    <th style={{ padding: '0.65rem 0.5rem' }}>Match Score</th>
                    <th style={{ padding: '0.65rem 0.5rem' }}>Stage Status</th>
                    <th style={{ padding: '0.65rem 0.5rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {company.companyApplications.slice(0, 3).map(app => (
                    <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: '#0f172a' }}>
                        {app.name}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', color: '#0f766e', fontWeight: 600 }}>
                        {app.role}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', color: '#64748b' }}>
                        {app.course} • {app.college}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <span className={`badge ${app.matchScore >= 80 ? 'badge-green' : 'badge-yellow'}`}>
                          {app.matchScore}% Match
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <span className="badge badge-blue">{app.status}</span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <button
                          onClick={() => {
                            setSelectedAppForFeedback(app);
                          }}
                          className="btn btn-sm btn-outline"
                          style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}
                        >
                          Evaluate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: APPLICANT TRACKING PIPELINE */}
      {activeTab === 'pipeline' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.2s ease-out' }}>
          {/* Filter Bar */}
          <div className="clean-card" style={{ backgroundColor: '#ffffff', padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#334155' }}>
                Filter Candidate Stage:
              </span>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['All', 'Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`btn btn-sm ${statusFilter === st ? 'btn-company' : 'btn-outline'}`}
                    style={{ fontSize: '0.78rem' }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Applicant Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredApplicants.map(app => (
              <div key={app.id} className="clean-card" style={{ borderLeft: app.matchScore >= 80 ? '5px solid #10b981' : '5px solid #f59e0b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                        {app.name}
                      </h3>
                      <span className="badge badge-blue">CGPA: {app.cgpa}</span>
                      <span className="badge badge-green">Assessment: {app.assessmentScore}</span>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: '#0f766e', fontWeight: 600, marginTop: '0.2rem' }}>
                      Applied for: <strong>{app.role}</strong>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                      {app.course} • {app.college} • Applied on: {app.appliedDate}
                    </div>
                  </div>

                  {/* AI Match Badge */}
                  <div style={{
                    backgroundColor: app.matchScore >= 80 ? '#ecfdf5' : '#fffbeb',
                    border: `1px solid ${app.matchScore >= 80 ? '#a7f3d0' : '#fde68a'}`,
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: app.matchScore >= 80 ? '#065f46' : '#92400e' }}>
                      {app.matchScore}% Match
                    </div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b' }}>
                      AI Skill Fit
                    </div>
                  </div>
                </div>

                {/* Skill comparison breakdown */}
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: '#166534', fontWeight: 700 }}>✓ Matched Skills: </span>
                    <span style={{ color: '#334155' }}>{app.matchedSkills.join(", ")}</span>
                  </div>
                  {app.missingSkills.length > 0 && (
                    <div>
                      <span style={{ color: '#991b1b', fontWeight: 700 }}>✗ Missing: </span>
                      <span style={{ color: '#64748b' }}>{app.missingSkills.join(", ")}</span>
                    </div>
                  )}
                </div>

                {/* Status Pipeline Changer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #e2e8f0',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                      Move Candidate Stage:
                    </span>
                    <select
                      value={app.status}
                      onChange={(e) => updateCompanyApplicantStatus(app.id, e.target.value)}
                      style={{ width: 'auto', fontSize: '0.82rem', padding: '0.35rem 0.65rem', fontWeight: 600 }}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Assessment">Assessment Round</option>
                      <option value="Interview">Technical Interview</option>
                      <option value="Selected">Selected / Offer Extended</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setSelectedAppForFeedback(app)}
                      className="btn btn-sm btn-outline"
                      style={{ fontSize: '0.78rem' }}
                    >
                      <MessageSquare size={13} /> {app.hasFeedback ? "Update Feedback" : "Submit Evaluation Feedback"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: CANDIDATE TALENT SEARCH */}
      {activeTab === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.2s ease-out' }}>
          <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
              Precision Candidate Talent Search & Filter
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Filter students across participating universities based on verified practical skills rather than buzzwords.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr auto', gap: '1rem', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                  Filter by Technical Skill:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Python, SQL, React, Docker..."
                  value={candidateSkillSearch}
                  onChange={(e) => setCandidateSkillSearch(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
                  Academic Stream / Discipline:
                </label>
                <select value={candidateDeptFilter} onChange={(e) => setCandidateDeptFilter(e.target.value)}>
                  <option value="All">All Disciplines</option>
                  <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                  <option value="B.Tech CSE">B.Tech CSE</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>

              <div style={{ paddingTop: '1.2rem' }}>
                <button
                  onClick={() => showToast("Search filter applied across 1,250 candidate records!")}
                  className="btn btn-company"
                >
                  <Search size={15} /> Find Candidates
                </button>
              </div>
            </div>
          </div>

          {/* Candidate Profiles */}
          <div className="grid-2">
            {[
              {
                name: "Rahul Sharma",
                course: "BCA (Sem 5)",
                college: "Apex Institute of Tech",
                cgpa: 8.4,
                topSkills: ["Python (85% Verified)", "SQL (72%)", "Git (68%)", "HTML/CSS (88%)"],
                projects: "Smart City Traffic Analytics",
                readyScore: "82% Ready for Python Intern"
              },
              {
                name: "Ananya Deshmukh",
                course: "B.Tech CSE (Sem 7)",
                college: "Apex Institute of Tech",
                cgpa: 8.9,
                topSkills: ["Python (92% Verified)", "Django (85%)", "REST API (88%)", "PostgreSQL"],
                projects: "Microservices Payment Gateway",
                readyScore: "94% Ready for Backend Intern"
              },
              {
                name: "Sneha Reddy",
                course: "BCA (Sem 5)",
                college: "Apex Institute of Tech",
                cgpa: 8.7,
                topSkills: ["Python (80%)", "Machine Learning", "Pandas", "Scikit-learn"],
                projects: "Customer Churn Prediction",
                readyScore: "85% Ready for AI/Data Intern"
              },
              {
                name: "Priya Patel",
                course: "B.Tech CSE (Sem 7)",
                college: "Apex Institute of Tech",
                cgpa: 9.1,
                topSkills: ["React.js (90% Verified)", "Node.js (85%)", "MongoDB", "Tailwind CSS"],
                projects: "DevCollab Real-time Code Editor",
                readyScore: "94% Ready for Full Stack Intern"
              }
            ].map((cand, idx) => (
              <div key={idx} className="clean-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                      {cand.name}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {cand.course} • {cand.college} (CGPA: {cand.cgpa})
                    </div>
                  </div>
                  <span className="badge badge-green">{cand.readyScore}</span>
                </div>

                <div style={{ marginBottom: '0.85rem' }}>
                  <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Verified Competencies:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {cand.topSkills.map((sk, sIdx) => (
                      <span key={sIdx} className="badge badge-blue" style={{ fontSize: '0.72rem' }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '1rem' }}>
                  Key Project: <strong>{cand.projects}</strong>
                </div>

                <button
                  onClick={() => showToast(`Interview invite dispatched to ${cand.name}!`)}
                  className="btn btn-sm btn-company"
                  style={{ width: '100%' }}
                >
                  Shortlist & Invite to Interview →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: ACTIVE OPENINGS MANAGER */}
      {activeTab === 'openings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.2s ease-out' }}>
          <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  {company.name} Active Postings
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Manage current recruitment listings, view applicant influx, and close positions.
                </p>
              </div>
              <button onClick={() => setActiveTab('post')} className="btn btn-sm btn-company">
                <PlusCircle size={15} /> New Position
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {myCompanyPostings.length === 0 ? (
              <div className="clean-card" style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748b' }}>
                <Briefcase size={44} style={{ margin: '0 auto 1rem', opacity: 0.4, color: '#0f766e' }} />
                <h4 style={{ color: '#0f172a', fontSize: '1.1rem', marginBottom: '0.4rem', fontWeight: 800 }}>
                  No Openings Posted Yet for {company.name}
                </h4>
                <p style={{ fontSize: '0.85rem', maxWidth: '440px', margin: '0 auto 1.25rem' }}>
                  Create your first tailored technical internship requirement to start receiving AI-matched candidate applications from top universities.
                </p>
                <button onClick={() => setActiveTab('post')} className="btn btn-company">
                  <PlusCircle size={16} /> Post Your First Opening
                </button>
              </div>
            ) : (
              myCompanyPostings.map(internship => (
                <div key={internship.id} className="clean-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.85rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                          {internship.role}
                        </h4>
                        <span className="badge badge-neutral">{internship.mode}</span>
                        <span className="badge badge-blue">Posted: {internship.postedDate}</span>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}>
                        Location: {internship.location} • Stipend: <strong>{internship.stipend}</strong> • Duration: {internship.duration} • Openings: {internship.openings}
                      </div>
                    </div>

                    <span className="badge badge-green">Accepting Applications</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
                    {internship.requiredSkills.map((sk, sIdx) => (
                      <span key={sIdx} className="badge badge-blue" style={{ fontSize: '0.72rem' }}>
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.65rem', borderTop: '1px solid #f1f5f9', fontSize: '0.8rem' }}>
                    <span style={{ color: '#0f766e', fontWeight: 600 }}>
                      👥 Candidates Applying via SkillBridge Portal
                    </span>
                    <button
                      onClick={() => setActiveTab('pipeline')}
                      className="btn btn-sm btn-outline"
                      style={{ fontSize: '0.75rem' }}
                    >
                      View Applicants in Pipeline →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* VIEW 5: POST NEW INTERNSHIP */}
      {activeTab === 'post' && (
        <div className="clean-card" style={{ backgroundColor: '#ffffff', maxWidth: '820px', margin: '0 auto', width: '100%', animation: 'fadeIn 0.2s ease-out' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
            Post Internship / Technical Requirement
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '1.5rem' }}>
            Define precise technical criteria. Our AI engine automatically calculates student match scores and highlights gaps.
          </p>

          <form onSubmit={handlePostInternship} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Position Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Python Developer Intern"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Location & Work Mode
                </label>
                <select value={newLocation} onChange={(e) => setNewLocation(e.target.value)}>
                  <option value="Bangalore (Hybrid)">Bangalore (Hybrid)</option>
                  <option value="Remote (All India)">Remote (All India)</option>
                  <option value="Hyderabad (On-site)">Hyderabad (On-site)</option>
                  <option value="Pune (Hybrid)">Pune (Hybrid)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Monthly Stipend
                </label>
                <input
                  type="text"
                  required
                  value={newStipend}
                  onChange={(e) => setNewStipend(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Duration
                </label>
                <input
                  type="text"
                  required
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Number of Openings
                </label>
                <input
                  type="number"
                  required
                  value={newOpenings}
                  onChange={(e) => setNewOpenings(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Required Technical Skills (comma-separated for AI matching)
              </label>
              <input
                type="text"
                required
                placeholder="Python, SQL, Django, REST API, Git"
                value={newRequiredSkills}
                onChange={(e) => setNewRequiredSkills(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Academic Eligibility
              </label>
              <input
                type="text"
                value={newEligibility}
                onChange={(e) => setNewEligibility(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Role Description & Expectations
              </label>
              <textarea
                rows={4}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Describe day-to-day responsibilities, mentorship opportunities, and pre-placement offer terms..."
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab('pipeline')}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-company">
                Publish Internship Opening
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FEEDBACK MODAL */}
      {selectedAppForFeedback && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div className="clean-card" style={{ maxWidth: '540px', width: '100%', animation: 'fadeIn 0.2s ease-out' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
              Structured Evaluation: {selectedAppForFeedback.name}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Rate candidate competencies to enrich their academic record and verified digital portfolio.
            </p>

            <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { label: "Technical Skills", val: techRating, set: setTechRating },
                { label: "Problem Solving & Logic", val: problemRating, set: setProblemRating },
                { label: "Communication", val: commRating, set: setCommRating },
                { label: "Teamwork & Culture", val: teamRating, set: setTeamRating },
                { label: "Professionalism & Punctuality", val: profRating, set: setProfRating }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{item.label}</span>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => item.set(star)}
                        style={{
                          fontSize: '1.1rem',
                          color: star <= item.val ? '#f59e0b' : '#cbd5e1',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '0.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Mentor Comments & Growth Advice:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide constructive feedback on what the student excelled at and what they should practice next..."
                  value={feedbackComments}
                  onChange={(e) => setFeedbackComments(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedAppForFeedback(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-company">
                  Submit Official Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
