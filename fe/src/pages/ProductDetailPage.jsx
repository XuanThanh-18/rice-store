// fe/src/pages/ProductDetailPage.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  TextField,
  Breadcrumbs,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { addToCart } from "../api/cartApi";
import { formatCurrency } from "../utils/formatCurrency";
import { AuthContext } from "../contexts/AuthContext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
      } catch (err) {
        setError("Failed to load product details. Please try again later.");
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(Math.min(value, product?.stockQuantity || 99));
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info("Please log in to add items to your cart");
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(product.id, quantity);
      toast.success(`${product.name} added to cart successfully`);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add product to cart"
      );
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          py: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error" sx={{ my: 4 }}>
          {error}
        </Alert>
        <Button
          component={Link}
          to="/products"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="info" sx={{ my: 4 }}>
          Product not found
        </Alert>
        <Button
          component={Link}
          to="/products"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  const {
    name,
    price,
    description,
    stockQuantity,
    imageUrl,
    origin,
    riceType,
    weight,
  } = product;

  const isOutOfStock = stockQuantity <= 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <MuiLink component={Link} to="/" color="inherit">
          Home
        </MuiLink>
        <MuiLink component={Link} to="/products" color="inherit">
          Products
        </MuiLink>
        <Typography color="text.primary">{name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={
                imageUrl || `https://via.placeholder.com/600x400?text=${name}`
              }
              alt={name}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: 400,
                objectFit: "contain",
              }}
            />
          </Paper>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {name}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
              {riceType && (
                <Chip
                  icon={<RiceBowlIcon />}
                  label={riceType}
                  color="primary"
                  variant="outlined"
                />
              )}
              {origin && (
                <Chip label={`Origin: ${origin}`} variant="outlined" />
              )}
              {weight && <Chip label={weight} variant="outlined" />}
            </Box>

            <Typography variant="h5" color="primary" sx={{ my: 2 }}>
              {formatCurrency(price)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="body1"
              color={isOutOfStock ? "error.main" : "success.main"}
              sx={{ fontWeight: "medium", mb: 2 }}
            >
              {isOutOfStock
                ? "Out of Stock"
                : `In Stock: ${stockQuantity} units`}
            </Typography>

            {!isOutOfStock && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Quantity:
                </Typography>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1, max: stockQuantity }}
                  sx={{ width: "80px" }}
                  size="small"
                />
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={isOutOfStock || addingToCart}
              sx={{ py: 1.5, mb: 2 }}
            >
              {addingToCart ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add to Cart"
              )}
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to="/products"
              startIcon={<ArrowBackIcon />}
              sx={{ mt: 1 }}
              fullWidth
            >
              Back to Products
            </Button>
          </Paper>
        </Grid>

        {/* Product Description */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Product Description
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" paragraph>
              {description || "No description available for this product."}
            </Typography>
          </Paper>
        </Grid>

        {/* Additional Information */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Type" />
                <Typography variant="body2">{riceType || "N/A"}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Origin" />
                <Typography variant="body2">{origin || "N/A"}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Weight" />
                <Typography variant="body2">{weight || "N/A"}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Stock" />
                <Typography variant="body2">{stockQuantity} units</Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Shipping Information */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Delivery" />
                <Typography variant="body2">2-5 business days</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Shipping Fee" />
                <Typography variant="body2">
                  Free shipping on orders over $50
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Returns" />
                <Typography variant="body2">30-day return policy</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Packaging" />
                <Typography variant="body2">Eco-friendly packaging</Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
