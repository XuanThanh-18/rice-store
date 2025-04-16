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
  TablePagination,
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
  getAllRiceTypes,
  createRiceType,
  updateRiceType,
  deleteRiceType,
  activateRiceType,
} from "../../api/riceTypeApi";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/admin/AdminSidebar";
import RiceTypeForm from "../../components/admin/RiceTypeForm";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GrainIcon from "@mui/icons-material/Grain";
import RestoreIcon from "@mui/icons-material/Restore";
import dayjs from "dayjs";

const RiceTypeManagementPage = () => {
  const [riceTypes, setRiceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editRiceType, setEditRiceType] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [riceTypeToDelete, setRiceTypeToDelete] = useState(null);

  useEffect(() => {
    fetchRiceTypes();
  }, []);

  const fetchRiceTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllRiceTypes({ activeOnly: false });
      setRiceTypes(response.data || []);
    } catch (err) {
      setError("Failed to load rice types. Please try again later.");
      console.error("Error fetching rice types:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRiceType = () => {
    setEditRiceType(null);
    setOpenForm(true);
  };

  const handleEditRiceType = (riceType) => {
    setEditRiceType(riceType);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditRiceType(null);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editRiceType) {
        await updateRiceType(editRiceType.id, values);
        toast.success("Rice type updated successfully");
      } else {
        await createRiceType(values);
        toast.success("Rice type added successfully");
      }
      handleCloseForm();
      fetchRiceTypes();
    } catch (error) {
      console.error("Error saving rice type:", error);
      throw error; // Re-throw to be caught by the form
    }
  };

  const handleDeleteClick = (riceType) => {
    setRiceTypeToDelete(riceType);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRiceType(riceTypeToDelete.id);
      setDeleteDialogOpen(false);
      setRiceTypeToDelete(null);
      fetchRiceTypes();
      toast.success("Rice type deleted successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete the rice type"
      );
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRiceTypeToDelete(null);
  };

  const handleActivate = async (riceType) => {
    try {
      await activateRiceType(riceType.id);
      fetchRiceTypes();
      toast.success("Rice type activated successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to activate the rice type"
      );
    }
  };

  if (loading && riceTypes.length === 0) {
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
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          minHeight: "100vh",
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
            <Typography color="text.primary">Rice Types</Typography>
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
              <GrainIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h4" component="h1">
                Rice Type Management
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddRiceType}
            >
              Add Rice Type
            </Button>
          </Box>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Rice Types Table */}
          <Paper
            sx={{ width: "100%", overflow: "hidden", mb: 4, boxShadow: 2 }}
          >
            <TableContainer sx={{ maxHeight: "calc(100vh - 280px)" }}>
              <Table stickyHeader aria-label="rice types table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Updated At</TableCell>
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
                  ) : riceTypes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No rice types found
                      </TableCell>
                    </TableRow>
                  ) : (
                    riceTypes.map((riceType) => (
                      <TableRow
                        key={riceType.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{riceType.id}</TableCell>
                        <TableCell>{riceType.name}</TableCell>
                        <TableCell>
                          {riceType.description
                            ? riceType.description.length > 100
                              ? riceType.description.substring(0, 100) + "..."
                              : riceType.description
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {dayjs(riceType.createdAt).format("MMM D, YYYY")}
                        </TableCell>
                        <TableCell>
                          {dayjs(riceType.updatedAt).format("MMM D, YYYY")}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={riceType.isActive ? "Active" : "Inactive"}
                            color={riceType.isActive ? "success" : "error"}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Tooltip title="Edit Rice Type">
                              <IconButton
                                onClick={() => handleEditRiceType(riceType)}
                                size="small"
                                color="primary"
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            {riceType.isActive ? (
                              <Tooltip title="Delete Rice Type">
                                <IconButton
                                  onClick={() => handleDeleteClick(riceType)}
                                  size="small"
                                  color="error"
                                  sx={{ ml: 1 }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Activate Rice Type">
                                <IconButton
                                  onClick={() => handleActivate(riceType)}
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

          {/* Add/Edit Rice Type Form Dialog */}
          <Dialog
            open={openForm}
            onClose={handleCloseForm}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {editRiceType ? "Edit Rice Type" : "Add New Rice Type"}
            </DialogTitle>
            <DialogContent dividers>
              <RiceTypeForm
                riceType={editRiceType}
                onSubmit={handleFormSubmit}
              />
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
              {"Confirm Rice Type Deletion"}
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete the rice type "
                {riceTypeToDelete?.name}"? This action will deactivate the rice
                type.
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

export default RiceTypeManagementPage;
