import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

interface Review {
  bookTitle: string;
  author: string;
  reviewText: string;
  rating: number;
}

const EditReview: React.FC = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<Record<string, string>>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get<Review>(`http://localhost:5000/api/review/${id}`);
        const { bookTitle, author, reviewText, rating } = response.data;
        setBookTitle(bookTitle);
        setAuthor(author);
        setReviewText(reviewText);
        setRating(rating);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching review:', error.response?.data || error.message);
          setError(error.response?.data?.message || 'Failed to load review.');
        } else {
          console.error('Unexpected error:', error);
          setError('Failed to load review.');
        }
      }
    };

    if (id) {
      fetchReview();
    } else {
      setError('No review ID found.');
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }
  
    const token = localStorage.getItem('token');
  
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }
  
    try {
      await axios.put(
        `http://localhost:5000/api/review/${id}`,
        { bookTitle, author, reviewText, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating review:', error.response?.data || error.message);
        setError(error.response?.data?.message || 'Failed to update review.');
      } else {
        console.error('Unexpected error:', error);
        setError('Failed to update review.');
      }
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Review
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          fullWidth
          label="Rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          margin="normal"
          required
          inputProps={{ min: 1, max: 5 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          Update Review
        </Button>
      </Box>
    </Container>
  );
};

export default EditReview;
