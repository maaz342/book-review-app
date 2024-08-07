import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar: React.FC = () => {
  const token = localStorage.getItem('token'); 

  const isLoggedIn = token !== null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Book Review Platform
        </Typography>
        {!isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/add-review">Add Review</Button>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
