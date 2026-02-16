import StepButton, { type StepButtonProps } from "@mui/material/StepButton";
import { Link, type LinkProps } from "@tanstack/react-router";
import React from "react";

// Combine MUI props with TanStack Link props.
type RouterStepButtonProps = StepButtonProps & LinkProps;

export const RouterStepButton = React.forwardRef<
  HTMLDivElement,
  RouterStepButtonProps
>((props, ref) => {
  return <StepButton ref={ref} component={Link} {...props} />;
});
