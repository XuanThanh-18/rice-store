import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const EmptyResults = ({ onClearFilters }) => {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: "center",
        my: 6,
        borderRadius: 2,
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <SearchOffIcon
        sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5 }}
      />

      <Typography variant="h5" gutterBottom color="text.primary">
        No products found
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 500, mx: "auto", mb: 3 }}
      >
        We couldn't find any products matching your search criteria. Try
        adjusting your filters or browse our complete collection.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" color="primary" onClick={onClearFilters}>
          Clear All Filters
        </Button>

        <Button variant="outlined" component={Link} to="/products">
          View All Products
        </Button>
      </Box>
    </Paper>
  );
};

export default EmptyResults;
