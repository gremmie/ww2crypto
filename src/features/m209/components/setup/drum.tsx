import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { modulo } from "../../../common/utils.ts";
import DrumBar from "./drumBar.tsx";
import DrumRollers from "./drumRollers.tsx";

export default function Drum() {
  const [bottomBar, setBottomBar] = useState<number>(0);
  const numBars = 27;
  const numVisibleBars = 4;
  const visibleBars = Array.from(
    { length: numVisibleBars },
    (_, i) => modulo(bottomBar + numVisibleBars - 1 - i, numBars) + 1,
  );

  const handleBack = () => {
    setBottomBar(modulo(bottomBar - 1, numBars));
  };
  const handleForward = () => {
    setBottomBar(modulo(bottomBar + 1, numBars));
  };

  return (
    <>
      <DrumRollers handleBack={handleBack} handleForward={handleForward} />
      {visibleBars.map((bar) => (
        <Stack
          key={bar}
          direction="row"
          spacing={2}
          display="flex"
          justifyContent="space-between"
        >
          <Box width={300}>
            <DrumBar id={bar} />
          </Box>
          <Typography variant="h6" component="div">
            {bar}
          </Typography>
        </Stack>
      ))}
      <DrumRollers handleBack={handleBack} handleForward={handleForward} />
    </>
  );
}
