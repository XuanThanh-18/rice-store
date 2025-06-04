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
        {/* First row: Sales Chart and Product Category */}
        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
          <LineChartContainer
            title={`Doanh thu hàng tháng (${
              revenueData.length > 0
                ? `${revenueData[0].fullDate} - ${
                    revenueData[revenueData.length - 1].fullDate
                  }`
                : "Sau 6 tháng"
            })`}
            data={revenueData}
            xAxisDataKey="name"
            lineDataKey="sales"
            lineName="Doanh thu"
            tooltipFormatter={(value) => formatCurrency(value)}
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
          <PieChartContainer
            title="Product Categories"
            data={riceTypeData}
            colors={chartColors}
            tooltipValueLabel="Products"
            loading={loading}
          />
        </Grid>

        {/* Second row: Order Status and Product Categories Bar Chart */}
        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
          <PieChartContainer
            title="Order Status"
            data={orderStatusData}
            colors={chartColors}
            tooltipValueLabel="Orders"
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
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
