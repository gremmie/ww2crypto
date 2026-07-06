import TabPanel from "@mui/lab/TabPanel";
import { PurpleOperateView } from "./operateView.tsx";

export const PurpleOperateTab = () => {
  return (
    <TabPanel value="operate">
      <PurpleOperateView />
    </TabPanel>
  );
};
