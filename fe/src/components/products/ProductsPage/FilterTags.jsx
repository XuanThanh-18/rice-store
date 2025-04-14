import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const FilterTags = ({ filterTitles }) => {
  if (filterTitles.length === 0) return null;

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
      <Typography variant="subtitle2" component="div" gutterBottom>
        Applied Filters:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {filterTitles.map((title, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: "primary.light",
              color: "primary.contrastText",
              borderRadius: 1,
              px: 1,
              py: 0.5,
              fontSize: "0.875rem",
            }}
          >
            {title}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default FilterTags;
