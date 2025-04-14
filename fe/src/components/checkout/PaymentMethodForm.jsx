import React from "react";
import {
  Grid,
  Typography,
  Divider,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

const paymentMethods = [
  { value: "creditCard", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bankTransfer", label: "Bank Transfer" },
];

const PaymentMethodForm = ({ values, setFieldValue }) => {
  return (
    <>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            name="paymentMethod"
            value={values.paymentMethod}
            onChange={(e) => setFieldValue("paymentMethod", e.target.value)}
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
        </FormControl>
      </Grid>
    </>
  );
};

export default PaymentMethodForm;
