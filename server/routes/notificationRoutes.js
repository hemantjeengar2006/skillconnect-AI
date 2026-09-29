import express from 'express';
import { db } from '../db/index.js';

const router = express.Router();

// Get notifications by role
router.get('/:role', (req, res) => {
  const { role } = req.params;
  const list = db.getNotifications(role);
  res.json({ success: true, notifications: list, unreadCount: list.filter(n => !n.isRead).length });
});

// Mark notification as read
router.patch('/:id/read', (req, res) => {
  const { id } = req.params;
  const updated = db.markNotificationRead(id);
  res.json({ success: true, notification: updated });
});

export default router;
