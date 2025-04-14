import React from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const CartSummary = ({ cart }) => {
  const { totalAmount, items } = cart;

  // Calculate summary values
  const itemCount = items.length;
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // In a real app, you would calculate these dynamically
  const shippingCost = totalAmount >= 50 ? 0 : 5.99;
  const tax = totalAmount * 0.07; // 7% tax
  const finalTotal = totalAmount + shippingCost + tax;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        position: "sticky",
        top: 24,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>

      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Subtotal" secondary={`${totalItems} items`} />
          <Typography variant="body1">{formatCurrency(totalAmount)}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Shipping"
            secondary={
              totalAmount >= 50 ? "Free shipping" : "Standard shipping"
            }
          />
          <Typography variant="body1">
            {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Estimated Tax" />
          <Typography variant="body1">{formatCurrency(tax)}</Typography>
        </ListItem>

        <Divider sx={{ my: 2 }} />

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={<Typography variant="h6">Total</Typography>} />
          <Typography variant="h6" color="primary.main">
            {formatCurrency(finalTotal)}
          </Typography>
        </ListItem>
      </List>

      <Box sx={{ mt: 3 }}>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          startIcon={<ShoppingCartCheckoutIcon />}
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </Button>

        <Button
          component={Link}
          to="/products"
          variant="outlined"
          color="primary"
          size="large"
          fullWidth
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Box>

      <Box sx={{ mt: 3, fontSize: "0.875rem" }}>
        <Typography variant="subtitle2" gutterBottom color="success.main">
          Free shipping on orders over $50
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          All orders are processed and shipped within 1-2 business days.
        </Typography>
      </Box>
    </Paper>
  );
};

export default CartSummary;
