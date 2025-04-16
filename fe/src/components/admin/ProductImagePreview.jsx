import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

/**
 * Component hiển thị preview ảnh sản phẩm
 * Hiển thị ảnh từ URL hoặc placeholder nếu không có ảnh
 */
const ProductImagePreview = ({ imageUrl, productName = "Product" }) => {
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Image Preview
      </Typography>

      {imageUrl ? (
        <Paper
          component="img"
          src={imageUrl}
          alt={`${productName} preview`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/200?text=Invalid+Image+URL";
          }}
          sx={{
            maxHeight: 200,
            maxWidth: "100%",
            objectFit: "contain",
            borderRadius: 1,
            border: "1px solid #eee",
          }}
        />
      ) : (
        <Paper
          sx={{
            height: 200,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            bgcolor: "grey.100",
            border: "1px dashed #ccc",
          }}
        >
          <ImageIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            No image URL provided
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ProductImagePreview;
