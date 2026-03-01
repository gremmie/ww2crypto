import CopyrightIcon from "@mui/icons-material/Copyright";
import Typography from "@mui/material/Typography";

export function CopyrightTag() {
  const currentYear = new Date().getFullYear();
  const baseYear = 2026;
  const yearRange =
    baseYear === currentYear ? `${baseYear}` : `${baseYear} - ${currentYear}`;

  return (
    <Typography
      variant="caption"
      component="div"
      display="flex"
      alignItems="center"
    >
      <CopyrightIcon sx={{ fontSize: "inherit", mr: 0.5 }} /> {yearRange} Brian
      Neal. All rights reserved.
    </Typography>
  );
}
