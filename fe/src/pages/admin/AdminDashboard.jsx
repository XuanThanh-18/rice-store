import React from "react";
import { Grid } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";

// Import refactored components
import {
  DashboardLayout,
  StatsOverview,
  LineChartContainer,
  PieChartContainer,
  BarChartContainer,
  useDashboardData,
} from "../../components/admin/dashboard";

/**
 * AdminDashboard Page
 *
 * Main dashboard page for admins with statistics and charts
 */
const AdminDashboard = () => {
  // Use the custom hook to get all dashboard data
  const {
    loading,
    error,
    totalCustomers,
    totalProducts,
    totalOrders,
    totalRevenue,
    orderStatusData,
    revenueData,
    riceTypeData,
    chartColors,
  } = useDashboardData();

  return (
    <DashboardLayout loading={loading} error={error}>
      {/* Stats Cards */}
      <StatsOverview
        totalOrders={totalOrders}
        totalCustomers={totalCustomers}
        totalProducts={totalProducts}
        totalRevenue={totalRevenue}
        loading={loading}
      />

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Sales Chart */}
        <Grid item xs={12} md={8}>
          <LineChartContainer
            title={`Monthly Sales (${
              revenueData.length > 0
                ? `${revenueData[0].fullDate} - ${
                    revenueData[revenueData.length - 1].fullDate
                  }`
                : "Last 6 Months"
            })`}
            data={revenueData}
            xAxisDataKey="name"
            lineDataKey="sales"
            lineName="Revenue"
            tooltipFormatter={(value) => formatCurrency(value)}
            loading={loading}
          />
        </Grid>

        {/* Product Category Distribution */}
        <Grid item xs={12} md={4}>
          <PieChartContainer
            title="Product Categories"
            data={riceTypeData}
            colors={chartColors}
            tooltipValueLabel="Products"
            loading={loading}
          />
        </Grid>

        {/* Order Status Distribution */}
        <Grid item xs={12} md={6}>
          <PieChartContainer
            title="Order Status"
            data={orderStatusData}
            colors={chartColors}
            tooltipValueLabel="Orders"
            loading={loading}
          />
        </Grid>

        {/* Product Categories Bar Chart */}
        <Grid item xs={12} md={6}>
          <BarChartContainer
            title="Products by Category"
            data={riceTypeData}
            barDataKey="value"
            barName="Products"
            colors={chartColors}
            loading={loading}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminDashboard;
