import React from "react";
import { TableRow, TableCell, Chip, Box } from "@mui/material";
import { formatCurrency } from "../../../utils/formatCurrency";
import DataTable from "../../common/DataTable";
import ActionButtons from "../../common/ActionButtons";
import { Link } from "react-router-dom";

/**
 * Component để hiển thị bảng sản phẩm trong quản lý
 */
const ProductTable = ({
  products,
  loading,
  onEdit,
  onDelete,
  emptyMessage = "No products found",
}) => {
  // Định nghĩa cấu trúc cột
  const columns = [
    { key: "id", label: "ID", width: "5%" },
    { key: "image", label: "Image", width: "10%" },
    { key: "name", label: "Name", width: "20%" },
    { key: "type", label: "Type", width: "12%" },
    { key: "origin", label: "Origin", width: "12%" },
    { key: "price", label: "Price", width: "10%" },
    { key: "stock", label: "Stock", width: "15%" },
    { key: "actions", label: "Actions", align: "center", width: "16%" },
  ];

  // Hàm render từng dòng sản phẩm
  const renderRow = (product) => (
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
          label={product.riceType || "N/A"}
          size="small"
          variant="outlined"
          color="primary"
        />
      </TableCell>
      <TableCell>{product.origin || "N/A"}</TableCell>
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
        <ActionButtons
          viewLink={`/products/${product.id}`}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product)}
          isActive={product.isActive !== false}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <DataTable
      columns={columns}
      data={products}
      renderRow={renderRow}
      loading={loading}
      emptyMessage={emptyMessage}
    />
  );
};

export default ProductTable;
