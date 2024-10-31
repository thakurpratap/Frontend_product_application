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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp: React.FC = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (user.password.length < 8) {
      toast.error('Password must be at least 8 characters long!');
      return;
    }

    if (user.phone.length < 10) {
      toast.error('Phone number must be at least 10 digits long!');
      return;
    }

    try {
      const response = await fetch('https://user-product-api-nb1x.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success('Signup successful!');
        // Redirect user or handle successful signup
      } else {
        toast.error(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: "30px"
    }}>
      <ToastContainer />
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            type="text"
            margin="normal"
            required
            value={user.name}
            onChange={handleChange}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            required
            value={user.email}
            onChange={handleChange}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
            value={user.password}
            onChange={handleChange}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            type="number"
            margin="normal"
            required
            value={user.phone}
            onChange={handleChange}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            type="text"
            margin="normal"
            required
            value={user.address}
            onChange={handleChange}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: 2 }}
            fullWidth
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              Already have an account?
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
