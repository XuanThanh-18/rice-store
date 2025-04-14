import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Button,
  CircularProgress,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CheckoutForm from "../components/checkout/CheckoutForm";
import { getCart } from "../api/cartApi";
import { createOrder } from "../api/orderApi";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const steps = ["Shopping Cart", "Checkout", "Order Confirmation"];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getCart();
        const cartData = response.data || { items: [], totalAmount: 0 };

        setCart(cartData);

        // Redirect to cart if cart is empty
        if (cartData.items.length === 0) {
          navigate("/cart");
        }
      } catch (err) {
        setError("Failed to load cart data. Please try again.");
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleCheckout = async (checkoutData) => {
    try {
      setSubmitting(true);
      setError(null);

      const orderData = await createOrder(checkoutData);
      setOrderId(orderData.id);
      setActiveStep(2);

      // Redirect to order confirmation after a delay
      setTimeout(() => {
        navigate(`/orders/${orderData.id}`);
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create order. Please try again."
      );
      console.error("Error creating order:", err);
    } finally {
      setSubmitting(false);
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
        <MuiLink component={Link} to="/cart" color="inherit">
          Cart
        </MuiLink>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <PaymentIcon sx={{ mr: 1, fontSize: 28 }} />
        <Typography variant="h4" component="h1">
          Checkout
        </Typography>
      </Box>

      {/* Checkout Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Order Success Message */}
      {activeStep === 2 && (
        <Paper sx={{ p: 4, mb: 4, textAlign: "center" }}>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 60, color: "success.main", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Thank you for your order!
          </Typography>
          <Typography variant="body1">
            Your order has been placed successfully. Your order number is #
            {orderId}.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            You will be redirected to the order details page shortly...
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              component={Link}
              to={`/orders/${orderId}`}
            >
              View Order Details
            </Button>
          </Box>
        </Paper>
      )}

      {/* Checkout Form */}
      {activeStep === 1 && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }} elevation={3}>
              <CheckoutForm
                cart={cart}
                onCheckout={handleCheckout}
                loading={submitting}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CheckoutPage;
