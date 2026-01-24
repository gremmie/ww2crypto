import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { DrawerItem } from "./drawerItem.tsx";
import type { PageType } from "./pageType.ts";

interface MainDrawerProps {
  isOpen: boolean;
  currentPage: PageType;
  onClose: () => void;
  onChangePage: (page: PageType) => void;
}

export default function MainDrawer(props: MainDrawerProps) {
  return (
    <Drawer open={props.isOpen} onClose={() => props.onClose()}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <DrawerItem
            page="home"
            currentPage={props.currentPage}
            onChangePage={props.onChangePage}
          />
          <Divider />
          <DrawerItem
            page="enigma"
            currentPage={props.currentPage}
            onChangePage={props.onChangePage}
          />
          <DrawerItem
            page="m209"
            currentPage={props.currentPage}
            onChangePage={props.onChangePage}
          />
          <DrawerItem
            page="purple"
            currentPage={props.currentPage}
            onChangePage={props.onChangePage}
          />
          <Divider />
          <DrawerItem
            page="about"
            currentPage={props.currentPage}
            onChangePage={props.onChangePage}
          />
        </List>
      </Box>
    </Drawer>
  );
}
