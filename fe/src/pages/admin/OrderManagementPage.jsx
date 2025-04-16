// fe/src/pages/admin/OrderManagementPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getAllOrders, updateOrderStatus } from "../../api/orderApi";
import { formatCurrency } from "../../utils/formatCurrency";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/admin/AdminSidebar";
import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import dayjs from "dayjs";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        size: rowsPerPage,
        sort: "orderDate,desc",
      };

      if (statusFilter !== "ALL") {
        params.status = statusFilter;
      }

      const response = await getAllOrders(params);
      setOrders(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
    } catch (err) {
      setError("Failed to load orders. Please try again later.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleOpenUpdateDialog = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setTrackingNumber(order.trackingNumber || "");
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setSelectedOrder(null);
    setNewStatus("");
    setTrackingNumber("");
  };

  const handleUpdateStatus = async () => {
    try {
      const updateData = {
        status: newStatus,
        ...(newStatus === "SHIPPED" && { trackingNumber }),
      };

      await updateOrderStatus(selectedOrder.id, updateData);
      handleCloseUpdateDialog();
      fetchOrders();
      toast.success("Order status updated successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update order status"
      );
    }
  };

  const statusOptions = [
    { value: "ALL", label: "All Statuses" },
    { value: "PENDING", label: "Pending" },
    { value: "PROCESSING", label: "Processing" },
    { value: "SHIPPED", label: "Shipped" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "REFUNDED", label: "Refunded" },
  ];

  const orderStatusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "PROCESSING", label: "Processing" },
    { value: "SHIPPED", label: "Shipped" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "REFUNDED", label: "Refunded" },
  ];

  if (loading && orders.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 3, mt: 2 }}
          >
            <MuiLink component={Link} to="/" color="inherit">
              Home
            </MuiLink>
            <MuiLink component={Link} to="/admin/dashboard" color="inherit">
              Admin
            </MuiLink>
            <Typography color="text.primary">Orders</Typography>
          </Breadcrumbs>

          {/* Page Title and Filter */}
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
                Order Management
              </Typography>
            </Box>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="status-filter-label">Filter Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="Filter Status"
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Orders Table */}
          <Paper
            sx={{ width: "100%", overflow: "hidden", mb: 4, boxShadow: 2 }}
          >
            <TableContainer sx={{ maxHeight: "calc(100vh - 280px)" }}>
              <Table stickyHeader aria-label="orders table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow
                        key={order.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          {dayjs(order.orderDate).format("MMM D, YYYY")}
                          <Typography variant="caption" display="block">
                            {dayjs(order.orderDate).format("h:mm A")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {order.user?.username || "Guest"}
                          <Typography variant="caption" display="block">
                            {order.phoneNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(order.totalAmount)}
                        </TableCell>
                        <TableCell>
                          <OrderStatusBadge status={order.status} />
                        </TableCell>
                        <TableCell>
                          {order.paymentStatus ? (
                            <Typography
                              variant="body2"
                              sx={{ color: "success.main" }}
                            >
                              Paid
                            </Typography>
                          ) : (
                            <Typography
                              variant="body2"
                              sx={{ color: "error.main" }}
                            >
                              Unpaid
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Tooltip title="View Order">
                              <IconButton
                                component={Link}
                                to={`/orders/${order.id}`}
                                size="small"
                                color="info"
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Update Status">
                              <IconButton
                                onClick={() => handleOpenUpdateDialog(order)}
                                size="small"
                                color="primary"
                                sx={{ ml: 1 }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          {/* Update Status Dialog */}
          <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Update status for Order #{selectedOrder?.id}
              </DialogContentText>
              <FormControl fullWidth margin="dense">
                <InputLabel id="new-status-label">Status</InputLabel>
                <Select
                  labelId="new-status-label"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  label="Status"
                >
                  {orderStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {newStatus === "SHIPPED" && (
                <TextField
                  margin="dense"
                  label="Tracking Number"
                  type="text"
                  fullWidth
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  variant="outlined"
                  helperText="Required for shipped orders"
                  required
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
              <Button
                onClick={handleUpdateStatus}
                variant="contained"
                color="primary"
                disabled={newStatus === "SHIPPED" && !trackingNumber.trim()}
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default OrderManagementPage;
