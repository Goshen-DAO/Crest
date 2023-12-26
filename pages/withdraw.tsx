import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import WithdrawNow from "../components/WithdrawNow";

const WithdrawalPage = () => {
  return (
    <Container maxW="full" p={[4, 6]}>
      <Flex direction="column" align="center" justify="center">
        <WithdrawNow />
      </Flex>
    </Container>
  );
};

export default WithdrawalPage;
