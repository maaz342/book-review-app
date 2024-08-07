// src/controllers/userController.ts
import { Request, Response } from 'express';
import { User, IUser } from '../models/User';
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
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
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
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};



export const getProfile = async (req: Request, res: Response) => {

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await User.findById(req.user.id).select('-password'); 
    if (user) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser.id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};