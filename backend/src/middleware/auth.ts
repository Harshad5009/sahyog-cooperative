import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/jwtService';
import { User } from '../models/User';

export interface AuthRequest extends Request {
  user?: { id: string; role: string; name: string };
}

export const authenticate = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      _res.status(401).json({ success: false, message: 'No authentication token provided' });
      return;
    }
    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub).select('name role isActive');
    if (!user || !user.isActive) {
      _res.status(401).json({ success: false, message: 'User account not found or deactivated' });
      return;
    }
    req.user = { id: payload.sub, role: payload.role, name: user.name };
    next();
  } catch (err) {
    _res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const authorize = (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Not authenticated' });
    return;
  }
  if (!roles.includes(req.user.role)) {
    res.status(403).json({ success: false, message: 'Insufficient permissions for this action' });
    return;
  }
  next();
};
