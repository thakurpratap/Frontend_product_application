import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const UpdatePassword = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw' }}>
      <Box 
        component="form" 
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '15%', width: '20%' }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Update Password
        </Typography>

        <TextField
          fullWidth
          label="New Password *"
          type="password"
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: 2,
            },
          }}
        />

        <TextField
          fullWidth
          label="Confirm Password *"
          type="password"
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: 2,
            },
          }}
        />

        <Button 
          variant="contained" 
          sx={{ mt: 2, borderRadius: 2, backgroundColor: "#3A5B22" }} 
          fullWidth
        >
          Update Password
        </Button>
      </Box>

      <Box
        component="img"
        src="https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="updatePasswordImage"
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

export default UpdatePassword;
