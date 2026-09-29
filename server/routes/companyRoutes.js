import express from 'express';
import { db } from '../db/index.js';

const router = express.Router();

// Get company profile & applicants
router.get('/overview', (req, res) => {
  const company = db.getCompany();
  res.json({ success: true, company });
});

// Get internships
router.get('/internships', (req, res) => {
  const internships = db.getInternships();
  res.json({ success: true, internships });
});

// Post new opening
router.post('/internships', (req, res) => {
  const newPosting = db.createInternship(req.body);
  res.json({ success: true, internship: newPosting });
});

// Update applicant status (Pipeline)
router.patch('/applicants/:appId/status', (req, res) => {
  const { appId } = req.params;
  const { status } = req.body;
  const updated = db.updateApplicantStatus(appId, status);
  res.json({ success: true, applicant: updated });
});

// Submit post-internship / screening feedback
router.post('/feedback', (req, res) => {
  const { candidateId, feedback } = req.body;
  const student = db.getStudent(candidateId || "std-101");
  
  if (student) {
    const feedbackEntry = {
      company: "TechCorp Solutions",
      reviewer: feedback.reviewer || "Senior Engineering Mentor",
      date: new Date().toISOString().split('T')[0],
      ...feedback
    };
    student.feedbackReceived.unshift(feedbackEntry);
    db.save();
    return res.json({ success: true, message: "Feedback saved", student });
  }

  res.status(404).json({ success: false, message: "Candidate not found" });
});

export default router;
