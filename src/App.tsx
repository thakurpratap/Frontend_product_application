import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignIn from './pages/Signin';
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'; 
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx/navbar';
import Sidebar from './components/Sidebar.tsx/sidebar';
import Dashboard from './components/Dashboard/dashboard';
// import Form from './pages/Form';
import LandingPage from './pages/LandingPage';
const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ['/signin', '/',"/landing-page"]; 

  return (
    <>
      {!noHeaderFooterPaths.includes(location.pathname) && <Navbar />}
      <div className='main d-flex'>
        {!noHeaderFooterPaths.includes(location.pathname) && (
          <div className='sidebarWrapper'>
            <Sidebar />
          </div>
        )}
        <div className='content'>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/form" element={<Form />} /> */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<SignUp />} />
            <Route  path="/landing-page" element={<LandingPage/>}/>
          </Routes>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
