import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/authController';
import {authMiddleware} from '../middleware/middleware';
import { getReviewsForUser } from '../controllers/reviewController';
const router = express.Router();

router.post('/register',authMiddleware, registerUser);
router.post('/login', loginUser);
router.get('/profile',authMiddleware, getProfile);
router.put('/profile',authMiddleware,updateProfile );

router.get('/profil',authMiddleware, getReviewsForUser);


export default router;