// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Grid,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm, Controller } from "react-hook-form";
// import { toast } from "react-toastify";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import "react-toastify/dist/ReactToastify.css";

// type SignUpFormData = {
//   username: string;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
// };

// const SignUp = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleClickShowPassword = () => setShowPassword((prev) => !prev);

//   const onSubmit = async (data: SignUpFormData) => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://user-product-api-nb1x.onrender.com/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toast.success('Signup successful! Please Sign In Again');
//         navigate("/signin");
//       } else {
//         const message = result.message || 'Signup failed';
//         toast.error(`Signup failed: ${message}`);
//         console.error(`Signup failed: ${message}`);
//       }
//     } catch (error) {
//       toast.error("Error during signup: " + error);
//       console.error("Error during signup:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{
//       display: "flex",
//       width: "100vw",
//       justifyContent: "space-between",
//       alignItems: "center"
//     }}>
//       <Box
//         component="form"
//         noValidate
//         autoComplete="off"
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{
//           display: "flex",
//           alignItems: 'center',
//           flexDirection: "column",
//           marginLeft: "15%",
//           width: "20%"
//         }}
//       >
//         <Typography variant="h4" align="center" gutterBottom>
//           Sign Up
//         </Typography>

//         {/* Username Field */}
//         <Controller
//           name="username"
//           control={control}
//           defaultValue=""
//           rules={{ required: 'Username is required' }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               fullWidth
//               label="Name *"
//               margin="normal"
//               error={!!errors.username}
//               helperText={errors.username?.message || ''}
//               sx={{
//                 '& .MuiInputBase-root': {
//                   borderRadius: 2,
//                 },
//               }}
//             />
//           )}
//         />

//         {/* Email Field */}
//         <Controller
//           name="email"
//           control={control}
//           defaultValue=""
//           rules={{ required: 'Email is required' }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               fullWidth
//               label="Email *"
//               type="email"
//               margin="normal"
//               error={!!errors.email}
//               helperText={errors.email?.message || ''}
//               sx={{
//                 '& .MuiInputBase-root': {
//                   borderRadius: 2,
//                 },
//               }}
//             />
//           )}
//         />

//         {/* Password Field */}
//         <Controller
//           name="password"
//           control={control}
//           defaultValue=""
//           rules={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long!' } }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               fullWidth
//               label="Password *"
//               type={showPassword ? 'text' : 'password'}
//               margin="normal"
//               error={!!errors.password}
//               helperText={errors.password?.message || ''}
//               sx={{
//                 '& .MuiInputBase-root': {
//                   borderRadius: 2,
//                 },
//               }}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={handleClickShowPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           )}
//         />

//         {/* Phone Number Field */}
//         <Controller
//           name="phone"
//           control={control}
//           defaultValue=""
//           rules={{ required: 'Phone number is required', minLength: { value: 10, message: 'Phone number must be at least 10 digits long!' } }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               fullWidth
//               label="Phone Number *"
//               type="tel"
//               margin="normal"
//               error={!!errors.phone}
//               helperText={errors.phone?.message || ''}
//               sx={{
//                 '& .MuiInputBase-root': {
//                   borderRadius: 2,
//                 },
//               }}
//             />
//           )}
//         />

//         {/* Address Field */}
//         <Controller
//           name="address"
//           control={control}
//           defaultValue=""
//           rules={{ required: 'Address is required' }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               fullWidth
//               label="Address *"
//               margin="normal"
//               error={!!errors.address}
//               helperText={errors.address?.message || ''}
//               sx={{
//                 '& .MuiInputBase-root': {
//                   borderRadius: 2,
//                 },
//               }}
//             />
//           )}
//         />

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           variant="contained"
//           sx={{ mt: 2, borderRadius: 2, backgroundColor: "#3A5B22" }}
//           fullWidth
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
//         </Button>

//         {/* SignIn Link */}
//         <Grid container justifyContent="center" sx={{ mt: 2 }}>
//           <Grid item>
//             Already have an account? 
//             <Link to="/signin" style={{ textDecoration: 'none', color: 'blue', marginLeft: "10px" }}>
//               Sign In
//             </Link>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Image */}
//       <Box
//         component="img"
//         src="https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="signUPImage"
//         sx={{
//           width: '50vw',
//           height: '100vh',
//           objectFit: "cover",
//           objectPosition: 'center',
//           borderTopLeftRadius: '30px',
//           borderBottomLeftRadius: '30px',
//         }}
//       />
//     </Box>
//   );
// };

// export default SignUp;





import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

const SignUp = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      const response = await fetch('https://user-product-api-nb1x.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Signup successful! Please Sign In Again');
        navigate("/signin");
      } else {
        const message = result.message || 'Signup failed';
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
    <Box sx={{
      display: "flex",
      width: "100vw",
      justifyContent: "space-between",
      alignItems: "center",
        background: "white",
         marginTop :"-4%"
    }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          alignItems: 'center',
          flexDirection: "column",
          marginLeft: "15%",
          width: "20%"
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{
            required: "username is required",
            pattern: {
              value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
              message: "Only alphabets are allowed, and space is allowed only between words",
            },
            maxLength: {
              value: 20,
              message: "username cannot exceed more than 20 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Name *"
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message || ''}
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
              label="Email *"
              type="email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message || ''}
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
              label="Password *"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message || ''}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="phone"
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
              label="Phone Number *"
              type="tel"
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone?.message || ''}
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
          rules={{ 
            required: "Address is required",
            pattern: {
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
              label="Address *"
              margin="normal"
              error={!!errors.address}
              helperText={errors.address?.message || ''}
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
          sx={{ mt: 2, borderRadius: 2, backgroundColor: "#3A5B22" }}
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
        </Button>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            Already have an account? 
            <Link to="/signin" style={{ textDecoration: 'none', color: 'blue', marginLeft: "10px" }}>
              Sign In
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="signUPImage"
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

export default SignUp;