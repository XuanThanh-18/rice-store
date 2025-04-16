import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

/**
 * ActionButtons Component
 * Reusable set of action buttons for tables
 */
const ActionButtons = ({
  onEdit,
  onDelete,
  onActivate,
  viewLink,
  isActive = true,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {/* View Button */}
      {viewLink && (
        <Tooltip title="View Details">
          <IconButton component={Link} to={viewLink} size="small" color="info">
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {/* Edit Button */}
      {onEdit && (
        <Tooltip title="Edit">
          <IconButton
            onClick={onEdit}
            size="small"
            color="primary"
            sx={{ ml: viewLink ? 1 : 0 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {/* Delete/Activate Button */}
      {isActive && onDelete ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={onDelete}
            size="small"
            color="error"
            sx={{ ml: 1 }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        onActivate && (
          <Tooltip title="Activate">
            <IconButton
              onClick={onActivate}
              size="small"
              color="success"
              sx={{ ml: 1 }}
            >
              <RestoreIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      )}
    </Box>
  );
};

export default ActionButtons;
