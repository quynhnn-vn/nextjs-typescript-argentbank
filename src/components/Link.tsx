import React from "react";
import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: JSX.Element;
  className: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function Link(props: LinkProps) {
  const { href, children, className, onClick } = props;

  return (
    <NextLink href={href}>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </NextLink>
  );
}
