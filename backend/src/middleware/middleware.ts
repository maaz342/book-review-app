import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token);

      // Check if JWT_SECRET is defined
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error('JWT_SECRET not defined');
        return res.status(500).json({ message: 'Server error' });
      }

      // Verify the token
      const decoded = jwt.verify(token, secret) as { id: string };
      console.log('Decoded token:', decoded);

      // Find the user associated with the token
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        console.error('User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      // Attach user to the request object
      req.user = user;
      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.error('No token found in request headers');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
