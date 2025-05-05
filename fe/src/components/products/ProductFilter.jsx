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
  Slider,
  Autocomplete,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { getRiceTypes, getOrigins } from "../../api/productApi";
import { formatCurrency } from "../../utils/formatCurrency";

const ProductFilter = ({ filters, onFilterChange }) => {
  const [riceTypes, setRiceTypes] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localFilters, setLocalFilters] = useState({
    keyword: filters.keyword || "",
    riceType: filters.riceType || "",
    origin: filters.origin || "",
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
    sort: filters.sort || "name,asc",
  });
  const [priceRange, setPriceRange] = useState([
    localFilters.minPrice ? Number(localFilters.minPrice) : 0,
    localFilters.maxPrice ? Number(localFilters.maxPrice) : 100,
  ]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        // Get rice types
        const riceTypesResponse = await getRiceTypes();
        setRiceTypes(riceTypesResponse.data || []);

        // Get origins
        const originsResponse = await getOrigins();
        setOrigins(originsResponse.data || []);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setLoading(false);
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

    setPriceRange([
      filters.minPrice ? Number(filters.minPrice) : 0,
      filters.maxPrice ? Number(filters.maxPrice) : 100,
    ]);
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setLocalFilters((prev) => ({
      ...prev,
      minPrice: newValue[0].toString(),
      maxPrice: newValue[1].toString(),
    }));
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
    setPriceRange([0, 100]);
    onFilterChange(resetFilters);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleApplyFilters();
    }
  };

  const sortOptions = [
    { value: "name,asc", label: "Name (A-Z)" },
    { value: "name,desc", label: "Name (Z-A)" },
    { value: "price,asc", label: "Price (Low to High)" },
    { value: "price,desc", label: "Price (High to Low)" },
    { value: "createdAt,desc", label: "Newest First" },
  ];

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          <FilterListIcon sx={{ mr: 1 }} />
          Filters
        </Typography>

        <IconButton
          onClick={handleResetFilters}
          color="primary"
          size="small"
          title="Reset all filters"
        >
          <RestartAltIcon />
        </IconButton>
      </Box>

      {/* Search box */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Search
        </Typography>
        <TextField
          fullWidth
          size="small"
          name="keyword"
          value={localFilters.keyword}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search products..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Category filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Rice Type
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            name="riceType"
            value={localFilters.riceType}
            displayEmpty
            onChange={handleInputChange}
          >
            <MenuItem value="">All Types</MenuItem>
            {loading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              riceTypes.map((type) => (
                <MenuItem key={type.id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Box>

      {/* Origin filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Origin
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            name="origin"
            value={localFilters.origin}
            displayEmpty
            onChange={handleInputChange}
          >
            <MenuItem value="">All Origins</MenuItem>
            {loading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              origins.map((origin) => (
                <MenuItem key={origin.id} value={origin.name}>
                  {origin.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Price Range slider */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Price Range
        </Typography>
        <Box sx={{ px: 1, mt: 3 }}>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            valueLabelFormat={(value) => formatCurrency(value)}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {formatCurrency(priceRange[0])}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatCurrency(priceRange[1])}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Sort options */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Sort By
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            name="sort"
            value={localFilters.sort}
            onChange={handleInputChange}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Apply filters button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleApplyFilters}
        sx={{
          mt: 2,
          py: 1,
          borderRadius: 6,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Apply Filters
      </Button>
    </Paper>
  );
};

export default ProductFilter;
