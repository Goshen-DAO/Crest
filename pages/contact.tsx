// pages/contact.tsx

import React from "react";
import { NextPage } from "next";
import {
  Container,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarker,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

const Contact: NextPage = () => {
  return (
    <Container maxW="800px" mt={10}>
      <Heading as="h1" mb={6}>
        Contact Us
      </Heading>
      <VStack align="start" spacing={4}>
        <Text>
          Thank you for your interest in Goshen DAO! If you have any questions,
          suggestions, or would like to get in touch, feel free to contact us
          using the information below:
        </Text>
        <HStack spacing={4}>
          <FaEnvelope />
          <ChakraLink href="mailto:info@goshendao.com">
            info@goshendao.com
          </ChakraLink>
        </HStack>
        <HStack spacing={4}>
          <FaPhone />
          <Text>+123 456 7890</Text>
        </HStack>
        <HStack spacing={4}>
          <FaMapMarker />
          <Text>123 Main Street, Goshen City</Text>
        </HStack>
        <Heading as="h2" size="lg" mt={6}>
          Connect with Us on Social Media
        </Heading>
        <HStack spacing={4}>
          <FaTwitter />
          <ChakraLink href="https://twitter.com/goshendao" target="_blank">
            Twitter
          </ChakraLink>
        </HStack>
        <HStack spacing={4}>
          <FaInstagram />
          <ChakraLink
            href="https://www.instagram.com/goshendao/"
            target="_blank"
          >
            Instagram
          </ChakraLink>
        </HStack>
        <HStack spacing={4}>
          <FaFacebook />
          <ChakraLink
            href="https://www.facebook.com/goshendao/"
            target="_blank"
          >
            Facebook
          </ChakraLink>
        </HStack>
        <HStack spacing={4}>
          <FaLinkedin />
          <ChakraLink
            href="https://www.linkedin.com/company/goshendao/"
            target="_blank"
          >
            LinkedIn
          </ChakraLink>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Contact;
