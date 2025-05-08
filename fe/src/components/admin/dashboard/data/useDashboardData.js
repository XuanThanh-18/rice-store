import { useState, useEffect } from "react";
import { getDashboardData } from "../../../../api/orderApi";
import { getAllUsers } from "../../../../api/userApi";
import { getProducts } from "../../../../api/productApi";
import {
  calculateTotalRevenue,
  extractMonthlyRevenueData,
} from "../../../../utils/revenueCalculator";
import { useTheme } from "@mui/material";

/**
 * Custom hook to fetch and process all dashboard data
 *
 * @returns {Object} Dashboard data and state
 */
const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const theme = useTheme();

  // Colors for charts
  const chartColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  /**
   * Process order status data from API response
   * @param {Object} responseData - The data from API
   */
  const processOrderStatusData = (responseData) => {
    if (responseData && responseData.data) {
      const data = responseData.data;

      // Log the received data for debugging
      console.log("Dashboard API response:", responseData);

      // Try to access data in different possible formats
      const pendingOrders = data.pendingOrders || 0;
      const processingOrders = data.processingOrders || 0;
      const shippedOrders = data.shippedOrders || 0;
      const deliveredOrders = data.deliveredOrders || 0;
      const cancelledOrders = data.cancelledOrders || 0;

      // Create statuses array with proper values and colors
      const statuses = [
        {
          name: "Pending",
          value: pendingOrders,
          color: theme.palette.warning.main,
        },
        {
          name: "Processing",
          value: processingOrders,
          color: theme.palette.info.main,
        },
        {
          name: "Shipped",
          value: shippedOrders,
          color: theme.palette.primary.main,
        },
        {
          name: "Delivered",
          value: deliveredOrders,
          color: theme.palette.success.main,
        },
        {
          name: "Cancelled",
          value: cancelledOrders,
          color: theme.palette.error.main,
        },
      ];

      // Filter out statuses with 0 value to avoid empty segments
      const filteredStatuses = statuses.filter((status) => status.value > 0);

      // If all statuses are 0, add a placeholder
      if (filteredStatuses.length === 0) {
        filteredStatuses.push({
          name: "No Orders",
          value: 1,
          color: theme.palette.grey[400],
        });
      }

      setOrderStatusData(filteredStatuses);
    } else {
      // Fallback data if API doesn't return expected format
      setOrderStatusData([
        { name: "Pending", value: 5, color: theme.palette.warning.main },
        { name: "Processing", value: 8, color: theme.palette.info.main },
        { name: "Shipped", value: 10, color: theme.palette.primary.main },
        { name: "Delivered", value: 15, color: theme.palette.success.main },
        { name: "Cancelled", value: 3, color: theme.palette.error.main },
      ]);
    }
  };

  /**
   * Get rice type distribution for charts
   * @returns {Array} Product type distribution data
   */
  const getRiceTypeDistribution = () => {
    if (!products || products.length === 0) return [];

    // Count products by rice type
    const typeCount = {};
    products.forEach((product) => {
      if (product.riceType) {
        typeCount[product.riceType] = (typeCount[product.riceType] || 0) + 1;
      } else {
        // Handle products without rice type
        typeCount["Unspecified"] = (typeCount["Unspecified"] || 0) + 1;
      }
    });

    // Convert to array for chart data
    return Object.keys(typeCount).map((type, index) => ({
      name: type,
      value: typeCount[type],
      color: chartColors[index % chartColors.length],
    }));
  };

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
        processOrderStatusData(orderResponse.data);

        // Process revenue data
        const monthlyData = extractMonthlyRevenueData(orderResponse.data);
        setRevenueData(monthlyData);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        console.error("Error fetching dashboard data:", err);

        // Set fallback data even when there's an error
        setOrderStatusData([
          { name: "Pending", value: 5, color: theme.palette.warning.main },
          { name: "Processing", value: 8, color: theme.palette.info.main },
          { name: "Shipped", value: 10, color: theme.palette.primary.main },
          { name: "Delivered", value: 15, color: theme.palette.success.main },
          { name: "Cancelled", value: 3, color: theme.palette.error.main },
        ]);

        // Generate fallback revenue data
        setRevenueData(extractMonthlyRevenueData(null));
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [theme]);

  // Calculate dashboard metrics
  const totalCustomers = users.length;
  const totalProducts = products.length;
  const totalOrders = orderStatusData.reduce(
    (acc, item) => (item.name === "No Orders" ? acc : acc + item.value),
    0
  );
  const totalRevenue = calculateTotalRevenue(dashboardData, revenueData);
  const riceTypeData = getRiceTypeDistribution();

  return {
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
  };
};

export default useDashboardData;
