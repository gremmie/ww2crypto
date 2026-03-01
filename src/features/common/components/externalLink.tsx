import Link from "@mui/material/Link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Typography from "@mui/material/Typography";
import { type LinkInfo, links } from "../links.ts";

interface ExternalLinkProps {
  id?: string;
  url?: string;
  name?: string;
  showArrow?: boolean;
}

export default function ExternalLink(props: ExternalLinkProps) {
  let link: LinkInfo | null = null;
  if (props.id !== undefined) {
    link = links.find((link) => link.id === props.id)!;
  }
  const url = link === null ? props.url! : link.url;
  const name = link === null ? props.name! : link.name;
  const showArrow = props.showArrow ?? true;

  return (
    <Typography variant="body1" component="span">
      <Link
        href={url}
        target="_blank"
        rel="noopener"
        variant="inherit"
        sx={{ verticalAlign: "baseline" }}
      >
        {name}
        {showArrow && <ArrowOutwardIcon fontSize="inherit" sx={{ mx: 0.5 }} />}
      </Link>
    </Typography>
  );
}
