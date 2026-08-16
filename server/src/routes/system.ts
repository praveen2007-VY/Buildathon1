import { Router, Response } from 'express';
import { db } from '../db.js';
import { authenticate, optionalAuth, AuthRequest, requireRole } from '../middleware/auth.js';
import { SystemMonitoringLog } from '../types.js';

export const systemRouter = Router();

// GET system logs and health status
systemRouter.get('/monitoring', optionalAuth, (req, res: Response): void => {
  const logs = db.get('systemLogs');
  const health = db.get('systemHealth');
  res.json({ logs, health });
});

// TRIGGER system sync
systemRouter.post('/sync', authenticate, requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const newLog: SystemMonitoringLog = {
    id: `log_${Date.now()}`,
    title: 'Manual Institution Data Sync Triggered',
    time: 'Just now',
    source: 'Admin Portal',
    type: 'sync',
    userRole: 'Admin',
    action: 'System Sync',
    module: 'Institutional Sync',
    status: 'Success'
  };

  db.insert('systemLogs', newLog);

  res.json({
    success: true,
    message: 'Institutional databases and LMS services successfully synchronized.',
    log: newLog
  });
});

// ADD system log
systemRouter.post('/logs', authenticate, (req: AuthRequest, res: Response): void => {
  const { title, type = 'sync', action = 'General', module = 'System', status = 'Success' } = req.body;

  const newLog: SystemMonitoringLog = {
    id: `log_${Date.now()}`,
    title: title || 'System Event',
    time: 'Just now',
    source: req.user?.role || 'User',
    type,
    userRole: req.user?.role || 'User',
    action,
    module,
    status
  };

  db.insert('systemLogs', newLog);
  res.status(201).json({ log: newLog });
});
