import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { AuthContext } from "../../../contexts/AuthContext";
import { getCart } from "../../../api/cartApi";

// Import our sub-components
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MobileDrawer from "./MobileDrawer";
import CartButton from "./CartButton";
import AuthButtons from "./AuthButtons";

const Header = () => {
  const { user, isAuthenticated, logout, isAdmin } = useContext(AuthContext);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation links
  const navigationLinks = [
    { name: "Trang chủ", path: "/", icon: <HomeIcon /> },
    { name: "Sản phẩm", path: "/products", icon: <RiceBowlIcon /> },
    { name: "Giới thiệu", path: "/about", icon: <InfoIcon /> },
    { name: "Tương tác", path: "/contact", icon: <LocalShippingIcon /> },
  ];

  // User menu items
  const userMenuItems = [
    {
      name: "Thông tin cá nhân",
      path: "/profile",
      icon: <PersonIcon />,
      auth: true,
    },
    {
      name: "Đơn hàng của tôi",
      path: "/orders",
      icon: <ReceiptIcon />,
      auth: true,
    },
    {
      name: "Tổng quan quản trị",
      path: "/admin/dashboard",
      icon: <AdminPanelSettingsIcon />,
      admin: true,
    },
  ];

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

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
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

  // Render desktop navigation
  const renderDesktopNav = () => (
    <Container>
      <Toolbar disableGutters sx={{ height: 70 }}>
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <Navigation links={navigationLinks} />

        {/* Search Box */}
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearch}
        />

        {/* Cart Icon */}
        {isAuthenticated && <CartButton itemCount={cartItemCount} />}

        {/* User Menu or Auth Buttons */}
        {isAuthenticated ? (
          <UserMenu user={user} isAdmin={isAdmin} onLogout={handleLogout} />
        ) : (
          <AuthButtons />
        )}
      </Toolbar>
    </Container>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#ffffff", boxShadow: 3 }}>
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

            <Logo />

            {isAuthenticated && <CartButton itemCount={cartItemCount} />}
          </Toolbar>
          <MobileDrawer
            open={mobileMenuOpen}
            onClose={handleMobileMenuToggle}
            user={user}
            isAdmin={isAdmin}
            onLogout={handleLogout}
            navigationLinks={navigationLinks}
            userMenuItems={userMenuItems}
            cartItemCount={cartItemCount}
            searchComponent={
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearch}
              />
            }
          />
        </>
      ) : (
        renderDesktopNav()
      )}
    </AppBar>
  );
};

export default Header;
