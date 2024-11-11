import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, TextField, Button, Box, Badge, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserHome from './UserHome';
import UserFooter from './UserFooter';
import { useUserProductData } from '../../context_API/UserProductDataContext';
import { useCart } from '../../context_API/CartContext';

const UserLandingNavbar = () => {
  const { cart } = useCart();
  const { products, isLoading, isError } = useUserProductData();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); 

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setAnchorEl(event.currentTarget); 
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm(''); 
  };

  return (
    <>
      <AppBar position="static" color="primary" sx={{ width: "100vw" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Imagine
          </Typography>

          <Box sx={{ flexGrow: 1, maxWidth: '600px', mx: 2, backgroundColor: "white" }}>
            <TextField
              variant="outlined"
              placeholder="Search for products, brands, and more"
              fullWidth
              InputProps={{
                startAdornment: <SearchIcon color="action" />,
              }}
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              onClick={handleClick} 
            />

            {/* Dropdown menu for search results */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && searchTerm.length > 0}
              onClose={handleClose}
              PaperProps={{
                style: { maxHeight: 300, width: '250px' },
              }}
            >
              {isLoading && <MenuItem>Loading...</MenuItem>}
              {isError && <MenuItem>Error loading products</MenuItem>}
              {filteredProducts?.length === 0 && <MenuItem>No results found</MenuItem>}
              {filteredProducts?.map((product) => (
                <MenuItem key={product._id} onClick={handleClose}>
                  <ListItemIcon>
                    <img src={product.image} alt={product.name} width="40" height="40" style={{ borderRadius: '4px' }} />
                  </ListItemIcon>
                  <ListItemText primary={product.name} />
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Button color="inherit">Login</Button>
          <IconButton color="inherit">
            <Badge badgeContent={cart.length} color="error" showZero>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main content sections */}
      <UserHome />
      <UserFooter />
    </>
  );
};

export default UserLandingNavbar;
