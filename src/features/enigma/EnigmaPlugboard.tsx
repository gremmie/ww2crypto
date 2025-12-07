import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export default function EnigmaPlugboard() {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h6">Configure the plugboard</Typography>
      <Alert variant="outlined" severity="info" sx={{ maxWidth: 0.7 }}>
        During the war, procedure required that 10 patch cables were used. For
        simulation purposes you can use anywhere from 0 to 13.
      </Alert>
    </Stack>
  );
}
