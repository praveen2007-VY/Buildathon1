import { Router, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../db.js';
import { authenticate, AuthRequest, JWT_SECRET } from '../middleware/auth.js';
import { User, UserRole } from '../types.js';

export const authRouter = Router();

// Login
authRouter.post('/login', (req, res: Response): void => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const users = db.get('users');
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

  if (!user) {
    res.status(401).json({ error: 'Invalid email address or account not found.' });
    return;
  }

  // Check password strictly
  let passwordMatches = false;
  if (user.password) {
    passwordMatches = bcrypt.compareSync(password, user.password);
  }

  if (!passwordMatches) {
    res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
    return;
  }

  // If role is specified and differs, optionally update or warn
  const tokenPayload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });

  // Exclude password from response
  const { password: _, ...userSafe } = user;

  // Log system activity
  db.insert('systemLogs', {
    id: `log_${Date.now()}`,
    title: `User Logged In: ${user.name}`,
    time: 'Just now',
    source: 'Auth Portal',
    type: 'user',
    userRole: user.role,
    action: 'Login',
    module: 'Authentication',
    status: 'Success'
  });

  res.json({
    token,
    user: userSafe
  });
});

// Register
authRouter.post('/register', (req, res: Response): void => {
  try {
    const { name, email, password, role = 'student' } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required.' });
      return;
    }

    const users = db.get('users');
    const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      res.status(409).json({ error: 'An account with this email address already exists.' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newId = `${role === 'student' ? 'std' : role === 'teacher' ? 'tch' : 'adm'}_${Date.now()}`;
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    const newUser: User = {
      id: newId,
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: role as UserRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      title: role === 'student' ? 'Undergraduate Student' : role === 'teacher' ? 'Faculty Member' : 'System Administrator',
      department: role === 'student' ? 'School of Computing' : 'Applied Sciences',
      studentId: role === 'student' ? `EDU-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      employeeId: role === 'teacher' ? `TCH-${Math.floor(100 + Math.random() * 900)}` : undefined,
      semester: role === 'student' ? 'Fall Semester 2024' : undefined,
      createdAt: new Date().toISOString()
    };

    db.insert('users', newUser);

    // Compute initials safely without crash risks
    const initials = cleanName
      .split(/\s+/)
      .filter(Boolean)
      .map((part: string) => part[0])
      .filter(Boolean)
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'ST';

    // If student, also add to students directory
    if (role === 'student') {
      db.insert('students', {
        id: newId,
        initials,
        name: cleanName,
        studentId: newUser.studentId || `EDU-${Math.floor(1000 + Math.random() * 9000)}`,
        department: newUser.department || 'School of Computing',
        course: 'CS-201',
        attendance: 100,
        performance: 85,
        riskLevel: 'Low Risk',
        status: 'Active',
        primaryIssue: 'None'
      });
    } else if (role === 'teacher') {
      db.insert('teachers', {
        id: newId,
        name: cleanName,
        employeeId: newUser.employeeId || `TCH-${Math.floor(100 + Math.random() * 900)}`,
        email: cleanEmail,
        department: newUser.department || 'Applied Sciences',
        coursesCount: 1,
        studentsCount: 30,
        designation: 'Faculty Instructor',
        status: 'Active'
      });
    }

    // Log activity
    db.insert('systemLogs', {
      id: `log_${Date.now()}`,
      title: `New User Registered: ${cleanName} (${role})`,
      time: 'Just now',
      source: 'Registration Portal',
      type: 'user',
      userRole: role,
      action: 'Register',
      module: 'Authentication',
      status: 'Success'
    });

    const tokenPayload = { id: newUser.id, email: newUser.email, role: newUser.role };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userSafe } = newUser;

    res.status(201).json({
      token,
      user: userSafe
    });
  } catch (err: any) {
    console.error('Registration server error:', err);
    res.status(500).json({ error: err.message || 'Registration server error. Please try again.' });
  }
});

// Get Current User
authRouter.get('/me', authenticate, (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }
  const { password: _, ...userSafe } = req.user;
  res.json({ user: userSafe });
});

// Demo Role Switcher (Disabled for production safety)
authRouter.post('/switch-role', (req, res: Response): void => {
  res.status(400).json({ error: 'Demo role switching is disabled. Please register or sign in with account credentials.' });
});
