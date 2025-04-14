import React from "react";
import { Chip } from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  Cancel as CancelledIcon,
  Pending as PendingIcon,
  Restore as ProcessingIcon,
  Refresh as RefundedIcon,
} from "@mui/icons-material";

const OrderStatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "PENDING":
        return {
          label: "Pending",
          color: "warning",
          icon: <PendingIcon fontSize="small" />,
        };
      case "PROCESSING":
        return {
          label: "Processing",
          color: "info",
          icon: <ProcessingIcon fontSize="small" />,
        };
      case "SHIPPED":
        return {
          label: "Shipped",
          color: "primary",
          icon: <ShippingIcon fontSize="small" />,
        };
      case "DELIVERED":
        return {
          label: "Delivered",
          color: "success",
          icon: <DeliveredIcon fontSize="small" />,
        };
      case "CANCELLED":
        return {
          label: "Cancelled",
          color: "error",
          icon: <CancelledIcon fontSize="small" />,
        };
      case "REFUNDED":
        return {
          label: "Refunded",
          color: "secondary",
          icon: <RefundedIcon fontSize="small" />,
        };
      default:
        return {
          label: status,
          color: "default",
          icon: null,
        };
    }
  };

  const { label, color, icon } = getStatusConfig();

  return (
    <Chip
      label={label}
      color={color}
      icon={icon}
      size="small"
      sx={{ fontWeight: "medium" }}
    />
  );
};

export default OrderStatusBadge;
