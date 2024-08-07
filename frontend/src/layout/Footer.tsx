import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, GitHub } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <AppBar position="static" color="primary" style={{ padding: '20px 0' }}>
      <Toolbar>
        <Container>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6} style={{ textAlign: 'left' }}>
              <Typography variant="body2" color="inherit">
                Contact: info@example.com | +01 234 567 88
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
              <Typography variant="body2" color="inherit">
                Get connected with us on social networks:
              </Typography>
              <IconButton color="inherit" component="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://google.com" target="_blank" rel="noopener noreferrer">
                <Google />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://github.com" target="_blank" rel="noopener noreferrer">
                <GitHub />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
     
    </AppBar>
  );
}

export default Footer;
