import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import EnigmaMain from "../enigma/components/enigmaMain.tsx";
import ComingSoon from "./comingSoon.tsx";
import { HomePage } from "./homePage.tsx";
import MainDrawer from "./mainDrawer.tsx";
import type { PageType } from "./pageType.ts";

export function MainApp() {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<PageType>("home");

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const changePage = (page: PageType) => {
    setCurrentPage(page);
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
      {currentPage === "home" && <HomePage />}
      {currentPage === "enigma" && <EnigmaMain />}
      {currentPage === "m209" && <ComingSoon pageTitle="M-209" />}
      {currentPage === "purple" && <ComingSoon pageTitle="PURPLE" />}
      {currentPage === "about" && <ComingSoon pageTitle="About" />}
      <MainDrawer
        isOpen={isDrawerOpen}
        currentPage={currentPage}
        onClose={toggleDrawer}
        onChangePage={changePage}
      />
    </Box>
  );
}
