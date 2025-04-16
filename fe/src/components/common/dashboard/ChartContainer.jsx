import React from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";

/**
 * ChartContainer Component
 * Wrapper for charts with consistent styling and a title
 */
const ChartContainer = ({
  title,
  children,
  height = 400,
  minHeight,
  action,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: height,
        minHeight: minHeight,
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          mb: 1,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        {action && <Box>{action}</Box>}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>{children}</Box>
    </Paper>
  );
};

export default ChartContainer;
