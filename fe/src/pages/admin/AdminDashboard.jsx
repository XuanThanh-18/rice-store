// fe/src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getDashboardData } from "../../api/orderApi";
import { formatCurrency } from "../../utils/formatCurrency";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AdminSidebar from "../../components/admin/AdminSidebar";

// Chart component imports
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getDashboardData();
        // Access the actual dashboard data inside the response
        setDashboardData(response.data);
        console.log("dashborad data : ", response);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Sample data for charts (in a real app, this would come from the API)
  const sampleSalesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
    { name: "Jul", sales: 3490 },
  ];

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.error.main,
  ];

  // Product category distribution data
  const productCategoryData = [
    { name: "Jasmine Rice", value: 400 },
    { name: "Basmati Rice", value: 300 },
    { name: "Brown Rice", value: 200 },
    { name: "Black Rice", value: 100 },
  ];

  // Order status distribution data
  const orderStatusData = [
    { name: "Pending", value: 10 },
    { name: "Processing", value: 15 },
    { name: "Shipped", value: 25 },
    { name: "Delivered", value: 50 },
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 3, mt: 2 }}
          >
            <MuiLink component={Link} to="/" color="inherit">
              Home
            </MuiLink>
            <Typography color="text.primary">Admin Dashboard</Typography>
          </Breadcrumbs>

          {/* Dashboard Title */}
          <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
            <DashboardIcon sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h4" component="h1">
              Admin Dashboard
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  boxShadow: 2,
                  height: "100%",
                }}
              >
                <CardContent>
                  <ShoppingBagIcon fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    {dashboardData?.data?.totalOrders || 253}
                  </Typography>
                  <Typography variant="body2">Total Orders</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  bgcolor: "secondary.light",
                  color: "secondary.contrastText",
                  boxShadow: 2,
                  height: "100%",
                }}
              >
                <CardContent>
                  <PeopleIcon fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    {dashboardData?.data?.totalCustomers || 120}
                  </Typography>
                  <Typography variant="body2">Total Customers</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  bgcolor: "success.light",
                  color: "success.contrastText",
                  boxShadow: 2,
                  height: "100%",
                }}
              >
                <CardContent>
                  <InventoryIcon fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    {dashboardData?.data?.totalProducts || 45}
                  </Typography>
                  <Typography variant="body2">Total Products</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  bgcolor: "info.light",
                  color: "info.contrastText",
                  boxShadow: 2,
                  height: "100%",
                }}
              >
                <CardContent>
                  <LocalShippingIcon fontSize="large" />
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    {formatCurrency(dashboardData?.data?.totalRevenue || 25650)}
                  </Typography>
                  <Typography variant="body2">Total Revenue</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3}>
            {/* Sales Chart */}
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                  boxShadow: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ px: 1 }}
                >
                  Monthly Sales
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart
                    data={sampleSalesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Product Category Distribution */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                  boxShadow: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ px: 1 }}
                >
                  Product Categories
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive={true}
                      data={productCategoryData}
                      outerRadius={80}
                      label
                    >
                      {productCategoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Order Status Distribution */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                  boxShadow: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ px: 1 }}
                >
                  Order Status
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive={true}
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Recent Sales Performance */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 400,
                  boxShadow: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ px: 1 }}
                >
                  Sales by Category
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart
                    data={productCategoryData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="value"
                      name="Sales"
                      fill={theme.palette.primary.main}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
