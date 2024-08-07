import { Request, Response } from 'express';
import User from '../src/models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ username, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  if (req.user) {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id.toString(),
        username: user.username,
        email: user.email
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};