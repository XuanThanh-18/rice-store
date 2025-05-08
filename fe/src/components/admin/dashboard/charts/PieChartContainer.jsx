import React from "react";
import {
  Paper,
  Typography,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import ActiveShapePieChart from "./ActiveShapePieChart";

/**
 * PieChartContainer Component
 *
 * A container component for pie charts that includes a title, divider, and loading state
 *
 * @param {Object} props
 * @param {string} props.title - Chart title
 * @param {Array} props.data - Data array for the chart
 * @param {string} props.dataKey - The key in data objects to use for values
 * @param {string} props.nameKey - The key in data objects for slice labels
 * @param {Array} props.colors - Array of colors to use for pie slices
 * @param {boolean} props.loading - Whether the chart is in loading state
 * @param {string} props.tooltipValueLabel - Label to use in tooltip for values
 * @param {number} props.height - Container height
 */
const PieChartContainer = ({
  title,
  data = [],
  dataKey = "value",
  nameKey = "name",
  colors = [],
  loading = false,
  tooltipValueLabel = "Items",
  height = 400,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: height,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      {/* Chart Title */}
      <Typography variant="h6" component="h2" gutterBottom sx={{ px: 1 }}>
        {title}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Chart Content with Loading State */}
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        {loading ? (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : data.length === 0 ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No data available
            </Typography>
          </Box>
        ) : (
          <ActiveShapePieChart
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            colors={colors}
            tooltipValueLabel={tooltipValueLabel}
          />
        )}
      </Box>
    </Paper>
  );
};

export default PieChartContainer;
