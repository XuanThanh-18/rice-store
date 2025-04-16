// fe/src/components/admin/ProductForm.jsx
import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
  Alert,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createProduct, updateProduct } from "../../api/productApi";
import SaveIcon from "@mui/icons-material/Save";

// Product validation schema
const productValidationSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  description: Yup.string().max(
    1000,
    "Description must be less than 1000 characters"
  ),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .max(10000, "Price cannot exceed $10,000"),
  stockQuantity: Yup.number()
    .required("Stock quantity is required")
    .integer("Stock quantity must be a whole number")
    .min(0, "Stock quantity cannot be negative"),
  riceType: Yup.string().required("Rice type is required"),
  origin: Yup.string().required("Origin is required"),
  imageUrl: Yup.string().url("Must be a valid URL"),
  weight: Yup.string().required("Weight is required"),
});

const ProductForm = ({ product, onSubmit, riceTypes, origins }) => {
  const [submitError, setSubmitError] = useState(null);

  const initialValues = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    stockQuantity: product?.stockQuantity || 0,
    riceType: product?.riceType || "",
    origin: product?.origin || "",
    imageUrl: product?.imageUrl || "",
    weight: product?.weight || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitError(null);

      if (product) {
        // Update existing product
        await updateProduct(product.id, values);
      } else {
        // Create new product
        await createProduct(values);
      }

      onSubmit();
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
          "An error occurred while saving the product. Please try again."
      );
      console.error("Error saving product:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form>
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <Field
                as={TextField}
                fullWidth
                name="name"
                label="Product Name"
                variant="outlined"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Field
                as={TextField}
                fullWidth
                name="price"
                label="Price"
                type="number"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
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

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={touched.riceType && Boolean(errors.riceType)}
              >
                <InputLabel id="rice-type-label">Rice Type</InputLabel>
                <Select
                  labelId="rice-type-label"
                  name="riceType"
                  value={values.riceType}
                  label="Rice Type"
                  onChange={(e) => setFieldValue("riceType", e.target.value)}
                >
                  {riceTypes.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.riceType && errors.riceType && (
                  <FormHelperText>{errors.riceType}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={touched.origin && Boolean(errors.origin)}
              >
                <InputLabel id="origin-label">Origin</InputLabel>
                <Select
                  labelId="origin-label"
                  name="origin"
                  value={values.origin}
                  label="Origin"
                  onChange={(e) => setFieldValue("origin", e.target.value)}
                >
                  {origins.map((origin) => (
                    <MenuItem key={origin.id} value={origin.name}>
                      {origin.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.origin && errors.origin && (
                  <FormHelperText>{errors.origin}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="weight"
                label="Weight (e.g., 1kg, 5kg)"
                variant="outlined"
                error={touched.weight && Boolean(errors.weight)}
                helperText={touched.weight && errors.weight}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="stockQuantity"
                label="Stock Quantity"
                type="number"
                variant="outlined"
                error={touched.stockQuantity && Boolean(errors.stockQuantity)}
                helperText={touched.stockQuantity && errors.stockQuantity}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="imageUrl"
                label="Image URL"
                variant="outlined"
                error={touched.imageUrl && Boolean(errors.imageUrl)}
                helperText={touched.imageUrl && errors.imageUrl}
              />
            </Grid>

            {values.imageUrl && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Image Preview
                </Typography>
                <Box
                  component="img"
                  src={values.imageUrl}
                  alt="Product preview"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/200?text=Invalid+Image+URL";
                  }}
                  sx={{
                    maxHeight: 200,
                    maxWidth: "100%",
                    objectFit: "contain",
                    borderRadius: 1,
                    border: "1px solid #eee",
                  }}
                />
              </Grid>
            )}

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
                  {product ? "Update Product" : "Save Product"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
