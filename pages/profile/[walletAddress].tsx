import React, { useState } from "react";
import {
  Avatar,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useContractRead,
  useDisconnect,
  ConnectWallet,
  useOwnedNFTs,
  ThirdwebNftMedia
} from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../../const/addresses";
import BalanceCard from "../../components/BalanceCard";
import TransactionHistory from "../../components/TransactionHistory";
import ProfilePicture from "../../components/ProfilePicture";
import { useQRCode } from "next-qrcode";
import { NFT_COLLECTION_ADDRESS } from "../../const/addresses";
import styles from "../../styles/NFT.module.css";

  


export default function AccountPage() {
  const disconnect = useDisconnect();
  const address = useAddress();
  const [isCopied, setIsCopied] = useState(false);
  const { Canvas } = useQRCode();
  const { contract: transferContract } = useContract(TRANSFER_CONTRACT_ADDRESS);
  const { data: verifiedTokens, isLoading: isVerifiedTokensLoading } =
    useContractRead(transferContract, "getVerifiedTokens");

    const { contract: daonftContract } = useContract(NFT_COLLECTION_ADDRESS);
    const { data, isLoading, error } = useOwnedNFTs(daonftContract, address);
    


    const [parentTabIndex, setParentTabIndex] = React.useState(0);
    const [nestedTabIndex, setNestedTabIndex] = React.useState(0);

  const nftGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // Three columns
    gap: '16px',
    height: '100%', // Set the height to 100%
    overflow: 'auto', // Enable overflow for scrolling
  };
  
  // Style for each NFT box
  const nftBoxStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '5px',
  };
  

  function copyToClipboard(text: string) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); // Reset copied state after 3 seconds
  }

  function truncateAddress(address: string) {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  }

  return (
    <Container maxW={"1440px"} py={4}>
      {address ? (
        <Flex flexDirection={["column", "column", "row"]}>
          <Flex flexDirection={"column"} mr={[0, 0, 8]} p={10} alignItems={["center"]}>
            <ConnectWallet
              theme={"dark"}
              btnTitle={"Click Me to Login"}
              modalTitle={"Login"}
              switchToActiveChain={true}
              modalSize={"wide"}
              hideTestnetFaucet={true}
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
                return (
                  <Canvas
                    text={address}
                    options={{
                      width: 128,
                    }}
                  />
                );
              }}
            />
            <Flex alignItems="center" mt={[4, 4, 0]}>
              <Text as="b">UID</Text> <br></br>
            </Flex>
            <Flex alignItems="center" mt={[4, 4, 0]}>
              <Text
                fontSize={"sm"}
                border={"2px solid black"}
                textAlign={["center"]}
                borderRadius={4}
                pr={2}
              >
                {truncateAddress(address)}
              </Text>
            </Flex>

            <Flex alignItems="center" mt={[4, 4, 0]}>
              <Button size="sm" onClick={() => copyToClipboard(address)}>
                {isCopied ? "Copied!" : "Copy UID"}
              </Button>
            </Flex>
            <Flex alignItems="center" mt={[4, 4, 0]}>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <Button onClick={disconnect}>Logout</Button>
            </Flex>
            </Flex>
          <Flex flexDirection={"column"} w={"100%"}>
          <Tabs index={parentTabIndex} onChange={index => setParentTabIndex(index)}>
      <TabList>
        <Tab>Wallet Balance</Tab>
        <Tab>Digital Collectibles</Tab>
        <Tab>Transaction History</Tab>
      </TabList>
      <TabPanels mt={4}>
        <TabPanel>
          <Heading textAlign={["center"]}>Wallet Balance</Heading>
          <SimpleGrid columns={[1]} spacing={0} mt={1}>
    {!isVerifiedTokensLoading ? (
     verifiedTokens.map((token: string) => (
      <center key={token}><BalanceCard tokenAddress={token} /></center>
    ))
    ) : (
                      <Spinner />
                    )}
                  </SimpleGrid>
        </TabPanel>

        <TabPanel>
          <Heading textAlign={["center"]}>Digital Collectibles</Heading>
          <Tabs index={nestedTabIndex} onChange={index => setNestedTabIndex(index)}>
        <TabList>
          <Tab>Goshen DAO Pass</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div style={nftGridStyle}>
              {data && data.map((nft) => (
                <a key={nft.metadata.id} href={`https://marketplace.goshendao.com/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`} target="_blank" rel="noopener noreferrer" style={nftBoxStyle}>
                  <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />
                  <p className={styles.nftTokenId}>Digital Collectible ID #{nft.metadata.id}</p>
                  <p className={styles.nftName}>{nft.metadata.name}</p>
                </a>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
         Under Development
          </TabPanel>
        </TabPanels>
      </Tabs>
        </TabPanel>

        <TabPanel>
          <Heading textAlign={["center"]}>Transaction History</Heading>
          <TransactionHistory />
        </TabPanel>
      </TabPanels>
    </Tabs>
          </Flex>
          
        </Flex>
      ) : (        <Flex justifyContent="center" alignItems="center" height="100vh">
          <ConnectWallet
            theme={"dark"}
            btnTitle={"Please login to continue"}
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
        </Flex>
      )}
    </Container>
  );
}
