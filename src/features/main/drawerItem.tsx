import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import LinkIcon from "@mui/icons-material/Link";
import { ListItemText } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useLocation } from "@tanstack/react-router";
import { RouterListItemButton } from "../../routerLinkComponents/routerListItemButton.tsx";
import type { TRoutes } from "../../routeTypes.ts";

interface DrawerItemProps {
  page: "home" | "enigma" | "m209" | "purple" | "links" | "about";
  onChangePage: () => void;
}

const drawerLabelsByPage: Map<string, string> = new Map([
  ["home", "Home"],
  ["enigma", "Enigma"],
  ["m209", "M-209"],
  ["purple", "PURPLE"],
  ["links", "Links"],
  ["about", "About"],
]);

const pathsByPage: Map<string, TRoutes> = new Map([
  ["home", "/"],
  ["enigma", "/enigma/about"],
  ["m209", "/m209"],
  ["purple", "/purple"],
  ["links", "/links"],
  ["about", "/about"],
]);

export const DrawerItem = (props: DrawerItemProps) => {
  const currentPage = useLocation({
    select: (location): string => {
      if (location.pathname === "/") return "home";
      return location.pathname.split("/")[1];
    },
  });
  const useHomeIcon = props.page === "home";
  const useLinkIcon = props.page === "links";
  const useInfoIcon = props.page === "about";
  const useKeyboardIcon = !useHomeIcon && !useLinkIcon && !useInfoIcon;

  return (
    <ListItem disablePadding>
      <RouterListItemButton
        selected={props.page === currentPage}
        onClick={() => props.onChangePage()}
        to={pathsByPage.get(props.page)}
      >
        <ListItemIcon>
          {useHomeIcon && <HomeOutlinedIcon />}
          {useKeyboardIcon && <KeyboardAltOutlinedIcon />}
          {useLinkIcon && <LinkIcon />}
          {useInfoIcon && <InfoOutlinedIcon />}
        </ListItemIcon>
        <ListItemText primary={drawerLabelsByPage.get(props.page)} />
      </RouterListItemButton>
    </ListItem>
  );
};
