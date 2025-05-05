import React from "react";
import { Box, Typography, Divider, Chip } from "@mui/material";

const ProductResults = ({ count, total }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" color="text.primary" fontWeight={500}>
          Showing {count} of {total} products
        </Typography>

        <Chip
          label={`${total} Total Products`}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>
      <Divider />
    </Box>
  );
};

export default ProductResults;
