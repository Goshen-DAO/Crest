import {
    Box,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import {
    MediaRenderer,
    Web3Button,
    useContract,
    useContractMetadata,
  } from "@thirdweb-dev/react";
  import {
    CALIM_TOKEN_CONTRACT_ADDRESS,
    CLAIM_TOKEN_IMAGE,
  } from "../const/addresses";
  
  export default function ClaimPage() {
    const { contract } = useContract(CALIM_TOKEN_CONTRACT_ADDRESS, "token-drop");
  
    const { data: contractMetadata } = useContractMetadata(contract);
  
    const claimAmount = 50;
    const toast = useToast();
  
    return (
      <Container maxW={"1440px"} minHeight={"80vh"} padding={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Flex justify={{ base: "center", md: "flex-end" }} align="center">
            <MediaRenderer src={CLAIM_TOKEN_IMAGE} height="100%" width="100%" />
          </Flex>
          <Flex
            flexDirection={"column"}
            align={{ base: "center", md: "flex-start" }}
          >
            <Stack spacing={4} textAlign={{ base: "center", md: "left" }}>
              <Heading fontSize={{ base: "4xl", md: "5xl" }}>
                Claim {contractMetadata?.symbol}
              </Heading>
              <Text fontSize={{ base: "md", md: "xl" }}>
                Claim your FREE {contractMetadata?.symbol} (One time only).{" "}
                <br></br>All transaction fees to claim your{" "}
                {contractMetadata?.symbol} are covered.
                <br></br>Utilize {contractMetadata?.symbol} to navigate Crest
              </Text>
              <Text fontWeight={"bold"}>
                Claim {claimAmount} {contractMetadata?.symbol}
              </Text>
              <Box>
                <Web3Button
                  contractAddress={CALIM_TOKEN_CONTRACT_ADDRESS}
                  action={(contract) => contract.erc20.claim(claimAmount)}
                  onError={(error) =>
                    toast({
                      title: "Unsuccessful Claim",
                      description: "Something went wrong while claiming.",
                      status: "error",
                      duration: 90000,
                      isClosable: true,
                    })
                  }
                  onSuccess={() =>
                    toast({
                      title: "Claim Successful",
                      description: "You have successfully claimed XPHP!",
                      status: "success",
                      duration: 90000,
                      isClosable: true,
                    })
                  }
                >
                  Claim {contractMetadata?.symbol} now!
                </Web3Button>
              </Box>
            </Stack>
          </Flex>
        </SimpleGrid>
      </Container>
    );
  }
  