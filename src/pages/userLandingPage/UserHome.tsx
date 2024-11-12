import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Grid } from '@mui/material';
import { useUserProductData } from '../../context_API/UserProductDataContext';
import { useCart } from '../../context_API/CartContext'; 

const UserHome = () => {
  const { products, isLoading, isError } = useUserProductData();
  const { cart, addToCart, removeFromCart } = useCart();  

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading products</Typography>;
  }

  if (!Array.isArray(products)) {
    return <Typography>No products available</Typography>;
  }

  
  const isInCart = (productId:any) => cart.some((item) => item._id === productId);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id}>
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ₹{product.price}
                </Typography>
              </CardContent>
              <CardActions>
                {isInCart(product._id) ? (
                  <Button
                    size="small"
                    color="warning"
                    variant="contained"
                    onClick={() => removeFromCart(product._id)}  
                  >
                    Remove from Cart
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => addToCart(product)}  
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
