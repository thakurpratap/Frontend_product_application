import React from 'react';
import { Box, TextField, IconButton,  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Navbar = () => {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="space-between" 
      px={2} 
      py={1} 
      bgcolor="#E4E7F5"
      sx={{ position: 'relative' }} 
    >

      <Box sx={{ flexGrow: 1, maxWidth: '300px', ml: 2, marginLeft:"16%" ,bgColor:"white", color:"black"}}>
        <TextField 
          fullWidth 
          variant="outlined" 
          size="small" 
          placeholder="Search..." 
         
        />
      </Box>

     
      <IconButton >
        User<AddCircleOutlineIcon />
      </IconButton>
    </Box>
  );
};

export default Navbar;
