import NextLink from "next/link";
import { Link } from "@chakra-ui/layout";
import { ReactNodeArray } from "react";

const AppLink: any = ({
  children,
  href,
}: {
  children: ReactNodeArray;
  href: string;
}) => {
  return (
    <NextLink href={href} passHref>
      <Link>{children}</Link>
    </NextLink>
  );
};

export default AppLink;
