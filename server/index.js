import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import collegeRoutes from './routes/collegeRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import securityRoutes from './routes/securityRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'SkillBridge AI - Academia to Industry Career Intelligence Server',
    timestamp: new Date().toISOString(),
    version: '2.0.0-SIH'
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/security', securityRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 SkillBridge AI Backend API running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
