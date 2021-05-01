import { NextPage } from "next";
import AppLink from "../src/components/shared/AppLink";

const IndexPage: NextPage = () => {
  return (
    <>
      <h1>Hello</h1>
      <AppLink href="/about">About</AppLink>
    </>
  );
};

export default IndexPage;
