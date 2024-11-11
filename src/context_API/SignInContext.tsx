// SignInContext.tsx
import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type SignInData = { email: string; password: string };
type ResponseData = { token: string,
  user:{role:{role_type:string}}
 };

type SignInContextType = {
  loading: boolean;
  signIn: (data: SignInData) => void;
};

const SignInContext = createContext<SignInContextType | undefined>(undefined);

export const SignInProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const mutation: UseMutationResult<ResponseData, Error, SignInData> = useMutation({
    mutationFn: async (data: SignInData) => {
      const response = await axios.post<ResponseData>('https://user-product-api-nb1x.onrender.com/api/auth/login', data);
      
       console.log(response.data.user.role.role_type)
      return response.data;
    },
    onSuccess: (responseData) => {
      localStorage.setItem('token', responseData.token);
      navigate('/dashboard');
      if(responseData.user.role.role_type==="CUSTOMER"){
        navigate('/user-landing-page');
      }else if(responseData.user.role.role_type==="SUPER_ADMIN"){
         navigate("/dashboard")
      }
      
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Error during login:', error);
    },
  });

  const loading = mutation.status === 'pending';

  return (
    <SignInContext.Provider value={{ loading, signIn: mutation.mutate }}>
      {children}
    </SignInContext.Provider>
  );
};

export const useSignIn = () => {
  const context = useContext(SignInContext);
  if (!context) throw new Error('useSignIn must be used within a SignInProvider');
  return context;
};
