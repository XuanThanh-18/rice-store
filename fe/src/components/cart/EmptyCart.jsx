import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: "center",
        borderRadius: 2,
        mt: 4,
        mb: 8,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Your cart is empty
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Looks like you haven't added any products to your cart yet.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/products"
        size="large"
        sx={{ mt: 2 }}
      >
        Start Shopping
      </Button>
    </Paper>
  );
};

export default EmptyCart;
