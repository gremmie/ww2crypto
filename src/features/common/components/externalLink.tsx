import Link from "@mui/material/Link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Typography from "@mui/material/Typography";

interface ExternalLinkProps {
  url: string;
  name: string;
}

export default function ExternalLink(props: ExternalLinkProps) {
  return (
    <Typography variant="body1" component="span">
      <Link
        href={props.url}
        target="_blank"
        rel="noopener"
        variant="inherit"
        sx={{ verticalAlign: "baseline" }}
      >
        {props.name}
        <ArrowOutwardIcon fontSize="inherit" sx={{ mx: 0.5 }} />
      </Link>
    </Typography>
  );
}
