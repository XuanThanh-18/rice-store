// src/components/common/Header.jsx
import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  InputBase,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SearchIcon from "@mui/icons-material/Search";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InfoIcon from "@mui/icons-material/Info";
import { AuthContext } from "../../contexts/AuthContext";
import { getCart } from "../../api/cartApi";

// Styled search component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const Header = () => {
  const { user, isAuthenticated, logout, isAdmin } = useContext(AuthContext);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch cart data to get item count
  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItemCount();
    } else {
      setCartItemCount(0);
    }
  }, [isAuthenticated, location]);

  const fetchCartItemCount = async () => {
    try {
      const response = await getCart();
      const items = response.data?.items || [];
      const itemCount = items.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(itemCount);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchTerm.trim())}`);
      if (isMobile) {
        setMobileMenuOpen(false);
      }
    }
  };

  // Navigation links
  const navigationLinks = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Products", path: "/products", icon: <RiceBowlIcon /> },
    { name: "About", path: "/about", icon: <InfoIcon /> },
    { name: "Contact", path: "/contact", icon: <LocalShippingIcon /> },
  ];

  // User menu items
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

  // Check if current path is active
  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Render desktop navigation
  const renderDesktopNav = () => (
    <Container>
      <Toolbar disableGutters sx={{ height: 70 }}>
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
            color: "white",
            textDecoration: "none",
            "&:hover": {
              color: alpha(theme.palette.common.white, 0.85),
            },
          }}
        >
          <RiceBowlIcon sx={{ mr: 1, fontSize: 32 }} />
          RICE SHOP
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          {navigationLinks.map((link) => (
            <Button
              key={link.name}
              component={Link}
              to={link.path}
              sx={{
                color: "white",
                display: "block",
                mx: 1,
                position: "relative",
                fontSize: "1rem",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: isActivePath(link.path) ? "100%" : "0%",
                  height: "3px",
                  bottom: 6,
                  left: 0,
                  backgroundColor: "secondary.main",
                  transition: "width 0.3s ease-in-out",
                  borderRadius: "2px",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {link.name}
            </Button>
          ))}
        </Box>

        {/* Search Box */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search products…"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch}
          />
        </Search>

        {/* Cart Icon */}
        {isAuthenticated && (
          <Tooltip title="Shopping Cart">
            <IconButton
              size="large"
              color="inherit"
              component={Link}
              to="/cart"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        )}

        {/* User Menu */}
        {isAuthenticated ? (
          <>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleUserMenuOpen}
                size="large"
                edge="end"
                color="inherit"
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
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
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
                    onClick={handleUserMenuClose}
                    sx={{
                      py: 1,
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
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
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
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
        ) : (
          <Box sx={{ display: "flex" }}>
            <Button color="inherit" component={Link} to="/login" sx={{ ml: 1 }}>
              Login
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/register"
              sx={{
                ml: 1,
                borderColor: "white",
                "&:hover": {
                  borderColor: alpha(theme.palette.common.white, 0.8),
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                },
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </Container>
  );

  // Render mobile drawer
  const renderMobileDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
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
          onClick={() => setMobileMenuOpen(false)}
        >
          <RiceBowlIcon sx={{ mr: 1, color: "primary.main" }} />
          RICE SHOP
        </Typography>
        <IconButton onClick={handleMobileMenuToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Search sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
          <SearchIconWrapper>
            <SearchIcon color="primary" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search products…"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch}
            sx={{ color: "text.primary" }}
          />
        </Search>
      </Box>

      <Divider />

      <List sx={{ px: 1 }}>
        {navigationLinks.map((link) => (
          <ListItem
            key={link.name}
            button
            component={Link}
            to={link.path}
            onClick={handleMobileMenuToggle}
            selected={isActivePath(link.path)}
            sx={{
              mb: 0.5,
              borderRadius: 1,
              "&.Mui-selected": {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
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

      {isAuthenticated ? (
        <>
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
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
              onClick={handleMobileMenuToggle}
              sx={{
                mb: 0.5,
                borderRadius: 1,
                bgcolor: isActivePath("/cart")
                  ? alpha(theme.palette.primary.main, 0.1)
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
                  onClick={handleMobileMenuToggle}
                  sx={{
                    mb: 0.5,
                    borderRadius: 1,
                    bgcolor: isActivePath(item.path)
                      ? alpha(theme.palette.primary.main, 0.1)
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
              onClick={handleLogout}
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
            onClick={handleMobileMenuToggle}
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
            onClick={handleMobileMenuToggle}
            fullWidth
            sx={{ py: 1 }}
          >
            Register
          </Button>
        </Box>
      )}
    </Drawer>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: "primary.main", boxShadow: 3 }}>
      {isMobile ? (
        <>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMobileMenuToggle}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <RiceBowlIcon sx={{ mr: 1 }} />
              RICE SHOP
            </Typography>

            {isAuthenticated && (
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
          </Toolbar>
          {renderMobileDrawer()}
        </>
      ) : (
        renderDesktopNav()
      )}
    </AppBar>
  );
};

export default Header;
