import React from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CartItem from "./CartItem";

const CartItemsList = ({ items, onUpdateQuantity, onRemove }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%" }}>
      {/* Cart Header - Only visible on larger screens */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "grey.100",
            p: 2,
            borderRadius: "12px 12px 0 0",
            border: "1px solid",
            borderColor: "divider",
            borderBottom: "none",
          }}
        >
          <Box sx={{ width: "50%", pl: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Product
            </Typography>
          </Box>
          <Box sx={{ width: "20%", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Quantity
            </Typography>
          </Box>
          <Box sx={{ width: "30%", textAlign: "right", pr: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Subtotal
            </Typography>
          </Box>
        </Box>
      )}

      {/* Cart Items */}
      <Box
        sx={{
          borderRadius: isMobile ? 2 : "0 0 12px 12px",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <CartItem
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
            {index < items.length - 1 && (
              <Divider variant="middle" sx={{ my: 0.5 }} />
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Cart Summary - Mobile only */}
      {isMobile && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "grey.100",
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Summary:
          </Typography>
          <Box>
            <Typography variant="body2">
              {items.length} {items.length === 1 ? "item" : "items"}
            </Typography>
            <Typography variant="body2">
              {items.reduce((total, item) => total + item.quantity, 0)} units
            </Typography>
          </Box>
        </Box>
      )}

      {/* Empty State Placeholder */}
      {items.length === 0 && (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Your cart is empty
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CartItemsList;
