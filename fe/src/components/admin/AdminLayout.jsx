// Modified AdminLayout.jsx to fix navbar overlap
import React from "react";
import { Box } from "@mui/material";
import AdminSidebar from "../admin/AdminSidebar";

/**
 * Admin Layout Component
 * Provides consistent layout for all admin pages with sidebar
 */
const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          minHeight: "100vh",
          width: { xs: "100%", md: "calc(100% - 240px)" },
          marginLeft: { xs: 0, md: "240px" }, // This ensures content doesn't overlap with sidebar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
