import { Request, Response } from 'express';
import { Review } from '../models/Review';

export const addReview = async (req: Request, res: Response) => {
  const { bookTitle, author, reviewText, rating } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const review = new Review({
      user: req.user.id, 
      bookTitle,
      author,
      reviewText,
      rating,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};


export const getReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bookTitle, author, reviewText, rating } = req.body;

  try {
    const review = await Review.findByIdAndUpdate(
      id,
      { bookTitle, author, reviewText, rating },
      { new: true } // Returns the updated document
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().populate('user', 'username');
    res.json(reviews);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};




export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await Review.deleteOne({ _id: id });
    res.json({ message: 'Review deleted' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getReviewsForUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const reviews = await Review.find({ user: req.user.id }).populate('user', 'username');
    res.json(reviews);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};