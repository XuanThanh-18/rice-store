import React, { useState, useEffect, useContext } from "react";
import { Container, Dialog, DialogTitle, DialogContent } from "@mui/material";
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../api/productApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import InventoryIcon from "@mui/icons-material/Inventory";

// Import shared components
import AdminLayout from "../../components/layout/AdminLayout";
import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";

// Import product specific components
import ProductFilterBar from "../../components/admin/products/ProductFilterBar";
import ProductForm from "../../components/admin/products/ProductForm";
import ProductTable from "../../components/admin/products/ProductTable";

const ProductManagementPage = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [setTotalElements] = useState(0);

  // Filter states
  const [filters, setFilters] = useState({
    keyword: "",
    riceType: "",
    origin: "",
    minPrice: "",
    maxPrice: "",
    sort: "id,desc",
  });

  // UI states
  const [openForm, setOpenForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Prepare params for API call
      const params = {
        ...filters,
        page,
        size: rowsPerPage,
      };

      // Remove empty filter values
      Object.keys(params).forEach(
        (key) =>
          (params[key] === "" || params[key] === null) && delete params[key]
      );

      const response = await getProducts(params);
      setProducts(response.content || []);
      setTotalElements(response.totalElements || 0);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter handlers
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(0); // Reset to first page when filters change
  };

  // Form handlers
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

  const handleFormSubmit = async (values) => {
    try {
      if (editProduct) {
        await updateProduct(editProduct.id, values);
        toast.success("Product updated successfully");
      } else {
        await createProduct(values, user.username);
        toast.success("Product added successfully");
      }
      handleCloseForm();
      fetchProducts();
      return true; // Indicate success to the form
    } catch (err) {
      console.error("Error saving product:", err);
      throw err; // Re-throw to be caught by the form
    }
  };

  // Delete handlers
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

  return (
    <AdminLayout>
      <Container maxWidth="xl">
        {/* Page Header */}
        <PageHeader
          title="Product Management"
          icon={<InventoryIcon />}
          breadcrumbs={[
            { text: "Admin", link: "/admin/dashboard" },
            { text: "Products" },
          ]}
          actionText="Add Product"
          onAction={handleAddProduct}
        />

        {/* Product Filter Bar */}
        <ProductFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Product Table */}
        <ProductTable
          products={products}
          loading={loading}
          onEdit={handleEditProduct}
          onDelete={handleDeleteClick}
          emptyMessage={error || "No products found"}
        />

        {/* Pagination Component could be added here */}

        {/* Product Form Dialog */}
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
            <ProductForm product={editProduct} onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Confirm Product Deletion"
          content={`Are you sure you want to delete the product "${productToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          confirmColor="error"
        />
      </Container>
    </AdminLayout>
  );
};

export default ProductManagementPage;
