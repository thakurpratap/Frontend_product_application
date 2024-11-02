import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false); 
  const navigate=useNavigate()
  const onSubmit = async (data: any) => {
    setLoading(true); 
    try {
      const response = await fetch('https://user-product-api-nb1x.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        
          toast.success('Signup successful! Please SignIn Again');
          navigate("/signin")
        
      } else {
        const message=result.message;
        toast.error(`Signup failed: ${message}`);
        console.error(`Signup failed: ${message}`);
      }
    } catch (error) {
      toast.error('Error during signup: ' + error);
      console.error('Error during signup:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      
    }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, width: '100%', margin:"0 auto " }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Name"
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message as string || ''}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 2,
                  },
                }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message as string || ''}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 2,
                  },
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long!' } }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message as string || ''}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 2,
                  },
                }}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: 'Phone number is required', minLength: { value: 10, message: 'Phone number must be at least 10 digits long!' } }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone"
                type="tel"
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone?.message as string || ''}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 2,
                  },
                }}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{ required: 'Address is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Address"
                margin="normal"
                error={!!errors.address}
                helperText={errors.address?.message as string || ''}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: 2,
                  },
                }}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: 2 }}
            fullWidth
            disabled={loading} 
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'} 
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
      <ToastContainer />
    </Container>
  );
};

export default SignUp;
