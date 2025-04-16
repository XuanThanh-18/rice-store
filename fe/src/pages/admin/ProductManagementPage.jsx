// fe/src/pages/admin/ProductManagementPage.jsx
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
  getProducts,
  deleteProduct,
  getRiceTypes,
  getOrigins,
} from "../../api/productApi";
import { formatCurrency } from "../../utils/formatCurrency";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/admin/AdminSidebar";
import ProductForm from "../../components/admin/ProductForm.jsx";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryIcon from "@mui/icons-material/Inventory";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [riceTypes, setRiceTypes] = useState([]);
  const [origins, setOrigins] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchDropdownData();
  }, [page, rowsPerPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts({
        page: page,
        size: rowsPerPage,
        sort: "id,desc",
      });
      setProducts(response.content || []);
      setTotalElements(response.totalElements || 0);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [riceTypesResponse, originsResponse] = await Promise.all([
        getRiceTypes(),
        getOrigins(),
      ]);
      setRiceTypes(riceTypesResponse.data || []);
      setOrigins(originsResponse.data || []);
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setOpenForm(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditProduct(null);
  };

  const handleFormSubmit = () => {
    handleCloseForm();
    fetchProducts();
    toast.success(
      editProduct
        ? "Product updated successfully"
        : "Product added successfully"
    );
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(productToDelete.id);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      fetchProducts();
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete the product"
      );
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  if (loading && products.length === 0) {
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
            <Typography color="text.primary">Products</Typography>
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
              <InventoryIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h4" component="h1">
                Product Management
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </Box>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Products Table */}
          <Paper
            sx={{ width: "100%", overflow: "hidden", mb: 4, boxShadow: 2 }}
          >
            <TableContainer sx={{ maxHeight: "calc(100vh - 280px)" }}>
              <Table stickyHeader aria-label="products table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Origin</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <CircularProgress size={24} />
                      </TableCell>
                    </TableRow>
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow
                        key={product.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{product.id}</TableCell>
                        <TableCell>
                          <Box
                            component="img"
                            src={
                              product.imageUrl ||
                              `https://via.placeholder.com/40x40?text=${product.name}`
                            }
                            alt={product.name}
                            sx={{
                              width: 40,
                              height: 40,
                              objectFit: "contain",
                              borderRadius: 1,
                            }}
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={product.riceType}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        </TableCell>
                        <TableCell>{product.origin}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>
                          <Chip
                            label={`${product.stockQuantity} in stock`}
                            size="small"
                            color={
                              product.stockQuantity > 10
                                ? "success"
                                : product.stockQuantity > 0
                                ? "warning"
                                : "error"
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Tooltip title="View Product">
                              <IconButton
                                component={Link}
                                to={`/products/${product.id}`}
                                size="small"
                                color="info"
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Product">
                              <IconButton
                                onClick={() => handleEditProduct(product)}
                                size="small"
                                color="primary"
                                sx={{ mx: 1 }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Product">
                              <IconButton
                                onClick={() => handleDeleteClick(product)}
                                size="small"
                                color="error"
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

          {/* Add/Edit Product Form Dialog */}
          <Dialog
            open={openForm}
            onClose={handleCloseForm}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {editProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogContent dividers>
              <ProductForm
                product={editProduct}
                onSubmit={handleFormSubmit}
                riceTypes={riceTypes}
                origins={origins}
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
              {"Confirm Product Deletion"}
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete the product "
                {productToDelete?.name}"? This action cannot be undone.
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

export default ProductManagementPage;
