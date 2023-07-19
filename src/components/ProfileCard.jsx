import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ProfileActions from "./ProfileMenu";

function ProfileCard({ data, refetch, isMobile }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={2}>
      {data.getAllProfiles.profiles.map((profile) => (
        <Grid item xs={12} md={6} lg={3} key={profile.id}>
          <Card sx={{ maxWidth: "100%", flexGrow: 1, pt: 2 }}>
            <Container sx={{ display: "flex", position: "relative" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 2,
                  width: "90%",
                  p: 0,
                }}
              >
                <Box sx={{ flex: "none" }}>
                  <Avatar
                    src={profile.image_url}
                    alt={`${profile.first_name}'s Profile Image`}
                    sx={{ width: 50, height: 50 }}
                  />
                </Box>
                <Box sx={{ flex: "auto" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: 1,
                      alignItems: "center",
                      maxWidth: "calc(85%)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      noWrap
                      sx={{
                        maxWidth: "90%",
                      }}
                    >
                      {profile.first_name} {profile.last_name}
                    </Typography>
                    {profile.is_verified && (
                      <VerifiedRoundedIcon color="primary" fontSize="small" />
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "nowrap",
                      maxWidth: "calc(100% - 36px)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography variant="body2" noWrap>
                      {profile.email}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <IconButton
                    aria-label="settings"
                    onClick={(event) => handleMenuOpen(event, profile.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
            </Container>

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {profile.description}
              </Typography>
            </CardContent>
          </Card>

          <ProfileActions
            anchorEl={anchorEl}
            handleMenuClose={handleMenuClose}
            id={id}
            refetch={refetch}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProfileCard;
