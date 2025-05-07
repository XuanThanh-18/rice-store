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
          Please enter your shipping details
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Field
          as={TextField}
          fullWidth
          name="fullName"
          label="Full Name"
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
          placeholder="Enter your full name"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Field
          as={TextField}
          fullWidth
          name="phoneNumber"
          label="Phone Number"
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
          placeholder="Enter your phone number"
        />
      </Grid>

      <Grid item xs={12}>
        <Field
          as={TextField}
          fullWidth
          multiline
          rows={4}
          name="shippingAddress"
          label="Shipping Address"
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
          placeholder="Enter your complete shipping address"
        />
        <FormHelperText>
          Please include street address, city, state, and ZIP code
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
            Orders typically ship within 1-2 business days. For addresses in
            rural areas, delivery may take an additional 1-2 days.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ShippingInfoForm;
