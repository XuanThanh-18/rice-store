import React from "react";
import { Paper, Typography, Box, Avatar, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const ProfileOverview = ({ userProfile }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        textAlign: "center",
        height: "100%",
        borderRadius: 2,
      }}
    >
      <Avatar
        sx={{
          width: 100,
          height: 100,
          bgcolor: "primary.main",
          fontSize: "2.5rem",
          margin: "0 auto 16px",
        }}
      >
        {userProfile?.username?.[0]?.toUpperCase() || (
          <PersonIcon fontSize="large" />
        )}
      </Avatar>

      <Typography variant="h5" gutterBottom>
        {userProfile?.fullName}
      </Typography>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        @{userProfile?.username}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {userProfile?.email}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ textAlign: "left" }}>
        <Typography variant="body2" gutterBottom>
          <strong>Account Type:</strong>{" "}
          {userProfile?.role === "ROLE_ADMIN" ? "Administrator" : "Customer"}
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>Member Since:</strong>{" "}
          {new Date(userProfile?.createdAt).toLocaleDateString()}
        </Typography>

        <Typography variant="body2">
          <strong>Last Updated:</strong>{" "}
          {new Date(userProfile?.updatedAt).toLocaleDateString()}
        </Typography>
      </Box>

      <Button
        component={Link}
        to="/orders"
        variant="outlined"
        fullWidth
        sx={{ mt: 3 }}
      >
        View My Orders
      </Button>
    </Paper>
  );
};

export default ProfileOverview;
