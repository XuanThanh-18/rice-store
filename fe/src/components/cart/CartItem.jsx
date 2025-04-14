import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatCurrency } from "../../utils/formatCurrency";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

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
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderRadius: 2,
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <Grid container spacing={2} alignItems="center" sx={{ p: 2 }}>
        {/* Product Image */}
        <Grid item xs={12} sm={3} md={2}>
          <CardMedia
            component="img"
            image={
              item.imageUrl ||
              `https://via.placeholder.com/100?text=${item.productName}`
            }
            alt={item.productName}
            sx={{
              height: 100,
              width: "100%",
              objectFit: "contain",
              borderRadius: 1,
            }}
          />
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} sm={5} md={6}>
          <Typography
            variant="h6"
            component={Link}
            to={`/products/${item.productId}`}
            sx={{
              textDecoration: "none",
              color: "text.primary",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {item.productName}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Unit Price: {formatCurrency(item.unitPrice)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlineIcon />}
              size="small"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </Button>
          </Box>
        </Grid>

        {/* Quantity Controls */}
        <Grid item xs={6} sm={2} md={2}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              onClick={handleDecrease}
              disabled={isUpdating || quantity <= 1}
            >
              <RemoveIcon fontSize="small" />
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
                style: { textAlign: "center", width: "40px" },
              }}
              sx={{ mx: 1 }}
            />

            <IconButton
              size="small"
              onClick={handleIncrease}
              disabled={isUpdating}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>

        {/* Price */}
        <Grid item xs={6} sm={2} md={2}>
          <Typography
            variant="h6"
            align="right"
            color="primary.main"
            fontWeight="bold"
          >
            {formatCurrency(item.subtotal)}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItem;
