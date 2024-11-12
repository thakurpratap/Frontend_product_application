import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Pages and Components
import ForgetPassword from './pages/ForgetPassword';
import UpdatePassword from './pages/UpdatePassword';
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar.tsx/navbar";
import Sidebar from "./components/Sidebar.tsx/sidebar";
import Dashboard from "./components/Dashboard/dashboard";
import Customer from "./components/Super_admin/Customer";
import Partner from "./components/Super_admin/Partner";
import Products from "./components/Super_admin/Products";
import User from "./components/Super_admin/User";

import UserLandingNavbar from './pages/userLandingPage/UserLandingNavbar';
import StoreContext from "./context_API/StoreContext";
import Admin_Products from "./components/Admin_user/ToverifyProducts";
import Admin_Verifyed_Products from "./components/Admin_user/VerifyedProducts";
import Admin_Usermanagement from "./components/Admin_user/User";
// Create a type for the context value
interface ContextProps {
  isToggleSidebar: boolean;
  setIsToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const queryClient = new QueryClient();

const MyContext = createContext<ContextProps | undefined>(undefined);

const Layout = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ['/signin', '/',"/landing-page", "/forget-password","/update-password"]; 

  
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const values = { isToggleSidebar, setIsToggleSidebar };

  return (
    <StoreContext> 
      <MyContext.Provider value={values}>
        {!noHeaderFooterPaths.includes(location.pathname) && <Navbar />}
        <div className='main d-flex'>
          {!noHeaderFooterPaths.includes(location.pathname) && (
            <div className={`sidebarWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
          )}
          <div className={`content ${isToggleSidebar ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/partner_dashboard" element={<Dashboard />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<SignUp />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path='/user-landing-page' element={<UserLandingNavbar />} />
              <Route path="/super_admin_customer" element={<Customer />} />
              <Route path="/super_admin_partner" element={<Partner />} />
              <Route path="/super_admin_products" element={<Products />} />
              <Route path="/super_admin_user" element={<User />} />
              <Route path="/admin_products" element={<Admin_Products />} />
              <Route path="/admin_verifyed_products" element={<Admin_Verifyed_Products />} />
              <Route path="/admin_usermanagement" element={<Admin_Usermanagement />} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </StoreContext>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
       
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
       <Layout />
      </BrowserRouter>
       
    </QueryClientProvider>
  );
}

export default App;
export {MyContext};
