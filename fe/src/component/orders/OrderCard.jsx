import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatCurrency } from "../../utils/formatCurrency";
import OrderStatusBadge from "./OrderStatusBadge";
import dayjs from "dayjs";

const OrderCard = ({ order, onCancelOrder }) => {
  const { id, orderDate, totalAmount, status, items } = order;
  const itemCount = items.length;
  const formattedDate = dayjs(orderDate).format("MMM DD, YYYY");
  const canCancel = status === "PENDING" || status === "PROCESSING";

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        borderRadius: 2,
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <CardContent>
        {/* Order Header */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Order #{id}
            </Typography>
            <Typography variant="body2">Placed on {formattedDate}</Typography>
          </Grid>

          <Grid item xs={6} sm={4} sx={{ textAlign: { sm: "center" } }}>
            <OrderStatusBadge status={status} />
          </Grid>

          <Grid item xs={6} sm={4} sx={{ textAlign: "right" }}>
            <Typography variant="h6" color="primary.main">
              {formatCurrency(totalAmount)}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Order Summary */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Typography>

          {/* Preview of items */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {items.slice(0, 3).map((item) => (
              <Chip
                key={item.id}
                label={`${item.productName} (${item.quantity})`}
                variant="outlined"
                size="small"
              />
            ))}
            {items.length > 3 && (
              <Chip
                label={`+${items.length - 3} more`}
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            component={Link}
            to={`/orders/${id}`}
            variant="outlined"
            startIcon={<VisibilityIcon />}
          >
            View Details
          </Button>

          {canCancel && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => onCancelOrder(id)}
            >
              Cancel Order
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
