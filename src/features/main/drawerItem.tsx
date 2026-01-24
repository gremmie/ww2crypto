import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { ListItemButton, ListItemText } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import type { PageType } from "./pageType.ts";

interface DrawerItemProps {
  page: PageType;
  currentPage: PageType;
  onChangePage: (page: PageType) => void;
}

const drawerLabelsByPageType: Map<PageType, string> = new Map([
  ["home", "Home"],
  ["enigma", "Enigma"],
  ["m209", "M-209"],
  ["purple", "PURPLE"],
  ["about", "About"],
]);

export const DrawerItem = (props: DrawerItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={props.page === props.currentPage}
        onClick={() => props.onChangePage(props.page)}
      >
        <ListItemIcon>
          {props.page === "home" && <HomeOutlinedIcon />}
          {props.page !== "home" && props.page !== "about" && (
            <KeyboardAltOutlinedIcon />
          )}
          {props.page === "about" && <InfoOutlinedIcon />}
        </ListItemIcon>
        <ListItemText primary={drawerLabelsByPageType.get(props.page)} />
      </ListItemButton>
    </ListItem>
  );
};
