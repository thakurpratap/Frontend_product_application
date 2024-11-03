import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard'; 
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import QuizIcon from '@mui/icons-material/Quiz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from "@mui/material";
function Sidebar() {
  const [activetab , setActivetab ] = useState(0)
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
          <Link to="/">
            <Button className={`w-100 ${activetab === 0 ? 'active' : " "}`} onClick={()=>setActivetab(0)}>
              <span className="icon"><DashboardIcon/></span>
              Dashboard
            </Button>
            </Link>
          </li>
          <li>
          <Link to="/form">
            <Button className={`w-100 ${activetab === 1 ? 'active' : " "}`} onClick={()=>setActivetab(1)}>
              <span className="icon"><PermContactCalendarIcon/></span>
             Profile Form
            </Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
