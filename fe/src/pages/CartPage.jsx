import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../api/cartApi";

// Import refactored components
import CartItemsList from "../components/cart/CartItemsList";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

// const steps = ["Shopping Cart", "Checkout", "Confirmation"];

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearingCart, setClearingCart] = useState(false);

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
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Typography
          component={Link}
          to="/"
          color="inherit"
          sx={{ textDecoration: "none" }}
        >
          Home
        </Typography>
        <Typography color="text.primary">Shopping Cart</Typography>
      </Breadcrumbs>

      {/* Checkout Progress */}
      <Box sx={{ mb: 5, mt: 3 }}>
        <Stepper activeStep={0} alternativeLabel>
          <Step>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: "primary.main",
                  "& .MuiStepIcon-text": { fill: "#fff" },
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                Cart
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant="body2">Checkout</Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant="body2">Confirmation</Typography>
            </StepLabel>
          </Step>
        </Stepper>
      </Box>

      {/* Page Title with Cart Actions */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ShoppingCartIcon
            sx={{ mr: 1, fontSize: 32, color: "primary.main" }}
          />
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Your Shopping Cart
          </Typography>
        </Box>

        {cart.items.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearCart}
            disabled={clearingCart}
            size="small"
            sx={{ px: 2, py: 1 }}
          >
            {clearingCart ? "Clearing..." : "Clear Cart"}
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
      {cart.items.length === 0 && !loading && <EmptyCart />}

      {/* Cart Contents */}
      {cart.items.length > 0 && (
        <Card
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            mb: 5,
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, bgcolor: "primary.main" }}>
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Cart Items ({cart.items.length})
              </Typography>
            </Box>

            <Grid container spacing={4} sx={{ p: 3 }}>
              {/* Cart Items */}
              <Grid item xs={12} md={8}>
                <CartItemsList
                  items={cart.items}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              </Grid>

              {/* Cart Summary */}
              <Grid item xs={12} md={4}>
                <CartSummary cart={cart} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default CartPage;
