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
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../api/cartApi";
import { createOrder } from "../api/orderApi";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";

// Import refactored components
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSuccessMessage from "../components/checkout/OrderSuccessMessage";
import OrderSummary from "../components/checkout/OrderSummary";

// const steps = ["Shopping Cart", "Checkout", "Confirmation"];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

        // Show success message
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
        <Typography
          component={Link}
          to="/cart"
          color="inherit"
          sx={{ textDecoration: "none" }}
        >
          Cart
        </Typography>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <PaymentIcon
          sx={{
            mr: 1,
            fontSize: 32,
            color: "primary.main",
            animation: activeStep === 2 ? "pulse 1.5s infinite" : "none",
            "@keyframes pulse": {
              "0%": { opacity: 0.7 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0.7 },
            },
          }}
        />
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          {activeStep === 1 ? "Checkout" : "Order Confirmation"}
        </Typography>
      </Box>

      {/* Checkout Stepper */}
      <Card
        elevation={3}
        sx={{
          mb: 5,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ bgcolor: "primary.light", py: 3, px: 2 }}>
          <Stepper
            activeStep={activeStep - 1}
            alternativeLabel={!isMobile}
            orientation={isMobile ? "vertical" : "horizontal"}
          >
            <Step>
              <StepLabel
                StepIconProps={{
                  sx: { color: "#fff" },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: activeStep === 0 ? "bold" : "normal",
                    color:
                      activeStep === 0 ? "primary.contrastText" : "inherit",
                  }}
                >
                  <ShoppingCartIcon
                    fontSize="small"
                    sx={{
                      mr: 0.5,
                      verticalAlign: "middle",
                      fontSize: "1rem",
                    }}
                  />
                  Cart
                </Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                StepIconProps={{
                  sx: {
                    color: activeStep >= 1 ? "primary.main" : "inherit",
                    "& .MuiStepIcon-text": {
                      fill: activeStep >= 1 ? "#fff" : "inherit",
                    },
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: activeStep === 1 ? "bold" : "normal",
                    color: activeStep === 1 ? "primary.main" : "inherit",
                  }}
                >
                  <PaymentIcon
                    fontSize="small"
                    sx={{
                      mr: 0.5,
                      verticalAlign: "middle",
                      fontSize: "1rem",
                    }}
                  />
                  Checkout
                </Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                StepIconProps={{
                  sx: {
                    color: activeStep >= 2 ? "success.main" : "inherit",
                    "& .MuiStepIcon-text": {
                      fill: activeStep >= 2 ? "#fff" : "inherit",
                    },
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: activeStep === 2 ? "bold" : "normal",
                    color: activeStep === 2 ? "success.main" : "inherit",
                  }}
                >
                  <DoneIcon
                    fontSize="small"
                    sx={{
                      mr: 0.5,
                      verticalAlign: "middle",
                      fontSize: "1rem",
                    }}
                  />
                  Confirmation
                </Typography>
              </StepLabel>
            </Step>
          </Stepper>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
            },
          }}
        >
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

      {/* Checkout Form and Order Summary */}
      {activeStep === 1 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <CardHeader
                title="Shipping & Payment Details"
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  py: 2,
                  "& .MuiCardHeader-title": {
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  },
                }}
              />
              <CardContent>
                <CheckoutForm
                  cart={cart}
                  onCheckout={handleCheckout}
                  loading={submitting}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <OrderSummary cart={cart} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CheckoutPage;
