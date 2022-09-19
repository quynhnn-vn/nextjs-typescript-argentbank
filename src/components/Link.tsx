import React from "react";
import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: JSX.Element;
  className: string;
  otherProps?: any;
}

export default function Link(props: LinkProps) {
  const { href, children, className, otherProps } = props;
  return (
    <NextLink href={href} className={className}>
      <a {...otherProps}>{children}</a>
    </NextLink>
  );
}
