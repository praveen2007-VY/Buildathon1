import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { User, UserRole } from '../types.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'eduai_super_secret_jwt_key_2026';

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: UserRole; email: string };
    const users = db.get('users');
    const user = users.find((u) => u.id === decoded.id || u.email === decoded.email);

    if (!user) {
      res.status(401).json({ error: 'User not found or token invalid.' });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
};

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: UserRole; email: string };
    const users = db.get('users');
    const user = users.find((u) => u.id === decoded.id || u.email === decoded.email);
    if (user) {
      req.user = user;
    }
  } catch {
    // Ignore invalid optional tokens
  }
  next();
};

export const requireRole = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: `Forbidden: requires one of [${roles.join(', ')}] role.` });
      return;
    }

    next();
  };
};
