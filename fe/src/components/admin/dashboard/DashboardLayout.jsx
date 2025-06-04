import React from "react";
import {
  Container,
  Typography,
  Box,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminLayout from "../../layout/AdminLayout";

/**
 * DashboardLayout Component
 *
 * A layout container for the admin dashboard that includes breadcrumbs,
 * title, error handling, and loading state
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The dashboard content
 * @param {boolean} props.loading - Whether the dashboard is in loading state
 * @param {string} props.error - Error message to display
 * @param {string} props.title - Dashboard title
 */
const DashboardLayout = ({
  children,
  loading = false,
  error = null,
  title = "TỔng quan quản trị",
}) => {
  // If in loading state, show a centered spinner
  if (loading) {
    return (
      <AdminLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 3, mt: 2 }}
        >
          <MuiLink component={Link} to="/" color="inherit">
            Trang chủ
          </MuiLink>
          <Typography color="text.primary">Quản trị tổng quan</Typography>
        </Breadcrumbs>

        {/* Dashboard Title */}
        <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <DashboardIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Dashboard Content */}
        {children}
      </Container>
    </AdminLayout>
  );
};

export default DashboardLayout;
