import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Avatar,
  Badge,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { alpha } from "@mui/material/styles";

const MobileDrawer = ({
  open,
  onClose,
  user,
  isAdmin,
  onLogout,
  navigationLinks,
  userMenuItems,
  cartItemCount,
  searchComponent,
}) => {
  const location = useLocation();

  // Check if current path is active
  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "280px",
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          onClick={onClose}
        >
          <RiceBowlIcon sx={{ mr: 1, color: "primary.main" }} />
          RICE SHOP
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>{searchComponent}</Box>

      <Divider />

      <List sx={{ px: 1 }}>
        {navigationLinks.map((link) => (
          <ListItem
            key={link.name}
            button
            component={Link}
            to={link.path}
            onClick={onClose}
            selected={isActivePath(link.path)}
            sx={{
              mb: 0.5,
              borderRadius: 1,
              "&.Mui-selected": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "20%",
                  height: "60%",
                  width: 4,
                  backgroundColor: "primary.main",
                  borderRadius: "0 2px 2px 0",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActivePath(link.path)
                  ? "primary.main"
                  : "text.secondary",
              }}
            >
              {link.icon}
            </ListItemIcon>
            <ListItemText
              primary={link.name}
              primaryTypographyProps={{
                fontWeight: isActivePath(link.path) ? "bold" : "normal",
                color: isActivePath(link.path)
                  ? "primary.main"
                  : "text.primary",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      {user ? (
        <>
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                borderRadius: 1,
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "secondary.main",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  mr: 1.5,
                }}
              >
                {user?.username?.[0]?.toUpperCase() || <PersonIcon />}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {user?.username}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          </Box>

          <List sx={{ px: 1 }}>
            <ListItem
              button
              component={Link}
              to="/cart"
              onClick={onClose}
              sx={{
                mb: 0.5,
                borderRadius: 1,
                bgcolor: isActivePath("/cart")
                  ? (theme) => alpha(theme.palette.primary.main, 0.1)
                  : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActivePath("/cart")
                    ? "primary.main"
                    : "text.secondary",
                }}
              >
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText
                primary="Shopping Cart"
                primaryTypographyProps={{
                  fontWeight: isActivePath("/cart") ? "bold" : "normal",
                  color: isActivePath("/cart")
                    ? "primary.main"
                    : "text.primary",
                }}
              />
            </ListItem>

            {userMenuItems
              .filter((item) => !item.admin || (item.admin && isAdmin))
              .map((item) => (
                <ListItem
                  key={item.name}
                  button
                  component={Link}
                  to={item.path}
                  onClick={onClose}
                  sx={{
                    mb: 0.5,
                    borderRadius: 1,
                    bgcolor: isActivePath(item.path)
                      ? (theme) => alpha(theme.palette.primary.main, 0.1)
                      : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActivePath(item.path)
                        ? "primary.main"
                        : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontWeight: isActivePath(item.path) ? "bold" : "normal",
                      color: isActivePath(item.path)
                        ? "primary.main"
                        : "text.primary",
                    }}
                  />
                </ListItem>
              ))}

            <Divider sx={{ my: 1 }} />

            <ListItem
              button
              onClick={() => {
                onLogout();
                onClose();
              }}
              sx={{
                mb: 0.5,
                borderRadius: 1,
                color: "error.main",
              }}
            >
              <ListItemIcon sx={{ color: "error.main" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </>
      ) : (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            onClick={onClose}
            fullWidth
            sx={{ py: 1 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/register"
            onClick={onClose}
            fullWidth
            sx={{ py: 1 }}
          >
            Register
          </Button>
        </Box>
      )}
    </Drawer>
  );
};

export default MobileDrawer;
