import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";
import { addToCart } from "../api/cartApi";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

// Import refactored components
import ProductFilter from "../components/products/ProductFilter";
import ProductGrid from "../components/products/ProductsPage/ProductGrid";
import ProductResults from "../components/products/ProductsPage/ProductResults";
import EmptyResults from "../components/products/ProductsPage/EmptyResults";

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Parse query parameters from URL for initial filter state
  const searchParams = new URLSearchParams(location.search);
  const initialFilters = {
    keyword: searchParams.get("keyword") || "",
    riceType: searchParams.get("riceType") || "",
    origin: searchParams.get("origin") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "name,asc",
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    fetchProducts();
    // Update URL with current filters
    updateQueryParams();
  }, [page, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        ...filters,
        page,
        size: 12,
      };

      // Remove empty filter values
      Object.keys(params).forEach(
        (key) =>
          (params[key] === "" || params[key] === null) && delete params[key]
      );

      const response = await getProducts(params);
      setProducts(response.content || []);
      setTotalPages(response.totalPages || 0);
      setTotalElements(response.totalElements || 0);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQueryParams = () => {
    const queryParams = new URLSearchParams();

    // Add non-empty filter values to URL
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        queryParams.set(key, value);
      }
    });

    // Add page parameter if not on first page
    if (page > 0) {
      queryParams.set("page", page + 1);
    }

    // Update URL without triggering a navigation
    const newUrl = `${location.pathname}${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;
    navigate(newUrl, { replace: true });
  };

  const handleAddToCart = async (productId, quantity) => {
    if (!isAuthenticated) {
      toast.info("Please log in to add items to your cart");
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      await addToCart(productId, quantity);
      toast.success("Product added to cart successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add product to cart"
      );
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(0); // Reset to first page when filters change
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <MuiLink component={Link} to="/" color="inherit">
          Home
        </MuiLink>
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <ShoppingBagIcon sx={{ mr: 1, fontSize: 28 }} />
        <Typography variant="h4" component="h1">
          Rice Products
        </Typography>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Filter Sidebar */}
        <Box
          sx={{
            width: { xs: "100%", md: "280px" },
            flexShrink: 0,
            mb: { xs: 3, md: 0 },
          }}
        >
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Box>

        {/* Product Content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          ) : products.length === 0 ? (
            <EmptyResults />
          ) : (
            <>
              {/* Results Count */}
              <ProductResults count={products.length} total={totalElements} />

              {/* Products Grid */}
              <ProductGrid products={products} onAddToCart={handleAddToCart} />

              {/* Pagination */}
              {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={4}>
                  <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductsPage;
