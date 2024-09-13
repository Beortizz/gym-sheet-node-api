import jwt, {Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
export const SECRET_KEY: Secret = process.env.JWT_SECRET ?? '';

export interface CustomRequest extends Request {
  token: string | JwtPayload; 
}
export const authenticateToken = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    (request as CustomRequest).token = decodedToken;

    next();
};
