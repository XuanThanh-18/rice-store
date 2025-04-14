import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";

const AuthButtons = () => {
  return (
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
            borderColor: (theme) => alpha(theme.palette.common.white, 0.8),
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.1),
          },
        }}
      >
        Register
      </Button>
    </Box>
  );
};

export default AuthButtons;
