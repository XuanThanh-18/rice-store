// Đây là phiên bản cải tiến của ProductGrid.jsx để hiển thị chiều rộng đồng đều
import React from "react";
import { Grid, Box } from "@mui/material";
import ProductCard from "../ProductCard";

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Grid
        container
        spacing={3}
        alignItems="stretch"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // 1 cột trên điện thoại
            sm: "repeat(2, 1fr)", // 2 cột trên tablet
            md: "repeat(3, 1fr)", // 3 cột trên desktop nhỏ
            lg: "repeat(3, 1fr)", // 3 cột trên desktop lớn
          },
          gap: 3,
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              height: "auto",
              width: "100%",
            }}
          >
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;
