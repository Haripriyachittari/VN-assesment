import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ProfileActions from "./ProfileMenu";

function GridView({ data, setPage, setRows, page, rows, refetch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState(null);

  // Open the menu and set the ID of the selected profile
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  // Close the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Change the current page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Change the number of rows per page and go back to the first page
  const handleChangeRowsPerPage = (event) => {
    setRows(parseInt(event.target.value));
    setPage(0);
  };
  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant="head">Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>
                <SettingsIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getAllProfiles.profiles.map((profile) => (
              <TableRow
                key={profile.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell variant="head">
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={profile.image_url}
                      alt={profile.first_name + "'s Profile Image"}
                      sx={{ width: 50, height: 50 }}
                    />{" "}
                    {profile.first_name + " " + profile.last_name}
                    {profile.is_verified && (
                      <VerifiedRoundedIcon color="primary" />
                    )}
                  </Box>
                </TableCell>
                <TableCell>123</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.description}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, profile.id)}
                  >
                    <MoreVertRoundedIcon />
                  </IconButton>
                </TableCell>
                <ProfileActions
                  anchorEl={anchorEl}
                  handleMenuClose={handleMenuClose}
                  id={id}
                  refetch={refetch}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={data.getAllProfiles.size}
        // count={data.getAllProfiles.profiles.length}
        rowsPerPage={rows}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default GridView;
