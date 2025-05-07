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
  Chip,
} from "@mui/material";
import { Field } from "formik";
import DescriptionIcon from "@mui/icons-material/Description";
import MessageIcon from "@mui/icons-material/Message";
import InfoIcon from "@mui/icons-material/Info";

const AdditionalNotesForm = ({ errors, touched }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Add any additional information for your order
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Field
          as={TextField}
          fullWidth
          multiline
          rows={4}
          name="notes"
          placeholder="Add any specific delivery instructions, preferences, or other important information..."
          variant="outlined"
          error={touched.notes && Boolean(errors.notes)}
          helperText={touched.notes && errors.notes}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MessageIcon color="primary" fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText>
          Optional: You can leave this field empty if there are no special
          instructions
        </FormHelperText>
      </Grid>

      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "info.lighter",
            border: "1px solid",
            borderColor: "info.light",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <InfoIcon
              color="info"
              sx={{
                mr: 1.5,
                mt: 0.5,
              }}
            />
            <Box>
              <Typography variant="body2" color="info.dark" gutterBottom>
                Examples of information you might want to include:
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                <Chip
                  label="Delivery time preferences"
                  size="small"
                  variant="outlined"
                  color="info"
                />
                <Chip
                  label="Building access codes"
                  size="small"
                  variant="outlined"
                  color="info"
                />
                <Chip
                  label="Gift message"
                  size="small"
                  variant="outlined"
                  color="info"
                />
                <Chip
                  label="Special handling"
                  size="small"
                  variant="outlined"
                  color="info"
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Our delivery team will do their best to accommodate your
                requests.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdditionalNotesForm;
