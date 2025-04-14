import React, { useState, useContext } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const registerValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password cannot exceed 40 characters")
    .required("Password is required"),
  fullName: Yup.string().required("Full name is required"),
});

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    fullName: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setRegisterError("");
      setSuccess(false);

      const result = await register(values);

      if (result.success) {
        setSuccess(true);
        resetForm();
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setRegisterError(
          result.error || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setRegisterError("An unexpected error occurred. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create an Account
        </Typography>

        {registerError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {registerError}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Registration successful! Redirecting to login page...
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Box mb={3}>
                <Field
                  as={TextField}
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Box>

              <Box mb={3}>
                <Field
                  as={TextField}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>

              <Box mb={3}>
                <Field
                  as={TextField}
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>

              <Box mb={4}>
                <Field
                  as={TextField}
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  variant="outlined"
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                sx={{ mb: 2 }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Register"}
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                  Already have an account?{" "}
                  <MuiLink component={Link} to="/login">
                    Login here
                  </MuiLink>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
