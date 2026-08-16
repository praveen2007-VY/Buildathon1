import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const requestTracker = new Map<string, RateLimitRecord>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 30; // Max 30 AI chat completions per minute per user/IP

export const aiRateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
  const authHeader = req.headers.authorization;
  const identifier = authHeader ? authHeader.slice(-16) : ip;

  const now = Date.now();
  const record = requestTracker.get(identifier);

  if (!record || now > record.resetTime) {
    requestTracker.set(identifier, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    res.status(429).json({
      success: false,
      error: 'Too many AI requests. Please wait a moment before sending another message.',
      retryAfterSeconds: retryAfter,
    });
    return;
  }

  record.count += 1;
  next();
};
