import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JavaScript is included

interface Review {
  _id: string;
  bookTitle: string;
  author: string;
  reviewText: string;
  rating: number;
}

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:5000/api/review', config);
        console.log('Fetched reviews:', response.data); 
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography variant="h6">Loading reviews...</Typography>
      </Container>
    );
  }

  return (
    

      <Container>
        <Typography variant="h4" gutterBottom className='text-center'>Our Reviews</Typography>
        <Grid container spacing={3}>
          {reviews.length === 0 ? (
            <Typography variant="body1">No reviews found.</Typography>
          ) : (
            reviews.map((review) => (
              <Grid item xs={12} sm={6} md={4} key={review._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{review.bookTitle}</Typography>
                    <Typography variant="body2" color="textSecondary">{review.reviewText}</Typography>
                    <Typography>Rating: {review.rating}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
  );
};

export default Home;
