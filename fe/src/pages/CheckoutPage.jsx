// fe/src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../api/cartApi";
import { createOrder } from "../api/orderApi";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PaymentIcon from "@mui/icons-material/Payment";
import { toast } from "react-toastify";

// Import refactored components
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSuccessMessage from "../components/checkout/OrderSuccessMessage";

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

      const response = await createOrder(checkoutData);

      // Ensure we get a valid order ID from the response
      if (response && response.data && response.data.id) {
        const newOrderId = response.data.id;
        setOrderId(newOrderId);
        setActiveStep(2);

        // Store the order ID in session storage as a backup
        sessionStorage.setItem("lastOrderId", newOrderId);

        // Log success for debugging
        console.log("Order created successfully:", response.data);

        // Don't redirect automatically - let the user click through
        // This gives them time to see the success message
        toast.success("Your order has been placed successfully!");
      } else {
        // Handle unexpected response format
        console.error("Invalid order response format:", response);
        setError("Failed to create order: Invalid server response");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewOrderDetails = () => {
    if (orderId) {
      navigate(`/orders/${orderId}`);
    } else {
      const backupOrderId = sessionStorage.getItem("lastOrderId");
      if (backupOrderId) {
        navigate(`/orders/${backupOrderId}`);
      } else {
        navigate("/orders");
        toast.warning(
          "Could not find order details. Redirecting to orders page."
        );
      }
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
        <OrderSuccessMessage
          orderId={orderId}
          onViewDetails={handleViewOrderDetails}
        />
      )}

      {/* Checkout Form */}
      {activeStep === 1 && (
        <Paper sx={{ p: 3 }} elevation={3}>
          <CheckoutForm
            cart={cart}
            onCheckout={handleCheckout}
            loading={submitting}
          />
        </Paper>
      )}
    </Container>
  );
};

export default CheckoutPage;
