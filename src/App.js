import React, { useState, createContext } from "react";
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

// import ShowSnackBar from "./Components/ResponseSnackBar/ShowSnackBar";

export const SnackBarContext = createContext();

// Define the light and dark themes
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
  // Use state to keep track of whether we're in dark mode or not
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  // Function to toggle between light and dark mode
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Use the selected theme based on whether we're in dark mode or not
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <>
      <SnackBarContext.Provider
        value={{
          message,
          setMessage,
          severity,
          setSeverity,
          openSnackBar,
          setOpenSnackBar,
        }}
      >
        {/* // Wrap the app in the selected theme */}
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* Render the app bar */}
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
                {/* Add a toggle switch to change between light and dark mode */}
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

          {/* Set up routes for the app */}
          <Routes>
            {/* Redirect from the root path to /talent/my-talent */}
            <Route path="/" element={<Navigate to="/profiles" />} />

            {/* Render the Profiles component for /talent/my-talent */}
            <Route path="profiles" element={<Userprofiles />} />

            {/* <Route path="talent/*">
              <Route path="add" element={<AddEditProfile mode="add" />} />
              <Route path="edit/:id" element={<AddEditProfile mode="edit" />} />
            </Route> */}

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
                  <ErrorIcon
                    style={{ fontSize: "60px", marginRight: "10px" }}
                  />
                  <Typography variant="h2">Page not found</Typography>
                </Container>
              }
            />
          </Routes>
          {/* <ShowSnackBar
            severity={severity}
            message={message}
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
          /> */}
        </ThemeProvider>
      </SnackBarContext.Provider>
    </>
  );
}

export default App;
