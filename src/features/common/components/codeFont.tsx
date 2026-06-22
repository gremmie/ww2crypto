import type { SxProps, Theme } from "@mui/material";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { PropsWithChildren } from "react";

type NoFontFamilyOrWeight = { fontFamily?: never; fontWeight?: never };
type RestrictedSx = SxProps<Theme> & NoFontFamilyOrWeight;
type SpecialFontProps = Omit<TypographyProps, "sx"> & { sx?: RestrictedSx };

export const CodeFont = ({
  children,
  sx,
  ...rest
}: PropsWithChildren<SpecialFontProps>) => {
  return (
    <Typography
      {...rest}
      sx={[
        {
          fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
          fontSize: "0.9em",
          backgroundColor: "action.hover",
          px: 0.6,
          py: 0.3,
          borderRadius: 0.5,
          color: "error.main", // Gives it that classic inline-code red pop
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Typography>
  );
};
