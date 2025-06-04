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
              Giỏ hàng của bạn đang rỗng
            </Typography>

            <Typography
              variant="body2"
              sx={{ maxWidth: 280, mx: "auto", mb: 3 }}
            >
              Có vẻ như bạn chưa thêm bất kỳ sản phẩm gạo nào vào giỏ hàng của
              mình!
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
              Khám Phá Các Giống Gạo Cao Cấp
            </Typography>

            <Typography
              variant="body1"
              paragraph
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Khám phá bộ sưu tập sản phẩm gạo chất lượng cao của chúng tôi từ
              khắp nơi trên thế giới. Chúng tôi có nhiều loại gạo để phù hợp với
              mọi khẩu vị và công thức.
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
                Bắt đầu mua sắm
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
                Có câu hỏi gì về sản phẩm của chúng tôi không?
              </Typography>
              <Button
                component={Link}
                to="/contact"
                variant="text"
                color="primary"
                sx={{ ml: 1, textDecoration: "underline" }}
              >
                Tương tác với chúng tôi
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EmptyCart;
