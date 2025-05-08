import React, { useState, useEffect } from "react";
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
  CircularProgress,
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
import { getRiceTypes, getOrigins } from "../../api/productApi";
import { toast } from "react-toastify";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [riceTypes, setRiceTypes] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  // Fetch data from APIs for footer links
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);

        // Fetch rice types for product categories
        const riceTypesResponse = await getRiceTypes();
        setRiceTypes(riceTypesResponse.data || []);

        // Fetch origins for use in origin-based links
        const originsResponse = await getOrigins();
        setOrigins(originsResponse.data || []);
      } catch (err) {
        console.error("Error loading footer data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.warn("Please enter your email address");
      return;
    }

    // In a real app, this would call an API to subscribe the user
    toast.success(`Thank you! ${email} has been subscribed to our newsletter.`);
    setEmail("");
  };

  // Generate product links dynamically from rice types
  const productLinks = [
    ...riceTypes.slice(0, 4).map((type) => ({
      name: type.name,
      path: `/products?riceType=${encodeURIComponent(type.name)}`,
    })),
    { name: "View All", path: "/products" },
  ];

  // Generate origins links for shop by origin section
  const originLinks = [
    ...origins.slice(0, 4).map((origin) => ({
      name: origin.name,
      path: `/products?origin=${encodeURIComponent(origin.name)}`,
    })),
    { name: "All Origins", path: "/products" },
  ];

  // Customer service links (not dynamic, but could be in the future)
  const customerServiceLinks = [
    { name: "My Account", path: "/profile" },
    { name: "Track Order", path: "/orders" },
    { name: "Shipping Policy", path: "/shipping" },
    { name: "Returns & Refunds", path: "/returns" },
    { name: "FAQ", path: "/faq" },
  ];

  // Company info links
  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#005f3c",
        color: "white",
        py: 6,
        mt: "auto",
        position: "relative",
        zIndex: 1000, // Make sure it's above content but below drawer
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

          {/* Footer Links - Dynamic from API Data */}
          {!isMobile && (
            <>
              {/* Dynamic Rice Type Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h6" gutterBottom>
                  Rice Types
                </Typography>
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                    {productLinks.map((link) => (
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
                )}
              </Grid>

              {/* Dynamic Origin Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h6" gutterBottom>
                  Shop by Origin
                </Typography>
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                    {originLinks.map((link) => (
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
                )}
              </Grid>

              {/* Customer Service Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h6" gutterBottom>
                  Customer Service
                </Typography>
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                  {customerServiceLinks.map((link) => (
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

              {/* Company Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="h6" gutterBottom>
                  Company
                </Typography>
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                  {companyLinks.map((link) => (
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
            </>
          )}

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Đăng ký nhận bản tin của chúng tôi
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Nhận thông tin cập nhật về sản phẩm mới và ưu đãi theo mùa.
            </Typography>
            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{ display: "flex" }}
            >
              <TextField
                variant="outlined"
                placeholder="Your email"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Button variant="contained" color="secondary" type="submit">
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
