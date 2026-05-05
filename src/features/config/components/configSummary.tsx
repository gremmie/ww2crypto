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
    <Typography variant="body1" sx={{ color: "text.secondary" }}>
      Lugs: {drumLugStateToStr(props.config.drumState)} <br />
      {props.config.wheelState.map((pins, i) => (
        <>
          Wheel {i + 1}: {pins}
          {i !== 5 ? <br /> : null}
        </>
      ))}
    </Typography>
  );
};
