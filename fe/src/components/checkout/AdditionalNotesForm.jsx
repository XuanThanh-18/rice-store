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
          Thêm bất kỳ thông tin bổ sung nào cho đơn hàng của bạn
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Field
          as={TextField}
          fullWidth
          multiline
          rows={4}
          name="notes"
          placeholder="Thêm bất kỳ hướng dẫn giao hàng cụ thể nào, sở thích hoặc thông tin quan trọng khác..."
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
          Tùy chọn: Bạn có thể để trường này trống nếu không có hướng dẫn đặc
          biệt nào.
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
                Ví dụ về thông tin bạn có thể muốn bao gồm:
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                <Chip
                  label="Sở thích về thời gian giao hàng"
                  size="small"
                  variant="outlined"
                  color="info"
                />
                <Chip
                  label="Mã truy cập tòa nhà"
                  size="small"
                  variant="outlined"
                  color="info"
                />
                <Chip
                  label="Lời nhắn gửi"
                  size="small"
                  variant="outlined"
                  color="info"
                />
                <Chip
                  label="Xử lý đặc biệt"
                  size="small"
                  variant="outlined"
                  color="info"
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Nhóm giao hàng của chúng tôi sẽ cố gắng hết sức để đáp ứng các
                yêu cầu của bạn.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdditionalNotesForm;
