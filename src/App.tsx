import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignIn from './pages/Signin';
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap first
import './App.css';  // Your custom styles after
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar.tsx/navbar';
import Sidebar from './components/Sidebar.tsx/sidebar';
import Dashboard from './components/Dashboard/dashboard';
import Form from './pages/Form';

const queryClient = new QueryClient();

function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>
     <BrowserRouter>
     <Navbar/>
   <div className='main d-flex'>
   <div className='sidebarWrapper'>
   <Sidebar/>
   </div>
   <div className='content'>
   <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/form"  element={<Form/>} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp/>} />
     </Routes>
   </div>
   </div>
   </BrowserRouter>
   </QueryClientProvider>
   
    </>
  );
};

export default App;
