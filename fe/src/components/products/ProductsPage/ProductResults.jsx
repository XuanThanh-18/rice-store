import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const ProductResults = ({ count, total }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" color="text.secondary">
        Showing {count} of {total} products
      </Typography>
      <Divider sx={{ mt: 1 }} />
    </Box>
  );
};

export default ProductResults;
