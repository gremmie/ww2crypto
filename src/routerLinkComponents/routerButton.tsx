import Button, { type ButtonProps } from "@mui/material/Button";
import { Link, type LinkProps } from "@tanstack/react-router";
import React from "react";

// Combine MUI props with TanStack Link props.
type RouterButtonProps = ButtonProps & LinkProps;

export const RouterButton = React.forwardRef<HTMLDivElement, RouterButtonProps>(
  (props, ref) => {
    return <Button ref={ref} component={Link} {...props} />;
  },
);
