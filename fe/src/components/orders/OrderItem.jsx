import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const OrderItem = ({ item }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: 1,
        },
      }}
    >
      <Grid container>
        {/* Product Image */}
        <Grid item xs={3} sm={2} sx={{ p: 2 }}>
          <CardMedia
            component="img"
            image={
              item.productImageUrl ||
              `https://via.placeholder.com/80?text=${item.productName}`
            }
            alt={item.productName}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: 80,
              objectFit: "contain",
            }}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={9} sm={10}>
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={8}>
                <Link
                  component={RouterLink}
                  to={`/products/${item.productId}`}
                  color="inherit"
                  underline="hover"
                  sx={{ fontWeight: "medium" }}
                >
                  {item.productName}
                </Link>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(item.unitPrice)} x {item.quantity}
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={4}
                sx={{ mt: { xs: 1, sm: 0 }, textAlign: { sm: "right" } }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {formatCurrency(item.subtotal)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OrderItem;
