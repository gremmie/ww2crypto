import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  lampPanelOpenStatusChanged,
  selectIsLampPanelOpen,
} from "./enigmaSlice.ts";
import Lamp from "./lamp.tsx";

export default function LampBoard() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsLampPanelOpen);

  const handleChange = () => {
    dispatch(lampPanelOpenStatusChanged(!isOpen));
  };

  return (
    <Accordion expanded={isOpen} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id="enigma-lamp-board-header"
      >
        <Typography component="span">Lamp Panel</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          sx={{ pt: 1, pb: 2 }}
        >
          <Stack direction="row" spacing={2}>
            <Lamp letter="Q" />
            <Lamp letter="W" />
            <Lamp letter="E" />
            <Lamp letter="R" />
            <Lamp letter="T" />
            <Lamp letter="Z" />
            <Lamp letter="U" />
            <Lamp letter="I" />
            <Lamp letter="O" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Lamp letter="A" />
            <Lamp letter="S" />
            <Lamp letter="D" />
            <Lamp letter="F" />
            <Lamp letter="G" />
            <Lamp letter="H" />
            <Lamp letter="J" />
            <Lamp letter="K" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Lamp letter="P" />
            <Lamp letter="Y" />
            <Lamp letter="X" />
            <Lamp letter="C" />
            <Lamp letter="V" />
            <Lamp letter="B" />
            <Lamp letter="N" />
            <Lamp letter="M" />
            <Lamp letter="L" />
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
