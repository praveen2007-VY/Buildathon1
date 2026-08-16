import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { usersRouter } from './routes/users.js';
import { coursesRouter } from './routes/courses.js';
import { classesRouter } from './routes/classes.js';
import { assignmentsRouter } from './routes/assignments.js';
import { attendanceRouter } from './routes/attendance.js';
import { examsRouter } from './routes/exams.js';
import { gradesRouter } from './routes/grades.js';
import { aiRouter } from './routes/ai.js';
import { statsRouter } from './routes/stats.js';
import { systemRouter } from './routes/system.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from workspace root and server/ directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Core Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'EduAI Academic Portal Backend',
    version: '1.0.0'
  });
});

// Mount Routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api', usersRouter); // mounts /api/students, /api/teachers, /api/profile
app.use('/api/courses', coursesRouter);
app.use('/api/classes', classesRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/exams', examsRouter);
app.use('/api/grades', gradesRouter);
app.use('/api/ai', aiRouter);
app.use('/api/stats', statsRouter);
app.use('/api/system', systemRouter);

// 404 Handler
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 EduAI Backend Server running on port ${PORT}`);
  console.log(`📡 Base API URL: http://localhost:${PORT}/api`);
  console.log(`=============================================`);
});

export default app;
