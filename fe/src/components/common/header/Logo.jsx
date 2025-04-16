import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Typography
      variant="h5"
      component={Link}
      to="/"
      sx={{
        mr: 2,
        display: "flex",
        alignItems: "center",
        fontWeight: 700,
        color: "#007848",
        textDecoration: "none",
        "&:hover": {
          color: (theme) => theme.palette.common.white,
        },
      }}
    >
      <img
        src="/MyLogo.jpg"
        alt="Rice Store Logo"
        style={{ height: "70px", border: "none" }}
      />
      RICE SHOP
    </Typography>
  );
};

export default Logo;
