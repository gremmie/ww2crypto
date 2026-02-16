import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "@tanstack/react-router";
import React from "react";
import MainDrawer from "./mainDrawer.tsx";

export function MainApp() {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const changePage = () => {
    setDrawerOpen(false);
  };

  const siteTagLine = " - WW2 Cipher Machine Simulations in your Browser";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ww2crypto.online
            <Typography
              variant="h6"
              component="span"
              sx={{ display: { xs: "none", md: "inline" } }}
            >
              {siteTagLine}
            </Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
      <MainDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        onChangePage={changePage}
      />
    </Box>
  );
}
