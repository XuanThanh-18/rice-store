import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CartItem from "./CartItem";

const CartItemsList = ({ items, onUpdateQuantity, onRemove }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tiêu đề giỏ hàng - chỉ hiện trên màn hình lớn */}
      {!isMobile && (
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "background.default",
            p: 2,
            mb: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ width: "2%" }}></Box>
          <Box sx={{ width: "45%", pl: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Sản phẩm
            </Typography>
          </Box>
          <Box sx={{ width: "25%", textAlign: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Số lượng
            </Typography>
          </Box>
          <Box sx={{ width: "25%", textAlign: "right", pr: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Thành tiền
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Danh sách sản phẩm trong giỏ hàng */}
      <Box sx={{ mb: 3 }}>
        {items.length > 0 ? (
          items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))
        ) : (
          <Paper
            sx={{
              py: 6,
              textAlign: "center",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Giỏ hàng của bạn đang trống
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Tổng kết giỏ hàng - chỉ hiện trên mobile */}
      {isMobile && items.length > 0 && (
        <Paper
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "background.default",
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle1" fontWeight="medium">
            Tổng số:
          </Typography>
          <Box>
            <Typography variant="body2">
              {items.length} {items.length === 1 ? "sản phẩm" : "sản phẩm"}
            </Typography>
            <Typography variant="body2">
              {items.reduce((total, item) => total + item.quantity, 0)} đơn vị
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default CartItemsList;
