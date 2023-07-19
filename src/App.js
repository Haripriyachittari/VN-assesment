import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Userprofiles from "./components/Userprofiles";
import { Container } from "react-bootstrap";
import ErrorIcon from "@mui/icons-material/Error";
import AddEditProfile from "./components/CreateEditUser";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar position="static" color={"default"}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Viral Nation
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
              }}
            >
              <LightModeIcon />
              <Switch
                checked={isDarkMode}
                color="default"
                onChange={handleToggleDarkMode}
                inputProps={{ "aria-label": "toggle dark mode" }}
              />
              <DarkModeIcon />
            </Box>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Navigate to="/profiles" />} />

          <Route path="profiles" element={<Userprofiles />} />

          <Route path="profile/*">
            <Route path="add" element={<AddEditProfile mode="add" />} />
            <Route path="edit/:id" element={<AddEditProfile mode="edit" />} />
          </Route>

          <Route
            path="*"
            element={
              <Container
                style={{
                  height: "80vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ErrorIcon style={{ fontSize: "60px", marginRight: "10px" }} />
                <Typography variant="h2">Page not found</Typography>
              </Container>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
