// src/components/ReviewList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Review {
  _id: string;
  bookTitle: string;
  author: string;
  reviewText: string;
  rating: number;
}

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>('/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  const deleteReview = async (id: string) => {
    try {
      await axios.delete(`/api/reviews/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      <h1>Book Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <h2>{review.bookTitle}</h2>
            <p>{review.author}</p>
            <p>{review.reviewText}</p>
            <p>{review.rating} stars</p>
            <Link to={`/edit-review/${review._id}`}>Edit</Link>
            <button onClick={() => deleteReview(review._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
