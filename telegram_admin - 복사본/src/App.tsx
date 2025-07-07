import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/SideBar/Sidebar";
import Routers from "./Router/router";
import { useAppStatus } from "./lib/etc";
import { AppStatusType, ROUTES_KEY } from "./lib/types/type";
import { BrowserRouter } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { ReplayOutlined } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const { app_status } = useAppStatus((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const sideController = () => {
    setIsOpen(!isOpen);
  };
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="app">
          <Header sideController={sideController} />
          <Sidebar isOpen={isOpen} sideController={sideController} />
          {app_status !== AppStatusType.LOGIN && (
            <Box
              className="content"
              sx={{
                // position: "absolute",
                transform: isOpen ? "translateX(50px)" : "translateX(0px)",
                marginTop: "100px",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {ROUTES_KEY[app_status].toUpperCase().split("_").join("")}
                </Typography>
                <Button
                  variant="text"
                  onClick={() => {
                    location.reload();
                  }}
                >
                  Reload
                  <ReplayOutlined />
                </Button>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Routers />
              </Box>
            </Box>
          )}
        </div>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
