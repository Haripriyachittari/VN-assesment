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

function CardView({ data, refetch, isMobile }) {
  // state to store the anchor element for the menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState(null);

  // function to handle menu open
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  // function to handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={2}>
      {/* map over the profiles and create cards for each */}
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
                      maxWidth: "calc(90%)", // Adjusted maxWidth to account for the width of the verified icon and button
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      noWrap
                      sx={{
                        maxWidth: "90%", // Reduced maxWidth for the name
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
                      maxWidth: "calc(100% - 36px)", // Adjusted maxWidth to account for the width of the email icon and button
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
            {/* card content with description */}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {profile.description}
              </Typography>
            </CardContent>
          </Card>
          {/* menu for editing and deleting the profile */}
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

export default CardView;

// function CardView({ data, setPage, setRows, loading, page, rows, refetch }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [id, setId] = useState(null);
//   const [profiles, setProfiles] = useState(data.getAllProfiles.profiles);
//   const observer = useRef();
//   const lastCardRef = useRef();
//   const [isLoading, setIsLoading] = useState(false);

//   // function to handle menu open
//   const handleMenuOpen = (event, id) => {
//     setAnchorEl(event.currentTarget);
//     setId(id);
//   };
//   useEffect(() => {
//     // Detect when user reaches top or bottom of container element
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [isLoading, page]);

//   useEffect(() => {
//     if (!loading && data) {
//       // Append new cards to existing list
//       setProfiles([...profiles, ...data.getAllProfiles.profiles]);
//       setIsLoading(false);
//     }
//   }, [loading, data]);

//   const handleScroll = () => {
//     const container = document.getElementById("cards-container");
//     if (
//       container.scrollTop + container.clientHeight >= container.scrollHeight &&
//       !isLoading
//     ) {
//       // Make API call to fetch next set of data
//       setPage(page + 1);
//     } else if (container.scrollTop === 0 && page > 1 && !isLoading) {
//       // Make API call to fetch previous set of data
//       setPage(page - 1);
//     }
//   };

//   // function to handle menu close
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div id="cards-container">
//       <Grid container spacing={2}>
//         {profiles.map((profile, index) => (
//           <Grid item xs={12} md={6} lg={3} key={profile.id}>
//             <Card
//               sx={{ maxWidth: 345, flexGrow: 1 }}
//               ref={index === rows.length - 1 ? lastCardRef : null}
//             >
//               <CardHeader
//                 avatar={
//                   <Avatar
//                     src={profile.image_url}
//                     alt={`${profile.first_name}'s Profile Image`}
//                     sx={{ width: 50, height: 50 }}
//                   />
//                 }
//                 action={
//                   <IconButton
//                     aria-label="settings"
//                     onClick={(event) => handleMenuOpen(event, profile.id)}
//                     sx={{ position: "stickey" }}
//                   >
//                     <MoreVertIcon />
//                   </IconButton>
//                 }
//                 title={
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexWrap: "nowrap",
//                       gap: 1,
//                       alignItems: "center",
//                       maxWidth: "60%",
//                     }}
//                   >
//                     <Typography
//                       variant="subtitle1"
//                       noWrap
//                       sx={{
//                         maxWidth: "60%",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {profile.first_name} {profile.last_name}
//                     </Typography>
//                     {profile.is_verified && (
//                       <VerifiedRoundedIcon color="primary" fontSize="small" />
//                     )}
//                   </Box>
//                 }
//                 subheader={
//                   <Box
//                     sx={{
//                       maxWidth: "60%",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     <Typography variant="body2" noWrap>
//                       {profile.email}
//                     </Typography>
//                   </Box>
//                 }
//               />
//               {/* card content with description */}
//               <CardContent>
//                 <Typography variant="body2" color="text.secondary">
//                   {profile.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//             {/* menu for editing and deleting the profile */}
//             <ProfileActions
//               anchorEl={anchorEl}
//               handleMenuClose={handleMenuClose}
//               id={id}
//               refetch={refetch}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// }

// export default CardView;
