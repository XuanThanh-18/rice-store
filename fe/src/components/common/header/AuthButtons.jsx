import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";

const AuthButtons = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Button
        component={Link}
        to="/login"
        sx={{
          ml: 1,
          color: "#007848",
          "&:hover": {
            color: "#007848",
            // backgroundColor: alpha("green", 0.1),
          },
        }}
      >
        Login
      </Button>
      <Button
        variant="outlined"
        component={Link}
        to="/register"
        sx={{
          ml: 1,
          borderColor: "green",
          color: "#007848",
          "&:hover": {
            borderColor: alpha("#007848", 0.8),
            backgroundColor: alpha("#007848", 0.1),
            color: "#007848",
          },
        }}
      >
        Đăng ký
      </Button>
    </Box>
  );
};

export default AuthButtons;
