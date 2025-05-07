import React from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";

const EmptyCart = () => {
  return (
    <Card
      elevation={2}
      sx={{
        p: 0,
        textAlign: "center",
        borderRadius: 3,
        overflow: "hidden",
        mb: 8,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={5}
          sx={{ bgcolor: "primary.light", position: "relative" }}
        >
          <Box
            sx={{
              height: { xs: 200, md: "100%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
              color: "white",
              position: "relative",
              zIndex: 1,
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />

            <Typography variant="h5" gutterBottom fontWeight="bold">
              Your cart is empty
            </Typography>

            <Typography
              variant="body2"
              sx={{ maxWidth: 280, mx: "auto", mb: 3 }}
            >
              Looks like you haven't added any rice products to your cart yet!
            </Typography>
          </Box>

          {/* Decorative rice icons */}
          <RiceBowlIcon
            sx={{
              position: "absolute",
              top: "10%",
              left: "10%",
              fontSize: 40,
              opacity: 0.2,
              color: "white",
            }}
          />
          <RiceBowlIcon
            sx={{
              position: "absolute",
              bottom: "15%",
              right: "10%",
              fontSize: 50,
              opacity: 0.2,
              color: "white",
            }}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <CardContent sx={{ py: 6, px: 4 }}>
            <Typography
              variant="h5"
              gutterBottom
              color="primary.main"
              fontWeight="bold"
            >
              Discover Premium Rice Varieties
            </Typography>

            <Typography
              variant="body1"
              paragraph
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Explore our selection of high-quality rice products from around
              the world. We have numerous rice varieties to suit every taste and
              recipe.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingBagIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: "bold",
                  boxShadow: 2,
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s",
                }}
              >
                Start Shopping
              </Button>
            </Box>

            <Box
              sx={{
                mt: 5,
                pt: 3,
                borderTop: "1px dashed",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Have questions about our products?
              </Typography>
              <Button
                component={Link}
                to="/contact"
                variant="text"
                color="primary"
                sx={{ ml: 1, textDecoration: "underline" }}
              >
                Contact Us
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EmptyCart;
