import express from 'express';
import { db } from '../db/index.js';

const router = express.Router();

// Get college overview & metrics
router.get('/overview', (req, res) => {
  const college = db.getCollege();
  res.json({ success: true, college });
});

// Schedule placement drive
router.post('/drives', (req, res) => {
  const newDrive = db.addPlacementDrive("col-101", req.body);
  res.json({ success: true, drive: newDrive });
});

// Submit collaboration proposal to company
router.post('/collaboration', (req, res) => {
  const { partnerCompany, skillName, format, duration, context } = req.body;
  
  // Create institutional notification
  const notif = {
    id: `notif-${Date.now()}`,
    recipientRole: 'company',
    recipientId: 'comp-101',
    title: `Industry Collaboration Proposal from Apex Institute`,
    message: `Apex Institute requested a ${duration} '${format}' for ${skillName}.`,
    timestamp: 'Just now',
    isRead: false,
    type: 'collaboration'
  };
  db.data.notifications.unshift(notif);
  db.save();

  res.json({
    success: true,
    message: `Collaboration proposal transmitted to ${partnerCompany}`,
    proposal: { partnerCompany, skillName, format, duration, context, status: "Submitted" }
  });
});

export default router;
