import { Container } from "@chakra-ui/react";
import React from "react";
import DepositForm from "../components/DepositForm";

const DepositPage = () => {
  return (
    <Container maxW="full" p={[4, 6]}>
      <DepositForm />
    </Container>
  );
};

export default DepositPage;
