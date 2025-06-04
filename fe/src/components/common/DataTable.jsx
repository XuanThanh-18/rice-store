import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

/**
 * Reusable DataTable Component
 * Displays data in a table format with loading state handling
 *
 * @param {Array} columns - Array of column definitions with key, label properties
 * @param {Array} data - Array of data objects to display
 * @param {Function} renderRow - Function to render a table row (receives item and index)
 * @param {boolean} loading - Whether data is loading
 * @param {string} emptyMessage - Message to display when no data
 */
const DataTable = ({
  columns,
  data = [],
  renderRow,
  loading = false,
  emptyMessage = "Ko tìm thấy dữ liệu",
  maxHeight = "calc(100vh - 280px)",
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mb: 4, boxShadow: 2 }}>
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader aria-label="data table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align || "left"}
                  width={column.width}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 5 }}
                >
                  <CircularProgress size={40} />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 5 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => renderRow(item, index))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
