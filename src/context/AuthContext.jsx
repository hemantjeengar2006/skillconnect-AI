import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialStudentData,
  initialCollegeData,
  initialCompanyData,
  initialInternships,
  careerRoleRequirements,
  roadmapTemplates,
  assessmentModules
} from '../data/initialData';

const AuthContext = createContext();

const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {
  // Navigation / Auth state: 'gateway' | 'login-student' | 'login-college' | 'login-company' | 'dashboard'
  const [currentPage, setCurrentPage] = useState('gateway');
  const [currentRole, setCurrentRole] = useState(null); // 'student' | 'college' | 'company' | null
  
  // Persisted state from localStorage
  const [student, setStudent] = useState(() => loadFromStorage('skillbridge_student', initialStudentData));
  const [college, setCollege] = useState(() => loadFromStorage('skillbridge_college', initialCollegeData));
  const [company, setCompany] = useState(() => loadFromStorage('skillbridge_company', initialCompanyData));
  const [internships, setInternships] = useState(() => loadFromStorage('skillbridge_internships', initialInternships));
  
  // Sync to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_student', JSON.stringify(student));
    } catch (e) {}
  }, [student]);

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_college', JSON.stringify(college));
    } catch (e) {}
  }, [college]);

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_company', JSON.stringify(company));
    } catch (e) {}
  }, [company]);

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_internships', JSON.stringify(internships));
    } catch (e) {}
  }, [internships]);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Switch to dedicated login page
  const navigateToLogin = (role) => {
    if (role === 'student') setCurrentPage('login-student');
    else if (role === 'college') setCurrentPage('login-college');
    else if (role === 'company') setCurrentPage('login-company');
    else setCurrentPage('gateway');
  };

  // Perform login for role
  const loginAs = (role) => {
    setCurrentRole(role);
    setCurrentPage('dashboard');
    showToast(`Signed in successfully as ${role === 'student' ? student.name : role === 'college' ? college.institutionName : company.name}`);
  };

  // Logout back to gateway (clears session, user must sign out to change role)
  const logout = () => {
    setCurrentRole(null);
    setCurrentPage('gateway');
    showToast("Signed out successfully", "info");
  };

  // ==========================================
  // CUSTOM USER REGISTRATION (Self Data Input)
  // ==========================================
  const registerStudent = (customData) => {
    const newStudent = {
      ...initialStudentData,
      id: `std-${Date.now()}`,
      name: customData.name,
      email: customData.email,
      phone: customData.phone || "+91 98765 00000",
      course: customData.course,
      semester: parseInt(customData.semester, 10) || 1,
      college: customData.college,
      cgpa: parseFloat(customData.cgpa) || 8.0,
      targetCareer: customData.targetCareer || "Python Developer",
      summary: customData.summary || `Dedicated ${customData.course} student aiming for technical internships in ${customData.targetCareer || "Software Development"}.`,
      technicalSkills: customData.initialSkills ? customData.initialSkills.split(',').map(s => ({
        name: s.trim(),
        level: "Intermediate",
        score: 70,
        verified: false,
        category: "Technical"
      })) : initialStudentData.technicalSkills,
      projects: [],
      certifications: [],
      applications: [],
      feedbackReceived: []
    };

    setStudent(newStudent);
    setCurrentRole('student');
    setCurrentPage('dashboard');
    showToast(`Welcome ${customData.name}! Your student profile has been created.`);
  };

  const registerCollege = (customData) => {
    const newCollege = {
      ...initialCollegeData,
      institutionName: customData.institutionName,
      code: customData.code || `INST-${Date.now().toString().slice(-4)}`,
      deanTPO: customData.deanTPO,
      tpoEmail: customData.tpoEmail,
      location: customData.location || "Main Campus",
      monitoredStudentsSample: [
        {
          id: `s-${Date.now()}`,
          name: customData.deanTPO + " (Lead Admin)",
          dept: "Administration",
          sem: 1,
          cgpa: 9.5,
          topSkill: "TPO Lead",
          readiness: "Ready (100%)",
          status: "Verified Administrator"
        }
      ],
      placementDrives: []
    };

    setCollege(newCollege);
    setCurrentRole('college');
    setCurrentPage('dashboard');
    showToast(`Institution ${customData.institutionName} registered successfully!`);
  };

  const registerCompany = (customData) => {
    const newCompany = {
      ...initialCompanyData,
      id: `comp-${Date.now()}`,
      name: customData.name,
      domain: customData.domain || "Technology & Software",
      contactPerson: customData.contactPerson,
      email: customData.email,
      headquarters: customData.headquarters || "India",
      activeInternshipCount: 0,
      companyApplications: []
    };

    setCompany(newCompany);
    setCurrentRole('company');
    setCurrentPage('dashboard');
    showToast(`Company profile created for ${customData.name}!`);
  };

  // ==========================================
  // STUDENT DATA EDIT & MANAGEMENT
  // ==========================================
  const updateStudentProfile = (updatedFields) => {
    setStudent(prev => ({
      ...prev,
      ...updatedFields
    }));
    showToast("Profile details updated successfully!");
  };

  const updateTargetCareer = (careerTitle) => {
    setStudent(prev => ({ ...prev, targetCareer: careerTitle }));
    showToast(`Target career changed to ${careerTitle}`);
  };

  const addSkill = (newSkill) => {
    setStudent(prev => {
      const exists = prev.technicalSkills.some(s => s.name.toLowerCase() === newSkill.name.toLowerCase());
      if (exists) {
        showToast(`${newSkill.name} is already in your skills profile`, "info");
        return prev;
      }
      showToast(`Added ${newSkill.name} to your profile!`);
      return {
        ...prev,
        technicalSkills: [...prev.technicalSkills, newSkill]
      };
    });
  };

  const deleteSkill = (skillName) => {
    setStudent(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase())
    }));
    showToast(`Removed ${skillName} from skills profile`, "info");
  };

  const updateSkill = (skillName, newLevel, newScore) => {
    setStudent(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.map(s => 
        s.name.toLowerCase() === skillName.toLowerCase()
          ? { ...s, level: newLevel, score: newScore, verified: true }
          : s
      )
    }));
  };

  const addStudentProject = (newProj) => {
    const entry = {
      id: `p-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      ...newProj
    };
    setStudent(prev => ({
      ...prev,
      projects: [entry, ...prev.projects]
    }));
    showToast("Project added to your portfolio!");
  };

  const deleteStudentProject = (projectId) => {
    setStudent(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
    showToast("Project removed from profile", "info");
  };

  const addStudentCertification = (newCert) => {
    const entry = {
      id: `c-${Date.now()}`,
      credentialId: `CERT-${Date.now().toString().slice(-6)}`,
      ...newCert
    };
    setStudent(prev => ({
      ...prev,
      certifications: [entry, ...prev.certifications]
    }));
    showToast("Certification added to your record!");
  };

  const deleteStudentCertification = (certId) => {
    setStudent(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== certId)
    }));
    showToast("Certification removed", "info");
  };

  const applyToInternship = (internshipId) => {
    const targetInternship = internships.find(i => i.id === internshipId);
    if (!targetInternship) return;

    // Check if already applied
    const alreadyApplied = student.applications.some(a => a.internshipId === internshipId);
    if (alreadyApplied) {
      showToast(`You have already applied for ${targetInternship.role} at ${targetInternship.company}`, "info");
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      internshipId: targetInternship.id,
      company: targetInternship.company,
      role: targetInternship.role,
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Applied",
      stageIndex: 0,
      matchScore: 82,
      stipend: targetInternship.stipend,
      location: targetInternship.location,
      type: "Internship"
    };

    setStudent(prev => ({
      ...prev,
      applications: [newApp, ...prev.applications]
    }));

    // Also push to company candidates list
    setCompany(prev => ({
      ...prev,
      companyApplications: [
        {
          id: newApp.id,
          candidateId: student.id,
          name: student.name,
          course: `${student.course} (Sem ${student.semester})`,
          college: student.college,
          cgpa: student.cgpa,
          role: targetInternship.role,
          appliedDate: newApp.appliedDate,
          matchScore: 82,
          matchedSkills: student.technicalSkills.map(s => s.name),
          missingSkills: targetInternship.requiredSkills.filter(req => !student.technicalSkills.some(s => s.name.toLowerCase() === req.toLowerCase())),
          assessmentScore: "85% (Verified)",
          status: "Applied",
          hasFeedback: false
        },
        ...prev.companyApplications
      ]
    }));

    showToast(`Application submitted successfully to ${targetInternship.company}!`);
  };

  const parseAndAddResumeSkills = (newSkillsList, fileName = "Uploaded_Resume.pdf", fileSize = "PDF Document") => {
    setStudent(prev => {
      const existingNames = new Set(prev.technicalSkills.map(s => s.name.toLowerCase()));
      const added = [];

      newSkillsList.forEach(item => {
        if (!existingNames.has(item.name.toLowerCase())) {
          added.push(item);
        }
      });

      return {
        ...prev,
        resumeFileName: fileName,
        resumeFileSize: fileSize,
        resumeLastUpdated: new Date().toISOString().split('T')[0],
        technicalSkills: [...prev.technicalSkills, ...added]
      };
    });
    showToast(`AI successfully extracted & mapped ${newSkillsList.length} skills into your profile!`);
  };

  const updateStudentResume = ({ fileName, fileSize, extractedSkills = [] }) => {
    setStudent(prev => {
      const existingNames = new Set(prev.technicalSkills.map(s => s.name.toLowerCase()));
      const added = [];

      extractedSkills.forEach(item => {
        if (!existingNames.has(item.name.toLowerCase())) {
          added.push(item);
        }
      });

      return {
        ...prev,
        resumeFileName: fileName || prev.resumeFileName,
        resumeFileSize: fileSize || prev.resumeFileSize || "PDF Document",
        resumeLastUpdated: new Date().toISOString().split('T')[0],
        technicalSkills: [...prev.technicalSkills, ...added]
      };
    });
    showToast(`PDF Resume "${fileName}" updated in profile!`);
  };

  const submitAssessmentScore = (skillName, scorePercentage) => {
    const level = scorePercentage >= 80 ? "Advanced" : scorePercentage >= 60 ? "Intermediate" : "Basic";
    
    setStudent(prev => {
      const hasSkill = prev.technicalSkills.some(s => s.name.toLowerCase() === skillName.toLowerCase());
      let updatedSkills;
      if (hasSkill) {
        updatedSkills = prev.technicalSkills.map(s => 
          s.name.toLowerCase() === skillName.toLowerCase()
            ? { ...s, score: scorePercentage, level, verified: true }
            : s
        );
      } else {
        updatedSkills = [...prev.technicalSkills, { name: skillName, level, score: scorePercentage, verified: true, category: "Verified Assessment" }];
      }

      return {
        ...prev,
        technicalSkills: updatedSkills
      };
    });

    showToast(`Assessment recorded! ${skillName} updated to ${scorePercentage}% (${level})`);
  };

  // ==========================================
  // COMPANY DATA MANAGEMENT
  // ==========================================
  const updateCompanyApplicantStatus = (appId, newStatus) => {
    const stageMap = {
      "Applied": 0,
      "Under Review": 1,
      "Shortlisted": 2,
      "Assessment": 3,
      "Interview": 4,
      "Selected": 5,
      "Rejected": -1
    };

    setCompany(prev => ({
      ...prev,
      companyApplications: prev.companyApplications.map(app => 
        app.id === appId ? { ...app, status: newStatus } : app
      )
    }));

    // If matches student's application, update student state too
    setStudent(prev => ({
      ...prev,
      applications: prev.applications.map(app => 
        app.id === appId ? { ...app, status: newStatus, stageIndex: stageMap[newStatus] ?? 1 } : app
      )
    }));

    showToast(`Candidate status updated to: ${newStatus}`);
  };

  const submitInternshipFeedback = (appId, feedbackData) => {
    setCompany(prev => ({
      ...prev,
      companyApplications: prev.companyApplications.map(app => 
        app.id === appId ? { ...app, hasFeedback: true } : app
      )
    }));

    setStudent(prev => ({
      ...prev,
      feedbackReceived: [
        {
          company: company.name,
          reviewer: feedbackData.reviewer || "Senior Engineering Mentor",
          date: new Date().toISOString().split('T')[0],
          technicalSkills: feedbackData.technicalSkills,
          problemSolving: feedbackData.problemSolving,
          communication: feedbackData.communication,
          teamwork: feedbackData.teamwork,
          professionalism: feedbackData.professionalism,
          comments: feedbackData.comments
        },
        ...prev.feedbackReceived
      ]
    }));

    showToast("Evaluation & structured feedback saved to student's record!");
  };

  const postNewInternship = (internshipData) => {
    const newEntry = {
      id: `int-${Date.now()}`,
      company: company.name,
      companyLogo: "🏢",
      postedDate: new Date().toISOString().split('T')[0],
      ...internshipData
    };

    setInternships(prev => [newEntry, ...prev]);
    setCompany(prev => ({
      ...prev,
      activeInternshipCount: prev.activeInternshipCount + 1
    }));

    showToast("New internship opening published successfully!");
  };

  // ==========================================
  // COLLEGE DATA MANAGEMENT
  // ==========================================
  const addPlacementDrive = (driveData) => {
    const newDrive = {
      id: `drv-${Date.now()}`,
      status: "Confirmed",
      registeredStudents: 0,
      ...driveData
    };

    setCollege(prev => ({
      ...prev,
      placementDrives: [newDrive, ...prev.placementDrives],
      activePlacementDrives: prev.activePlacementDrives + 1
    }));

    showToast("New recruitment drive scheduled!");
  };

  const addCohortStudent = (studentData) => {
    const newEntry = {
      id: `s-${Date.now()}`,
      ...studentData
    };

    setCollege(prev => ({
      ...prev,
      monitoredStudentsSample: [newEntry, ...prev.monitoredStudentsSample],
      totalStudentsMonitored: prev.totalStudentsMonitored + 1
    }));

    showToast(`Added student ${studentData.name} to monitored cohort!`);
  };

  // Reset to initial defaults if needed
  const resetAllDataToDefault = () => {
    localStorage.removeItem('skillbridge_student');
    localStorage.removeItem('skillbridge_college');
    localStorage.removeItem('skillbridge_company');
    localStorage.removeItem('skillbridge_internships');
    setStudent(initialStudentData);
    setCollege(initialCollegeData);
    setCompany(initialCompanyData);
    setInternships(initialInternships);
    showToast("Reset all portal data to initial demo templates!", "info");
  };

  return (
    <AuthContext.Provider value={{
      currentPage,
      setCurrentPage,
      currentRole,
      setCurrentRole,
      student,
      college,
      company,
      internships,
      toast,
      showToast,
      navigateToLogin,
      loginAs,
      logout,
      registerStudent,
      registerCollege,
      registerCompany,
      updateStudentProfile,
      updateTargetCareer,
      addSkill,
      deleteSkill,
      updateSkill,
      addStudentProject,
      deleteStudentProject,
      addStudentCertification,
      deleteStudentCertification,
      applyToInternship,
      parseAndAddResumeSkills,
      updateStudentResume,
      submitAssessmentScore,
      updateCompanyApplicantStatus,
      submitInternshipFeedback,
      postNewInternship,
      addPlacementDrive,
      addCohortStudent,
      resetAllDataToDefault,
      careerRoleRequirements,
      roadmapTemplates,
      assessmentModules
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
