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
    .required("Tên không được để trống")
    .max(50, "Tên khống quá 50 ký tự"),
  description: Yup.string().max(500, "Mô tả không quá 500 ký tự"),
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
          "Có lỗi xảy ra khi lưu loại gạo. Hãy thử lại!"
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
                label="Tên loại gạo"
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
                label="Mô tả"
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
                  {riceType ? "Cập nhật loại gạo" : "Lưu loại gạo"}
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
