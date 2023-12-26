import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  trustWallet,
  rainbowWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import "/styles/global.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "base";

const factoryAddress = process.env.CREST_SMARTWALLET_FACTORY_ADDRESS as string;

const clientAPI= process.env.THIRDWEB_API_KEY as string;
const smartWalletOptions = {
  factoryAddress: factoryAddress,
  gasless: true,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={clientAPI}
      supportedWallets={[
        smartWallet(metamaskWallet(), smartWalletOptions),
        smartWallet(coinbaseWallet(), smartWalletOptions),
        smartWallet(walletConnect(), smartWalletOptions),
        smartWallet(localWallet(), smartWalletOptions),
        smartWallet(
          embeddedWallet({
            recommended: true,
            auth: {
              options: ["email", "google", "apple", "facebook"],
            },
          }),
          smartWalletOptions
        ),
        smartWallet(trustWallet(), smartWalletOptions),
        smartWallet(rainbowWallet(), smartWalletOptions),
      ]}
    >
      <ChakraProvider>
        <Head>
          <title>
            Crest - Your Secure Financial Wallet for Easy Transactions
          </title>
          <meta
            name="description"
            content="Experience the security and convenience of Crest  – your trusted financial companion for seamless fund storage, transfers, and receipts."
          />
          <meta
            property="og:title"
            content="Crest - Your Secure Financial Wallet for Easy Transactions"
          />
          <meta
            property="og:description"
            content="Experience the security and convenience of Crest – your trusted financial companion for seamless fund storage, transfers, and receipts."
          />
          <meta
            property="og:image"
            content="/public/metadata.png"
          />
          <meta
            property="og:url"
            content="https://goshendao.com"
          />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Crest - Your Secure Financial Wallet for Easy Transactions"
          />
          <meta
            name="twitter:description"
            content="Experience the security and convenience of Crest – your trusted financial companion for seamless fund storage, transfers, and receipts."
          />
          <meta
            name="twitter:image"
            content="/public/metadata.png"
          />
          <meta
            name="twitter:url"
            content="https://goshendao.com"
          />
        </Head>

        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <SpeedInsights />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
