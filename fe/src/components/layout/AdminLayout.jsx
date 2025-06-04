import React from "react";
import { Box } from "@mui/material";
import AdminSidebar from "../admin/AdminSidebar";

// Constants for spacing
const HEADER_HEIGHT = 0; // Height of your header in pixels
const FOOTER_HEIGHT = 100; // Approximate height of your footer in pixels
const SIDEBAR_WIDTH = 240; // Width of the sidebar

/**
 * AdminLayout Component
 * Provides consistent layout for all admin pages with sidebar
 * Properly adjusts to prevent overlap with header and footer
 */
const AdminLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        marginTop: `${HEADER_HEIGHT}px`, // Add space for header
        position: "relative",
      }}
    >
      {/* Sidebar is now imported here for better control */}
      <AdminSidebar />

      {/* Main content area with proper margins */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pb: `${FOOTER_HEIGHT + 20}px`, // Extra padding at bottom to account for footer
          bgcolor: "background.default",
          // marginLeft: { xs: 0, md: `${SIDEBAR_WIDTH}px` }, // Add margin equal to sidebar width on desktop
          width: { xs: "100%", md: `calc(100% - ${SIDEBAR_WIDTH}px)` }, // Adjust width to account for sidebar
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`, // Adjust height to account for header and footer
          transition: "margin-left 0.3s ease", // Smooth transition when sidebar toggles
          overflowX: "hidden", // Prevent horizontal scrolling
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
