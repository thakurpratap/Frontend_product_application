import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Grid } from '@mui/material';

const UserHome = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {/* First Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="200"
              image="https://imagescdn.pantaloons.com/img/app/product/8/867900-10316390.jpg?auto=format&w=450"
              alt="Product Image 1"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Product Name 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹999
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" variant='contained'>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Second Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="200"
              image="https://www.tistabene.com/cdn/shop/files/MSH-2216A_632f0ede-3232-45b5-86c5-ad44e7e0a4e9.jpg?v=1703500258"
              alt="Product Image 2"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Product Name 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹799
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" variant='contained'>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Third Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="200"
              image="https://thefoomer.in/cdn/shop/products/jpeg-optimizer_PATP5270.jpg?v=1680164001"
              alt="Product Image 3"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Product Name 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹499
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" variant='contained'>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Fourth Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="200"
              image="https://imagescdn.thecollective.in/img/app/product/8/899861-11009513.jpg"
              alt="Product Image 4"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Product Name 4
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹1,199
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" variant='contained'>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserHome;
