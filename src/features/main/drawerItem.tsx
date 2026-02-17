import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { ListItemText } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { RouterListItemButton } from "../../routerLinkComponents/routerListItemButton.tsx";
import { useLocation } from "@tanstack/react-router";
import type { TRoutes } from "../../routeTypes.ts";

interface DrawerItemProps {
  page: "home" | "enigma" | "m209" | "purple" | "about";
  onChangePage: () => void;
}

const drawerLabelsByPage: Map<string, string> = new Map([
  ["home", "Home"],
  ["enigma", "Enigma"],
  ["m209", "M-209"],
  ["purple", "PURPLE"],
  ["about", "About"],
]);

const pathsByPage: Map<string, TRoutes> = new Map([
  ["home", "/"],
  ["enigma", "/enigma/about"],
  ["m209", "/m209"],
  ["purple", "/purple"],
  ["about", "/about"],
]);

export const DrawerItem = (props: DrawerItemProps) => {
  const currentPage = useLocation({
    select: (location): string => {
      if (location.pathname === "/") return "home";
      return location.pathname.split("/")[1];
    },
  });

  return (
    <ListItem disablePadding>
      <RouterListItemButton
        selected={props.page === currentPage}
        onClick={() => props.onChangePage()}
        to={pathsByPage.get(props.page)}
      >
        <ListItemIcon>
          {props.page === "home" && <HomeOutlinedIcon />}
          {props.page !== "home" && props.page !== "about" && (
            <KeyboardAltOutlinedIcon />
          )}
          {props.page === "about" && <InfoOutlinedIcon />}
        </ListItemIcon>
        <ListItemText primary={drawerLabelsByPage.get(props.page)} />
      </RouterListItemButton>
    </ListItem>
  );
};
