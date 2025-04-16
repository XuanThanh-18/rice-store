import React from "react";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  Tooltip,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { alpha } from "@mui/material/styles";

const UserMenu = ({ user, isAdmin, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleMenuClose();
  };

  // Menu items
  const userMenuItems = [
    { name: "Profile", path: "/profile", icon: <PersonIcon />, auth: true },
    { name: "My Orders", path: "/orders", icon: <ReceiptIcon />, auth: true },
    {
      name: "Admin Dashboard",
      path: "/admin/dashboard",
      icon: <AdminPanelSettingsIcon />,
      admin: true,
    },
  ];

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleMenuOpen}
          size="large"
          edge="end"
          color="#007848"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          sx={{ ml: 1 }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "secondary.main",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            {user?.username?.[0]?.toUpperCase() || <PersonIcon />}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: 2,
            minWidth: 180,
            boxShadow:
              "rgb(0 0 0 / 20%) 0px 0px 15px, rgb(0 0 0 / 14%) 0px 0px 3px 1px",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {user?.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <Divider />

        {userMenuItems
          .filter((item) => !item.admin || (item.admin && isAdmin))
          .map((item) => (
            <MenuItem
              key={item.name}
              component={Link}
              to={item.path}
              onClick={handleMenuClose}
              sx={{
                py: 1,
                "&:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}

        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1,
            color: "error.main",
            "&:hover": {
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1),
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "error.main" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
