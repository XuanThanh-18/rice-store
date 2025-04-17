import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardActionArea,
  CardActions,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, price, imageUrl, origin, riceType, stockQuantity, weight } =
    product;

  const isOutOfStock = stockQuantity <= 0;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 4,
        },
      }}
    >
      {/* Make sure this Link component correctly points to the product detail page */}
      <CardActionArea component={Link} to={`/products/${id}`}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl || `https://via.placeholder.com/300?text=${name}`}
          alt={name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {name}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
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
              height: "3em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description ||
              `Premium quality ${name} from ${origin || "select regions"}.`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="h6" color="primary" fontWeight="bold">
              {formatCurrency(price)}
            </Typography>

            <Typography
              variant="body2"
              color={isOutOfStock ? "error.main" : "success.main"}
              fontWeight="medium"
            >
              {isOutOfStock ? "Out of Stock" : `In Stock: ${stockQuantity}`}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<AddShoppingCartIcon />}
          disabled={isOutOfStock}
          onClick={() => onAddToCart(id, 1)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
