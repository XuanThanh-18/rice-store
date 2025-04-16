import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  getAllRiceTypes,
  createRiceType,
  updateRiceType,
  deleteRiceType,
  activateRiceType,
} from "../../api/riceTypeApi";
import { toast } from "react-toastify";
import GrainIcon from "@mui/icons-material/Grain";
import dayjs from "dayjs";

// Import shared components
import AdminLayout from "../../components/layout/AdminLayout";
import PageHeader from "../../components/common/PageHeader";
import DataTable from "../../components/common/DataTable";
import StatusChip from "../../components/common/StatusChip";
import ActionButtons from "../../components/common/ActionButtons";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import RiceTypeForm from "../../components/admin/RiceTypeForm";

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

  // Table columns configuration
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
    { key: "status", label: "Status", align: "center" },
    { key: "actions", label: "Actions", align: "center" },
  ];

  // Render a single row
  const renderRow = (riceType) => (
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
      <TableCell>{dayjs(riceType.createdAt).format("MMM D, YYYY")}</TableCell>
      <TableCell>{dayjs(riceType.updatedAt).format("MMM D, YYYY")}</TableCell>
      <TableCell align="center">
        <StatusChip isActive={riceType.isActive} />
      </TableCell>
      <TableCell align="center">
        <ActionButtons
          onEdit={() => handleEditRiceType(riceType)}
          onDelete={
            riceType.isActive ? () => handleDeleteClick(riceType) : null
          }
          onActivate={
            !riceType.isActive ? () => handleActivate(riceType) : null
          }
          isActive={riceType.isActive}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <AdminLayout>
      <Container maxWidth="xl">
        {/* Page Header */}
        <PageHeader
          title="Rice Type Management"
          icon={<GrainIcon />}
          breadcrumbs={[
            { text: "Admin", link: "/admin/dashboard" },
            { text: "Rice Types" },
          ]}
          actionText="Add Rice Type"
          onAction={handleAddRiceType}
        />

        {/* Error Message (could be extracted to an ErrorAlert component) */}
        {error && (
          <Typography color="error" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )}

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={riceTypes}
          renderRow={renderRow}
          loading={loading}
          emptyMessage="No rice types found"
        />

        {/* Add/Edit Form Dialog */}
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
            <RiceTypeForm riceType={editRiceType} onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>

        {/* Confirm Delete Dialog */}
        <ConfirmDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Confirm Rice Type Deletion"
          content={`Are you sure you want to delete the rice type "${riceTypeToDelete?.name}"? This action will deactivate the rice type.`}
          confirmText="Delete"
          confirmColor="error"
        />
      </Container>
    </AdminLayout>
  );
};

export default RiceTypeManagementPage;
