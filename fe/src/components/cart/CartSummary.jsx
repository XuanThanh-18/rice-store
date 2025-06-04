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
  Card,
  CardContent,
  CardHeader,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";

const CartSummary = ({ cart }) => {
  const { totalAmount, items } = cart;

  // Calculate summary values
  // const itemCount = items.length;
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // In a real app, you would calculate these dynamically
  const shippingCost = totalAmount >= 50 ? 0 : 5.99;
  const tax = totalAmount * 0.07; // 7% tax
  const finalTotal = totalAmount + shippingCost + tax;

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardHeader
        title="Order Summary"
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          "& .MuiCardHeader-title": {
            fontSize: "1.2rem",
            fontWeight: "bold",
          },
        }}
      />

      <CardContent
        sx={{ p: 0, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <List disablePadding>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText
              primary={
                <Typography variant="body1" fontWeight="medium">
                  Tổng phụ
                </Typography>
              }
              secondary={`${totalItems} items`}
              primaryTypographyProps={{ fontWeight: "medium" }}
            />
            <Typography variant="body1" fontWeight="medium">
              {formatCurrency(totalAmount)}
            </Typography>
          </ListItem>

          <Divider variant="middle" />

          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalShippingIcon
                    sx={{ fontSize: 18, mr: 1, color: "text.secondary" }}
                  />
                  <Typography variant="body1">Shipping</Typography>
                </Box>
              }
              secondary={
                totalAmount >= 50 ? (
                  <Chip
                    label="Free Shipping"
                    size="small"
                    color="success"
                    sx={{ mt: 0.5, height: 24, fontSize: "0.75rem" }}
                  />
                ) : (
                  "Giao hàng tiêu chuẩn"
                )
              }
            />
            <Typography variant="body1">
              {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
            </Typography>
          </ListItem>

          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PaymentIcon
                    sx={{ fontSize: 18, mr: 1, color: "text.secondary" }}
                  />
                  <Typography variant="body1">Thuế dự kiến</Typography>
                </Box>
              }
            />
            <Typography variant="body1">{formatCurrency(tax)}</Typography>
          </ListItem>

          <Divider variant="middle" />

          <ListItem
            sx={{
              py: 3,
              px: 3,
              bgcolor: "grey.50",
            }}
          >
            <ListItemText
              primary={
                <Typography variant="h6" fontWeight="bold">
                  Tổng
                </Typography>
              }
            />
            <Typography
              variant="h6"
              color="primary.main"
              fontWeight="bold"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                "&::before": {
                  content: '""',
                  display: "block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "primary.main",
                  marginRight: "8px",
                },
              }}
            >
              {formatCurrency(finalTotal)}
            </Typography>
          </ListItem>
        </List>

        <Box sx={{ p: 3, mt: "auto" }}>
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<ShoppingCartCheckoutIcon />}
            endIcon={<ArrowForwardIcon />}
            disabled={items.length === 0}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s",
            }}
          >
            Tiến hành thanh toán
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
            Tiếp tục mua sắm
          </Button>
        </Box>

        <Box sx={{ px: 3, py: 2, bgcolor: "grey.50", fontSize: "0.875rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "success.main",
              mb: 1,
            }}
          >
            <VerifiedIcon sx={{ fontSize: 20, mr: 1 }} />
            <Typography variant="subtitle2" color="success.main">
              Miễn phí ship cho đơn hàng trên 50000
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Tất cả các đơn hàng được xử lý và vận chuyển trong vòng 1-2 ngày làm
            việc.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
