import React from 'react';
import { Box, Typography, IconButton, Divider, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../context_API/CartContext';

const ShoppingCart = () => {
  const { cart, removeFromCart } = useCart();

  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {cart.map((product) => (
            <Box key={product._id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <Box component="img" src={product.image} alt={product.name} width="100" height="100" sx={{ borderRadius: '8px' }} />
              <Box sx={{ flexGrow: 1, marginLeft: '20px' }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="subtitle1">Price: ${product.price.toFixed(2)}</Typography>
              </Box>
              <IconButton onClick={() => removeFromCart(product._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <Typography variant="h5">Total: ${totalPrice.toFixed(2)}</Typography>
            {/* <Button variant="contained" color="primary" onClick={clearCart}>
              Clear Cart
            </Button> */}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="contained" color="secondary">
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ShoppingCart;
