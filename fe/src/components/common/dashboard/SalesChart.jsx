import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";

/**
 * SalesChart Component
 * Displays sales data as a line chart
 */
const SalesChart = ({ data = [], dataKey = "sales" }) => {
  const theme = useTheme();

  // Custom tooltip formatter for currency
  const formatTooltipValue = (value) => {
    return formatCurrency(value);
  };

  // No data state
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
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
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatTooltipValue} />
        <Tooltip
          formatter={formatTooltipValue}
          labelStyle={{ color: theme.palette.text.primary }}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          activeDot={{ r: 8 }}
          name="Sales"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
