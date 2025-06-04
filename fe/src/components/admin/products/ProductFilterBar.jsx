import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  InputAdornment,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getRiceTypes, getOrigins } from "../../../api/productApi";

/**
 * Thanh lọc sản phẩm với nhiều tùy chọn
 */
const ProductFilterBar = ({ filters, onFilterChange }) => {
  const [riceTypes, setRiceTypes] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [expandedFilter, setExpandedFilter] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    keyword: filters.keyword || "",
    riceType: filters.riceType || "",
    origin: filters.origin || "",
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
    sort: filters.sort || "name,asc",
  });

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Get rice types
        const riceTypesResponse = await getRiceTypes();
        setRiceTypes(riceTypesResponse.data || []);

        // Get origins
        const originsResponse = await getOrigins();
        setOrigins(originsResponse.data || []);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters({
      keyword: filters.keyword || "",
      riceType: filters.riceType || "",
      origin: filters.origin || "",
      minPrice: filters.minPrice || "",
      maxPrice: filters.maxPrice || "",
      sort: filters.sort || "name,asc",
    });
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      keyword: "",
      riceType: "",
      origin: "",
      minPrice: "",
      maxPrice: "",
      sort: "name,asc",
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleApplyFilters();
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      {/* Search and Filter Toggle */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <FilterListIcon sx={{ mr: 1 }} />
          Product Filters
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setExpandedFilter(!expandedFilter)}
          endIcon={<ExpandMoreIcon />}
        >
          {expandedFilter ? "Hide Filters" : "More Filters"}
        </Button>
      </Box>

      {/* Search Box - Always visible */}
      <TextField
        fullWidth
        name="keyword"
        value={localFilters.keyword}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search products by name, description..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleApplyFilters} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Advanced Filters */}
      <Accordion
        expanded={expandedFilter}
        onChange={() => setExpandedFilter(!expandedFilter)}
        disableGutters
        elevation={0}
        sx={{
          "&:before": { display: "none" },
          border: "none",
        }}
      >
        <AccordionDetails sx={{ px: 0, pb: 0 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="rice-type-label">Rice Type</InputLabel>
                <Select
                  labelId="rice-type-label"
                  name="riceType"
                  value={localFilters.riceType}
                  label="Rice Type"
                  onChange={handleInputChange}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {riceTypes.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="origin-label">Origin</InputLabel>
                <Select
                  labelId="origin-label"
                  name="origin"
                  value={localFilters.origin}
                  label="Origin"
                  onChange={handleInputChange}
                >
                  <MenuItem value="">All Origins</MenuItem>
                  {origins.map((origin) => (
                    <MenuItem key={origin.id} value={origin.name}>
                      {origin.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Min Price"
                name="minPrice"
                type="number"
                value={localFilters.minPrice}
                onChange={handleInputChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Max Price"
                name="maxPrice"
                type="number"
                value={localFilters.maxPrice}
                onChange={handleInputChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  name="sort"
                  value={localFilters.sort}
                  label="Sort By"
                  onChange={handleInputChange}
                >
                  <MenuItem value="name,asc">Name (A-Z)</MenuItem>
                  <MenuItem value="name,desc">Name (Z-A)</MenuItem>
                  <MenuItem value="price,asc">Price (Low to High)</MenuItem>
                  <MenuItem value="price,desc">Price (High to Low)</MenuItem>
                  <MenuItem value="createdAt,desc">Newest First</MenuItem>
                  <MenuItem value="stockQuantity,asc">
                    Tồn kho (Thấp đến cao)
                  </MenuItem>
                  <MenuItem value="stockQuantity,desc">
                    Tồn kho (Cao đến thấp)
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleResetFilters}
              sx={{ mr: 2 }}
            >
              Khôi phục
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilters}
            >
              ÁP dụng lọc
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ProductFilterBar;
