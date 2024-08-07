import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email:string;
  password:string;
}

interface Review {
  _id: string;
  bookTitle: string;
  reviewText: string;
  rating: number;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Token retrieved for fetchUser:', token);

      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('User response:', response.data);
        setUser(response.data);
      } catch (error) {
        handleError(error);
      }
    };

    const fetchReviews = async () => {
      const token = localStorage.getItem('token');
      console.log('Token retrieved for fetchReviews:', token);

      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/auth/profil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Reviews response:', response.data);
        
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          console.error('Expected an array but received:', response.data);
          setError('Unexpected data format');
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchUser();
    fetchReviews();
  }, [navigate]);

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response);
      setError(error.response?.data?.message || 'An error occurred');
    } else if (error instanceof Error) {
      console.error('General error details:', error);
      setError(error.message);
    } else {
      console.error('Unknown error details:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const deleteReview = async (reviewId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (error) {
      handleError(error);
    }
  };

  if (error) {
    return <Container><Typography variant="h6" color="error">{error}</Typography></Container>;
  }

  if (!user) {
    return <Container><Typography variant="h6">Loading...</Typography></Container>;
  }

  return (
    <Container>

      <Grid container spacing={3} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent className='text-center'>
              <Typography variant="h5">User Details</Typography>
              <Typography variant="body1"><strong>Username:</strong> {user.username}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>


            </CardContent>
            <CardActions style={{ display: 'flex', gap: '50px' }}>
  <Button component={Link} to="/edit-profile" variant="contained" color="primary" style={{ flex: 1 }}>
    Edit Profile
  </Button>
  <Button variant="contained" color="secondary" onClick={handleLogout} style={{ flex: 1 }}>
    Logout
  </Button>
</CardActions>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Your Reviews:</Typography>
          <Grid container spacing={3}>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <Grid item xs={12} sm={6} md={4} key={review._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5">{review.bookTitle}</Typography>
                      <Typography>{review.reviewText}</Typography>
                      <Typography>Rating: {review.rating}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button component={Link} to={`/edit-review/${review._id}`} variant="contained" color="primary">Edit</Button>
                      <Button 
                        variant="contained" 
                        color="error" 
                        onClick={() => deleteReview(review._id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No reviews found.</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
