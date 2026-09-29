import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/DashboardLayout';
import { DepartmentSkillHeatmap } from './DepartmentSkillHeatmap';
import { LiveIndustryDemand } from '../../components/LiveIndustryDemand';
import { 
  Building2, 
  BarChart3, 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Search, 
  FileSpreadsheet, 
  CheckCircle2,
  Flame,
  Layers
} from 'lucide-react';

export const CollegeDashboard = () => {
  const { college, addPlacementDrive, addCohortStudent, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState('heatmap'); // 'heatmap' | 'analytics' | 'cohort' | 'drives' | 'market'
  const [selectedDept, setSelectedDept] = useState('BCA');
  const [studentSearch, setStudentSearch] = useState('');
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  // New student form state
  const [newStdName, setNewStdName] = useState('');
  const [newStdDept, setNewStdDept] = useState('BCA');
  const [newStdSem, setNewStdSem] = useState('5');
  const [newStdCgpa, setNewStdCgpa] = useState('8.5');
  const [newStdTopSkill, setNewStdTopSkill] = useState('Python (88%)');
  const [newStdReadiness, setNewStdReadiness] = useState('Ready (85%)');
  const [newStdStatus, setNewStdStatus] = useState('Available for Placement');

  // New drive form state
  const [driveCompany, setDriveCompany] = useState('');
  const [driveDate, setDriveDate] = useState('');
  const [driveRoles, setDriveRoles] = useState('');
  const [driveEligibility, setDriveEligibility] = useState('');

  const currentDeptStats = college.departmentStats.find(d => d.dept === selectedDept) || college.departmentStats[0];

  const menuItems = [
    { id: 'heatmap', label: 'Department Skill Heatmap', icon: <Flame size={18} />, badge: 'Priority' },
    { id: 'analytics', label: 'Curriculum Analytics', icon: <BarChart3 size={18} /> },
    { id: 'market', label: 'Live Industry Demand', icon: <TrendingUp size={18} />, badge: 'Live' },
    { id: 'cohort', label: 'Student Cohort Roster', icon: <Users size={18} />, badge: college.totalStudentsMonitored },
    { id: 'drives', label: 'Placement Drives', icon: <Calendar size={18} />, badge: college.placementDrives.length }
  ];

  const handleCreateDrive = (e) => {
    e.preventDefault();
    if (!driveCompany || !driveDate) return;

    addPlacementDrive({
      company: driveCompany,
      date: driveDate,
      roles: driveRoles.split(',').map(r => r.trim()),
      eligibility: driveEligibility || "All CS/IT branches with CGPA > 6.5"
    });

    setDriveCompany('');
    setDriveDate('');
    setDriveRoles('');
    setDriveEligibility('');
    setShowDriveModal(false);
  };

  const filteredStudents = college.monitoredStudentsSample.filter(s =>
    (selectedDept === 'All' || s.dept === selectedDept) &&
    (s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.dept.toLowerCase().includes(studentSearch.toLowerCase()))
  );

  const getTabTitle = () => {
    switch (activeTab) {
      case 'heatmap': return 'Department Skill Proficiency Heatmap & Gap Alarms';
      case 'market': return 'Live Industry Skill Demand Analysis';
      case 'trends': return 'Live Industry Skill Demand Analysis';
      case 'cohort': return 'Student Cohort Monitoring & Placement Roster';
      case 'drives': return 'Campus & Virtual Placement Drives Coordination';
      case 'analytics':
      default: return 'Department Curriculum & Skill Analytics';
    }
  };

  return (
    <DashboardLayout
      role="college"
      title={getTabTitle()}
      menuItems={menuItems}
      activeItem={activeTab}
      onSelect={setActiveTab}
      headerActions={
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => {
              showToast("Generating comprehensive NAAC / NIRF Placement Report...");
              setTimeout(() => showToast("Institutional Report exported successfully!"), 1200);
            }}
            className="btn btn-sm btn-outline"
          >
            <FileSpreadsheet size={15} /> Export Report
          </button>
          <button
            onClick={() => setShowDriveModal(true)}
            className="btn btn-sm btn-college"
          >
            <Plus size={15} /> Schedule Drive
          </button>
        </div>
      }
    >
      {/* College Stat Metrics Bar */}
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-box">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
            <Users size={22} />
          </div>
          <div>
            <div className="stat-val" style={{ color: '#4f46e5' }}>{college.totalStudentsMonitored}</div>
            <div className="stat-label">Students Monitored</div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div className="stat-val" style={{ color: '#059669' }}>{college.totalInternshipsPlaced}</div>
            <div className="stat-label">Placed / Interning</div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#f0fdfa', color: '#0f766e' }}>
            <Building2 size={22} />
          </div>
          <div>
            <div className="stat-val" style={{ color: '#0f766e' }}>{college.activePartnerCompanies}</div>
            <div className="stat-label">Partner Companies</div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
            <Calendar size={22} />
          </div>
          <div>
            <div className="stat-val" style={{ color: '#d97706' }}>{college.activePlacementDrives}</div>
            <div className="stat-label">Placement Drives</div>
          </div>
        </div>
      </div>

      {/* TAB: DEPARTMENT SKILL HEATMAP */}
      {activeTab === 'heatmap' && <DepartmentSkillHeatmap />}

      {/* TAB: LIVE INDUSTRY DEMAND */}
      {activeTab === 'market' && <LiveIndustryDemand title="Institutional Industry Demand Intelligence" subtitle="Align your department's upcoming workshops with actual hiring requisitions" />}

      {/* TAB 1: DEPARTMENT SKILL ANALYTICS */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
          {/* Department Switcher */}
          <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Curriculum & Cohort Skill Proficiency Heatmap
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Analyze real performance of students based on practical assessments and verified project codes.
                </p>
              </div>

              {/* Department Selector */}
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {college.departmentStats.map(d => (
                  <button
                    key={d.dept}
                    onClick={() => setSelectedDept(d.dept)}
                    className={`btn btn-sm ${selectedDept === d.dept ? 'btn-college' : 'btn-outline'}`}
                  >
                    {d.dept} ({d.studentsCount} Students)
                  </button>
                ))}
              </div>
            </div>

            {/* Department Skill Progress Bars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
              {Object.entries(currentDeptStats.skillsProficiency).map(([skill, val]) => (
                <div key={skill} style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                      {skill}
                    </span>
                    <span className={`badge ${val >= 70 ? 'badge-green' : val >= 50 ? 'badge-yellow' : 'badge-red'}`}>
                      {val}% Proficiency
                    </span>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${val}%`,
                        backgroundColor: val >= 70 ? '#10b981' : val >= 50 ? '#f59e0b' : '#ef4444'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.35rem' }}>
                    {val >= 70 ? "Strong industry alignment" : val >= 50 ? "Moderate skill level" : "Immediate training workshop recommended"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Skill Gaps in Student Cohort */}
          <div className="clean-card">
            <div className="clean-card-header">
              <span className="clean-card-title" style={{ color: '#991b1b' }}>
                <AlertTriangle size={18} color="#ef4444" /> Critical Skill Gaps Identified in Student Cohort
              </span>
              <span className="badge badge-red">High Priority for TPO</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {college.topSkillGapsIdentified.map((gap, idx) => (
                <div key={idx} style={{
                  padding: '1rem',
                  backgroundColor: '#fff1f2',
                  border: '1px solid #fecdd3',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#9f1239' }}>
                        {gap.skill}
                      </h4>
                      <span className="badge badge-red">{gap.gapPercentage}% Cohort Gap</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#881337', marginTop: '0.25rem' }}>
                      💡 <strong>Recommended Academic Action:</strong> {gap.recommendedAction}
                    </div>
                  </div>

                  <button
                    onClick={() => showToast(`Workshop request for "${gap.skill}" submitted to Academic Council!`)}
                    className="btn btn-sm btn-outline"
                    style={{ borderColor: '#f43f5e', color: '#be123c', fontSize: '0.78rem' }}
                  >
                    Schedule Workshop →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INDUSTRY DEMAND TRENDS */}
      {activeTab === 'trends' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
          <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
            <div className="clean-card-header">
              <span className="clean-card-title">
                <TrendingUp size={18} color="#4f46e5" /> Live Industry Skill Demand Analysis
              </span>
              <span className="badge badge-purple">Aggregated from 80+ Employers</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Real-time hiring data from participating companies like TechCorp, CloudScale, and FinTech Pulse. Shows which skills currently command the highest placement conversion.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: "Python Programming & Backend", demand: 95, openings: "4,200+ Roles", growth: "+24% YoY" },
                { name: "SQL & Relational Databases", demand: 90, openings: "3,800+ Roles", growth: "+18% YoY" },
                { name: "Artificial Intelligence & ML", demand: 88, openings: "3,900+ Roles", growth: "+45% YoY" },
                { name: "Git & Collaborative CI/CD", demand: 84, openings: "3,500+ Roles", growth: "+15% YoY" },
                { name: "React.js & Modern Frontend", demand: 80, openings: "5,800+ Roles", growth: "+28% YoY" },
                { name: "Cloud & Docker Containers", demand: 75, openings: "3,100+ Roles", growth: "+38% YoY" }
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                      {item.name}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>{item.growth}</span>
                      <span className="badge badge-purple">{item.openings}</span>
                    </div>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${item.demand}%`, backgroundColor: '#4f46e5' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STUDENT COHORT ROSTER */}
      {activeTab === 'cohort' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.2s ease-out' }}>
          <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Student Skill & Placement Roster
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Inspect individual candidate readiness scores, verified skill levels, and active job applications.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '260px' }}>
                  <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                  <input
                    type="text"
                    placeholder="Filter student by name or dept..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    style={{ paddingLeft: '2rem', fontSize: '0.82rem' }}
                  />
                </div>
                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="btn btn-sm btn-college"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <Plus size={14} /> Add Student to Cohort
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Student Name</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Dept & Sem</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>CGPA</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Top Verified Skill</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Placement Readiness</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(std => (
                    <tr key={std.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: '#0f172a' }}>
                        {std.name}
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem', color: '#475569' }}>
                        {std.dept} (Sem {std.sem})
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600 }}>
                        {std.cgpa}
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem' }}>
                        <span className="badge badge-blue">{std.topSkill}</span>
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem' }}>
                        <span className={`badge ${std.readiness.includes('Ready') ? 'badge-green' : 'badge-yellow'}`}>
                          {std.readiness}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.8rem' }}>
                        {std.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PLACEMENT DRIVES */}
      {activeTab === 'drives' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.2s ease-out' }}>
          <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Campus & Virtual Placement Drives
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Manage corporate visits, online coding tests, and candidate registration counts.
                </p>
              </div>

              <button onClick={() => setShowDriveModal(true)} className="btn btn-sm btn-college">
                <Plus size={15} /> Add Drive
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {college.placementDrives.map(drv => (
                <div key={drv.id} style={{
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                        {drv.company}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Scheduled: <strong>{drv.date}</strong>
                      </div>
                    </div>
                    <span className="badge badge-green">{drv.status}</span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '0.5rem' }}>
                    Roles: <strong>{drv.roles.join(", ")}</strong>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.85rem' }}>
                    Eligibility: {drv.eligibility}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0', fontSize: '0.78rem' }}>
                    <span style={{ color: '#4f46e5', fontWeight: 600 }}>
                      👥 {drv.registeredStudents} Students Registered
                    </span>
                    <button
                      onClick={() => showToast(`Notified all eligible students for ${drv.company} drive!`)}
                      className="btn btn-sm btn-outline"
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                    >
                      Broadcast Reminder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Placement Drive Modal */}
      {showDriveModal && (
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
          <div className="clean-card" style={{ maxWidth: '480px', width: '100%', animation: 'fadeIn 0.2s ease-out' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
              Schedule Placement Drive
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Set up a campus or virtual recruitment drive for students.
            </p>

            <form onSubmit={handleCreateDrive} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amazon, TechCorp, Infosys"
                  value={driveCompany}
                  onChange={(e) => setDriveCompany(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Drive Date
                </label>
                <input
                  type="date"
                  required
                  value={driveDate}
                  onChange={(e) => setDriveDate(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Roles (comma-separated)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Python Developer Intern, SDE Trainee"
                  value={driveRoles}
                  onChange={(e) => setDriveRoles(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Eligibility Criteria
                </label>
                <input
                  type="text"
                  placeholder="e.g. BCA / B.Tech CSE with CGPA > 7.0"
                  value={driveEligibility}
                  onChange={(e) => setDriveEligibility(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowDriveModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-college">
                  Schedule Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student to Cohort Modal */}
      {showAddStudentModal && (
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
          <div className="clean-card" style={{ maxWidth: '480px', width: '100%', animation: 'fadeIn 0.2s ease-out' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
              Add Student to Monitored Cohort
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Add a student to track their skill progress and placement readiness.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newStdName.trim()) return;
              addCohortStudent({
                name: newStdName.trim(),
                dept: newStdDept,
                sem: parseInt(newStdSem, 10) || 5,
                cgpa: parseFloat(newStdCgpa) || 8.0,
                topSkill: newStdTopSkill.trim() || "Python (80%)",
                readiness: newStdReadiness,
                status: newStdStatus
              });
              setNewStdName('');
              setShowAddStudentModal(false);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Sharma, Rohit Mehra"
                  value={newStdName}
                  onChange={(e) => setNewStdName(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Department
                  </label>
                  <select value={newStdDept} onChange={(e) => setNewStdDept(e.target.value)}>
                    <option value="BCA">BCA</option>
                    <option value="B.Tech CSE">B.Tech CSE</option>
                    <option value="MCA">MCA</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Semester
                  </label>
                  <select value={newStdSem} onChange={(e) => setNewStdSem(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Sem {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    CGPA
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newStdCgpa}
                    onChange={(e) => setNewStdCgpa(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Top Verified Skill
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React & Node (88%)"
                    value={newStdTopSkill}
                    onChange={(e) => setNewStdTopSkill(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Placement Readiness
                  </label>
                  <select value={newStdReadiness} onChange={(e) => setNewStdReadiness(e.target.value)}>
                    <option value="Ready (88%)">Ready (88%)</option>
                    <option value="Ready (92%)">Ready (92%)</option>
                    <option value="Training Needed (65%)">Training Needed (65%)</option>
                    <option value="Training Needed (50%)">Training Needed (50%)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Placement Status
                  </label>
                  <select value={newStdStatus} onChange={(e) => setNewStdStatus(e.target.value)}>
                    <option value="Available for Placement">Available for Placement</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Offer Accepted">Offer Accepted</option>
                    <option value="Pursuing Higher Studies">Pursuing Higher Studies</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-college">
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
