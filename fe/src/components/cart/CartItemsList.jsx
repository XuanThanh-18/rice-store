import React from "react";
import { Paper, Box, Grid, Typography, Divider } from "@mui/material";
import CartItem from "./CartItem";

const CartItemsList = ({ items, onUpdateQuantity, onRemove }) => {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, mb: { xs: 4, md: 0 } }}>
      {/* Cart Header */}
      <Box sx={{ p: 2, display: { xs: "none", sm: "flex" } }}>
        <Grid container>
          <Grid item sm={8} md={8}>
            <Typography variant="subtitle1" fontWeight="bold">
              Product
            </Typography>
          </Grid>
          <Grid item sm={2} md={2} sx={{ textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Quantity
            </Typography>
          </Grid>
          <Grid item sm={2} md={2} sx={{ textAlign: "right" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Subtotal
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Cart Items List */}
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </Paper>
  );
};

export default CartItemsList;
