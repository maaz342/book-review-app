import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsername(response.data.username);
        setEmail(response.data.email); // Assuming the response includes email
      } catch (error) {
        handleError(error);
      }
    };

    fetchUserDetails();
  }, []);

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

  const handleSave = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found');
      return;
    }

    try {
      await axios.put('http://localhost:5000/auth/profile', { username, email }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/profile');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Edit Profile</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        type="email" 
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
      >
        Save
      </Button>
    </Container>
  );
};

export default EditProfile;
