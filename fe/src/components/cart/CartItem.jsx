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
  Paper,
  Tooltip,
  Fade,
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
      elevation={isHovered ? 3 : 1}
      sx={{
        mb: 3,
        borderRadius: 2,
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-3px)" : "none",
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Grid container>
        {/* Product Image with link to product */}
        <Grid
          item
          xs={4}
          sm={3}
          sx={{
            p: 0,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: "1px",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.08)",
            },
          }}
        >
          <Box
            component={Link}
            to={`/products/${item.productId}`}
            sx={{
              display: "block",
              height: "100%",
              minHeight: { xs: 120, sm: 140 },
              backgroundColor: "#f5f5f5",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover img": {
                transform: "scale(1.1)",
              },
            }}
          >
            <CardMedia
              component="img"
              image={
                item.imageUrl ||
                `https://via.placeholder.com/140?text=${item.productName}`
              }
              alt={item.productName}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transition: "transform 0.6s ease",
              }}
            />
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={8} sm={9}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography
                component={Link}
                to={`/products/${item.productId}`}
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                {item.productName}
              </Typography>

              <Tooltip title="Remove Item" arrow placement="top">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onRemove(item.id)}
                  sx={{
                    ml: 1,
                    opacity: 0.8,
                    "&:hover": {
                      opacity: 1,
                      backgroundColor: "error.light",
                    },
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Unit Price: {formatCurrency(item.unitPrice)}
            </Typography>

            <Box
              sx={{
                mt: "auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Quantity Controls */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={handleDecrease}
                  disabled={isUpdating || quantity <= 1}
                  size="small"
                  color="primary"
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.light",
                      color: "white",
                    },
                  }}
                >
                  <RemoveCircleOutlineIcon />
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
                      width: "40px",
                      padding: "8px 0",
                    },
                  }}
                  sx={{
                    mx: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "primary.light",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />

                <IconButton
                  onClick={handleIncrease}
                  disabled={isUpdating}
                  size="small"
                  color="primary"
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.light",
                      color: "white",
                    },
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>

              {/* Price */}
              <Typography
                variant="h6"
                color="primary.main"
                fontWeight="bold"
                sx={{
                  transition: "all 0.3s ease",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                }}
              >
                {formatCurrency(item.subtotal)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
