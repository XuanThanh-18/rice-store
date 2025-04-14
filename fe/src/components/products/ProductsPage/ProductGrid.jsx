import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "../ProductCard";

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
