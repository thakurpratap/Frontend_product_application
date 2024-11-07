import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://user-product-api-nb1x.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        toast.success("Signup successful! Please SignIn Again");
        navigate("/signin");
      } else {
        const message = result.message;
        toast.error(`Signup failed: ${message}`);
        console.error(`Signup failed: ${message}`);
      }
    } catch (error) {
      toast.error("Error during signup: " + error);
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 3, borderRadius: 2, width: "100%", margin: "0 auto " }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="firstname"
            control={control}
            defaultValue=""
            rules={{
              required: "Firstname is required",
              pattern: {
                // value: /^[a-zA-Z ]*$/,
                // message: "Only alphabets are allowed",
                value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
                message: "Only alphabets are allowed, and space is allowed only between words",
              },
              maxLength: {
                value: 20,
                message: "Firstname cannot exceed more than 20 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="First Name"
                margin="normal"
                error={!!errors.firstname}
                helperText={
                  errors.firstname ? (errors.firstname.message as string) : ""
                }
                sx={{
                  "& .MuiInputBase-root": {
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
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "This is not a valid email",
              },
              validate: (value) => !/\s/.test(value) || "Email cannot contain spaces",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                error={!!errors.email}
                helperText={
                  errors.email ? (errors.email.message as string) : ""
                }
                sx={{
                  "& .MuiInputBase-root": {
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
            rules={{
              required: "Password is required",
              pattern: {
                value: /^\S*$/,
                message: "Password cannot contain spaces",
              },
              maxLength: {
                value: 8,
                message: "Password cannot exceed more than 8 characterslong!",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                error={!!errors.password}
                helperText={(errors.password?.message as string) || ""}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 2,
                  },
                }}
              />
            )}
          />
          <Controller
            name="phonenumber"
            control={control}
            defaultValue=""
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^(0|[6-9]\d*)(\.\d+)?$/,
                message: "Phone number cannot accept 0 to 5 numbers and alphabets not allowed",
              },
              maxLength: {
                value: 10,
                message: "Phone number cannot exceed more than 10 digits",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone Number"
                type="tel"
                margin="normal"
                error={!!errors.phonenumber}
                helperText={
                  errors.phonenumber
                    ? (errors.phonenumber.message as string)
                    : ""
                }
                sx={{
                  "& .MuiInputBase-root": {
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
            rules={{ 
              required: "Address is required",
              pattern: {
                // value: /^(?!\s)[a-zA-Z0-9\s]{4,30}(?<!\s)$/, 
                // message: "Address canot allow more the one sapce",
                value: /^(?!.*\s{2,})(?!\s)[a-zA-Z0-9\s]{4,30}(?<!\s)$/, 
                message: "Address canot allow more the one sapce",
              },
              minLength : {
                value: 4,
                message : "Address is more then 5 characters"},
                maxLength : {
                  value: 30,
                  message : "Address cannot exceed more than 30 characters"},
             }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Address"
                margin="normal"
                error={!!errors.address}
                helperText={(errors.address?.message as string) || ""}
                sx={{
                  "& .MuiInputBase-root": {
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
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              Already have an account?
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
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
