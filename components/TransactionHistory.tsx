import React, { useEffect, useState } from "react";
import { CovalentClient, LogEvent } from "@covalenthq/client-sdk";
import {
  useAddress,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import {
  Heading,
  Flex,
  Text,
  Box,
  SimpleGrid,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import styles from "../styles/TransactionHistory.module.css";
import { CALIM_TOKEN_CONTRACT_ADDRESS } from "../const/addresses";

type CustomTransaction = {
  transfers: LogEvent[];
  from_Address: string;
  to_Address: string;
  block_signed_at: Date;
  block_height: number;
  block_hash: string;
  tx_hash: string;
  tx_offset: number;
  successful: boolean;
};

const formatAmount = (delta: string) => {
  const parsedDelta = BigInt(delta);
  const above18Decimals = parsedDelta / BigInt(10 ** 18);
  const formattedAmount = above18Decimals.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedAmount;
};

const TransactionHistoryPage: React.FC = () => {
  const { contract } = useContract(CALIM_TOKEN_CONTRACT_ADDRESS, "token-drop");

  const { data: contractMetadata } = useContractMetadata(contract);
  const [transactions, setTransactions] = useState<CustomTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const address = useAddress();

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const covalentApiKey = process.env.COVALENT_API_KEY || "ckey_8fb0fa176c3a4ff7ba218b0862a";

        if (!covalentApiKey) {
          console.error("API key is missing.");
          return;
        }

        if (address === undefined) {
          console.error("Wallet address is undefined.");
          return;
        }

        const client = new CovalentClient(covalentApiKey);
        const walletAddress: string = address;

        const response: CustomTransaction[] = [];
        const targetAddress = address;

        for await (const item of await client.TransactionService.getAllTransactionsForAddress(
          "base-mainnet",
          walletAddress,
          { quoteCurrency: "USD" }
        )) {
          const logEvents = item.log_events || [];
          const filteredTransfers = logEvents.filter(
            (log) =>
              log.decoded &&
              log.decoded.signature ===
                "Transfer(indexed address from, indexed address to, uint256 value)" &&
              log.decoded.params &&
              log.decoded.params.length > 0 &&
              (log.decoded.params[0].value.toLowerCase() ===
                targetAddress.toLowerCase() ||
                log.decoded.params[1].value.toLowerCase() ===
                  targetAddress.toLowerCase())
          );

          if (filteredTransfers && filteredTransfers.length > 0) {
            const fromAddress = filteredTransfers[0].decoded.params.find(
              (param) => param.name === "from"
            )?.value;
            const toAddress = filteredTransfers[0].decoded.params.find(
              (param) => param.name === "to"
            )?.value;

            response.push({
              ...item,
              transfers: filteredTransfers,
              from_Address: fromAddress || "",
              to_Address: toAddress || "",
            });
          }
        }

        setTransactions(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred.");
        }
      }
    };

    fetchTransactionHistory();
  }, [address, currentPage]);

  const getTransactionType = (
    to_Address: string,
    from_Address: string,
    amount: string
  ): string => {
    if (to_Address === "0x723a159b280e23889e78ae3c397b52cca21ecd3b") {
      return "fee";
    } else if (to_Address === "0x2f0865ce08e27d9d8e45a14a51e47f42930c9ac9") {
      return "withdraw";
    } else if (from_Address === "0x504b92cc567a334eb8c5c021e91f3f84a2c5f7a7") {
      return "deposit";
    } else if (to_Address.toLowerCase() === address?.toLowerCase()) {
      return "received";
    } else {
      return "transfer";
    }
  };

  const getTransactionTypeText = (
    toAddress: string,
    fromAddress: string,
    amount: string
  ): string => {
    const transactionType = getTransactionType(toAddress, fromAddress, amount);

    switch (transactionType) {
      case "fee":
        return "Fee";
      case "withdraw":
        return "Withdraw";
      case "deposit":
        return "Deposit";
      case "received":
        return "Received";
      case "transfer":
        return "Transfer";
      default:
        return "Unknown";
    }
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Flex direction="column" align="center" p={4} width="100%" height="100%">
      {transactions.length === 0 ? (
        <Text>No transactions found.</Text>
      ) : (
        <Box overflowX="auto" width="100%">
          <SimpleGrid columns={[1]} spacing={4}>
            {transactions
              .slice(
                (currentPage - 1) * transactionsPerPage,
                currentPage * transactionsPerPage
              )
              .map((transaction) => (
                <Box
                  key={transaction.tx_hash}
                  className={styles.transactionItem}
                >
                  <Flex
                    className={styles.indicatorContainer}
                    align="center"
                    mb={2}
                  >
                    <span
                      className={`${styles.indicator} ${
                        styles[
                          getTransactionType(
                            transaction.to_Address,
                            transaction.from_Address,
                            formatAmount(
                              transaction.transfers?.[0].decoded?.params?.[2]
                                .value || "0"
                            )
                          )
                        ]
                      }`}
                    />
                    <Text ml={2} fontSize={["xs", "sm"]} whiteSpace="nowrap">
                      {getTransactionTypeText(
                        transaction.to_Address,
                        transaction.from_Address,
                        formatAmount(
                          transaction.transfers?.[0].decoded?.params?.[2]
                            .value || "0"
                        )
                      )}
                    </Text>
                  </Flex>
                  <Flex direction="column" alignItems="left" textAlign="left">
                    <div>
                      <span className={styles.label}>Transaction ID:</span>
                      <br />
                      <ChakraLink
                        fontSize={["xs", "sm"]}
                        isTruncated
                        href={`https://basescan.org/tx/${transaction.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="blue.500" // Set the link color
                        textDecoration="underline" // Add underline to the link
                      >
                        Show Transaction Details
                      </ChakraLink>
                    </div>
                    <div>
                      <span className={styles.label}>Amount:</span>{" "}
                      <Text fontSize={["xs", "sm"]} isTruncated>
                        {formatAmount(
                          transaction.transfers?.[0].decoded?.params?.[2]
                            .value || "0"
                        )}{" "}
                        <b>{contractMetadata?.symbol}</b>
                      </Text>
                    </div>
                    <div>
                      <span className={styles.label}>To UID:</span>{" "}
                      <Text fontSize={["xs", "sm"]} isTruncated>
                        {transaction.to_Address}
                      </Text>
                    </div>
                    <div>
                      <span className={styles.label}>From UID:</span>{" "}
                      <Text fontSize={["xs", "sm"]} isTruncated>
                        {transaction.from_Address}
                      </Text>
                    </div>
                    <div>
                      <span className={styles.label}>Date:</span>{" "}
                      <Text fontSize={["xs", "sm"]} isTruncated>
                        {new Date(transaction.block_signed_at).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                            hour12: true,
                          }
                        )}
                      </Text>
                    </div>
                  </Flex>
                </Box>
              ))}
          </SimpleGrid>
          <Flex justify="space-between" mt={4}>
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={
                transactions.length <= currentPage * transactionsPerPage
              }
            >
              Next
            </Button>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default TransactionHistoryPage;
