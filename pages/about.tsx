import React from "react";
import { NextPage } from "next";
import {
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Center,
  Link,
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

        {/* GitHub link */}
        <Text>
          Explore our code on{" "}
          <Link href="https://github.com/Goshen-DAO/Crest" target="_blank">
            GitHub
          </Link>
          .
        </Text>

        {/* Additional technical resources (placeholder) */}
        <Text>
          For more technical details and resources, visit our documentation at{" "}
          <Link href="https://docs.goshendao.com" target="_blank">
            Docs
          </Link>
          .
        </Text>
      </VStack>
      <br />
      <br />
      <br />
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
