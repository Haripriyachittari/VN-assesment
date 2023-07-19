import React, { useState, useEffect } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useMediaQuery,
  Container,
  TextField,
  Box,
  Paper,
  Divider,
  Button,
  IconButton,
  Typography,
  Grid,
  Switch,
} from "@mui/material";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  CREATE_PROFILE,
  GET_PROFILE_BY_ID,
  UPDATE_PROFILE,
} from "../Queries/queries";
import CloseIcon from "@mui/icons-material/Close";

function CreateEditUser({ mode }) {
  const { id } = useParams();

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  function handleOpenSnackBar(message, severity) {
    navigate("/profiles");
  }

  const [createProfile] = useMutation(CREATE_PROFILE, {
    variables: {
      firstName,
      lastName,
      email,
      isVerified,
      imageUrl,
      description,
    },
    onCompleted: ({ data = {} }) => {
      handleOpenSnackBar("Profile has been Created", "success");
    },
    onError: (error) => {
      console.log(error.extensions);
      console.log(error.message);
      handleOpenSnackBar(error.message, "error");
    },
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: {
      updateProfileId: id,
      firstName,
      lastName,
      email,
      isVerified,
      imageUrl,
      description,
      is_candidate: false,
    },
    onCompleted: () => {
      handleOpenSnackBar("Profile has been updated", "success");
    },
    onError: (error) => {
      handleOpenSnackBar(error.message, "error");
    },
  });

  const [getProfileById, { loading: profileLoading, data: profileData }] =
    useLazyQuery(GET_PROFILE_BY_ID);

  useEffect(() => {
    if (mode === "edit" && id) {
      getProfileById({ variables: { getProfileByIdId: id } });
    }
  }, [getProfileById, id, mode]);

  useEffect(() => {
    if (profileData && profileData.getProfileById) {
      setFirstName(profileData.getProfileById.first_name);
      setLastName(profileData.getProfileById.last_name);
      setEmail(profileData.getProfileById.email);
      setImageUrl(profileData.getProfileById.image_url);
      setIsVerified(profileData.getProfileById.is_verified);
      setDescription(profileData.getProfileById.description);
    }
  }, [profileData]);

  return (
    <>
      <Container sx={{ mt: 3, mb: 3, maxWidth: isMobile ? "80%" : 1 / 2 }}>
        <Paper elevation={9}>
          <Box display="flex" justifyContent="space-between" padding={5}>
            <Typography variant="h4">
              {mode === "add" ? "Create" : "Edit"} Profile
            </Typography>
            <IconButton
              aria-label="delete"
              color="default"
              component={Link}
              to="/profiles"
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ p: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="caption" display="block">
                  Image Link
                </Typography>
                <TextField
                  onChange={(e) => setImageUrl(e.target.value)}
                  value={profileLoading ? "loading..." : imageUrl}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" display="block">
                  First Name
                </Typography>
                <TextField
                  onChange={(e) => setFirstName(e.target.value)}
                  value={profileLoading ? "loading..." : firstName}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" display="block">
                  Last Name
                </Typography>
                <TextField
                  onChange={(e) => setLastName(e.target.value)}
                  value={profileLoading ? "loading..." : lastName}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" display="block">
                  Email
                </Typography>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  value={profileLoading ? "loading..." : email}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" display="block">
                  Description
                </Typography>
                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  value={profileLoading ? "loading..." : description}
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">Talent is Verified</Typography>

                    <Switch
                      checked={isVerified}
                      onChange={(e) => setIsVerified(e.target.checked)}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box
            sx={{
              p: 5,
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={mode === "add" ? createProfile : updateProfile}
            >
              {mode === "add" ? "Create" : "Update"} Profile
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default CreateEditUser;
