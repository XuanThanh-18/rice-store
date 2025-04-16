// fe/src/components/admin/AdminSidebar.jsx
import React, { useState, useContext } from "react";
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

const drawerWidth = 240;

const AdminSidebar = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);

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
      text: "Orders",
      icon: <ShoppingCartIcon />,
      path: "/admin/orders",
    },
    {
      text: "Users",
      icon: <PeopleIcon />,
      path: "/admin/users",
    },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{
            position: "fixed",
            left: open ? drawerWidth : 0,
            top: 10,
            zIndex: 1300,
            color: "primary.main",
            bgcolor: "background.paper",
            borderRadius: "0 4px 4px 0",
            boxShadow: 1,
            width: 40,
            height: 40,
            transition: "left 0.3s",
          }}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <RiceBowlIcon sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Rice Shop Admin
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Admin Info */}
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.fullName || user?.username}
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)" noWrap>
            Administrator
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <List sx={{ py: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  py: 1.5,
                  bgcolor: isActivePath(item.path)
                    ? "rgba(255,255,255,0.2)"
                    : "transparent",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 2,
                    color: isActivePath(item.path)
                      ? "secondary.main"
                      : "primary.contrastText",
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

        <Box sx={{ flexGrow: 1 }} />

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={logout}
            sx={{
              minHeight: 48,
              px: 2.5,
              py: 1.5,
              color: theme.palette.error.light,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2,
                color: theme.palette.error.light,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </>
  );
};

export default AdminSidebar;
