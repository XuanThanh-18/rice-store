import React from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const OrderSuccessMessage = ({ orderId }) => {
  return (
    <Paper sx={{ p: 4, mb: 4, textAlign: "center" }}>
      <CheckCircleOutlineIcon
        sx={{ fontSize: 60, color: "success.main", mb: 2 }}
      />
      <Typography variant="h5" gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography variant="body1">
        Your order has been placed successfully. Your order number is #{orderId}
        .
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        You will be redirected to the order details page shortly...
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" component={Link} to={`/orders/${orderId}`}>
          View Order Details
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderSuccessMessage;
