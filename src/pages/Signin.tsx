import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, CircularProgress, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch('https://user-product-api-nb1x.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData)
      if (response.ok) {
        localStorage.setItem("token", responseData.token);
        navigate('/dashboard');
        toast.success('Login successful!');
      } else {
        const responseData = await response.json();
        toast.error(responseData.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw' }}>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} 
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '15%', width: '20%' }}>
        
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email *"
              type="email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message || ''}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 2, 
                }
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password *"
              type="password"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message || ''}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                }
              }}
            />
          )}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2, borderRadius: 2, backgroundColor: "#3A5B22" }} fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>

        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            Don't have an account? 
            <Link to="/" style={{ textDecoration: 'none', color: 'blue', marginLeft: "10px" }}>
              Sign Up
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 1 }}>OR</Divider>

        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/forget-password" style={{ textDecoration: 'none', color: 'blue' }}>
              Forgot Password?
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Box
        component="img"
        src="https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="signInImage"
        sx={{
          width: '50vw',
          height: '100vh',
          objectFit: "cover",
          objectPosition: 'center',
          borderTopLeftRadius: '30px',  
          borderBottomLeftRadius: '30px',
        }}
      />
    </Box>
  );
};

export default SignIn;
