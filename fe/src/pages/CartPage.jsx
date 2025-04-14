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
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { toast } from "react-toastify";
import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../api/cartApi";

// Import refactored components
import CartHeader from "../components/cart/CartHeader";
import CartItemsList from "../components/cart/CartItemsList";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

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

      {/* Page Title with Cart Actions */}
      <CartHeader
        itemCount={cart.items.length}
        onClearCart={handleClearCart}
        clearingCart={clearingCart}
      />

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
        <Grid container spacing={4}>
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
      )}
    </Container>
  );
};

export default CartPage;
