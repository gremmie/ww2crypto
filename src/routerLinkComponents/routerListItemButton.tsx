import ListItemButton, {
  type ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { Link, type LinkProps } from "@tanstack/react-router";
import React from "react";

// Combine MUI props with TanStack Link props
type RouterListItemButtonProps = ListItemButtonProps & LinkProps;

export const RouterListItemButton = React.forwardRef<
  HTMLDivElement,
  RouterListItemButtonProps
>((props, ref) => {
  return <ListItemButton ref={ref} component={Link} {...props} />;
});
