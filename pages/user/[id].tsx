import useSWR from "swr";
import { useRouter } from "next/router";
import { Flex, Box, Text, SimpleGrid, Heading } from "@chakra-ui/layout";
import { Alert } from "@chakra-ui/react";
import AppLink from "components/shared/AppLink";
import { GetServerSideProps, NextPage } from "next";
import fetch from "node-fetch";
import axios from "axios";

// Types
type Data = {
  id: string;
  name: string;
  email: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("Yo that's NOT OK!!!");
  }
  const data: Data = await res.json();
  return data;
};

const UserData = ({ data }: { data: Data }) => {
  const router = useRouter();
  const { id } = router.query;
  const result = useSWR(`/api/user/${id}`, fetcher);

  // const data: Data | undefined = result.data;
  const error: Error = result.error;

  if (error) {
    return <Alert status="error">Loading failed: {error.message}</Alert>;
  }

  if (!data) {
    return <Alert status="info">Loading...</Alert>;
  }

  return (
    <SimpleGrid columns={2} width="2xs" spacingY={4}>
      <Text fontWeight="bold" marginRight={4}>
        UserID
      </Text>
      <Text>{data.id}</Text>

      <Text fontWeight="bold" marginRight={4}>
        Name
      </Text>
      <Text>{data.name}</Text>

      <Text fontWeight="bold" marginRight={4}>
        Email
      </Text>
      <Text>{data.email}</Text>
    </SimpleGrid>
  );
};

const UserPage: NextPage<{ data: Data }> = ({ data }) => {
  return (
    <Box>
      <Flex flexDirection="column" alignItems="center">
        <Heading marginY="2rem">User</Heading>
        <UserData data={data} />
        <AppLink href="/" marginY="2rem">
          <Text fontStyle="italic">Go back home</Text>
        </AppLink>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  try {
    const { id } = params;
    const { data }: { data: Data } = await axios.get(
      `http://localhost:3001/api/user/${id}`
    );
    return {
      props: { data },
    };
  } catch (err) {
    console.log({ err });
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

export default UserPage;
