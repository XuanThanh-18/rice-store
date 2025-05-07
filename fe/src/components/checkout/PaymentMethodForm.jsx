import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Paper,
  Box,
  TextField,
  FormHelperText,
  InputAdornment,
  Alert,
  Collapse,
  Divider,
} from "@mui/material";
import { Field } from "formik";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import VerifiedIcon from "@mui/icons-material/Verified";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";

const PaymentMethodForm = ({ values, setFieldValue, errors, touched }) => {
  // State to track if credit card fields should be shown
  const [showCardFields, setShowCardFields] = useState(
    values.paymentMethod === "creditCard"
  );
  const [showBankFields, setShowBankFields] = useState(
    values.paymentMethod === "bankTransfer"
  );
  const [showPaypalFields, setShowPaypalFields] = useState(
    values.paymentMethod === "paypal"
  );

  // Update field visibility when payment method changes
  useEffect(() => {
    setShowCardFields(values.paymentMethod === "creditCard");
    setShowBankFields(values.paymentMethod === "bankTransfer");
    setShowPaypalFields(values.paymentMethod === "paypal");
  }, [values.paymentMethod]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Select your preferred payment method
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <FormControl
            component="fieldset"
            fullWidth
            error={touched.paymentMethod && Boolean(errors.paymentMethod)}
          >
            <RadioGroup
              name="paymentMethod"
              value={values.paymentMethod}
              onChange={(e) => setFieldValue("paymentMethod", e.target.value)}
            >
              {/* Credit Card Option */}
              <Paper
                elevation={0}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor:
                    values.paymentMethod === "creditCard"
                      ? "primary.main"
                      : "divider",
                  bgcolor:
                    values.paymentMethod === "creditCard"
                      ? "primary.lighter"
                      : "background.paper",
                  transition: "all 0.3s ease",
                }}
              >
                <FormControlLabel
                  value="creditCard"
                  control={<Radio color="primary" />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CreditCardIcon
                        sx={{
                          mr: 1,
                          color:
                            values.paymentMethod === "creditCard"
                              ? "primary.main"
                              : "text.secondary",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight:
                            values.paymentMethod === "creditCard"
                              ? "medium"
                              : "normal",
                          color:
                            values.paymentMethod === "creditCard"
                              ? "primary.main"
                              : "text.primary",
                        }}
                      >
                        Credit Card
                      </Typography>
                      <Box
                        component="img"
                        src="https://via.placeholder.com/120x30?text=Cards+Accepted"
                        alt="Accepted Cards"
                        sx={{
                          height: 20,
                          ml: "auto",
                          opacity: 0.8,
                          display: { xs: "none", sm: "block" },
                        }}
                      />
                    </Box>
                  }
                  sx={{ width: "100%" }}
                />

                <Collapse in={showCardFields} timeout={500}>
                  <Box sx={{ mt: 2, ml: 4 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CreditCardIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Expiration Date"
                          placeholder="MM/YY"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="CVV Code"
                          placeholder="123"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Cardholder Name"
                          placeholder="John Doe"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Collapse>
              </Paper>

              {/* PayPal Option */}
              <Paper
                elevation={0}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor:
                    values.paymentMethod === "paypal"
                      ? "primary.main"
                      : "divider",
                  bgcolor:
                    values.paymentMethod === "paypal"
                      ? "primary.lighter"
                      : "background.paper",
                  transition: "all 0.3s ease",
                }}
              >
                <FormControlLabel
                  value="paypal"
                  control={<Radio color="primary" />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PaymentIcon
                        sx={{
                          mr: 1,
                          color:
                            values.paymentMethod === "paypal"
                              ? "primary.main"
                              : "text.secondary",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight:
                            values.paymentMethod === "paypal"
                              ? "medium"
                              : "normal",
                          color:
                            values.paymentMethod === "paypal"
                              ? "primary.main"
                              : "text.primary",
                        }}
                      >
                        PayPal
                      </Typography>
                      <Box
                        component="img"
                        src="https://via.placeholder.com/80x30?text=PayPal"
                        alt="PayPal"
                        sx={{
                          height: 20,
                          ml: "auto",
                          opacity: 0.8,
                          display: { xs: "none", sm: "block" },
                        }}
                      />
                    </Box>
                  }
                  sx={{ width: "100%" }}
                />

                <Collapse in={showPaypalFields} timeout={500}>
                  <Box sx={{ mt: 2, ml: 4 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      You will be redirected to PayPal to complete your payment
                      securely.
                    </Alert>
                  </Box>
                </Collapse>
              </Paper>

              {/* Bank Transfer Option */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor:
                    values.paymentMethod === "bankTransfer"
                      ? "primary.main"
                      : "divider",
                  bgcolor:
                    values.paymentMethod === "bankTransfer"
                      ? "primary.lighter"
                      : "background.paper",
                  transition: "all 0.3s ease",
                }}
              >
                <FormControlLabel
                  value="bankTransfer"
                  control={<Radio color="primary" />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccountBalanceIcon
                        sx={{
                          mr: 1,
                          color:
                            values.paymentMethod === "bankTransfer"
                              ? "primary.main"
                              : "text.secondary",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight:
                            values.paymentMethod === "bankTransfer"
                              ? "medium"
                              : "normal",
                          color:
                            values.paymentMethod === "bankTransfer"
                              ? "primary.main"
                              : "text.primary",
                        }}
                      >
                        Bank Transfer
                      </Typography>
                    </Box>
                  }
                  sx={{ width: "100%" }}
                />

                <Collapse in={showBankFields} timeout={500}>
                  <Box sx={{ mt: 2, ml: 4 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Your order will be processed once we receive your payment.
                      You will receive bank details after placing the order.
                    </Alert>
                  </Box>
                </Collapse>
              </Paper>
            </RadioGroup>

            {touched.paymentMethod && errors.paymentMethod && (
              <FormHelperText>{errors.paymentMethod}</FormHelperText>
            )}
          </FormControl>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            p: 2,
            bgcolor: "success.lighter",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            border: "1px solid",
            borderColor: "success.light",
          }}
        >
          <SecurityIcon color="success" sx={{ mr: 1.5 }} />
          <Typography variant="body2" color="success.dark">
            All payment information is encrypted and secure. We never store your
            complete payment details.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PaymentMethodForm;
