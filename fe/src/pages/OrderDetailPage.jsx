// fe/src/pages/OrderDetailPage.jsx
import React, { useState, useEffect, useContext } from "react";
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import OrderItem from "../components/orders/OrderItem";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";
import { getOrderById, cancelOrder, updateOrderStatus } from "../api/orderApi";
import { formatCurrency } from "../utils/formatCurrency";
import { AuthContext } from "../contexts/AuthContext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
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
  //   const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  // Admin-specific states
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getOrderById(id);
      setOrder(response.data);

      // Set initial values for admin update dialog
      if (response.data) {
        setNewStatus(response.data.status);
        setTrackingNumber(response.data.trackingNumber || "");
      }
    } catch (err) {
      setError("Failed to load order details. Please try again later.");
      console.error("Error fetching order details:", err);
    } finally {
      setLoading(false);
    }
  };

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

  // Admin functions for updating order
  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdateOrder = async () => {
    try {
      const updateData = {
        status: newStatus,
        ...(newStatus === "SHIPPED" && { trackingNumber }),
      };

      await updateOrderStatus(id, updateData);
      handleCloseUpdateDialog();
      fetchOrderDetails();
      toast.success("Order updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update order");
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
    trackingNumber: orderTrackingNumber,
    deliveryDate,
    totalAmount,
    items,
    user: orderUser,
  } = order;

  const formattedOrderDate = dayjs(orderDate).format("MMMM D, YYYY h:mm A");
  const formattedDeliveryDate = deliveryDate
    ? dayjs(deliveryDate).format("MMMM D, YYYY")
    : "Not yet delivered";

  const activeStep = getActiveStep(status);
  const isActiveOrder = status !== "CANCELLED" && status !== "REFUNDED";
  const canCancel = status === "PENDING" || status === "PROCESSING";

  // Status options for admin update
  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "PROCESSING", label: "Processing" },
    { value: "SHIPPED", label: "Shipped" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "REFUNDED", label: "Refunded" },
  ];

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
        {isAdmin ? (
          <MuiLink component={Link} to="/admin/orders" color="inherit">
            Manage Orders
          </MuiLink>
        ) : (
          <MuiLink component={Link} to="/orders" color="inherit">
            My Orders
          </MuiLink>
        )}
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
          to={isAdmin ? "/admin/orders" : "/orders"}
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          {isAdmin ? "Back to Order Management" : "Back to My Orders"}
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
            {isAdmin && orderUser && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Customer: {orderUser.username} ({orderUser.email})
              </Typography>
            )}
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

        {/* Admin Update Button / Cancel Order Button */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          {isAdmin ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenUpdateDialog}
            >
              Update Order
            </Button>
          ) : (
            canCancel && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancelOrder}
                disabled={cancelling}
              >
                {cancelling ? <CircularProgress size={24} /> : "Cancel Order"}
              </Button>
            )
          )}
        </Box>
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
          {status === "SHIPPED" && orderTrackingNumber && (
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Tracking Information
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalShippingIcon sx={{ mr: 2, color: "primary.main" }} />
                <Box>
                  <Typography variant="body1" gutterBottom>
                    Tracking Number: {orderTrackingNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your order has been shipped and is on its way to you.
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                // In a real app, link to tracking page
                onClick={() =>
                  window.open(
                    `https://example.com/track?number=${orderTrackingNumber}`,
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

      {/* Admin Update Order Dialog */}
      {isAdmin && (
        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogContent>
            <Box sx={{ minWidth: 400, mt: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Order #{id}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Current Status: <OrderStatusBadge status={status} />
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  New Status:
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                  margin="dense"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Box>

              {newStatus === "SHIPPED" && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Tracking Number:
                  </Typography>
                  <TextField
                    fullWidth
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    variant="outlined"
                    placeholder="Enter tracking number"
                    margin="dense"
                    helperText="Required for shipped orders"
                    required
                  />
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
            <Button
              onClick={handleUpdateOrder}
              variant="contained"
              color="primary"
              disabled={newStatus === "SHIPPED" && !trackingNumber.trim()}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default OrderDetailPage;
