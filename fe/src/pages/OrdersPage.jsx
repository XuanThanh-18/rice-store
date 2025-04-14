import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Tab,
  Tabs,
  Paper,
  CircularProgress,
  Alert,
  Pagination,
  Breadcrumbs,
  Link as MuiLink,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import OrderCard from "../components/orders/OrderCard";
import { getOrders, cancelOrder } from "../api/orderApi";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState("ALL");
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [page, status]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        size: 10,
        sort: "orderDate,desc",
      };

      // Add status filter if not "ALL"
      if (status !== "ALL") {
        params.status = status;
      }

      const response = await getOrders(params);
      setOrders(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (err) {
      setError("Failed to load orders. Please try again later.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStatusChange = (event, newValue) => {
    setStatus(newValue);
    setPage(0);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setCancelling(orderId);
      await cancelOrder(orderId);

      // Update the order in the list
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: "CANCELLED" } : order
        )
      );

      toast.success("Order cancelled successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(null);
    }
  };

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
        <Typography color="text.primary">My Orders</Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <ReceiptIcon sx={{ mr: 1, fontSize: 28 }} />
        <Typography variant="h4" component="h1">
          My Orders
        </Typography>
      </Box>

      {/* Status Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={status}
          onChange={handleStatusChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Orders" value="ALL" />
          <Tab label="Pending" value="PENDING" />
          <Tab label="Processing" value="PROCESSING" />
          <Tab label="Shipped" value="SHIPPED" />
          <Tab label="Delivered" value="DELIVERED" />
          <Tab label="Cancelled" value="CANCELLED" />
        </Tabs>
      </Paper>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" my={8}>
          <CircularProgress />
        </Box>
      )}

      {/* No Orders */}
      {!loading && orders.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center", my: 4 }}>
          <Typography variant="h6" gutterBottom>
            No orders found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {status === "ALL"
              ? "You haven't placed any orders yet."
              : `You don't have any ${status.toLowerCase()} orders.`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/products"
            sx={{ mt: 2 }}
          >
            Start Shopping
          </Button>
        </Paper>
      )}

      {/* Orders List */}
      {!loading && orders.length > 0 && (
        <>
          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid item xs={12} key={order.id}>
                <OrderCard
                  order={order}
                  onCancelOrder={handleCancelOrder}
                  cancelling={cancelling === order.id}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default OrdersPage;
