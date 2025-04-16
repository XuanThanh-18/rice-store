import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SaveIcon from "@mui/icons-material/Save";

// Rice Type validation schema
const riceTypeValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name must be less than 50 characters"),
  description: Yup.string().max(
    500,
    "Description must be less than 500 characters"
  ),
});

const RiceTypeForm = ({ riceType, onSubmit }) => {
  const [submitError, setSubmitError] = useState(null);

  const initialValues = {
    name: riceType?.name || "",
    description: riceType?.description || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitError(null);
      await onSubmit(values);
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
          "An error occurred while saving the rice type. Please try again."
      );
      console.error("Error saving rice type:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={riceTypeValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="name"
                label="Rice Type Name"
                variant="outlined"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />
                  }
                  sx={{ py: 1.2, px: 3 }}
                >
                  {riceType ? "Update Rice Type" : "Save Rice Type"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default RiceTypeForm;
