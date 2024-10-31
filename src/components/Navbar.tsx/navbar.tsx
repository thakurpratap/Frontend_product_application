import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu"; // Replaced MdOutlineMenuOpen
import profile from "../../assets/profile.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import logo from '../../assets/img.png'
import { useNavigate } from 'react-router-dom';

function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    navigate("/signup"); // Navigate to the Sign Up page
    handleClose(); // Close the menu after navigation
  };


  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center w-100">
            {/* logo wrap */}
            <div className="col-sm-2 part-1">
              <img src={logo} alt=""  style={{width : "60%"}}/>
              {/* <span className="ml-2">IMAGINE</span> */}
            </div>
            <div className="col-xs-3 d-flex align-items-center part-2 pl-4xss">
              <Button className="rounded-circle mr-3" variant="contained">
                <MenuIcon />
              </Button>
            </div>

            <div className="col-sm-9 d-flex align-items-center justify-content-end part-3 pl-4">
              <div className="myAccWrapper">
                <Button
                  className="myAcc d-flex align-items-center"
                  onClick={handleClick}
                >
                  <div className="userImg">
                    <span className="rounded-circle">
                      <img src={profile} alt="img" />
                    </span>
                  </div>

                  <div className="userInfo">
                    <h4>Pratap Singh</h4>
                    <p className="mb-0">@pratap888</p>
                  </div>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleLoginClick}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Login
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Reset Password
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
