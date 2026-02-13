import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function HomePage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        ww2crypto.online
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Welcome to ww2crypto.online! This site is a web application that allows
        you to operate several World War 2 era cipher machine simulations right
        in your browser! These simulations are accurate and can be used to
        exchange messages with actual machines. Most of us cannot afford one of
        these rare and expensive devices, but on this site you can get a feel
        for how they work by reading and writing authentic secret messages.
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        We hope this site sparks your interest in cryptology and the fascinating
        history of these machines.
      </Typography>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        News
      </Typography>
      <Typography variant="body1" component="p">
        This site is brand new and we currently feature a WW2 Enigma simulation.
        We have immediate plans to add simulations for the US M-209 and the
        Japanese PURPLE. Who knows after that? If you have suggestions please
        contact us.
      </Typography>
    </Box>
  );
}
