import React, { useState, useEffect, useContext } from "react";

import {
  useMediaQuery,
  Container,
  Select,
  MenuItem,
  TextField,
  Button,
  ToggleButton,
  Typography,
} from "@mui/material";
import ProfileCard from "./ProfileCard";
import ProfileGrid from "./ProfileGrid";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LinearProgress from "@mui/material/LinearProgress";
import debounce from "lodash.debounce";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_ALL_PROFILES } from "../Queries/queries";

function Profiles() {
  const [view, setView] = useState("card");
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState(20);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [key, setKey] = useState("email");
  const [sort, setSort] = useState("asc");

  const handleViewChange = (event, nextView) => {
    if (nextView) {
      setView(nextView);
    }
  };

  useEffect(() => {
    isMobile && setView("card");
  }, [isMobile]);

  const { loading, error, data, refetch } = useQuery(GET_ALL_PROFILES, {
    variables: {
      orderBy: {
        key,
        sort,
      },
      rows,
      page,
      searchString,
    },
  });

  useEffect(() => {
    setPage(0);
    view === "card" ? setRows(20) : setRows(6);
  }, [view, key, sort]);

  const debouncedSearch = debounce((e) => {
    setSearchString(e.target.value);
  }, 500);

  return (
    <Container sx={{ p: 5 }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
          mb: 5,
        }}
      >
        <TextField
          id="outlined-start-adornment"
          placeholder={"Search"}
          sx={{ flexGrow: 1, height: "100%" }}
          onKeyDown={(e) => {
            debouncedSearch(e);
          }}
        />
        {isMobile && (
          <Container
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              p: 0,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<PersonAddAlt1Icon />}
              component={Link}
              to="/profile/add"
              sx={{
                whiteSpace: "nowrap",
                flexGrow: 1,
                mt: 2,
                width: "100%",
                padding: "14px",
                justifyContent: "flex-center",
              }}
            >
              Create Profile
            </Button>
          </Container>
        )}
        {!isMobile && (
          <Button
            variant="outlined"
            startIcon={<PersonAddAlt1Icon />}
            component={Link}
            to="/profile/add"
            sx={{
              whiteSpace: "nowrap",
              flexShrink: 0,
              height: "100%",
              padding: "14px",
            }}
          >
            Create Profile
          </Button>
        )}
        {!isMobile && (
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view switch"
            sx={{ flexShrink: 0, height: "100%" }}
          >
            <ToggleButton value="card" aria-label="card view">
              <ViewColumnIcon />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid view">
              <ViewListRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Container>
      <Container
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          mb: 2,
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography>Sort :</Typography>
        <Select
          value={key}
          onChange={(event) => {
            setKey(event.target.value);
          }}
          sx={{ width: isMobile ? 1 / 3 : 1 / 5 }}
        >
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="isVerified">Is Verified</MenuItem>
        </Select>

        <Select
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
          }}
          sx={{ width: isMobile ? 1 / 3 : 1 / 5 }}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </Container>
      <Container>
        {loading && (
          <p s={{ alignItems: "center" }}>
            <LinearProgress />
          </p>
        )}
        {error && <p>Something Went Wrong</p>}
        {data && data.getAllProfiles.profiles.length > 0 ? (
          view === "card" ? (
            <ProfileCard
              data={data}
              setPage={setPage}
              page={page}
              loading={loading}
              refetch={refetch}
              isMobile={isMobile}
            />
          ) : (
            <ProfileGrid
              data={data}
              setPage={setPage}
              setRows={setRows}
              page={page}
              rows={rows}
              refetch={refetch}
            />
          )
        ) : loading ? (
          "Loading..."
        ) : (
          <p>No Profiles Available</p>
        )}
      </Container>
    </Container>
  );
}

export default Profiles;
