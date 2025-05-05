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
        width: "100%",
        height: "auto", // Chiều cao cố định cho tất cả card
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      {/* Phần hình ảnh với chiều cao cố định */}
      <CardActionArea
        component={Link}
        to={`/products/${id}`}
        sx={{ flexGrow: 0, height: 200 }} // Chiều cao cố định cho phần ảnh
      >
        <CardMedia
          component="img"
          sx={{
            height: 200,
            objectFit: "contain",
            backgroundColor: "#f5f5f5",
          }}
          image={imageUrl || `https://via.placeholder.com/300?text=${name}`}
          alt={name}
        />
      </CardActionArea>

      {/* Phần nội dung với chiều cao cố định */}
      <CardContent sx={{ p: 2, flexGrow: 1, height: "auto" }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            height: 28, // Chiều cao cố định cho tiêu đề
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            mb: 1,
          }}
        >
          {name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            mb: 1.5,
            height: 24, // Chiều cao cố định cho container chứa chip
            overflow: "hidden",
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
            height: 40, // Chiều cao cố định cho mô tả
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 2,
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
            mt: 1,
          }}
        >
          <Typography variant="h6" color="primary.main" fontWeight="bold">
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

      {/* Phần nút với chiều cao cố định */}
      <CardActions sx={{ p: 2, pt: 0, height: 60 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<AddShoppingCartIcon />}
          disabled={isOutOfStock}
          onClick={() => onAddToCart(id, 1)}
          sx={{ borderRadius: 2 }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
