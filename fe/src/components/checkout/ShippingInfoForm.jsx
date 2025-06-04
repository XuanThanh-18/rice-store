import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Divider,
  Box,
  Paper,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Field } from "formik";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ShippingInfoForm = ({ errors, touched }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Vui lòng nhập thông tin giao hàng của bạn
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Field
          as={TextField}
          fullWidth
          name="fullName"
          label="Họ và tên"
          variant="outlined"
          error={touched.fullName && Boolean(errors.fullName)}
          helperText={touched.fullName && errors.fullName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon color="primary" fontSize="small" />
              </InputAdornment>
            ),
          }}
          placeholder="Nhập đầy đủ họ tên"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Field
          as={TextField}
          fullWidth
          name="phoneNumber"
          label="Số điện thoại"
          variant="outlined"
          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
          helperText={touched.phoneNumber && errors.phoneNumber}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon color="primary" fontSize="small" />
              </InputAdornment>
            ),
          }}
          placeholder="Nhập số điện thoại"
        />
      </Grid>

      <Grid item xs={12}>
        <Field
          as={TextField}
          fullWidth
          multiline
          rows={4}
          name="shippingAddress"
          label="Địa chỉ giao hàng"
          variant="outlined"
          error={touched.shippingAddress && Boolean(errors.shippingAddress)}
          helperText={touched.shippingAddress && errors.shippingAddress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon color="primary" fontSize="small" />
              </InputAdornment>
            ),
          }}
          placeholder="Nhập địa chỉ giao hàng"
        />
        <FormHelperText>
          Vui lòng bao gồm địa chỉ đường, thành phố, xã và mã ZIP
        </FormHelperText>
      </Grid>

      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: "primary.light",
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "primary.main",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LocalShippingIcon
            sx={{
              color: "primary.main",
              fontSize: 20,
              mr: 1.5,
            }}
          />
          <Typography variant="body2" color="primary.main">
            Đơn hàng thường được giao trong vòng 1-2 ngày làm việc. Đối với các
            địa chỉ ở vùng nông thôn, việc giao hàng có thể mất thêm 1-2 ngày.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ShippingInfoForm;
