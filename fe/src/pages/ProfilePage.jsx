import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getUserById, updateUserProfile } from "../api/userApi";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "react-toastify";

// Import our refactored components
import ProfileOverview from "../components/profile/ProfileOverview";
import EditProfileForm from "../components/profile/EditProfileForm";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";

const ProfilePage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated || !user?.id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await getUserById(user.id);
        setUserProfile(response.data);
      } catch (err) {
        setError("Failed to load user profile. Please try again later.");
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, user]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Clear messages when changing tabs
    setError(null);
    setSuccess(null);
  };

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    try {
      setError(null);
      setSuccess(null);

      const response = await updateUserProfile(user.id, {
        username: values.username,
        email: values.email,
        fullName: values.fullName,
      });

      setUserProfile(response.data);
      setSuccess("Profile updated successfully");
      toast.success("Profile updated successfully");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    try {
      setError(null);
      setSuccess(null);

      await updateUserProfile(user.id, {
        password: values.newPassword,
        currentPassword: values.currentPassword,
      });

      setSuccess("Password changed successfully");
      toast.success("Password changed successfully");
      resetForm();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to change password";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          py: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <MuiLink component={Link} to="/" color="inherit">
          Home
        </MuiLink>
        <Typography color="text.primary">My Profile</Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <PersonIcon sx={{ mr: 1, fontSize: 28 }} />
        <Typography variant="h4" component="h1">
          My Profile
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <ProfileOverview userProfile={userProfile} />
        </Grid>

        {/* Profile Forms */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ borderRadius: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab
                icon={<PersonIcon />}
                label="Edit Profile"
                id="profile-tab-0"
                aria-controls="profile-tabpanel-0"
              />
              <Tab
                icon={<LockIcon />}
                label="Change Password"
                id="profile-tab-1"
                aria-controls="profile-tabpanel-1"
              />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {/* Success/Error Messages */}
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}

              {/* Edit Profile Form */}
              {activeTab === 0 && userProfile && (
                <EditProfileForm
                  userProfile={userProfile}
                  onSubmit={handleUpdateProfile}
                />
              )}

              {/* Change Password Form */}
              {activeTab === 1 && (
                <ChangePasswordForm onSubmit={handleChangePassword} />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
