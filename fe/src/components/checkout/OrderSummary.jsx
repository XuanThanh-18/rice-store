import React from "react";
import { Grid, Typography, Divider, Paper } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";

const OrderSummary = ({ cart }) => {
  const { totalAmount, items } = cart;
  const shippingCost = totalAmount >= 50 ? 0 : 5.99;
  const tax = totalAmount * 0.07; // 7% tax
  const finalTotal = totalAmount + shippingCost + tax;

  return (
    <>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="body1">
                Subtotal ({items.length} items):
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "right" }}>
              <Typography variant="body1">
                {formatCurrency(totalAmount)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="body1">Shipping:</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "right" }}>
              <Typography variant="body1">
                {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="body1">Estimated Tax:</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "right" }}>
              <Typography variant="body1">{formatCurrency(tax)}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid item xs={8}>
              <Typography variant="h6">Total:</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "right" }}>
              <Typography variant="h6" color="primary.main">
                {formatCurrency(finalTotal)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default OrderSummary;
