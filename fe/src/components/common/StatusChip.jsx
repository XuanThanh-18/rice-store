import React from "react";
import { Chip } from "@mui/material";

/**
 * StatusChip Component
 * Displays a status chip with appropriate colors based on status
 */
const StatusChip = ({
  isActive,
  activeText = "Active",
  inactiveText = "Inactive",
  size = "small",
}) => {
  return (
    <Chip
      label={isActive ? activeText : inactiveText}
      color={isActive ? "success" : "error"}
      size={size}
      variant={isActive ? "default" : "outlined"}
    />
  );
};

export default StatusChip;
