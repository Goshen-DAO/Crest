// pages/privacy-policy.tsx

import React from "react";
import { NextPage } from "next";
import {
  Container,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";

const PrivacyPolicy: NextPage = () => {
  return (
    <Container maxW="800px" mt={10}>
      <Heading as="h1" mb={6}>
        Privacy Policy
      </Heading>
      <VStack align="start" spacing={4}>
        <Text>
          Your privacy is important to us. It is Goshen DAO&apos;s policy to
          respect your privacy regarding any information we may collect from you
          across our website,{" "}
          <ChakraLink
            href="https://www.goshendao.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.goshendao.com
          </ChakraLink>
          , and other sites we own and operate.
        </Text>
        <Text>
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.
        </Text>
        <Text>
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we’ll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorized access, disclosure, copying, use, or
          modification.
        </Text>
        <Text>
          We don’t share any personally identifying information publicly or with
          third-parties, except when required to by law.
        </Text>
        <Text>
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites and cannot accept responsibility or liability for their
          respective privacy policies.
        </Text>
        <Text>
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
        </Text>
        <Text>
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to{" "}
          <ChakraLink href="mailto:contact@goshendao.com">
            contact us
          </ChakraLink>
          .
        </Text>
      </VStack>
    </Container>
  );
};

export default PrivacyPolicy;
