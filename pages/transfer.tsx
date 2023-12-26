import { Container, Flex, Box } from "@chakra-ui/react";
import TransferCard from "../components/TransferCard";

export default function TransferPage() {
  return (
    <Box
      minH="100vh"
      bg="url(your-background-image.jpg)"
      backgroundSize="cover"
    >
      <Container maxW={"1440px"}>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          backdropFilter="blur(10px)" // Adjust the blur strength as needed
        >
          <TransferCard />
        </Flex>
      </Container>
    </Box>
  );
}
