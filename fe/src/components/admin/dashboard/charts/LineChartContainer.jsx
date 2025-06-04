import React from "react";
import {
  Paper,
  Typography,
  Divider,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * LineChartContainer Component
 *
 * A container component for line charts that includes a title, divider, and loading state
 *
 * @param {Object} props
 * @param {string} props.title - Chart title
 * @param {Array} props.data - Data array for the chart
 * @param {string} props.xAxisDataKey - The key for x-axis data
 * @param {string} props.lineDataKey - The key for line data values
 * @param {string} props.lineName - Display name for the line
 * @param {string} props.lineColor - Color for the line
 * @param {function} props.tooltipFormatter - Function to format tooltip values
 * @param {boolean} props.loading - Whether the chart is in loading state
 * @param {number} props.height - Container height
 */
const LineChartContainer = ({
  title,
  data = [],
  xAxisDataKey = "name",
  lineDataKey = "value",
  lineName = "Value",
  lineColor,
  tooltipFormatter,
  loading = false,
  height = 400,
}) => {
  const theme = useTheme();

  // Use provided color or default from theme
  const color = lineColor || theme.palette.primary.main;

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
            <LineChart
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
              <Line
                type="monotone"
                dataKey={lineDataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
                name={lineName}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Paper>
  );
};

export default LineChartContainer;
