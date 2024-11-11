import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate()
  const {token}=useParams();
  console.log(token)
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`https://user-product-api-nb1x.onrender.com/api/auth/reset-forget-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`, 
        },
        body: JSON.stringify({ newPassword: newPassword }),
      });

      const data = await response.json();
        console.log(data)
     
      if (response.ok) {
        setMessage("Password updated successfully!");
        toast.success("Password updated successfully!")
        navigate("/signin")
      } else {
        setMessage(data.error || "Failed to update password.");
        toast.error("Failed to update password.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      toast.error("Please try again ")
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw' }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '15%', width: '20%' }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Update Password
        </Typography>

        <TextField
          fullWidth
          label="New Password *"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: 2,
            },
          }}
        />

        <Button 
          type="submit"
          variant="contained" 
          sx={{ mt: 2, borderRadius: 2, backgroundColor: "#3A5B22" }} 
          fullWidth
        >
          Update Password
        </Button>

        {message && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
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
