import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { DrawerItem } from "./drawerItem.tsx";

interface MainDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onChangePage: () => void;
}

export default function MainDrawer(props: MainDrawerProps) {
  return (
    <Drawer open={props.isOpen} onClose={() => props.onClose()}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <DrawerItem page="home" onChangePage={props.onChangePage} />
          <Divider />
          <DrawerItem page="enigma" onChangePage={props.onChangePage} />
          <DrawerItem page="m209" onChangePage={props.onChangePage} />
          <DrawerItem page="purple" onChangePage={props.onChangePage} />
          <Divider />
          <DrawerItem page="about" onChangePage={props.onChangePage} />
        </List>
      </Box>
    </Drawer>
  );
}
