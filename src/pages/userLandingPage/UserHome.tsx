import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Grid, Box } from '@mui/material';
import { useUserProductData } from '../../context_API/UserProductDataContext';
import { useCart } from '../../context_API/CartContext';  
import { OrbitProgress } from 'react-loading-indicators';
import { useNavigate } from 'react-router-dom'; 

const UserHome = () => {
  const { products, isLoading, isError } = useUserProductData();
  const { cart, addToCart, removeFromCart } = useCart();  
  const navigate = useNavigate(); 

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <OrbitProgress color="blue" size="medium" text="" textColor="" />
      </Box>
    );
  }

  if (isError) {
    return <Typography>Error loading products</Typography>;
  }

  if (!Array.isArray(products)) {
    return <Typography>No products available</Typography>;
  }

  const isInCart = (productId: any) => cart.some((item) => item._id === productId);

  const handleImageClick = (product: any) => {
    navigate('/cart-details', { state: { product } });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Grid container spacing={1} style={{ display: "flex", justifyContent: "space-evenly" }}>
        {products.map((product) => (
          <Grid item key={product._id}>
            <Card sx={{ width: '285px', height: '370px', marginTop: "5px" }}>
              <CardMedia
                component="img"
                height="200"
                image={`https://user-product-api-gzwy.onrender.com/${product.image}`}
                alt={product.name}
                sx={{ objectFit: "contain", width: '100%', cursor: 'pointer' }}
                onClick={() => handleImageClick(product)}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name.slice(0, 18)}...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ₹{product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⭐{product.rating}
                </Typography>
              </CardContent>
              <CardActions>
                {isInCart(product._id) ? (
                  <Button
                    size="small"
                    color="warning"
                    variant="contained"
                    onClick={() => removeFromCart(product._id)} 
                    sx={{ minWidth: "170px" }} 
                  >
                    Remove from Cart
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => addToCart(product)} 
                    sx={{ minWidth: "170px" }} 
                  >
                    Add to Cart
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserHome;
