// SkillBridge AI - API Client Service (Connecting Client to Backend Server)

const API_BASE_URL = 'http://localhost:5000/api';

export const apiClient = {
  // Health check
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (err) {
      console.warn('[API Client] Server offline, using local mock state.');
      return { status: 'OFFLINE_FALLBACK' };
    }
  },

  // Student API
  getStudentProfile: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/students/profile`);
      if (res.ok) {
        const data = await res.json();
        return data.student;
      }
    } catch (err) {
      console.warn('[API Client] Fallback to local student.');
    }
    return null;
  },

  updateStudentProfile: async (updates) => {
    try {
      const res = await fetch(`${API_BASE_URL}/students/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const data = await res.json();
        return data.student;
      }
    } catch (err) {
      console.warn('[API Client] Update offline fallback.');
    }
    return null;
  },

  submitAssessment: async (skillName, score) => {
    try {
      const res = await fetch(`${API_BASE_URL}/students/assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillName, score })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('[API Client] Assessment offline fallback.');
    }
    return null;
  },

  // College API
  getCollegeOverview: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/colleges/overview`);
      if (res.ok) {
        const data = await res.json();
        return data.college;
      }
    } catch (err) {
      console.warn('[API Client] Fallback to local college.');
    }
    return null;
  },

  submitCollaboration: async (proposalData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/colleges/collaboration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proposalData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Offline mode simulation' };
    }
  },

  // Company API
  getCompanyOverview: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/companies/overview`);
      if (res.ok) {
        const data = await res.json();
        return data.company;
      }
    } catch (err) {
      console.warn('[API Client] Fallback to local company.');
    }
    return null;
  },

  updateApplicantStatus: async (appId, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/companies/applicants/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: false };
    }
  },

  // Notifications API (Point 18)
  getNotifications: async (role) => {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/${role}`);
      if (res.ok) {
        const data = await res.json();
        return data.notifications;
      }
    } catch (err) {
      return [];
    }
    return [];
  },

  // Security & Privacy (Point 32)
  updateVisibility: async (studentId, visibility) => {
    try {
      const res = await fetch(`${API_BASE_URL}/security/visibility`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, visibility })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Fraud / Fake Profile Flags (Point 24)
  getFraudFlags: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/security/fraud-flags`);
      if (res.ok) {
        const data = await res.json();
        return data.fraudDetections;
      }
    } catch (err) {
      return [];
    }
    return [];
  }
};
