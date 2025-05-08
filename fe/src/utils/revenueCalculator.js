import dayjs from "dayjs";

/**
 * Helper function to calculate total revenue from the dashboard API response
 * This handles different possible data structures that might be returned
 *
 * @param {Object} dashboardData - The data returned from the API
 * @param {Array} revenueData - Processed monthly revenue data
 * @returns {number} The calculated total revenue
 */
export const calculateTotalRevenue = (dashboardData, revenueData) => {
  if (!dashboardData) return 0;

  // Case 1: Direct totalRevenue field exists
  if (
    dashboardData.data &&
    typeof dashboardData.data.totalRevenue === "number"
  ) {
    console.log(
      "Using direct totalRevenue field:",
      dashboardData.data.totalRevenue
    );
    return dashboardData.data.totalRevenue;
  }

  // Case 2: totalRevenue exists but in a different format
  if (dashboardData.data && dashboardData.data.totalRevenue) {
    const totalRevenueValue = parseFloat(dashboardData.data.totalRevenue);
    if (!isNaN(totalRevenueValue)) {
      console.log("Parsed totalRevenue from string:", totalRevenueValue);
      return totalRevenueValue;
    }
  }

  // Case 3: There's revenue field in the root
  if (typeof dashboardData.revenue === "number") {
    console.log("Using root revenue field:", dashboardData.revenue);
    return dashboardData.revenue;
  }

  // Case 4: Calculate from monthly data
  if (revenueData && revenueData.length > 0) {
    const calculatedTotal = revenueData.reduce(
      (sum, month) => sum + (month.sales || 0),
      0
    );
    console.log("Calculated total from monthly data:", calculatedTotal);
    return calculatedTotal;
  }

  // Case 5: Look for revenue in other possible locations
  const possiblePaths = [
    dashboardData.data?.revenue,
    dashboardData.data?.summary?.totalRevenue,
    dashboardData.totalRevenue,
    dashboardData.summary?.totalRevenue,
  ];

  for (const potentialValue of possiblePaths) {
    if (typeof potentialValue === "number") {
      console.log("Found revenue in alternative location:", potentialValue);
      return potentialValue;
    }
    if (potentialValue && !isNaN(parseFloat(potentialValue))) {
      const parsed = parseFloat(potentialValue);
      console.log("Parsed revenue from alternative location:", parsed);
      return parsed;
    }
  }

  // Default fallback
  console.log("Using fallback default revenue");
  return 9750;
};

/**
 * Extract monthly revenue data from the API response
 * Handles different possible data structures
 *
 * @param {Object} dashboardData - The data returned from the API
 * @returns {Array} Processed monthly revenue data array
 */
export const extractMonthlyRevenueData = (dashboardData) => {
  if (!dashboardData || !dashboardData.data) {
    return generateSampleRevenueData();
  }

  // Case 1: Direct monthlyRevenue array
  if (Array.isArray(dashboardData.data.monthlyRevenue)) {
    console.log("Using direct monthlyRevenue array");
    return dashboardData.data.monthlyRevenue.map((item) => ({
      ...item,
      sales: item.sales || item.revenue || item.value || 0,
    }));
  }

  // Case 2: revenueByMonth object
  if (
    dashboardData.data.revenueByMonth &&
    typeof dashboardData.data.revenueByMonth === "object"
  ) {
    console.log("Parsing revenueByMonth object");
    try {
      return Object.entries(dashboardData.data.revenueByMonth).map(
        ([month, revenue]) => ({
          name: month.substring(0, 3),
          fullDate: month + " " + new Date().getFullYear(),
          sales:
            typeof revenue === "number" ? revenue : parseFloat(revenue) || 0,
        })
      );
    } catch (err) {
      console.error("Error parsing revenueByMonth:", err);
    }
  }

  // Case 3: monthlyData or similar key
  const possibleArrayKeys = [
    "monthlyData",
    "monthlyRevenue",
    "revenueData",
    "salesData",
  ];
  for (const key of possibleArrayKeys) {
    const data = dashboardData.data[key] || dashboardData[key];
    if (Array.isArray(data) && data.length > 0) {
      console.log(`Found monthly data in ${key}`);
      return data.map((item) => ({
        name: item.name || item.month || "",
        fullDate: item.fullDate || item.month + " " + new Date().getFullYear(),
        sales: item.sales || item.revenue || item.value || 0,
      }));
    }
  }

  // Default: Generate sample data
  return generateSampleRevenueData();
};

/**
 * Generate sample revenue data for the last 6 months
 * Used as fallback when no real data is available
 *
 * @returns {Array} Sample monthly revenue data
 */
const generateSampleRevenueData = () => {
  console.log("Generating sample revenue data");
  const data = [];

  for (let i = 5; i >= 0; i--) {
    const month = dayjs().subtract(i, "month");
    data.push({
      name: month.format("MMM"),
      fullDate: month.format("MMM YYYY"),
      sales: Math.floor(Math.random() * 5000) + 1000,
    });
  }

  return data;
};
