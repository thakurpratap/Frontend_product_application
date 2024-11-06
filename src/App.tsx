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
            <Sidebar/>
          </div>
        )}
        <div className='content'>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<SignUp />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/products" element={<Products />} />
            <Route path="/user" element={<User />} />
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

// function App() {
//   const [isToggleSidebar, setIsToggleSidebar] = useState(true);
//   return (
//     <>
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <Navbar />
//           <div className="main d-flex">
//             <div
//               className={`sidebarWrapper ${isToggleSidebar === true ? "toggle" : ""}`}
//             >
//               <Sidebar />
//             </div>
//             <div
//               className={`content ${isToggleSidebar === true ? "toggle" : ""}`}
//             >
//               <Routes>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/signin" element={<SignIn/>} />
//             <Route path="/" element={<SignUp/>} />
//                 <Route path="/landing-page" element={<LandingPage />} />
//               </Routes>
//             </div>
//           </div>
//         </BrowserRouter>
//       </QueryClientProvider>
//     </>
//   );
// }

export default App;
