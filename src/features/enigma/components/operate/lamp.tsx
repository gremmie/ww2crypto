import Box from "@mui/material/Box";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectActiveLamp } from "../../enigmaSlice.ts";

interface LampProperties {
  letter: string;
}

export default function Lamp(props: LampProperties) {
  const activeLamp = useAppSelector(selectActiveLamp);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: { xs: 26, sm: 30 },
        height: { xs: 26, sm: 30 },
        border: { xs: "2px solid black", sm: "4px solid black" },
        borderRadius: "50%",
        backgroundColor: activeLamp === props.letter ? "yellow" : null,
      }}
    >
      {props.letter}
    </Box>
  );
}
