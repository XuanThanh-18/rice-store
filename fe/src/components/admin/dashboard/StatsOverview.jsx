import React from "react";
import { Grid } from "@mui/material";
import StatCard from "./StartCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { formatCurrency } from "../../../utils/formatCurrency";

/**
 * StatsOverview Component
 *
 * Displays a grid of statistics cards with the main dashboard metrics
 *
 * @param {Object} props
 * @param {number} props.totalOrders - Total number of orders
 * @param {number} props.totalCustomers - Total number of customers
 * @param {number} props.totalProducts - Total number of products
 * @param {number} props.totalRevenue - Total revenue
 */
const StatsOverview = ({
  totalOrders = 0,
  totalCustomers = 0,
  totalProducts = 0,
  totalRevenue = 0,
  loading = false,
}) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Orders Card */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          icon={<ShoppingBagIcon />}
          title="Total Orders"
          value={loading ? "Loading..." : totalOrders}
          color="primary"
        />
      </Grid>

      {/* Customers Card */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          icon={<PeopleIcon />}
          title="Total Customers"
          value={loading ? "Loading..." : totalCustomers}
          color="secondary"
        />
      </Grid>

      {/* Products Card */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          icon={<InventoryIcon />}
          title="Total Products"
          value={loading ? "Loading..." : totalProducts}
          color="success"
        />
      </Grid>

      {/* Revenue Card */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          icon={<LocalShippingIcon />}
          title="Total Revenue"
          value={loading ? "Loading..." : formatCurrency(totalRevenue)}
          color="info"
        />
      </Grid>
    </Grid>
  );
};

export default StatsOverview;
