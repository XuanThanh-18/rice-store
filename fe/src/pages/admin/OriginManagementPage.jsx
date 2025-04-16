import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Breadcrumbs,
  Link as MuiLink,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  getAllOrigins,
  createOrigin,
  updateOrigin,
  deleteOrigin,
  activateOrigin,
} from "../../api/originApi";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/admin/AdminSidebar";
import OriginForm from "../../components/admin/OriginForm";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PublicIcon from "@mui/icons-material/Public";
import RestoreIcon from "@mui/icons-material/Restore";
import dayjs from "dayjs";

const OriginManagementPage = () => {
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editOrigin, setEditOrigin] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [originToDelete, setOriginToDelete] = useState(null);

  useEffect(() => {
    fetchOrigins();
  }, []);

  const fetchOrigins = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllOrigins({ activeOnly: false });
      setOrigins(response.data || []);
    } catch (err) {
      setError("Failed to load origins. Please try again later.");
      console.error("Error fetching origins:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrigin = () => {
    setEditOrigin(null);
    setOpenForm(true);
  };

  const handleEditOrigin = (origin) => {
    setEditOrigin(origin);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditOrigin(null);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editOrigin) {
        await updateOrigin(editOrigin.id, values);
        toast.success("Origin updated successfully");
      } else {
        await createOrigin(values);
        toast.success("Origin added successfully");
      }
      handleCloseForm();
      fetchOrigins();
    } catch (error) {
      console.error("Error saving origin:", error);
      throw error; // Re-throw to be caught by the form
    }
  };

  const handleDeleteClick = (origin) => {
    setOriginToDelete(origin);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteOrigin(originToDelete.id);
      setDeleteDialogOpen(false);
      setOriginToDelete(null);
      fetchOrigins();
      toast.success("Origin deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete the origin");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setOriginToDelete(null);
  };

  const handleActivate = async (origin) => {
    try {
      await activateOrigin(origin.id);
      fetchOrigins();
      toast.success("Origin activated successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to activate the origin"
      );
    }
  };

  if (loading && origins.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          overflowY: "auto",
          marginLeft: { xs: 0, md: "240px" },
          width: { xs: "100%", md: "calc(100% - 240px)" },
        }}
      >
        <Container maxWidth="xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 3, mt: 2 }}
          >
            <MuiLink component={Link} to="/" color="inherit">
              Home
            </MuiLink>
            <MuiLink component={Link} to="/admin/dashboard" color="inherit">
              Admin
            </MuiLink>
            <Typography color="text.primary">Origins</Typography>
          </Breadcrumbs>

          {/* Page Title and Add Button */}
          <Box
            sx={{
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PublicIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h4" component="h1">
                Origin Management
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddOrigin}
            >
              Add Origin
            </Button>
          </Box>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Origins Table */}
          <Paper
            sx={{ width: "100%", overflow: "hidden", mb: 4, boxShadow: 2 }}
          >
            <TableContainer sx={{ maxHeight: "calc(100vh - 280px)" }}>
              <Table stickyHeader aria-label="origins table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Country Code</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : origins.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No origins found
                      </TableCell>
                    </TableRow>
                  ) : (
                    origins.map((origin) => (
                      <TableRow
                        key={origin.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{origin.id}</TableCell>
                        <TableCell>{origin.name}</TableCell>
                        <TableCell>
                          {origin.countryCode ? (
                            <Chip
                              label={origin.countryCode}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>
                          {origin.description
                            ? origin.description.length > 100
                              ? origin.description.substring(0, 100) + "..."
                              : origin.description
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {dayjs(origin.createdAt).format("MMM D, YYYY")}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={origin.isActive ? "Active" : "Inactive"}
                            color={origin.isActive ? "success" : "error"}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Tooltip title="Edit Origin">
                              <IconButton
                                onClick={() => handleEditOrigin(origin)}
                                size="small"
                                color="primary"
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            {origin.isActive ? (
                              <Tooltip title="Delete Origin">
                                <IconButton
                                  onClick={() => handleDeleteClick(origin)}
                                  size="small"
                                  color="error"
                                  sx={{ ml: 1 }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Activate Origin">
                                <IconButton
                                  onClick={() => handleActivate(origin)}
                                  size="small"
                                  color="success"
                                  sx={{ ml: 1 }}
                                >
                                  <RestoreIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Add/Edit Origin Form Dialog */}
          <Dialog
            open={openForm}
            onClose={handleCloseForm}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {editOrigin ? "Edit Origin" : "Add New Origin"}
            </DialogTitle>
            <DialogContent dividers>
              <OriginForm origin={editOrigin} onSubmit={handleFormSubmit} />
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Origin Deletion"}
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete the origin "
                {originToDelete?.name}"? This action will deactivate the origin.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel}>Cancel</Button>
              <Button
                onClick={handleDeleteConfirm}
                variant="contained"
                color="error"
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default OriginManagementPage;
