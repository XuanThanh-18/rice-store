import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  useTheme,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getDashboardData } from "../../api/orderApi";
import { getAllUsers } from "../../api/userApi";
import { getProducts } from "../../api/productApi";
import { formatCurrency } from "../../utils/formatCurrency";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AdminSidebar from "../../components/admin/AdminSidebar";
import dayjs from "dayjs";

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
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const theme = useTheme();

  // Colors for charts
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dashboard metrics data
        const orderResponse = await getDashboardData();
        setDashboardData(orderResponse.data);

        // Fetch users data for user count
        const usersResponse = await getAllUsers({ page: 0, size: 100 });
        setUsers(usersResponse.data.content || []);

        // Fetch products data for product count and category distribution
        const productsResponse = await getProducts({ page: 0, size: 100 });
        setProducts(productsResponse.content || []);

        // Process order status data for pie chart
        if (orderResponse.data && orderResponse.data.data) {
          const statuses = [
            {
              name: "Pending",
              value: orderResponse.data.data.pendingOrders || 0,
            },
            {
              name: "Processing",
              value: orderResponse.data.data.processingOrders || 0,
            },
            {
              name: "Shipped",
              value: orderResponse.data.data.shippedOrders || 0,
            },
            {
              name: "Delivered",
              value: orderResponse.data.data.deliveredOrders || 0,
            },
            {
              name: "Cancelled",
              value: orderResponse.data.data.cancelledOrders || 0,
            },
          ];
          setOrderStatusData(statuses);
        }

        // Generate revenue data (in a real app, this would come from API)
        generateRevenueData();
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Function to generate revenue data based on month using dayjs
  const generateRevenueData = () => {
    // Generate last 6 months of data
    const data = [];
    for (let i = 5; i >= 0; i--) {
      // Use dayjs to get proper month names and handle date calculations
      const month = dayjs().subtract(i, "month");
      data.push({
        name: month.format("MMM"),
        fullDate: month.format("MMM YYYY"),
        sales: Math.floor(Math.random() * 5000) + 1000,
      });
    }

    setRevenueData(data);
  };

  // Get rice type distribution for charts
  const getRiceTypeDistribution = () => {
    if (!products || products.length === 0) return [];

    // Count products by rice type
    const typeCount = {};
    products.forEach((product) => {
      if (product.riceType) {
        typeCount[product.riceType] = (typeCount[product.riceType] || 0) + 1;
      }
    });

    // Convert to array for chart data
    return Object.keys(typeCount).map((type) => ({
      name: type,
      value: typeCount[type],
    }));
  };

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

  // Calculate totals and metrics
  const totalCustomers = users.length;
  const totalProducts = products.length;
  const totalOrders = orderStatusData.reduce(
    (acc, item) => acc + item.value,
    0
  );
  const totalRevenue = dashboardData?.data?.totalRevenue || 0;

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      {/* Main content area with proper margin to avoid overlap */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          minHeight: "100vh",
          width: { xs: "100%", md: "calc(100% - 240px)" },
          // marginLeft: { xs: 0, md: "240px" }, // Add proper margin to prevent overlap
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

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

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
                    {totalOrders}
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
                    {totalCustomers}
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
                    {totalProducts}
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
                    {formatCurrency(totalRevenue)}
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
                  Monthly Sales (
                  {revenueData.length > 0
                    ? `${revenueData[0].fullDate} - ${
                        revenueData[revenueData.length - 1].fullDate
                      }`
                    : "Last 6 Months"}
                  )
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart
                    data={revenueData}
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
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Revenue"
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
                      data={getRiceTypeDistribution()}
                      outerRadius={80}
                      label={(entry) => entry.name}
                    >
                      {getRiceTypeDistribution().map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, "Products"]} />
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
                      label={(entry) => entry.name}
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, "Orders"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Product Categories Bar Chart */}
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
                  Products by Category
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart
                    data={getRiceTypeDistribution()}
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
                      name="Products"
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
