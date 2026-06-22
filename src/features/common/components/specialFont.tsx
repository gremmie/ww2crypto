import type { SxProps, Theme } from "@mui/material";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { PropsWithChildren } from "react";

type NoFontFamilyOrWeight = { fontFamily?: never; fontWeight?: never };
type RestrictedSx = SxProps<Theme> & NoFontFamilyOrWeight;
type SpecialFontProps = Omit<TypographyProps, "sx"> & { sx?: RestrictedSx };

export const SpecialFont = ({
  children,
  sx,
  ...rest
}: PropsWithChildren<SpecialFontProps>) => {
  return (
    <Typography
      {...rest}
      sx={[
        { fontFamily: '"Special Elite", cursive', fontWeight: 400 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Typography>
  );
};
