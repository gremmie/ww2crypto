import * as React from "react";
import Tab, { type TabProps } from "@mui/material/Tab";
import { Link, type LinkProps } from "@tanstack/react-router";

type RouterTabProps = TabProps & LinkProps;

export const RouterTab = React.forwardRef<HTMLAnchorElement, RouterTabProps>(
  (props, ref) => {
    return <Tab component={Link} ref={ref} {...props} />;
  },
);

RouterTab.displayName = "RouterTab";
