// pages/about.tsx

import React from "react";
import { NextPage } from "next";
import {
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Center,
} from "@chakra-ui/react";
import NextLink from "next/link";

const About: NextPage = () => {
  return (
    <Container maxW="800px" mt={10}>
      <Heading as="h1" mb={6}>
        About Goshen DAO
      </Heading>
      <VStack align="start" spacing={4}>
        <Text>
          Goshen DAO is a dynamic community dedicated to fostering
          collaboration, creativity, and innovation in the decentralized world.
          Whether you&apos;re an artist, developer, entrepreneur, or blockchain
          enthusiast, you&apos;ve found your digital home!
        </Text>
        <Heading as="h2" size="lg">
          Our Vision
        </Heading>
        <Text>
          At Goshen DAO, we believe in the power of decentralized collaboration
          to shape a brighter future. Together, we aim to build a thriving
          ecosystem that empowers creators, disrupts the status quo, and unlocks
          new possibilities in the blockchain space.
        </Text>
      </VStack>
      <br></br>
      <br></br>
      <br></br>
      <Center>
        <Button
          as={NextLink}
          href="https://goshendao.com/discord"
          target="_blank"
          variant="solid"
          colorScheme="teal"
        >
          Join our Community
        </Button>
      </Center>
    </Container>
  );
};

export default About;
