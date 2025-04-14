import React from "react";
import { IconButton, Badge, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartButton = ({ itemCount }) => {
  return (
    <Tooltip title="Shopping Cart">
      <IconButton
        size="large"
        color="inherit"
        component={Link}
        to="/cart"
        sx={{ ml: 1 }}
      >
        <Badge badgeContent={itemCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default CartButton;
