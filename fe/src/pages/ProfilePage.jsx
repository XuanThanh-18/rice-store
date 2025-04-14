// src/pages/ProfilePage.jsx
import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Avatar,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../contexts/AuthContext";
import { getUserById, updateUser } from "../api/userApi";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";

// Profile form validation schema
const profileValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  fullName: Yup.string().required("Full name is required"),
});

// Password change validation schema
const passwordValidationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .max(40, "New password cannot exceed 40 characters")
    .required("New password is required")
    .notOneOf(
      [Yup.ref("currentPassword")],
      "New password must be different from current password"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});

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

      const response = await updateUser(user.id, {
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

      await updateUser(user.id, {
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
                {userProfile?.role === "ROLE_ADMIN"
                  ? "Administrator"
                  : "Customer"}
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
                <Formik
                  initialValues={{
                    username: userProfile.username || "",
                    email: userProfile.email || "",
                    fullName: userProfile.fullName || "",
                  }}
                  validationSchema={profileValidationSchema}
                  onSubmit={handleUpdateProfile}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            name="username"
                            label="Username"
                            variant="outlined"
                            error={touched.username && Boolean(errors.username)}
                            helperText={touched.username && errors.username}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            name="email"
                            label="Email Address"
                            variant="outlined"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            name="fullName"
                            label="Full Name"
                            variant="outlined"
                            error={touched.fullName && Boolean(errors.fullName)}
                            helperText={touched.fullName && errors.fullName}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            startIcon={
                              isSubmitting ? (
                                <CircularProgress size={20} />
                              ) : (
                                <SaveIcon />
                              )
                            }
                            sx={{ py: 1.2 }}
                          >
                            Save Changes
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              )}

              {/* Change Password Form */}
              {activeTab === 1 && (
                <Formik
                  initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  validationSchema={passwordValidationSchema}
                  onSubmit={handleChangePassword}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            name="currentPassword"
                            label="Current Password"
                            type="password"
                            variant="outlined"
                            error={
                              touched.currentPassword &&
                              Boolean(errors.currentPassword)
                            }
                            helperText={
                              touched.currentPassword && errors.currentPassword
                            }
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            variant="outlined"
                            error={
                              touched.newPassword && Boolean(errors.newPassword)
                            }
                            helperText={
                              touched.newPassword && errors.newPassword
                            }
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            name="confirmPassword"
                            label="Confirm New Password"
                            type="password"
                            variant="outlined"
                            error={
                              touched.confirmPassword &&
                              Boolean(errors.confirmPassword)
                            }
                            helperText={
                              touched.confirmPassword && errors.confirmPassword
                            }
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            startIcon={
                              isSubmitting ? (
                                <CircularProgress size={20} />
                              ) : (
                                <LockIcon />
                              )
                            }
                            sx={{ py: 1.2 }}
                          >
                            Change Password
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
