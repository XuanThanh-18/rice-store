import React from "react";
import { Grid, TextField, Typography, Divider } from "@mui/material";
import { Field } from "formik";

const ShippingInfoForm = () => {
  return (
    <>
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
        />
      </Grid>

      <Grid item xs={12}>
        <Field
          as={TextField}
          fullWidth
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
        />
      </Grid>
    </>
  );
};

export default ShippingInfoForm;
