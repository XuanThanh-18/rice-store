import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormHelperText,
  CircularProgress,
  Divider,
  Paper,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { formatCurrency } from "../../utils/formatCurrency";

const paymentMethods = [
  { value: "creditCard", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bankTransfer", label: "Bank Transfer" },
];

const checkoutValidationSchema = Yup.object({
  shippingAddress: Yup.string().required("Shipping address is required"),
  billingAddress: Yup.string().required("Billing address is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9+\- ]+$/, "Phone number is not valid")
    .required("Phone number is required"),
  paymentMethod: Yup.string().required("Payment method is required"),
  useShippingAsBilling: Yup.boolean(),
  notes: Yup.string(),
});

const CheckoutForm = ({ cart, onCheckout, loading }) => {
  // Calculate totals
  const { totalAmount, items } = cart;
  const shippingCost = totalAmount >= 50 ? 0 : 5.99;
  const tax = totalAmount * 0.07; // 7% tax
  const finalTotal = totalAmount + shippingCost + tax;

  const initialValues = {
    shippingAddress: "",
    billingAddress: "",
    phoneNumber: "",
    paymentMethod: "creditCard",
    useShippingAsBilling: false,
    notes: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // If using shipping as billing, copy shipping address to billing
    const checkoutData = {
      ...values,
      billingAddress: values.useShippingAsBilling
        ? values.shippingAddress
        : values.billingAddress,
    };

    onCheckout(checkoutData);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            {/* Shipping Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                multiline
                rows={3}
                name="shippingAddress"
                label="Shipping Address"
                variant="outlined"
                error={
                  touched.shippingAddress && Boolean(errors.shippingAddress)
                }
                helperText={touched.shippingAddress && errors.shippingAddress}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </Grid>

            {/* Billing Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Billing Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="useShippingAsBilling"
                    checked={values.useShippingAsBilling}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFieldValue("useShippingAsBilling", checked);
                      if (checked) {
                        setFieldValue("billingAddress", values.shippingAddress);
                      }
                    }}
                  />
                }
                label="Use shipping address as billing address"
              />
            </Grid>

            {!values.useShippingAsBilling && (
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  multiline
                  rows={3}
                  name="billingAddress"
                  label="Billing Address"
                  variant="outlined"
                  error={
                    touched.billingAddress && Boolean(errors.billingAddress)
                  }
                  helperText={touched.billingAddress && errors.billingAddress}
                />
              </Grid>
            )}

            {/* Payment Method */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                error={touched.paymentMethod && Boolean(errors.paymentMethod)}
              >
                <RadioGroup
                  name="paymentMethod"
                  value={values.paymentMethod}
                  onChange={(e) =>
                    setFieldValue("paymentMethod", e.target.value)
                  }
                >
                  {paymentMethods.map((method) => (
                    <FormControlLabel
                      key={method.value}
                      value={method.value}
                      control={<Radio />}
                      label={method.label}
                    />
                  ))}
                </RadioGroup>
                {touched.paymentMethod && errors.paymentMethod && (
                  <FormHelperText>{errors.paymentMethod}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Additional Notes */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Additional Notes
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                multiline
                rows={3}
                name="notes"
                label="Notes for your order (optional)"
                variant="outlined"
              />
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      Subtotal ({items.length} items):
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Typography variant="body1">
                      {formatCurrency(totalAmount)}
                    </Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="body1">Shipping:</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Typography variant="body1">
                      {shippingCost === 0
                        ? "FREE"
                        : formatCurrency(shippingCost)}
                    </Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="body1">Estimated Tax:</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Typography variant="body1">
                      {formatCurrency(tax)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="h6">Total:</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Typography variant="h6" color="primary.main">
                      {formatCurrency(finalTotal)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isSubmitting || loading}
                sx={{ py: 1.5 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  `Place Order (${formatCurrency(finalTotal)})`
                )}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
