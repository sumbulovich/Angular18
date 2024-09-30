import { TokenExpiredError, verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('No token');
    // Decode token and store it for next middleware
    res.locals.decodedToken = verify(token, process.env['JTW_SECRET_KEY']!) as Record<string, any>;
    next();
  } catch (err) {
    const isExpired = err instanceof TokenExpiredError;
    res.status(401).send({ message: isExpired ? 'Token expired' : 'Auth failed' });
  }
};

export async function checkAdmin(req: Request, res: Response, next: NextFunction) {
  const permission = res.locals.decodedToken.permission;
  if (permission === 'admin') next();
  else res.status(403).send({ message: 'Unauthorized role' });
};

