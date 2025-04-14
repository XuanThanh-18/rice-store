import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Field } from "formik";

const BillingInfoForm = ({ values, setFieldValue }) => {
  return (
    <>
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
          />
        </Grid>
      )}
    </>
  );
};

export default BillingInfoForm;
