import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Modal,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_PROFILE } from "../Queries/queries";
import { Link } from "react-router-dom";
import { SnackBarContext } from "../App";
import CloseIcon from "@mui/icons-material/Close";
import Button from "react-bootstrap/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Component for profile actions (edit and delete)
function ProfileActions({ anchorEl, handleMenuClose, id, refetch }) {
  const [loading, setLoading] = useState(false);
  const { setMessage, setSeverity, setOpenSnackBar } =
    React.useContext(SnackBarContext);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  function handleOpenSnackBar(message, severity) {
    setMessage(message);
    setSeverity(severity);
    setOpenSnackBar(true);
  }

  // Mutation to delete profile
  const [deleteProfile] = useMutation(DELETE_PROFILE, {
    variables: { deleteProfileId: id },
    onCompleted: () => {
      setLoading(false);
      handleOpenSnackBar("Profile has been deleted", "success");
      handleMenuClose();
      refetch();
    },
    onError: (error) => {
      handleOpenSnackBar(error.message, "error");
      handleMenuClose();
      setLoading(false);
    },
  });

  // Function to handle delete click
  const handleDeleteClick = async () => {
    setLoading(true);
    await deleteProfile();
    handleModalClose();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 1,
          sx: {
            "& .MuiList-root": {
              boxShadow: "none",
            },
          },
        }}
      >
        {/* Edit button */}
        <MenuItem component={Link} to={`/talent/edit/${id}`}>
          Edit Profile
        </MenuItem>

        {/* Delete button */}
        <MenuItem onClick={handleModalOpen} disabled={loading}>
          {loading ? "Removing..." : "Remove Profile"}
        </MenuItem>
      </Menu>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Remove Profile</Typography>
            <IconButton
              aria-label="delete"
              color="default"
              onClick={() => {
                handleMenuClose();
                handleModalClose();
              }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography>
              Removed profile will be deleted permanently and won't be available
              anymore.
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outline-secondary"
              onClick={handleModalClose}
              style={{ width: "45%" }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteClick}
              style={{ width: "45%" }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ProfileActions;
