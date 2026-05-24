import TabPanel from "@mui/lab/TabPanel";
import { OperateView } from "./operateView.tsx";

export const M209OperateTab = () => {
  return (
    <TabPanel value="operate">
      <OperateView />
    </TabPanel>
  );
};
