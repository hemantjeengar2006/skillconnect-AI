import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Code, 
  FolderGit2, 
  Award, 
  Plus, 
  ExternalLink, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2,
  Sparkles,
  Edit,
  Trash2,
  X,
  FileText,
  UploadCloud
} from 'lucide-react';

export const DigitalProfile = ({ onNavigateToResume }) => {
  const { 
    student, 
    addSkill, 
    deleteSkill, 
    updateStudentProfile, 
    addStudentProject, 
    deleteStudentProject, 
    addStudentCertification, 
    deleteStudentCertification,
    updateStudentResume
  } = useAuth();

  // Modals state
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddCertModal, setShowAddCertModal] = useState(false);

  // Edit Profile form state
  const [editName, setEditName] = useState(student.name);
  const [editCourse, setEditCourse] = useState(student.course);
  const [editSem, setEditSem] = useState(student.semester);
  const [editCollege, setEditCollege] = useState(student.college);
  const [editCgpa, setEditCgpa] = useState(student.cgpa);
  const [editPhone, setEditPhone] = useState(student.phone);
  const [editLocation, setEditLocation] = useState(student.location);
  const [editSummary, setEditSummary] = useState(student.summary || '');
  const [editGithub, setEditGithub] = useState(student.github || '');
  const [editLinkedin, setEditLinkedin] = useState(student.linkedin || '');

  // Add Skill state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');
  const [newSkillScore, setNewSkillScore] = useState(75);

  // Add Project state
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjLink, setNewProjLink] = useState('');

  // Add Certification state
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertYear, setNewCertYear] = useState('2026');

  // Resume File Upload Ref & Handler
  const resumeInputRef = useRef(null);

  const handleResumeFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeFormatted = file.size > 1024 * 1024
      ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      : Math.round(file.size / 1024) + ' KB';

    updateStudentResume({
      fileName: file.name,
      fileSize: sizeFormatted
    });
  };

  // Handle Edit Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateStudentProfile({
      name: editName,
      course: editCourse,
      semester: parseInt(editSem, 10) || 1,
      college: editCollege,
      cgpa: parseFloat(editCgpa) || 8.0,
      phone: editPhone,
      location: editLocation,
      summary: editSummary,
      github: editGithub,
      linkedin: editLinkedin
    });
    setShowEditProfileModal(false);
  };

  // Handle Add Skill Save
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addSkill({
      name: newSkillName.trim(),
      level: newSkillLevel,
      score: parseInt(newSkillScore, 10) || 70,
      verified: false,
      category: "Technical"
    });

    setNewSkillName('');
    setShowAddSkillModal(false);
  };

  // Handle Add Project Save
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;

    addStudentProject({
      title: newProjTitle.trim(),
      description: newProjDesc.trim() || "Independent software development project demonstrating engineering capabilities.",
      tech: newProjTech.split(',').map(t => t.trim()),
      link: newProjLink.trim() || "https://github.com"
    });

    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjTech('');
    setNewProjLink('');
    setShowAddProjectModal(false);
  };

  // Handle Add Certification Save
  const handleAddCertification = (e) => {
    e.preventDefault();
    if (!newCertTitle.trim()) return;

    addStudentCertification({
      title: newCertTitle.trim(),
      issuer: newCertIssuer.trim() || "Authorized Certification Body",
      year: newCertYear.trim() || "2026"
    });

    setNewCertTitle('');
    setNewCertIssuer('');
    setShowAddCertModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.2s ease-out' }}>
      {/* Student Banner Card */}
      <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '16px',
              backgroundColor: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 800,
              border: '2px solid #bae6fd',
              flexShrink: 0
            }}>
              {student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || "ST"}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
                  {student.name}
                </h2>
                <span className="badge badge-blue">{student.rollNo || "STUDENT"}</span>
              </div>

              <div style={{ fontSize: '0.9rem', color: '#0284c7', fontWeight: 600, marginTop: '0.15rem' }}>
                {student.course} • Semester {student.semester}
              </div>

              <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
                {student.college}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.65rem', flexWrap: 'wrap', fontSize: '0.78rem', color: '#475569' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Mail size={13} /> {student.email}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Phone size={13} /> {student.phone}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={13} /> {student.location}
                </span>
              </div>
            </div>
          </div>

          {/* Social Links, CGPA & Edit Profile Button */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              display: 'inline-block',
              marginBottom: '0.65rem'
            }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Cumulative GPA</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                {student.cgpa} / 10.0
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
              <button
                onClick={() => setShowEditProfileModal(true)}
                className="btn btn-sm btn-student"
                style={{ fontSize: '0.75rem' }}
              >
                <Edit size={13} /> Edit Profile Data
              </button>

              {student.github && (
                <a
                  href={student.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline"
                  style={{ fontSize: '0.75rem' }}
                >
                  <Globe size={13} /> GitHub
                </a>
              )}
              {student.linkedin && (
                <a
                  href={student.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline"
                  style={{ fontSize: '0.75rem' }}
                >
                  <ExternalLink size={13} /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        {student.summary && (
          <div style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid #f1f5f9',
            fontSize: '0.85rem',
            color: '#475569',
            lineHeight: 1.5
          }}>
            <strong>Career Bio: </strong>{student.summary}
          </div>
        )}
      </div>

      {/* Official Student Resume (PDF) Card */}
      <div className="clean-card" style={{ backgroundColor: '#ffffff' }}>
        <div className="clean-card-header">
          <span className="clean-card-title">
            <FileText size={18} color="#0284c7" /> Official Student Resume (PDF Document)
          </span>
          <span className="badge badge-green">Placement Active</span>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '1.1rem 1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.9rem',
              border: '1px solid #fecaca',
              flexShrink: 0
            }}>
              PDF
            </div>
            <div>
              <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0f172a' }}>
                {student.resumeFileName || "Custom_Student_Resume.pdf"}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                {student.resumeFileSize ? `Size: ${student.resumeFileSize} • ` : ''}
                Updated: {student.resumeLastUpdated || "Recent"} • <span style={{ color: '#059669', fontWeight: 600 }}>Active on Portal</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <input
              type="file"
              ref={resumeInputRef}
              onChange={handleResumeFileSelect}
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
            />
            <button
              onClick={() => resumeInputRef.current?.click()}
              className="btn btn-sm btn-outline"
              style={{ fontSize: '0.78rem' }}
            >
              <UploadCloud size={14} /> Upload / Update PDF Resume
            </button>
            {onNavigateToResume && (
              <button
                onClick={onNavigateToResume}
                className="btn btn-sm btn-student"
                style={{ fontSize: '0.78rem' }}
              >
                <Sparkles size={14} /> AI Skill Extraction Engine →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section with Add & Delete */}
      <div className="clean-card">
        <div className="clean-card-header">
          <span className="clean-card-title">
            <Code size={18} color="#0284c7" /> Technical Skills & Competencies ({student.technicalSkills.length})
          </span>
          <button
            onClick={() => setShowAddSkillModal(true)}
            className="btn btn-sm btn-student"
          >
            <Plus size={14} /> Add Custom Skill
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
          {student.technicalSkills.map((skill, idx) => (
            <div key={idx} style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{skill.name}</span>
                  {skill.verified && <CheckCircle2 size={13} color="#16a34a" title="Verified by Assessment" />}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  {skill.category || "Tech"} • Level: {skill.level}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`badge ${skill.score >= 80 ? 'badge-green' : 'badge-blue'}`}>
                  {skill.score}%
                </span>
                <button
                  onClick={() => deleteSkill(skill.name)}
                  title="Remove skill"
                  style={{ color: '#94a3b8', padding: '0.2rem', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects & Certifications Grid */}
      <div className="grid-2">
        {/* Projects */}
        <div className="clean-card">
          <div className="clean-card-header">
            <span className="clean-card-title">
              <FolderGit2 size={18} color="#0284c7" /> Academic & Personal Projects
            </span>
            <button onClick={() => setShowAddProjectModal(true)} className="btn btn-sm btn-student">
              <Plus size={14} /> Add Project
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {student.projects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                Abhi tak koi project add nahi kiya hai. Upar diye gaye "+ Add Project" par click karein.
              </div>
            ) : (
              student.projects.map(proj => (
                <div key={proj.id} style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                      {proj.title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{proj.date}</span>
                      <button
                        onClick={() => deleteStudentProject(proj.id)}
                        title="Delete project"
                        style={{ color: '#94a3b8', cursor: 'pointer' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0.4rem 0 0.6rem', lineHeight: 1.4 }}>
                    {proj.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Certifications */}
        <div className="clean-card">
          <div className="clean-card-header">
            <span className="clean-card-title">
              <Award size={18} color="#0284c7" /> Industry Certifications
            </span>
            <button onClick={() => setShowAddCertModal(true)} className="btn btn-sm btn-student">
              <Plus size={14} /> Add Certificate
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {student.certifications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                Koi certification add nahi hai. "+ Add Certificate" par click karke add karein.
              </div>
            ) : (
              student.certifications.map(cert => (
                <div key={cert.id} style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '0.85rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                      {cert.title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{cert.year}</span>
                      <button
                        onClick={() => deleteStudentCertification(cert.id)}
                        title="Delete certification"
                        style={{ color: '#94a3b8', cursor: 'pointer' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600, marginTop: '0.2rem' }}>
                    {cert.issuer}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                    Credential ID: {cert.credentialId}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: EDIT PROFILE */}
      {/* ========================================================= */}
      {showEditProfileModal && (
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
          <div className="clean-card" style={{ maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto', animation: 'fadeIn 0.2s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                Edit Student Profile Data
              </h3>
              <button onClick={() => setShowEditProfileModal(false)} style={{ color: '#94a3b8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    CGPA *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editCgpa}
                    onChange={(e) => setEditCgpa(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Course / Degree *
                  </label>
                  <input
                    type="text"
                    required
                    value={editCourse}
                    onChange={(e) => setEditCourse(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Current Semester *
                  </label>
                  <select value={editSem} onChange={(e) => setEditSem(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                  College / University *
                </label>
                <input
                  type="text"
                  required
                  value={editCollege}
                  onChange={(e) => setEditCollege(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                  Professional Bio / Summary
                </label>
                <textarea
                  rows={3}
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  placeholder="Describe your technical background and career aspirations..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={editGithub}
                    onChange={(e) => setEditGithub(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={editLinkedin}
                    onChange={(e) => setEditLinkedin(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-student">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD SKILL */}
      {/* ========================================================= */}
      {showAddSkillModal && (
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
          <div className="clean-card" style={{ maxWidth: '440px', width: '100%', animation: 'fadeIn 0.2s ease-out' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
              Add Technical Skill
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Manually append a technology to your digital career profile.
            </p>

            <form onSubmit={handleAddSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Django, Docker, React, MongoDB"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Proficiency Level
                </label>
                <select value={newSkillLevel} onChange={(e) => setNewSkillLevel(e.target.value)}>
                  <option value="Basic">Basic (Beginner)</option>
                  <option value="Intermediate">Intermediate (Hands-on Projects)</option>
                  <option value="Advanced">Advanced (Production Experience)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Proficiency Score Percentage ({newSkillScore}%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={newSkillScore}
                  onChange={(e) => setNewSkillScore(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddSkillModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-student">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ADD PROJECT */}
      {/* ========================================================= */}
      {showAddProjectModal && (
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
              Add Project to Portfolio
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Demonstrate hands-on coding ability to recruiting companies.
            </p>

            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Content Generator, E-Commerce Store"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Technologies Used (comma separated)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React, Node.js, Express, MongoDB"
                  value={newProjTech}
                  onChange={(e) => setNewProjTech(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  GitHub / Live Demo Link
                </label>
                <input
                  type="text"
                  placeholder="https://github.com/my-username/project"
                  value={newProjLink}
                  onChange={(e) => setNewProjLink(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Project Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe the problem solved, core features, and architectural design..."
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-student">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: ADD CERTIFICATION */}
      {/* ========================================================= */}
      {showAddCertModal && (
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
          <div className="clean-card" style={{ maxWidth: '440px', width: '100%', animation: 'fadeIn 0.2s ease-out' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
              Add Certification
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Add verified credentials from Coursera, AWS, Infosys, etc.
            </p>

            <form onSubmit={handleAddCertification} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Certificate Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                  value={newCertTitle}
                  onChange={(e) => setNewCertTitle(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Issuing Authority *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amazon Web Services, Coursera, Meta"
                  value={newCertIssuer}
                  onChange={(e) => setNewCertIssuer(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Year of Completion
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2026"
                  value={newCertYear}
                  onChange={(e) => setNewCertYear(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddCertModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-student">
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
