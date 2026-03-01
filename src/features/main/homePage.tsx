import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { RouterLink } from "../../routerLinkComponents/routerLink.tsx";

export function HomePage() {
  return (
    <Paper elevation={2} sx={{ mt: 3, ml: 3, p: 3, maxWidth: 950 }}>
      <Typography variant="h4" gutterBottom>
        ww2crypto.online
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Welcome! On this site we host several browser-based World War 2-era
        cipher machine simulations! You can setup each simulation just like an
        actual machine, then encrypt and decrypt secret messages. There is
        nothing to download as each simulation runs right in your browser.
        Exchange messages with friends, solve online puzzles, and learn more
        about these fascinating machines.
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Please use the menu at the top left to navigate to the different areas
        of our site. We'd love to hear from you, especially how you are using
        the site. If you have any questions, comments, or feedback, please find
        the contact information on our{" "}
        <RouterLink to="/about">About page</RouterLink>.
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        We hope this project sparks your interest in cryptology and the history
        of these cipher machines!
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        News
      </Typography>
      <ul>
        <Typography variant="body1" component="li" gutterBottom>
          <b>March 1, 2026</b> - This site is officially launched and we
          currently feature a{" "}
          <RouterLink to="/enigma/about">WW2 Enigma simulation</RouterLink>. We
          have immediate plans to add simulations for the <b>US M-209</b> and
          the <b>Japanese PURPLE</b>. Who knows after that? If you have
          suggestions please contact us on the{" "}
          <RouterLink to="/about">About page</RouterLink>.
        </Typography>
      </ul>
    </Paper>
  );
}
