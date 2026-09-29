import express from 'express';
import { db } from '../db/index.js';

const router = express.Router();

// Get current session user by role
router.get('/session/:role', (req, res) => {
  const { role } = req.params;
  try {
    if (role === 'student') {
      const student = db.getStudent();
      return res.json({ success: true, role: 'student', user: student });
    } else if (role === 'college') {
      const college = db.getCollege();
      return res.json({ success: true, role: 'college', user: college });
    } else if (role === 'company') {
      const company = db.getCompany();
      return res.json({ success: true, role: 'company', user: company });
    }
    return res.status(400).json({ success: false, message: 'Invalid role specified' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// User login endpoint with token simulation
router.post('/login', (req, res) => {
  const { role, email } = req.body;
  const token = `jwt_token_${role}_${Date.now()}`;
  return res.json({
    success: true,
    token,
    role,
    message: `Authenticated successfully as ${role}`
  });
});

export default router;
