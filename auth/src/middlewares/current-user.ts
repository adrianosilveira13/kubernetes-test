import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type UserPaylod = {
  id: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPaylod;
    }
  }
}

export function currentUser(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.jwt) return next();

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPaylod;
    req.currentUser = payload;
  } catch {}

  next();
}
