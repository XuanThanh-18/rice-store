import React, { useState, useContext, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import GrainIcon from "@mui/icons-material/Grain";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";

const HEADER_HEIGHT = 70; // Chiều cao của header (pixel)
const drawerWidth = 240;

const AdminSidebar = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const [drawerHeight, setDrawerHeight] = useState("calc(100vh - 70px)");

  // Hàm tính toán chiều cao chính xác để chạm đến footer
  useEffect(() => {
    const calculateHeight = () => {
      // Lấy chiều cao của trang
      const pageHeight = document.body.scrollHeight;

      // Lấy vị trí top của footer nếu có
      const footer = document.querySelector("footer");
      let footerTop = pageHeight;

      if (footer) {
        footerTop = footer.getBoundingClientRect().top + window.scrollY;
      }

      // Tính toán chiều cao cho drawer
      const calculatedHeight = footerTop - HEADER_HEIGHT;
      setDrawerHeight(`${calculatedHeight}px`);
    };

    // Tính chiều cao khi component mount và khi window resize
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    window.addEventListener("scroll", calculateHeight);

    // Cleanup
    return () => {
      window.removeEventListener("resize", calculateHeight);
      window.removeEventListener("scroll", calculateHeight);
    };
  }, []);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin/dashboard",
    },
    {
      text: "Products",
      icon: <InventoryIcon />,
      path: "/admin/products",
    },
    {
      text: "Rice Types",
      icon: <GrainIcon />,
      path: "/admin/rice-types",
    },
    {
      text: "Origins",
      icon: <PublicIcon />,
      path: "/admin/origins",
    },
    {
      text: "Orders",
      icon: <ShoppingCartIcon />,
      path: "/admin/orders",
    },
    {
      text: "Users",
      icon: <PeopleIcon />,
      path: "/admin/users",
    },
    {
      text: "Back to Shop",
      icon: <HomeIcon />,
      path: "/",
    },
  ];

  const isActivePath = (path) => location.pathname === path;

  const drawer = (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          bgcolor: theme.palette.primary.main,
          color: "white",
        }}
      >
        <RiceBowlIcon sx={{ mr: 1, fontSize: 30 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Rice Shop Admin
        </Typography>
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ ml: "auto", color: "white" }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* Admin Info */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: theme.palette.secondary.main,
            mr: 2,
          }}
        >
          {user?.username?.[0]?.toUpperCase() || "A"}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" noWrap>
            {user?.fullName || user?.username}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Administrator
          </Typography>
        </Box>
      </Box>

      <Divider />

      <List
        sx={{
          py: 1,
          overflowY: "auto",
          flexGrow: 1, // Cho phép list mở rộng để lấp đầy khoảng trống
        }}
      >
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                minHeight: 48,
                px: 2.5,
                py: 1.5,
                ml: 0.5,
                mr: 0.5,
                borderRadius: 1,
                mb: 0.5,
                bgcolor: isActivePath(item.path)
                  ? theme.palette.action.selected
                  : "transparent",
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 2,
                  color: isActivePath(item.path)
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActivePath(item.path) ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          onClick={logout}
          sx={{
            minHeight: 48,
            px: 2.5,
            py: 1.5,
            ml: 0.5,
            mr: 0.5,
            mb: 2,
            mt: 1,
            borderRadius: 1,
            color: theme.palette.error.main,
            "&:hover": {
              bgcolor: alpha(theme.palette.error.main, 0.1),
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 2,
              color: theme.palette.error.main,
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && !open && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{
            position: "fixed",
            left: 0,
            top: HEADER_HEIGHT + 10, // Position below the main header
            zIndex: 1200,
            color: "primary.main",
            bgcolor: "background.paper",
            borderRadius: "0 4px 4px 0",
            boxShadow: 1,
            width: 40,
            height: 40,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile drawer (temporary variant) */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: "block",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              zIndex: 1200, // Higher than app bar (1100)
              marginTop: `${HEADER_HEIGHT}px`, // Space for header
              height: `calc(100vh - ${HEADER_HEIGHT}px)`, // Full height minus header
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        // Desktop drawer (permanent variant)
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
              marginTop: `${HEADER_HEIGHT}px`, // Space for header
              height: drawerHeight, // Dynamic height calculated to touch footer
              zIndex: 1000, // Below app bar (1100)
              display: "flex",
              flexDirection: "column",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default AdminSidebar;
