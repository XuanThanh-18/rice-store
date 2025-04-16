import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material";
import {
  getAllOrigins,
  createOrigin,
  updateOrigin,
  deleteOrigin,
  activateOrigin,
} from "../../api/originApi";
import { toast } from "react-toastify";
import PublicIcon from "@mui/icons-material/Public";
import dayjs from "dayjs";

// Import shared components
import AdminLayout from "../../components/layout/AdminLayout";
import PageHeader from "../../components/common/PageHeader";
import DataTable from "../../components/common/DataTable";
import StatusChip from "../../components/common/StatusChip";
import ActionButtons from "../../components/common/ActionButtons";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import OriginForm from "../../components/admin/OriginForm";

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

  // Table columns configuration
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "countryCode", label: "Country Code" },
    { key: "description", label: "Description" },
    { key: "createdAt", label: "Created At" },
    { key: "status", label: "Status", align: "center" },
    { key: "actions", label: "Actions", align: "center" },
  ];

  // Render a single row
  const renderRow = (origin) => (
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
      <TableCell>{dayjs(origin.createdAt).format("MMM D, YYYY")}</TableCell>
      <TableCell align="center">
        <StatusChip isActive={origin.isActive} />
      </TableCell>
      <TableCell align="center">
        <ActionButtons
          onEdit={() => handleEditOrigin(origin)}
          onDelete={origin.isActive ? () => handleDeleteClick(origin) : null}
          onActivate={!origin.isActive ? () => handleActivate(origin) : null}
          isActive={origin.isActive}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <AdminLayout>
      <Container maxWidth="xl">
        {/* Page Header */}
        <PageHeader
          title="Origin Management"
          icon={<PublicIcon />}
          breadcrumbs={[
            { text: "Admin", link: "/admin/dashboard" },
            { text: "Origins" },
          ]}
          actionText="Add Origin"
          onAction={handleAddOrigin}
        />

        {/* Error Message */}
        {error && (
          <Typography color="error" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )}

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={origins}
          renderRow={renderRow}
          loading={loading}
          emptyMessage="No origins found"
        />

        {/* Add/Edit Form Dialog */}
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

        {/* Confirm Delete Dialog */}
        <ConfirmDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Confirm Origin Deletion"
          content={`Are you sure you want to delete the origin "${originToDelete?.name}"? This action will deactivate the origin.`}
          confirmText="Delete"
          confirmColor="error"
        />
      </Container>
    </AdminLayout>
  );
};

export default OriginManagementPage;
