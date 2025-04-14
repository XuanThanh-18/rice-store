import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const EmptyResults = () => {
  return (
    <Paper sx={{ p: 4, textAlign: "center", my: 6 }}>
      <Typography variant="h6" gutterBottom>
        No products found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Try adjusting your search or filter criteria
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/products"
        sx={{ mt: 3 }}
      >
        View All Products
      </Button>
    </Paper>
  );
};

export default EmptyResults;
