import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { MachineConfig } from "../../common/config/machineConfig.ts";
import { setupSummary } from "../../enigma/utils.ts";
import { drumLugStateToStr } from "../../m209/utils.ts";

interface ConfigSummaryProps {
  config: MachineConfig;
}

export const ConfigSummary = (props: ConfigSummaryProps) => {
  if (props.config.type === "enigma") {
    return (
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        {setupSummary(props.config)}
      </Typography>
    );
  }

  // M209 case.
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="span">Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table aria-label="config summary">
            <TableBody>
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: "bold" }}>
                  Lugs:
                </TableCell>
                <TableCell>
                  {drumLugStateToStr(props.config.drumState)}
                </TableCell>
              </TableRow>
              {props.config.wheelState.map((pins, i) => (
                <TableRow key={i}>
                  <TableCell
                    component="th"
                    sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                  >
                    Wheel {i + 1}:
                  </TableCell>
                  <TableCell sx={{ overflowWrap: "anywhere" }}>
                    {pins}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
