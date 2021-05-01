import useSWR from "swr";
import { useRouter } from "next/router";
import { Flex, Box, Text, SimpleGrid, Heading } from "@chakra-ui/layout";
import { Alert } from "@chakra-ui/react";
import AppLink from "components/shared/AppLink";

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

const UserData = () => {
  const router = useRouter();
  const { id } = router.query;
  const result = useSWR(`/api/user/${id}`, fetcher);

  console.log({ id, result });

  const data: Data | undefined = result.data;
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

const UserPage = () => {
  return (
    <Box>
      <Flex flexDirection="column" alignItems="center">
        <Heading marginY="2rem">User</Heading>
        <UserData />
        <AppLink href="/" marginY="2rem">
          <Text fontStyle="italic">Go back home</Text>
        </AppLink>
      </Flex>
    </Box>
  );
};

export default UserPage;
