import React, { useState } from "react";
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
  InputAdornment,
  Divider,
  Paper,
  CircularProgress,
  Collapse,
  Card,
  CardContent,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { formatCurrency } from "../../utils/formatCurrency";
import ShippingInfoForm from "./ShippingInfoForm";
import BillingInfoForm from "./BillingInfoForm";
import PaymentMethodForm from "./PaymentMethodForm";
import AdditionalNotesForm from "./AdditionalNotesForm";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const checkoutValidationSchema = Yup.object({
  shippingAddress: Yup.string().required(
    "Địa chỉ thanh toán không được để trống"
  ),
  billingAddress: Yup.string().required("Tòa nhà thanh toán ko được để trống"),
  phoneNumber: Yup.string()
    .matches(/^[0-9+\- ]+$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được để trống"),
  paymentMethod: Yup.string().required(
    "Phương thức thanh toán không được để trống"
  ),
  useShippingAsBilling: Yup.boolean(),
  notes: Yup.string(),
});

const CheckoutForm = ({ cart, onCheckout, loading }) => {
  const [sections, setSections] = useState({
    shipping: true,
    billing: true,
    payment: true,
    notes: true,
  });

  // Function to toggle section collapse
  const toggleSection = (section) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Calculate totals
  const { totalAmount } = cart;
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

  // Function to render a section header
  const SectionHeader = ({ title, icon, section, expanded }) => (
    <Box
      onClick={() => toggleSection(section)}
      sx={{
        display: "flex",
        alignItems: "center",
        py: 2,
        px: 1,
        cursor: "pointer",
        borderRadius: 1,
        "&:hover": {
          bgcolor: "action.hover",
        },
        transition: "background-color 0.2s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: expanded ? "primary.main" : "grey.200",
          color: expanded ? "white" : "text.secondary",
          borderRadius: "50%",
          p: 1,
          mr: 2,
          transition: "all 0.3s ease",
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h6"
        color={expanded ? "primary.main" : "text.primary"}
      >
        {title}
      </Typography>
      {expanded && (
        <CheckCircleIcon
          color="success"
          sx={{
            ml: "auto",
            animation: "fadeIn 0.5s",
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          }}
        />
      )}
    </Box>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            {/* Shipping Section */}
            <Grid item xs={12}>
              <SectionHeader
                title="Shipping Information"
                icon={<LocalShippingIcon />}
                section="shipping"
                expanded={sections.shipping}
              />
              <Divider sx={{ mb: 2 }} />
              <Collapse in={sections.shipping} timeout={500}>
                <Box sx={{ p: 1 }}>
                  <ShippingInfoForm
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Collapse>
            </Grid>

            {/* Billing Section */}
            <Grid item xs={12}>
              <SectionHeader
                title="Billing Information"
                icon={<HomeIcon />}
                section="billing"
                expanded={sections.billing}
              />
              <Divider sx={{ mb: 2 }} />
              <Collapse in={sections.billing} timeout={500}>
                <Box sx={{ p: 1 }}>
                  <BillingInfoForm
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Collapse>
            </Grid>

            {/* Payment Section */}
            <Grid item xs={12}>
              <SectionHeader
                title="Payment Method"
                icon={<CreditCardIcon />}
                section="payment"
                expanded={sections.payment}
              />
              <Divider sx={{ mb: 2 }} />
              <Collapse in={sections.payment} timeout={500}>
                <Box sx={{ p: 1 }}>
                  <PaymentMethodForm
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Collapse>
            </Grid>

            {/* Notes Section */}
            <Grid item xs={12}>
              <SectionHeader
                title="Additional Notes"
                icon={<DescriptionIcon />}
                section="notes"
                expanded={sections.notes}
              />
              <Divider sx={{ mb: 2 }} />
              <Collapse in={sections.notes} timeout={500}>
                <Box sx={{ p: 1 }}>
                  <AdditionalNotesForm
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Collapse>
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
                sx={{
                  py: 2,
                  fontWeight: "bold",
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 5,
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  `Đặt hàng (${formatCurrency(finalTotal)})`
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
