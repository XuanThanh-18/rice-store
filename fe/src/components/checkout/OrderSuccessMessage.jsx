import React from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";

const OrderSuccessMessage = ({ orderId, onViewDetails }) => {
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
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        You can view your order details and track your shipment from the order
        details page.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={onViewDetails}
        >
          View Order Details
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderSuccessMessage;
