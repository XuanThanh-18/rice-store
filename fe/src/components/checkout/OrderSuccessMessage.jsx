import React from "react";
import {
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Link } from "react-router-dom";

const OrderSuccessMessage = ({ orderId, onViewDetails }) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "success.light",
      }}
    >
      {/* Success Header */}
      <Box
        sx={{
          p: 3,
          bgcolor: "success.main",
          color: "white",
          textAlign: "center",
          position: "relative",
        }}
      >
        <CheckCircleOutlineIcon
          sx={{
            fontSize: 60,
            mb: 2,
            color: "white",
            animation: "bounce 1.5s ease infinite",
            "@keyframes bounce": {
              "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
              "40%": { transform: "translateY(-20px)" },
              "60%": { transform: "translateY(-10px)" },
            },
          }}
        />

        <Typography variant="h4" gutterBottom fontWeight="bold">
          Thank you for your order!
        </Typography>

        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Your order has been placed successfully.
        </Typography>

        {/* Confetti-like decorations */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            width: 20,
            height: 20,
            bgcolor: "success.light",
            borderRadius: "50%",
            opacity: 0.5,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 30,
            right: 40,
            width: 15,
            height: 15,
            bgcolor: "success.light",
            borderRadius: "50%",
            opacity: 0.7,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 40,
            width: 25,
            height: 25,
            bgcolor: "success.light",
            borderRadius: "50%",
            opacity: 0.6,
          }}
        />
      </Box>

      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            {/* Order Details */}
            <Box
              sx={{
                p: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ReceiptIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Order Details</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  Order Number:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  #{orderId}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  Order Date:
                </Typography>
                <Typography variant="subtitle1">
                  {new Date().toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Payment Method:
                </Typography>
                <Typography variant="subtitle1">Credit Card</Typography>
              </Box>
            </Box>

            {/* Next Steps */}
            <Box
              sx={{
                p: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ScheduleIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">What's Next?</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: "primary.lighter",
                    color: "primary.main",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mr: 2,
                    mt: 0.5,
                  }}
                >
                  1
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Order Confirmation Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You will receive an email confirmation with your order
                    details.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: "primary.lighter",
                    color: "primary.main",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mr: 2,
                    mt: 0.5,
                  }}
                >
                  2
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Order Processing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We'll prepare your order and notify you when it ships.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    bgcolor: "primary.lighter",
                    color: "primary.main",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mr: 2,
                    mt: 0.5,
                  }}
                >
                  3
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Delivery
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your order will be delivered within 3-5 business days.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            {/* Action Buttons */}
            <Box
              sx={{
                p: 3,
                bgcolor: "primary.lighter",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "primary.light",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                color="primary.dark"
                fontWeight="medium"
              >
                Need to track or manage your order?
              </Typography>

              <Typography variant="body2" paragraph color="text.secondary">
                You can view your order details, track shipment, and manage your
                purchase from the order details page.
              </Typography>

              <Box
                sx={{
                  mt: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<VisibilityIcon />}
                  onClick={onViewDetails}
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
                  View Order Details
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/orders"
                  sx={{ fontWeight: "medium" }}
                >
                  View All Orders
                </Button>

                <Button
                  variant="text"
                  color="primary"
                  component={Link}
                  to="/"
                  startIcon={<HomeIcon />}
                  sx={{ mt: 1 }}
                >
                  Return to Home Page
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderSuccessMessage;
