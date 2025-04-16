import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Jasmine Rice", path: "/products?riceType=Jasmine%20Rice" },
        { name: "Basmati Rice", path: "/products?riceType=Basmati%20Rice" },
        { name: "Brown Rice", path: "/products?riceType=Brown%20Rice" },
        { name: "Black Rice", path: "/products?riceType=Black%20Rice" },
        { name: "View All", path: "/products" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "My Account", path: "/profile" },
        { name: "Track Order", path: "/orders" },
        { name: "Shipping Policy", path: "/shipping" },
        { name: "Returns & Refunds", path: "/returns" },
        { name: "FAQ", path: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "Blog", path: "/blog" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#005f3c",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <RiceBowlIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h5" fontWeight="bold">
                RICE SHOP
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Gạo chất lượng cao từ khắp nơi trên thế giới, giao đến tận nhà bạn
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">
                  Đội 2, Phúc Thắng, Nghĩa Hưng, Nam Định
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">0-358-748-253</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">
                  xuanthanh88508@gmail.com
                </Typography>
              </Box>
            </Box>

            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Pinterest">
                <PinterestIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Footer Links */}
          {!isMobile &&
            footerLinks.map((section) => (
              <Grid item xs={12} sm={4} md={2} key={section.title}>
                <Typography variant="h6" gutterBottom>
                  {section.title}
                </Typography>
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                  {section.links.map((link) => (
                    <Box component="li" key={link.name} sx={{ mb: 1 }}>
                      <Link
                        component={RouterLink}
                        to={link.path}
                        color="inherit"
                        underline="hover"
                        sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}
                      >
                        {link.name}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Đăng ký nhận bản tin của chúng tôi
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Nhận thông tin cập nhật về sản phẩm mới và ưu đãi theo mùa.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <TextField
                variant="outlined"
                placeholder="Your email"
                size="small"
                sx={{
                  mr: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                  },
                }}
              />
              <Button variant="contained" color="secondary">
                Đăng kí
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 4 }} />

        {/* Bottom Copyright */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            &copy; {new Date().getFullYear()} Khanh Thanh Shop
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
