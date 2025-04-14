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
  Slider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getRiceTypes, getOrigins } from "../../api/productApi";

const ProductFilter = ({ filters, onFilterChange }) => {
  const [riceTypes, setRiceTypes] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    keyword: filters.keyword || "",
    riceType: filters.riceType || "",
    origin: filters.origin || "",
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
    sort: filters.sort || "name,asc",
  });

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

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          <FilterListIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Product Filters
        </Typography>
        <Button variant="outlined" size="small" onClick={toggleFilters}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </Box>

      {/* Search Box - Always visible */}
      <TextField
        fullWidth
        name="keyword"
        value={localFilters.keyword}
        onChange={handleInputChange}
        placeholder="Search products..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleApplyFilters}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Additional Filters - Expandable */}
      {showFilters && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
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
            <FormControl fullWidth>
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
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
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}

      {/* Filter Actions */}
      {showFilters && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleResetFilters}
            sx={{ mr: 2 }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default ProductFilter;
