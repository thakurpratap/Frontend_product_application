import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, TextField, Box, Badge, MenuList, MenuItem, ListItemText, ListItemIcon, Popper, Paper, Grow } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useUserProductData } from '../../context_API/UserProductDataContext';
import { useCart } from '../../context_API/CartContext';
import { OrbitProgress } from 'react-loading-indicators';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';

const UserLandingNavbar = () => {
  const { cart } = useCart();
  const { products, isLoading, isError } = useUserProductData();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate(); 

 
  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  
  useEffect(() => {
    if (searchTerm) {
      setAnchorEl(document.getElementById('search-field'));
    } else {
      setAnchorEl(null);
    }
  }, [searchTerm]);

  
  const handleImageClick = (product: any) => {
    setSearchTerm('');  
    navigate('/cart-details', { state: { product } }); 
  };

  const handleLogOut = () => {
    const token = localStorage.getItem('token'); 
    if (token) {
      localStorage.removeItem('token');         
      toast.success('Logout successful');             
      navigate('/signin');                           
    } else {
      toast.error('No active session found');         
    }
  };
  return (
    <>
      <AppBar position="static" color="primary" sx={{ width: "100vw",marginTop:"-4%"  }}>
        <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,cursor: 'pointer' }}
          onClick={()=> navigate("/user-landing-page")}  
        
          >
            Imagine
          </Typography>

          <Box sx={{ flexGrow: 1, maxWidth: '600px', mx: 2, backgroundColor: "white" }}>
            <TextField
              id="search-field"
              variant="outlined"
              placeholder="Search for products, brands, and more"
              fullWidth
              InputProps={{
                startAdornment: <SearchIcon color="action" />,
              }}
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              autoComplete="off"
              autoFocus
            />

            
            <Popper open={Boolean(anchorEl) && searchTerm.length > 0} anchorEl={anchorEl} placement="bottom-start" transition>
              {({ TransitionProps, placement }) => (
                <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}>
                  <Paper>
                    <MenuList>
                      {isLoading && <OrbitProgress color="#32cd32" size="medium" />}
                      {isError && <MenuItem>Error loading products</MenuItem>}
                      {filteredProducts?.length === 0 && searchTerm && <MenuItem>No results found</MenuItem>}
                      {filteredProducts?.map((product) => (
                        <MenuItem key={product._id} onClick={() => handleImageClick(product)}>
                          <ListItemIcon>
                            <img
                              src={`https://user-product-api-nb1x.onrender.com/${product.image}`}
                              alt={product.name}
                              width="40"
                              height="40"
                              style={{ borderRadius: '4px' , width:40, }}
                            />
                          </ListItemIcon>
                          <ListItemText primary={product.name} />
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>

          <IconButton color="inherit" sx={{marginRight:"20px" , marginLeft:"10px"}}>
            <Badge badgeContent={cart.length} color="error" showZero>
              <ShoppingCartIcon onClick={()=>navigate("/shopping-cart")} />
            </Badge>
          </IconButton>
          <IconButton onClick={()=>handleLogOut()}>
          <LogoutIcon color="inherit"  sx={{marginRight:"10px" , marginLeft:"10px" ,color:"white"}}
          />
          </IconButton>
        </Toolbar>
      </AppBar>

      
    </>
  );
};

export default UserLandingNavbar;
