import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Box,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProductListItem = ({ product, onAddToCart }) => {
  const {
    id,
    name,
    price,
    imageUrl,
    origin,
    riceType,
    stockQuantity,
    weight,
    description,
  } = product;
  const isOutOfStock = stockQuantity <= 0;
  const [hover, setHover] = useState(false);

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{
          py: 2,
          px: 3,
          bgcolor: hover ? "action.hover" : "transparent",
          transition: "background-color 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <ListItemAvatar sx={{ minWidth: 80 }}>
          <Avatar
            variant="rounded"
            src={imageUrl || `https://via.placeholder.com/100?text=${name}`}
            alt={name}
            sx={{ width: 80, height: 80 }}
          />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography
              variant="h6"
              component={Link}
              to={`/products/${id}`}
              sx={{
                color: "text.primary",
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              {name}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  mt: 1,
                  mb: 1,
                }}
              >
                {origin && (
                  <Chip
                    label={origin}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: "0.75rem" }}
                  />
                )}
                {riceType && (
                  <Chip
                    label={riceType}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ fontSize: "0.75rem" }}
                  />
                )}
                {weight && (
                  <Chip
                    label={weight}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: "0.75rem" }}
                  />
                )}
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {description ||
                  `Premium quality ${name} from ${origin || "select regions"}.`}
              </Typography>
            </React.Fragment>
          }
          sx={{ ml: 2 }}
        />

        <Box
          sx={{
            ml: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            minWidth: 150,
          }}
        >
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            {formatCurrency(price)}
          </Typography>

          <Typography
            variant="body2"
            color={isOutOfStock ? "error.main" : "success.main"}
            sx={{ mt: 1, mb: 2 }}
          >
            {isOutOfStock ? "Out of Stock" : `In Stock: ${stockQuantity}`}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              component={Link}
              to={`/products/${id}`}
              size="small"
              color="info"
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>

            <Button
              variant="contained"
              size="small"
              startIcon={<AddShoppingCartIcon />}
              disabled={isOutOfStock}
              onClick={() => onAddToCart(id, 1)}
            >
              Add
            </Button>
          </Box>
        </Box>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  );
};

export default ProductListItem;
