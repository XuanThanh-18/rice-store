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

// Origin validation schema
const originValidationSchema = Yup.object({
  name: Yup.string()
    .required("Bạn phải nhập tên")
    .max(50, "Tên không quá 50 kí tự"),
  description: Yup.string().max(500, "Mô tả không quá 500 ký tự"),
  countryCode: Yup.string().length(2, "Mã quốc gia chỉ 2 kí tự"),
});

const OriginForm = ({ origin, onSubmit }) => {
  const [submitError, setSubmitError] = useState(null);

  const initialValues = {
    name: origin?.name || "",
    description: origin?.description || "",
    countryCode: origin?.countryCode || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitError(null);
      await onSubmit(values);
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
          "Một lỗi xảy ra khi lưu xuất xứ. Hãy thử lại !"
      );
      console.error("Error saving origin:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={originValidationSchema}
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
                label="Tên xuất xứ"
                variant="outlined"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="countryCode"
                label="Mã quốc gia (2 ký tự)"
                variant="outlined"
                error={touched.countryCode && Boolean(errors.countryCode)}
                helperText={touched.countryCode && errors.countryCode}
                inputProps={{ maxLength: 2 }}
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
                  {origin ? "Cập nhật xuất xứ" : "Lưu xuất xứ"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default OriginForm;
