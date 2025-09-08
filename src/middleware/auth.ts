import { Request, Response, NextFunction } from 'express';
import { JWTAuthService } from '../services/jwtAuth';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies['auth-token'];
  
  if (!token) {
    res.redirect('/login');
    return;
  }

  const payload = JWTAuthService.verifyToken(token);
  if (!payload) {
    res.redirect('/login');
    return;
  }

  // Add user info to request
  req.user = {
    id: payload.userId,
    email: payload.email
  };

  next();
}

export function getCurrentUserId(req: Request): number | null {
  const token = req.cookies['auth-token'];
  
  if (!token) {
    return null;
  }

  const payload = JWTAuthService.verifyToken(token);
  return payload ? payload.userId : null;
}