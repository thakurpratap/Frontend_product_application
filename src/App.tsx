import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminPanel from "./pages/adminPanel/adminpanel"
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignUp/>} /> 
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path='/admin-panel' element={<AdminPanel/>}/>
      </Routes>
    </Router>
  );
};

export default App;
