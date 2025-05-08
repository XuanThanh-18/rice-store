import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

/**
 * StatCard Component
 *
 * A reusable card component that displays a statistic with an icon, title, and value
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - The icon to display
 * @param {string} props.title - The title/label of the statistic
 * @param {string|number} props.value - The value to display
 * @param {string} props.color - The color theme (primary, secondary, success, etc.)
 * @param {Object} props.sx - Additional Material UI sx styling
 */
const StatCard = ({ icon, title, value, color = "primary", sx = {} }) => {
  return (
    <Card
      sx={{
        bgcolor: `${color}.light`,
        color: `${color}.contrastText`,
        boxShadow: 2,
        height: "100%",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
        ...sx,
      }}
    >
      <CardContent>
        {/* Icon */}
        {icon &&
          React.cloneElement(icon, {
            fontSize: "large",
            sx: {
              color: `${color}.contrastText`,
              opacity: 0.85,
              mb: 1,
            },
          })}

        {/* Value */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            mt: 2,
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "1.7rem" },
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>

        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
