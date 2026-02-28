import Typography from "@mui/material/Typography";
import type { LinkInfo } from "../links.ts";
import ExternalLink from "./externalLink.tsx";

interface ExternalLinkListItemProps {
  link: LinkInfo;
}

export function ExternalLinkListItem(props: ExternalLinkListItemProps) {
  return (
    <Typography key={props.link.id} variant="body1" component="li" gutterBottom>
      <ExternalLink url={props.link.url} name={props.link.name} />
      {props.link.description}
    </Typography>
  );
}
