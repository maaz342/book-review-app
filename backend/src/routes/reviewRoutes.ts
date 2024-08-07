import { Router } from 'express';
import { addReview, getReviews, updateReview, deleteReview, getReviewById } from '../controllers/reviewController';
import { authMiddleware } from '../middleware/middleware';

const router = Router();

router.post('/', authMiddleware, addReview);
router.get('/', getReviews);
router.get('/:id', getReviewById);
router.put('/:id',authMiddleware, updateReview);
router.delete('/:id',authMiddleware, deleteReview);

export default router;
