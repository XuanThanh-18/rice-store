import React from "react";
import { Box } from "@mui/material";
import AdminSidebar from "../admin/AdminSidebar";

/**
 * Admin Layout Component
 * Provides consistent layout for all admin pages with sidebar
 */
const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          overflowY: "auto",
          marginLeft: { xs: 0, md: "240px" },
          width: { xs: "100%", md: "calc(100% - 240px)" },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
