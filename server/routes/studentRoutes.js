import express from 'express';
import { db } from '../db/index.js';

const router = express.Router();

// Get student profile
router.get('/profile', (req, res) => {
  const student = db.getStudent();
  res.json({ success: true, student });
});

// Update student profile
router.put('/profile', (req, res) => {
  const updated = db.updateStudent("std-101", req.body);
  res.json({ success: true, student: updated });
});

// Add skill to student
router.post('/skills', (req, res) => {
  const { name, level, score, verified, category } = req.body;
  const updated = db.addStudentSkill("std-101", {
    name,
    level: level || "Intermediate",
    score: score || 70,
    verified: verified || false,
    category: category || "Technical"
  });
  res.json({ success: true, student: updated });
});

// Submit Mock Interview / Assessment Score
router.post('/assessment', (req, res) => {
  const { skillName, score } = req.body;
  const student = db.getStudent();
  const existing = student.technicalSkills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
  
  if (existing) {
    existing.score = score;
    existing.verified = true;
    existing.level = score >= 80 ? "Advanced" : score >= 60 ? "Intermediate" : "Basic";
  } else {
    student.technicalSkills.push({
      name: skillName,
      level: score >= 80 ? "Advanced" : "Intermediate",
      score,
      verified: true,
      category: "Assessment Verified"
    });
  }

  db.save();
  res.json({ success: true, message: `Assessment recorded for ${skillName}`, student });
});

export default router;
