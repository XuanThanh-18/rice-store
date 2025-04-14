// src/pages/CartPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../api/cartApi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearingCart, setClearingCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCart();
      setCart(response.data || { items: [], totalAmount: 0 });
    } catch (err) {
      setError("Failed to load your cart. Please try again later.");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    try {
      await updateCartItem(cartItemId, quantity);
      // Refresh cart to get updated subtotals
      await fetchCart();
      toast.success("Cart updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update cart");
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      await fetchCart();
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to remove item from cart"
      );
    }
  };

  const handleClearCart = async () => {
    try {
      setClearingCart(true);
      await clearCart();
      setCart({ items: [], totalAmount: 0 });
      toast.success("Cart cleared successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to clear cart");
    } finally {
      setClearingCart(false);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          py: 8,
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

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
        <Typography color="text.primary">Shopping Cart</Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ShoppingCartIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h4" component="h1">
            Shopping Cart
          </Typography>
          {cart.items.length > 0 && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ ml: 2 }}
            >
              ({cart.items.length} {cart.items.length === 1 ? "item" : "items"})
            </Typography>
          )}
        </Box>

        {cart.items.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleClearCart}
            disabled={clearingCart}
          >
            Clear Cart
          </Button>
        )}
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Empty Cart */}
      {cart.items.length === 0 && !loading && (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
            mt: 4,
            mb: 8,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any products to your cart yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/products"
            size="large"
            sx={{ mt: 2 }}
          >
            Start Shopping
          </Button>
        </Paper>
      )}

      {/* Cart Contents */}
      {cart.items.length > 0 && (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, borderRadius: 2, mb: { xs: 4, md: 0 } }}>
              {/* Cart Header */}
              <Box sx={{ p: 2, display: { xs: "none", sm: "flex" } }}>
                <Grid container>
                  <Grid item sm={8} md={8}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Product
                    </Typography>
                  </Grid>
                  <Grid item sm={2} md={2} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Quantity
                    </Typography>
                  </Grid>
                  <Grid item sm={2} md={2} sx={{ textAlign: "right" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Subtotal
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Cart Items List */}
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </Paper>
          </Grid>

          {/* Cart Summary */}
          <Grid item xs={12} md={4}>
            <CartSummary cart={cart} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;
