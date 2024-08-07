import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Button, Typography, Paper } from '@mui/material';

const AddReviewPage = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:5000/api/review', { bookTitle, author, reviewText, rating }, config);
      navigate('/'); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Add Review</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 8 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Book Title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Review Text"
                multiline
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Rating"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 5 } }} 
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit Review
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddReviewPage;
