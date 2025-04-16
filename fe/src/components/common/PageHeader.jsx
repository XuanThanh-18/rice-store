import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";

/**
 * PageHeader Component
 * Reusable header with breadcrumbs, title, and optional action button
 */
const PageHeader = ({
  title,
  icon,
  breadcrumbs = [],
  actionText,
  onAction,
}) => {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3, mt: 2 }}
      >
        <MuiLink component={Link} to="/" color="inherit">
          Home
        </MuiLink>
        {breadcrumbs.map((crumb, index) =>
          crumb.link ? (
            <MuiLink
              key={index}
              component={Link}
              to={crumb.link}
              color="inherit"
            >
              {crumb.text}
            </MuiLink>
          ) : (
            <Typography key={index} color="text.primary">
              {crumb.text}
            </Typography>
          )
        )}
      </Breadcrumbs>

      {/* Page Title and Action Button */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {icon && React.cloneElement(icon, { sx: { mr: 1, fontSize: 28 } })}
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
        </Box>

        {actionText && onAction && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAction}
          >
            {actionText}
          </Button>
        )}
      </Box>
    </>
  );
};

export default PageHeader;
