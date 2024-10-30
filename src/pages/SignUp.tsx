import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
 

  return (
    <Container component="main" maxWidth="xs" sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            required
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
          
            sx={{ mt: 2, borderRadius: 2 }}
            fullWidth
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center" sx={{ mt: 2, }}>
            <Grid item>
            Already have an account ?
              <Link to="/signin" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
