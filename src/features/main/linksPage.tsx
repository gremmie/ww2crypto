import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ExternalLinkListItem } from "../common/components/externalLinkListItem.tsx";
import { links } from "../common/links.ts";

export function LinksPage() {
  return (
    <Paper elevation={2} sx={{ mt: 3, ml: 3, p: 3, maxWidth: 950 }}>
      <Typography variant="h4" gutterBottom>
        Links
      </Typography>
      <Typography gutterBottom>
        This page collects all the links from the simulator pages, as well as
        adding resources I've found interesting. All links open in a new browser
        tab.
      </Typography>
      <ul>
        {links.map((link) => (
          <ExternalLinkListItem link={link} />
        ))}
      </ul>
    </Paper>
  );
}
