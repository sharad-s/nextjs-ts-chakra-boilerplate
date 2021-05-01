import { NextPage } from "next";
import { Heading } from "@chakra-ui/layout";
import AppLink from "../src/components/shared/AppLink";

const IndexPage: NextPage = () => {
  return (
    <>
      <Heading>Hello</Heading>
      <AppLink href="/about">About</AppLink>
    </>
  );
};

export default IndexPage;