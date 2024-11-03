import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, TextField, Card, CardContent, CardMedia, Button, Grid, Container, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

interface Product {
  name: string;
  description: string;
  userId: string;
  image: string;
  price: number;
}

const theme = createTheme();

const SearchBox = styled(TextField)(({ theme }) => ({
  backgroundColor: theme?.palette?.background?.paper || '#fff', 
  borderRadius: theme?.shape?.borderRadius || 4,
  marginLeft: theme.spacing(2),
  width: '30%',
  [`& .MuiOutlinedInput-root`]: {
    paddingRight: '10px',
  },
}));

const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://user-product-api-nb1x.onrender.com/api/products/', {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Product Store
          </Typography>
          <SearchBox
            variant="outlined"
            placeholder="Search for products..."
            size="small"
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Trending Products
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.userId}>
              <Card sx={{ maxWidth: 300, m: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description.slice(0, 28)}...
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
                    ₹{product.price}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;
