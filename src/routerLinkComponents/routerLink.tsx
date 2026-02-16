import * as React from "react";
import Link, { type LinkProps } from "@mui/material/Link";
import {
  Link as TanstackLink,
  type LinkProps as TanstackLinkProps,
} from "@tanstack/react-router";

type RouterLinkProps = LinkProps & TanstackLinkProps;

export const RouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => {
    return <Link component={TanstackLink} ref={ref} {...props} />;
  },
);

RouterLink.displayName = "RouterLink";
