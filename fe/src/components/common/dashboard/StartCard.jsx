import React from "react";
import { Card, CardContent, Typography, Box, alpha } from "@mui/material";

/**
 * StatCard Component
 * Display a statistic in a card with an icon
 */
const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  color = "primary",
  valuePrefix = "",
  valueSuffix = "",
}) => {
  return (
    <Card
      sx={{
        bgcolor: alpha((theme) => theme.palette[color].main, 0.1),
        color: (theme) => theme.palette[color].main,
        boxShadow: 2,
        height: "100%",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        {icon && React.cloneElement(icon, { fontSize: "large" })}

        <Typography
          variant="h5"
          component="div"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          {valuePrefix}
          {value}
          {valueSuffix}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
