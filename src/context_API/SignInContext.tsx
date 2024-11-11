// SignInContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type SignInContextType = {
  loading: boolean;
  signIn: (data: { email: string; password: string }) => Promise<void>;
};

const SignInContext = createContext<SignInContextType | undefined>(undefined);

export const SignInProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch('https://user-product-api-nb1x.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem('token', responseData.token);
        navigate('/dashboard');
        toast.success('Login successful!');
      } else {
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
    <SignInContext.Provider value={{ loading, signIn }}>
      {children}
    </SignInContext.Provider>
  );
};

export const useSignIn = () => {
  const context = useContext(SignInContext);
  if (!context) throw new Error('useSignIn must be used within a SignInProvider');
  return context;
};
