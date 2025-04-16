// fe/src/pages/admin/UserManagementPage.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Container,
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
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  Tooltip,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getAllUsers, updateUserRole, deleteUser } from "../../api/userApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import AdminSidebar from "../../components/admin/AdminSidebar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

const UserManagementPage = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [roleFilter, setRoleFilter] = useState("ALL");

  // Dialog states
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        size: rowsPerPage,
        sort: "createdAt,desc",
      };

      if (roleFilter !== "ALL") {
        params.role = roleFilter;
      }

      const response = await getAllUsers(params);
      setUsers(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
    } catch (err) {
      setError("Failed to load users. Please try again later.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
    setPage(0);
  };

  const handleOpenRoleDialog = (user) => {
    setSelectedUser(user);
    setNewRole(user.role === "ROLE_ADMIN" ? "ADMIN" : "USER");
    setOpenRoleDialog(true);
  };

  const handleCloseRoleDialog = () => {
    setOpenRoleDialog(false);
    setSelectedUser(null);
    setNewRole("");
  };

  const handleUpdateRole = async () => {
    try {
      const roleData = {
        role: newRole === "ADMIN" ? "ROLE_ADMIN" : "ROLE_USER",
      };

      await updateUserRole(selectedUser.id, roleData);
      handleCloseRoleDialog();
      fetchUsers();
      toast.success("User role updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user role");
    }
  };

  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userToDelete.id);
      handleCloseDeleteDialog();
      fetchUsers();
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete the user");
    }
  };

  const roleOptions = [
    { value: "ALL", label: "All Roles" },
    { value: "ROLE_USER", label: "Users" },
    { value: "ROLE_ADMIN", label: "Administrators" },
  ];

  const userRoleOptions = [
    { value: "USER", label: "User" },
    { value: "ADMIN", label: "Administrator" },
  ];

  if (loading && users.length === 0) {
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
            <Typography color="text.primary">Users</Typography>
          </Breadcrumbs>

          {/* Page Title and Filter */}
          <Box
            sx={{
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PeopleIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h4" component="h1">
                User Management
              </Typography>
            </Box>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="role-filter-label">Filter Role</InputLabel>
              <Select
                labelId="role-filter-label"
                value={roleFilter}
                onChange={handleRoleFilterChange}
                label="Filter Role"
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Users Table */}
          <Paper
            sx={{ width: "100%", overflow: "hidden", mb: 4, boxShadow: 2 }}
          >
            <TableContainer sx={{ maxHeight: "calc(100vh - 280px)" }}>
              <Table stickyHeader aria-label="users table">
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Member Since</TableCell>
                    <TableCell>Role</TableCell>
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
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow
                        key={user.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          bgcolor:
                            user.id === currentUser?.id
                              ? "rgba(0, 0, 0, 0.04)"
                              : "inherit",
                        }}
                      >
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "primary.main",
                                fontSize: "0.875rem",
                                mr: 1,
                              }}
                            >
                              {user.username.charAt(0).toUpperCase()}
                            </Avatar>
                            {user.username}
                            {user.id === currentUser?.id && (
                              <Chip
                                label="You"
                                size="small"
                                variant="outlined"
                                color="secondary"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {dayjs(user.createdAt).format("MMM D, YYYY")}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={
                              user.role === "ROLE_ADMIN" ? "Admin" : "User"
                            }
                            size="small"
                            color={
                              user.role === "ROLE_ADMIN"
                                ? "secondary"
                                : "primary"
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Tooltip title="Change Role">
                              <IconButton
                                onClick={() => handleOpenRoleDialog(user)}
                                size="small"
                                color="primary"
                                disabled={user.id === currentUser?.id}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete User">
                              <IconButton
                                onClick={() => handleOpenDeleteDialog(user)}
                                size="small"
                                color="error"
                                sx={{ ml: 1 }}
                                disabled={user.id === currentUser?.id}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          {/* Change Role Dialog */}
          <Dialog open={openRoleDialog} onClose={handleCloseRoleDialog}>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Update role for user: {selectedUser?.username}
              </DialogContentText>
              <FormControl fullWidth margin="dense">
                <InputLabel id="new-role-label">Role</InputLabel>
                <Select
                  labelId="new-role-label"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  label="Role"
                >
                  {userRoleOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRoleDialog}>Cancel</Button>
              <Button
                onClick={handleUpdateRole}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete User Dialog */}
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirm User Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the user "
                {userToDelete?.username}"? This action cannot be undone and will
                remove all data associated with this account.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
              <Button
                onClick={handleDeleteUser}
                variant="contained"
                color="error"
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
export default UserManagementPage;
