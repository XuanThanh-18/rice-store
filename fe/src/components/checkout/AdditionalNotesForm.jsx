import React from "react";
import { Grid, TextField, Typography, Divider } from "@mui/material";
import { Field } from "formik";

const AdditionalNotesForm = () => {
  return (
    <>
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
    </>
  );
};

export default AdditionalNotesForm;
