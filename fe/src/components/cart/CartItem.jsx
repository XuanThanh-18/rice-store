import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  CardMedia,
  Tooltip,
  Paper,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { formatCurrency } from "../../utils/formatCurrency";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuantityChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      setQuantity(newValue);
    }
  };

  const handleBlur = () => {
    if (quantity !== item.quantity) {
      handleUpdateQuantity(quantity);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleUpdateQuantity(newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleUpdateQuantity(newQuantity);
  };

  const handleUpdateQuantity = async (newQuantity) => {
    setIsUpdating(true);
    try {
      await onUpdateQuantity(item.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Paper
      elevation={isHovered ? 2 : 1}
      sx={{
        mb: 2,
        borderRadius: 2,
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        border: "1px solid",
        borderColor: "divider",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Grid container alignItems="center">
        {/* Hình ảnh sản phẩm - Giảm kích thước xuống */}
        <Grid item xs={3} sm={2} lg={2} sx={{ p: 1 }}>
          <Box
            component={Link}
            to={`/products/${item.productId}`}
            sx={{
              display: "block",
              position: "relative",
              height: "80px", // Chiều cao cố định nhỏ hơn
              width: "100%",
              bgcolor: "#f5f5f5",
              borderRadius: 1,
            }}
          >
            <CardMedia
              component="img"
              image={
                item.imageUrl ||
                `https://via.placeholder.com/80?text=${item.productName}`
              }
              alt={item.productName}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>

        {/* Thông tin sản phẩm */}
        <Grid item xs={9} sm={4} lg={5}>
          <Box sx={{ px: 1 }}>
            <Typography
              component={Link}
              to={`/products/${item.productId}`}
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                textDecoration: "none",
                "&:hover": {
                  color: "primary.main",
                  textDecoration: "underline",
                },
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Đơn giá: {formatCurrency(item.unitPrice)}
            </Typography>
          </Box>
        </Grid>

        {/* Điều khiển số lượng - Đảm bảo luôn nằm trên cùng một hàng */}
        <Grid item xs={6} sm={3} lg={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", sm: "center" },
              py: 1,
              px: 1,
            }}
          >
            <IconButton
              onClick={handleDecrease}
              disabled={isUpdating || quantity <= 1}
              size="small"
              color="primary"
            >
              <RemoveCircleOutlineIcon fontSize="small" />
            </IconButton>

            <TextField
              variant="outlined"
              size="small"
              value={quantity}
              onChange={handleQuantityChange}
              onBlur={handleBlur}
              disabled={isUpdating}
              inputProps={{
                min: 1,
                style: {
                  textAlign: "center",
                  width: "32px",
                  padding: "4px 0",
                },
              }}
              sx={{
                mx: 0.5,
                "& .MuiOutlinedInput-root": {
                  height: 30,
                  minWidth: 40,
                  maxWidth: 50,
                },
              }}
            />

            <IconButton
              onClick={handleIncrease}
              disabled={isUpdating}
              size="small"
              color="primary"
            >
              <AddCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>

        {/* Thành tiền và nút xóa */}
        <Grid
          item
          xs={6}
          sm={3}
          lg={2}
          sx={{
            textAlign: "right",
            pr: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            color="primary.main"
            fontWeight="bold"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {formatCurrency(item.subtotal)}
          </Typography>

          <Typography
            variant="body1"
            color="primary.main"
            fontWeight="bold"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            {formatCurrency(item.subtotal)}
          </Typography>

          <Tooltip title="Xóa sản phẩm" arrow>
            <IconButton
              color="error"
              size="small"
              onClick={() => onRemove(item.id)}
              edge="end"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
