import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  Box,
  InputAdornment,
  Paper,
  FormHelperText,
  Fade,
} from "@mui/material";
import { Field } from "formik";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

const BillingInfoForm = ({ values, setFieldValue, errors, touched }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Nhập địa chỉ thanh toán hoặc sử dụng thông tin giao hàng
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: values.useShippingAsBilling ? "success.light" : "grey.100",
            border: "1px solid",
            borderColor: values.useShippingAsBilling
              ? "success.main"
              : "divider",
            transition: "all 0.3s ease",
          }}
        >
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
                color="success"
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SyncAltIcon
                  sx={{
                    fontSize: 18,
                    mr: 1,
                    color: values.useShippingAsBilling
                      ? "success.main"
                      : "text.secondary",
                    transition: "color 0.3s ease",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: values.useShippingAsBilling
                      ? "medium"
                      : "normal",
                    color: values.useShippingAsBilling
                      ? "success.main"
                      : "text.primary",
                  }}
                >
                  Sử dụng địa chỉ giao hàng làm địa chỉ thanh toán
                </Typography>
              </Box>
            }
          />
        </Paper>
      </Grid>

      {!values.useShippingAsBilling && (
        <Fade in={!values.useShippingAsBilling} timeout={500}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                multiline
                rows={4}
                name="billingAddress"
                label="Địa chỉ thanh toán"
                variant="outlined"
                error={touched.billingAddress && Boolean(errors.billingAddress)}
                helperText={touched.billingAddress && errors.billingAddress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="primary" fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Nhập địa chỉ thanh toán của bạn"
              />
              <FormHelperText>
                Vui lòng bao gồm địa chỉ đường, thành phố, tiểu bang và mã ZIP
              </FormHelperText>
            </Grid>
          </Grid>
        </Fade>
      )}

      {values.useShippingAsBilling && (
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              mt: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Địa chỉ thanh toán giống như địa chỉ giao hàng của bạn:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                whiteSpace: "pre-line",
                fontStyle: "italic",
                color: "text.primary",
              }}
            >
              {values.shippingAddress}
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default BillingInfoForm;
