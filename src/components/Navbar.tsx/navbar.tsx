import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import profile from "../../assets/profile.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import logo from '../../assets/img.png';
import { Link } from "react-router-dom";
function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("signInToken");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("signInToken"); // Clear the token
    setIsLoggedIn(false); // Update the login state
    handleClose();
  };

  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center w-100">
            {/* logo wrap */}
            <div className="col-sm-2 part-1">
              <img src={logo} alt="" style={{ width: "60%" }} />
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
                  {!isLoggedIn && (
                    <>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      <Link to={"/signin"}>SignIn</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      <Link to={"/signup"}>SignUp</Link>
                    </MenuItem>
                    </>
                  )}
                  {/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Reset Password
                  </MenuItem> */}
                  {isLoggedIn && (
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  )}
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
