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
          Cảm ơn bạn đã đặt hàng!
        </Typography>

        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Đơn hàng của bạn đã được đặt thành công.
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
                <Typography variant="h6">Chi tiết đơn hàng</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  Số đơn hàng:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  #{orderId}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  Ngày đặt hàng:
                </Typography>
                <Typography variant="subtitle1">
                  {new Date().toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Phương thức thanh toán:
                </Typography>
                <Typography variant="subtitle1">Thẻ thanh toán</Typography>
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
                <Typography variant="h6">Cái gì tiếp theo</Typography>
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
                    Email xác nhận đơn hàng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bạn sẽ nhận được một email xác nhận với chi tiết đơn hàng
                    của bạn.
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
                    Xử lý đơn hàng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chúng tôi sẽ chuẩn bị đơn hàng của bạn và thông báo cho bạn
                    khi nó được giao.
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
                    Giao hàng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đơn hàng của bạn sẽ được giao trong vòng 3-5 ngày làm việc.
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
                Cần theo dõi hoặc quản lý đơn hàng của bạn?
              </Typography>

              <Typography variant="body2" paragraph color="text.secondary">
                Bạn có thể xem chi tiết đơn hàng, theo dõi lô hàng và quản lý
                việc mua của bạn từ trang chi tiết đơn hàng.
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
                  Xem chi tiết đơn hàng
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/orders"
                  sx={{ fontWeight: "medium" }}
                >
                  Xem tất cả đơn hàng
                </Button>

                <Button
                  variant="text"
                  color="primary"
                  component={Link}
                  to="/"
                  startIcon={<HomeIcon />}
                  sx={{ mt: 1 }}
                >
                  Trở lại trang chủ
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
