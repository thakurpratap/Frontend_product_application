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
import ForgetPassword from './pages/ForgetPassword';
import LandingPage from './pages/LandingPage';
import UpdatePassword from './pages/UpdatePassword';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ['/signin', '/',"/landing-page", "/forget-password","/update-password"]; 

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
            <Route path="/forget-password" element={<ForgetPassword/>} />
            <Route path="/update-password" element={<UpdatePassword/>} />

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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
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
















































