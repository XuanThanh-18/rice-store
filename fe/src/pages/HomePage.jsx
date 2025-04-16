// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getProducts } from "../api/productApi";
import { formatCurrency } from "../utils/formatCurrency";

// Banner image placeholder - replace with your actual image in production
const BANNER_IMAGE =
  "https://viecday365.com/pictures/news/2020/11/23/cbd1606126950.jpg";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        // Fetch the latest products to display as featured
        const response = await getProducts({
          page: 0,
          size: 4,
          sort: "id,desc",
        });
        setFeaturedProducts(response.content || []);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <Box
        sx={{
          position: "relative",
          height: "500px",
          backgroundImage: `url(${BANNER_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          mb: 6,
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        />

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: "600px", color: "white" }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Premium Quality Rice
            </Typography>
            <Typography variant="h5" paragraph>
              Discover the finest selection of rice varieties from around the
              world
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/products"
              endIcon={<ArrowForwardIcon />}
              sx={{
                mt: 2,
                backgroundColor: "yellowgreen",
                "&:hover": {
                  backgroundColor: "green",
                  color: "white",
                },
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Featured Products
          </Typography>
          <Divider />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            //hiển thị trạng thái "đang tải"
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {featuredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {product.origin} • {product.riceType}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(product.price)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={Link}
                      to={`/products/${product.id}`}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            component={Link}
            to="/products"
            endIcon={<ArrowForwardIcon />}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Categories Section */}
      <Box sx={{ bgcolor: "grey.100", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom>
            Rice Categories
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            {["Jasmine Rice", "Basmati Rice", "Brown Rice", "Black Rice"].map(
              (category) => (
                <Grid item xs={12} sm={6} md={3} key={category}>
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 3,
                      },
                    }}
                    component={Link}
                    to={`/products?riceType=${encodeURIComponent(category)}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="h6" component="h3" gutterBottom>
                      {category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Explore our selection of {category.toLowerCase()}
                    </Typography>
                  </Paper>
                </Grid>
              )
            )}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              About Rice Shop
            </Typography>
            <Typography variant="body1" paragraph>
              Rice Shop is your premier destination for the highest quality rice
              varieties from around the world. We work directly with trusted
              farmers to ensure you get the freshest, most authentic rice for
              your culinary creations.
            </Typography>
            <Typography variant="body1" paragraph>
              Our commitment to quality means we carefully select each grain,
              ensuring optimal taste, texture, and nutritional value. Whether
              you're a professional chef or a home cooking enthusiast, we have
              the perfect rice to elevate your dishes.
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to="/about"
              sx={{ mt: 2 }}
            >
              Learn More About Us
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1603636060618-75a77d29c722?auto=format&fit=crop&w=600"
              alt="Rice fields"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
