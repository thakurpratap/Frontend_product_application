import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserHome from './UserHome';
import UserFooter from './UserFooter';
const UserLandingNavbar = () => {
  return (
    <>
    <AppBar position="static" color="primary"
     sx={{width:"100vw"}}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Imagine
        </Typography>

      
        <Box sx={{ flexGrow: 1, maxWidth: '600px', mx: 2 ,backgroundColor:"white"}}>
          <TextField
            variant="outlined"
            placeholder=" Search for products, brands, and more"
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon color="action"  />,
            }}
            size="small"
          />
        </Box>

        <Button color="inherit">Login</Button>
        <IconButton color="inherit">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    {/* UserHome */}

    <UserHome/>

        {/* UserFooter */}
          <UserFooter/>
    </>
  );
};

export default UserLandingNavbar;
