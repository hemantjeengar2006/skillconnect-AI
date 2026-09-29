import express from 'express';
import { db } from '../db/index.js';

const router = express.Router();

// Get security settings & profile visibility
router.get('/visibility/:studentId', (req, res) => {
  const { studentId } = req.params;
  const student = db.getStudent(studentId);
  res.json({
    success: true,
    profileVisibility: student.profileVisibility || "Verified Companies",
    options: ["Only Me", "College", "Verified Companies", "Public Portfolio"]
  });
});

// Update profile visibility
router.put('/visibility', (req, res) => {
  const { studentId, visibility } = req.body;
  const updated = db.updatePrivacyVisibility(studentId || "std-101", visibility);
  res.json({ success: true, profileVisibility: updated?.profileVisibility, message: `Privacy updated to ${visibility}` });
});

// Get Fraud / Fake Profile Flags (Point 24)
router.get('/fraud-flags', (req, res) => {
  const flags = db.getFraudFlags();
  res.json({ success: true, fraudDetections: flags });
});

export default router;
