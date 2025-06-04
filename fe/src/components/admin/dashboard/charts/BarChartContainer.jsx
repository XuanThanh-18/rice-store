import React from "react";
import {
  Paper,
  Typography,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

/**
 * BarChartContainer Component
 *
 * A container component for bar charts that includes a title, divider, and loading state
 *
 * @param {Object} props
 * @param {string} props.title - Chart title
 * @param {Array} props.data - Data array for the chart
 * @param {string} props.xAxisDataKey - The key for x-axis data
 * @param {string} props.barDataKey - The key for bar data values
 * @param {string} props.barName - Display name for the bar series
 * @param {Array} props.colors - Array of colors to use for bars
 * @param {function} props.tooltipFormatter - Function to format tooltip values
 * @param {boolean} props.loading - Whether the chart is in loading state
 * @param {number} props.height - Container height
 */
const BarChartContainer = ({
  title,
  data = [],
  xAxisDataKey = "name",
  barDataKey = "value",
  barName = "Value",
  colors = [],
  tooltipFormatter,
  loading = false,
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
              Dữ liệu không có sẵn
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height="85%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              <Bar dataKey={barDataKey} name={barName} radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Paper>
  );
};

export default BarChartContainer;
