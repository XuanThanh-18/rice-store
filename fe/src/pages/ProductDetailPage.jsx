import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import OrderItem from "../components/orders/OrderItem";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";
import { getOrderById, cancelOrder } from "../api/orderApi";
import { formatCurrency } from "../utils/formatCurrency";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// Order status steps for the stepper
const orderSteps = ["Pending", "Processing", "Shipped", "Delivered"];

// Function to get active step based on order status
const getActiveStep = (status) => {
  switch (status) {
    case "PENDING":
      return 0;
    case "PROCESSING":
      return 1;
    case "SHIPPED":
      return 2;
    case "DELIVERED":
      return 3;
    default:
      return -1; // For cancelled or refunded orders
  }
};

const OrderDetailPage = () => {
  const { id } = useParams();
  //const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getOrderById(id);
        setOrder(response.data);
      } catch (err) {
        setError("Failed to load order details. Please try again later.");
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setCancelling(true);
      await cancelOrder(id);

      // Update order status in state
      setOrder((prev) => ({ ...prev, status: "CANCELLED" }));

      toast.success("Order cancelled successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
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
          to="/orders"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Orders
        </Button>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="info" sx={{ my: 4 }}>
          Order not found
        </Alert>
        <Button
          component={Link}
          to="/orders"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Orders
        </Button>
      </Container>
    );
  }

  const {
    orderDate,
    status,
    shippingAddress,
    billingAddress,
    phoneNumber,
    paymentMethod,
    paymentStatus,
    trackingNumber,
    deliveryDate,
    totalAmount,
    items,
  } = order;

  const formattedOrderDate = dayjs(orderDate).format("MMMM D, YYYY h:mm A");
  const formattedDeliveryDate = deliveryDate
    ? dayjs(deliveryDate).format("MMMM D, YYYY")
    : "Not yet delivered";

  const activeStep = getActiveStep(status);
  const isActiveOrder = status !== "CANCELLED" && status !== "REFUNDED";
  const canCancel = status === "PENDING" || status === "PROCESSING";

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
        <MuiLink component={Link} to="/orders" color="inherit">
          My Orders
        </MuiLink>
        <Typography color="text.primary">Order #{id}</Typography>
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
          <ReceiptIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h4" component="h1">
            Order Details
          </Typography>
        </Box>

        <Button
          component={Link}
          to="/orders"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Orders
        </Button>
      </Box>

      {/* Order Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Order #{id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Placed on {formattedOrderDate}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: { md: "flex-end" },
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Order Status
              </Typography>
              <OrderStatusBadge status={status} />
            </Box>
          </Grid>
        </Grid>

        {/* Order Progress Stepper */}
        {isActiveOrder && (
          <Box sx={{ mt: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {orderSteps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        {/* Cancel Order Button */}
        {canCancel && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelOrder}
              disabled={cancelling}
            >
              {cancelling ? <CircularProgress size={24} /> : "Cancel Order"}
            </Button>
          </Box>
        )}
      </Paper>

      {/* Order Items */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <Divider sx={{ my: 2 }} />

            {items.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Typography variant="h6">
                Total: {formatCurrency(totalAmount)}
              </Typography>
            </Box>
          </Paper>

          {/* Tracking Information */}
          {status === "SHIPPED" && trackingNumber && (
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Tracking Information
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" gutterBottom>
                Tracking Number: {trackingNumber}
              </Typography>

              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                // In a real app, link to tracking page
                onClick={() =>
                  window.open(
                    `https://example.com/track?number=${trackingNumber}`,
                    "_blank"
                  )
                }
              >
                Track Shipment
              </Button>
            </Paper>
          )}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />

            <List disablePadding>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Order Date" />
                <Typography variant="body2">{formattedOrderDate}</Typography>
              </ListItem>

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Payment Method" />
                <Typography variant="body2">{paymentMethod}</Typography>
              </ListItem>

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Payment Status" />
                <Typography
                  variant="body2"
                  color={paymentStatus ? "success.main" : "error"}
                >
                  {paymentStatus ? "Paid" : "Unpaid"}
                </Typography>
              </ListItem>

              {status === "DELIVERED" && (
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Delivery Date" />
                  <Typography variant="body2">
                    {formattedDeliveryDate}
                  </Typography>
                </ListItem>
              )}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>

            <Typography variant="body2" paragraph>
              {shippingAddress.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>

            <Typography variant="body2" paragraph>
              Phone: {phoneNumber}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Billing Information
            </Typography>

            <Typography variant="body2" paragraph>
              {billingAddress.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetailPage;
