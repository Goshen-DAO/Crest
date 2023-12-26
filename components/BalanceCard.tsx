import { Card, Spinner, Stack, Text } from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useContractMetadata,
  useTokenBalance,
} from "@thirdweb-dev/react";

type Props = {
  tokenAddress: string;
};

export default function BalanceCard({ tokenAddress }: Props) {
  const address = useAddress();

  const { contract } = useContract(tokenAddress);

  const { data: contractMetadata, isLoading: isContractMetadataLoading } =
    useContractMetadata(contract);

  const { data: tokenBalance, isLoading: isTokenBalanceLoading } =
    useTokenBalance(contract, address);

  const formatNumberWithCommasAndDecimal = (value: number) => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return (
    <Card
      p={4}
      width={"100%"}
      maxW={"400px"} // Set a max width for responsiveness
      border={"2px solid"}
      borderColor={"gray.100"}
      mb={4} // Margin bottom to create space between cards
    >
      <Stack textAlign={"center"} spacing={2}>
        {contractMetadata ? (
          <>
            <Text fontWeight={"bold"} fontSize={["lg", "xl", "2xl"]}>
              {contractMetadata.symbol}
            </Text>
            <Text>Balance:</Text>
            {!isTokenBalanceLoading && tokenBalance ? (
              <Text fontSize={["lg", "xl", "2xl"]} fontWeight={"bold"}>
                {formatNumberWithCommasAndDecimal(
                  parseFloat(tokenBalance.displayValue)
                )}
              </Text>
            ) : (
              <Spinner />
            )}
          </>
        ) : (
          <Spinner />
        )}
      </Stack>
    </Card>
  );
}
