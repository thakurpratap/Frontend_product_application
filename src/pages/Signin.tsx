import * as React from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { json } from "stream/consumers";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  justifyContent: "center",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  width: "100vw",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

interface AppThemeProps {
  children: React.ReactNode;
}

const AppTheme = ({ children }: AppThemeProps) => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://user-product-api-nb1x.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        navigate('/dashboard');
        toast.success('Login successful!');
      } else {
        const responseData = await response.json();
        console.log(responseData.message);

        if (responseData.message === "Invalid Email or Password") {
          toast.error("Invalid Email or Password");
          toast("Invalid Email or Password");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100vw", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                autoComplete="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", { required: "Email is required" })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                id="password"
                placeholder="••••••"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", { required: "Password is required" })}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don’t have an account?{" "}
              <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
