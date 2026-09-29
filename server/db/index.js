import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedDatabase } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

class Database {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
        console.log(`[Database] Loaded persistent storage from ${DB_FILE}`);
      } else {
        this.data = JSON.parse(JSON.stringify(seedDatabase));
        this.save();
        console.log(`[Database] Initialized new database with seed data.`);
      }
    } catch (err) {
      console.error(`[Database] Error initializing database:`, err);
      this.data = JSON.parse(JSON.stringify(seedDatabase));
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error(`[Database] Save failed:`, err);
    }
  }

  // --- Student Operations ---
  getStudent(id = "std-101") {
    return this.data.students.find(s => s.id === id) || this.data.students[0];
  }

  updateStudent(id, updates) {
    const idx = this.data.students.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.data.students[idx] = { ...this.data.students[idx], ...updates };
      this.save();
      return this.data.students[idx];
    }
    return null;
  }

  addStudentSkill(id, newSkill) {
    const student = this.getStudent(id);
    if (student) {
      const exists = student.technicalSkills.some(s => s.name.toLowerCase() === newSkill.name.toLowerCase());
      if (!exists) {
        student.technicalSkills.push(newSkill);
        this.save();
      }
      return student;
    }
    return null;
  }

  // --- College Operations ---
  getCollege(id = "col-101") {
    return this.data.colleges.find(c => c.id === id) || this.data.colleges[0];
  }

  addPlacementDrive(collegeId, drive) {
    const college = this.getCollege(collegeId);
    if (college) {
      const newDrive = { id: `drv-${Date.now()}`, registeredStudents: 0, status: 'Confirmed', ...drive };
      college.placementDrives.unshift(newDrive);
      college.activePlacementDrives += 1;
      this.save();
      return newDrive;
    }
    return null;
  }

  // --- Company Operations ---
  getCompany(id = "comp-101") {
    return this.data.companies.find(c => c.id === id) || this.data.companies[0];
  }

  getInternships() {
    return this.data.internships;
  }

  createInternship(internshipData) {
    const newEntry = {
      id: `int-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      ...internshipData
    };
    this.data.internships.unshift(newEntry);
    this.save();
    return newEntry;
  }

  updateApplicantStatus(appId, newStatus) {
    let updatedApp = null;
    this.data.companies.forEach(comp => {
      comp.companyApplications.forEach(app => {
        if (app.id === appId) {
          app.status = newStatus;
          updatedApp = app;
        }
      });
    });

    // Also update student application
    this.data.students.forEach(std => {
      std.applications.forEach(app => {
        if (app.id === appId) {
          app.status = newStatus;
        }
      });
    });

    this.save();
    return updatedApp;
  }

  // --- Notifications ---
  getNotifications(role, userId) {
    return this.data.notifications.filter(n => 
      n.recipientRole === role || (userId && n.recipientId === userId)
    );
  }

  markNotificationRead(id) {
    const notif = this.data.notifications.find(n => n.id === id);
    if (notif) {
      notif.isRead = true;
      this.save();
    }
    return notif;
  }

  // --- Security & Privacy ---
  updatePrivacyVisibility(studentId, visibility) {
    const student = this.getStudent(studentId);
    if (student) {
      student.profileVisibility = visibility;
      this.save();
      return student;
    }
    return null;
  }

  // --- Fraud Detections ---
  getFraudFlags() {
    return this.data.fraudDetections;
  }
}

export const db = new Database();
