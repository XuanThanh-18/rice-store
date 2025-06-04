import React from "react";
import { Box, Typography, Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartHeader = ({ itemCount, onClearCart, clearingCart }) => {
  return (
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
          Giỏ hàng mua sắm
        </Typography>
        {itemCount > 0 && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ ml: 2 }}>
            ({itemCount} {itemCount === 1 ? "item" : "items"})
          </Typography>
        )}
      </Box>

      {itemCount > 0 && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlineIcon />}
          onClick={onClearCart}
          disabled={clearingCart}
        >
          Xóa giỏ hàng
        </Button>
      )}
    </Box>
  );
};

export default CartHeader;
