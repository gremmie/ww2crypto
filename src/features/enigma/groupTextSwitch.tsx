import { Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

interface GroupTextSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function GroupTextSwitch(props: GroupTextSwitchProps) {
  return (
    <FormControlLabel
      control={
        <Switch
          size="small"
          checked={props.value}
          onChange={() => props.onChange(!props.value)}
        />
      }
      label="Group text"
    />
  );
}
