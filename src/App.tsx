import ForgetPassword from './pages/ForgetPassword';
import UpdatePassword from './pages/UpdatePassword';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.tsx/navbar";
import Sidebar from "./components/Sidebar.tsx/sidebar";
import Dashboard from "./components/Dashboard/dashboard";
import Customer from "./components/Super_admin/Customer";
import Partner from "./components/Super_admin/Partner";
import Products from "./components/Super_admin/Products";
import User from "./components/Super_admin/User";
import UserLandingNavbar from './pages/userLandingPage/UserLandingNavbar';
import { createContext} from 'react';

// Create a type for the context value
interface ContextProps {
  isToggleSidebar: boolean;
  setIsToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const queryClient = new QueryClient();

// Provide the initial context value type
const MyContext = createContext<ContextProps | undefined>(undefined);

const Layout = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ['/signin', '/',"/user-landing-page", "/forget-password","/update-password"]; 
  //const noHeaderFooterPaths = ['/signin', '/',"/landing-page"];

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const values = { isToggleSidebar, setIsToggleSidebar };

  return (
    <>
      <MyContext.Provider value={values}>
      {!noHeaderFooterPaths.includes(location.pathname) && <Navbar />}
      <div className='main d-flex'>
        {!noHeaderFooterPaths.includes(location.pathname) && (
          <div className={`sidebarWrapper ${isToggleSidebar===true ? 'toggle' : ''}`}>
            <Sidebar/>
          </div>
        )}
        <div className={`content ${isToggleSidebar===true ? 'toggle' : ''}`}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword/>} />
            <Route path="/update-password" element={<UpdatePassword/>} />
            <Route path='/user-landing-page' element={<UserLandingNavbar/>}/>
            <Route path="/customer" element={<Customer />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/products" element={<Products />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </div>
      </MyContext.Provider>
    </>
  );
};

function App() {
  // const [isToggleSidebar, setIsToggleSidebar] = useState(true);
  // const values = { isToggleSidebar, setIsToggleSidebar };
  return (
    // <MyContext.Provider value={values}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
    // </MyContext.Provider>
  );
}

export default App;


























// Partner Admin

// import React from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import './App.css'; 
// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import NavBar from './Partner-Admin/NavBar';
// import SideBar from './Partner-Admin/SideBar';
// import DashBoard from './Partner-Admin/DashBoard';

// const queryClient = new QueryClient();

// const Layout = () => {
//   const location = useLocation();
//   const noHeaderFooterPaths = ['/signin', '/',"/landing-page"]; 

//   return (
//     <>
//       {!noHeaderFooterPaths.includes(location.pathname) && <NavBar />}
//       <div className='main d-flex'>
//         {!noHeaderFooterPaths.includes(location.pathname) && (
//           <div className='sidebarWrapper'>
//             <SideBar />
//           </div>
//         )}
//         <div className='content'>
//           <Routes>
//             <Route path="/dashboard" element={<DashBoard />} />  
//           </Routes>
//         </div>
//       </div>
//     </>
//   );
// };

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <Layout />
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }

// export default App;
















































export {MyContext};
