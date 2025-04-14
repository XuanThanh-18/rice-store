import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";

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
        color: "white",
        textDecoration: "none",
        "&:hover": {
          color: (theme) => theme.palette.common.white,
        },
      }}
    >
      <RiceBowlIcon sx={{ mr: 1, fontSize: 32 }} />
      RICE SHOP
    </Typography>
  );
};

export default Logo;
