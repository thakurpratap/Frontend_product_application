import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

function SideBar() {
  return (
    <Box 
      sx={{
        width: 250,
        height: '100vh',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        position: 'fixed',
        top: 0,
        left: 0,
        bgcolor: "#E4E7F5"
      }}
      className="sidebar"
    >
      <List>
        <ListItem sx={{ '&:hover': { bgcolor: '#D1E3F8' } }}>
          <ListItemText 
            primary={
              <Typography variant="h6" fontWeight="bold" color="textPrimary">
                User
              </Typography>
            } 
          />
        </ListItem>
        
        <ListItem sx={{ '&:hover': { bgcolor: '#D1E3F8' } }}>
          <ListItemText 
            primary={
              <Typography variant="h6" fontWeight="bold" color="textPrimary">
                Product
              </Typography>
            } 
          />
        </ListItem>
      </List>
    </Box>
  );
}

export default SideBar;
