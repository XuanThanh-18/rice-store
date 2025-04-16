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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  username: Yup.string().required("Username không được để trống"),
  password: Yup.string().required("Password không được để trống"),
});

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState("");

  // Check if we were redirected from another page
  const from = location.state?.from?.pathname || "/";

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoginError("");
      // Trim whitespace from form values
      const trimmedValues = {
        username: values.username.trim(),
        password: values.password,
      };
      const result = await login(trimmedValues);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setLoginError(
          result.error || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login to Rice Shop
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {loginError}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
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

              <Box mb={4}>
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                sx={{ mb: 2 }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Login"}
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <MuiLink component={Link} to="/register">
                    Register here
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

export default LoginPage;
