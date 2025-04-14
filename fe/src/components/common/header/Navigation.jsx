import React from "react";
import { Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navigation = ({ links }) => {
  const location = useLocation();

  // Check if current path is active
  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      {links.map((link) => (
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
  );
};

export default Navigation;
