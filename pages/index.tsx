import type { NextPage } from "next";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { MediaRenderer, ConnectWallet } from "@thirdweb-dev/react";
import { FEATURES_IMAGE_URL, HERO_IMAGE_URL } from "../const/addresses";
import FeatureCard from "../components/FeatureCard";

const Home: NextPage = () => {
  return (
    <Container maxW={"1440px"} p={4}>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        px={{ base: 2, md: 10 }}
        py={8}
        borderRadius={20}
      >
        <Box flex={{ base: 1, md: 1 }} mb={{ base: 4, md: 0 }}>
          <MediaRenderer src={HERO_IMAGE_URL} height="100%" width="100%" />
        </Box>
        <Flex
          flexDirection="column"
          justifyContent="center"
          w={{ base: "100%", md: "60%" }}
        >
          <Stack spacing={4}>
            <Heading
              bgGradient="linear(to-l, #000000, #007639)"
              bgClip="text"
              fontWeight="extrabold"
              fontSize={{ base: "4xl", md: "6xl" }}
            >
              The Simplest Way to Pay Your Friends
            </Heading>
            <Text fontSize={{ base: "md", md: "xl" }}>
              Transfer funds globally and have the recipient receive the money
              instantly
            </Text>
            <Flex alignItems="center" mt={4}>
              <ConnectWallet
                theme={"dark"}
                btnTitle={"Login"}
                modalTitle={"Login"}
                switchToActiveChain={true}
                modalSize={"wide"}
                welcomeScreen={{
                  img: {
                    src: "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/crest_icon_logo_colored_nobg.png",
                    width: 150,
                    height: 150,
                  },
                  subtitle: "Login to access your account",
                }}
                modalTitleIconUrl={
                  "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/favicon.ico"
                }
                detailsBtn={() => {
                  return <Text></Text>;
                }}
              />
              <span style={{ margin: "0 10px" }}></span>
              <ConnectWallet
                theme={"dark"}
                btnTitle={"Get Started"}
                modalTitle={"Sign Up Now!"}
                switchToActiveChain={true}
                modalSize={"wide"}
                welcomeScreen={{
                  img: {
                    src: "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/crest_icon_logo_colored_nobg.png",
                    width: 150,
                    height: 150,
                  },
                  subtitle: "Sign up now to create an account",
                }}
                modalTitleIconUrl={
                  "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/favicon.ico"
                }
                detailsBtn={() => {
                  return <Text></Text>;
                }}
              />
            </Flex>
          </Stack>
        </Flex>
      </Flex>
      <Box my={10}>
        <Center>
          <Heading as="h2" size="xl">
            How to Transfer?
          </Heading>
        </Center>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
          <Box>
            <MediaRenderer
              src={FEATURES_IMAGE_URL}
              height="100%"
              width="100%"
            />
          </Box>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={4}>
              <FeatureCard
                step={"01"}
                title={"Select an Asset"}
                description={
                  "Select from a list of verified Asset to send to your friends and family."
                }
              />
              <FeatureCard
                step={"02"}
                title={"Who to Send To"}
                description={
                  "Enter the UID of the recipient. Double-check the address as it's non-reversible."
                }
              />
              <FeatureCard
                step={"03"}
                title={"Write a Message"}
                description={"Add an optional message to your asset transfer."}
              />
            </Stack>
          </Flex>
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Home;
