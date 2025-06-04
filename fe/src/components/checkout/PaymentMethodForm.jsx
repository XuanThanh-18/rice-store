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
          Chọn phương thức thanh toán ưa thích của bạn
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
                        Thanh toán thẻ
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
                          label="Số thẻ"
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
                          label="Ngày gia hạn"
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
                      Bạn sẽ được chuyển hướng tới PayPal để hoàn tất thanh toán
                      của bạn một cách an toàn.
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
                        Phương thức chuyển tiền
                      </Typography>
                    </Box>
                  }
                  sx={{ width: "100%" }}
                />

                <Collapse in={showBankFields} timeout={500}>
                  <Box sx={{ mt: 2, ml: 4 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Đơn hàng của bạn sẽ được xử lý ngay khi chúng tôi nhận
                      được thanh toán của bạn. Bạn sẽ nhận được thông tin ngân
                      hàng sau khi đặt hàng.
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
            Tất cả thông tin thanh toán đều được mã hóa và an toàn. Chúng tôi
            không bao giờ lưu trữ chi tiết thanh toán đầy đủ của bạn.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PaymentMethodForm;
