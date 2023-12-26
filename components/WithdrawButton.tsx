// WithdrawButton.tsx
import React from "react";
import { Web3Button, useContract, useAddress } from "@thirdweb-dev/react";
import {
  TRANSFER_CONTRACT_ADDRESS,
  FEE_TOKEN_ADDRESS,
  FEE_AMOUNT,
  FEE_RECEIVER,
} from "../const/addresses";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import styles from "../styles/CashInOutForm.module.css";

type Props = {
  tokenAddress: string;
  receiver: string;
  amount: string;
  message: string;
  onSuccess?: () => void;
  isDisabled: boolean; // Add the isDisabled prop
};

export default function WithdrawButton({
  tokenAddress,
  receiver,
  amount,
  message,
  onSuccess,
  isDisabled, // Include the isDisabled prop in the function parameters
}: Props) {
  const toast = useToast();
  const address = useAddress();

  const { contract: tokenContract } = useContract(tokenAddress, "token");
  const { contract: transferContract } = useContract(TRANSFER_CONTRACT_ADDRESS);

  const handleTransfer = async () => {
    try {
      // Check if the user has enough balance to cover the fee
      const userBalance = await tokenContract?.call("balanceOf", [
        address as string,
      ]);

      // Ensure that userBalance is defined before accessing its properties
      if (
        userBalance &&
        userBalance[0] &&
        userBalance[0].lt(ethers.utils.parseEther(FEE_AMOUNT))
      ) {
        // Display a toast message if the user doesn't have enough balance
        toast({
          title: "Insufficient Balance",
          description: "You don't have enough XPHP to cover the fees.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Set the allowance and initiate the transfer
      await tokenContract?.setAllowance(
        TRANSFER_CONTRACT_ADDRESS,
        ethers.utils.parseEther(amount).toString()
      );

      // Transfer the main amount
      await transferContract?.call("transfer", [
        tokenAddress,
        receiver,
        ethers.utils.parseEther(amount),
        message,
      ]);

      // Transfer the fee amount
      await transferContract?.call("transfer", [
        FEE_TOKEN_ADDRESS,
        FEE_RECEIVER,
        ethers.utils.parseEther(FEE_AMOUNT),
        "Withdraw Fee",
      ]);

      // Display a success toast
      toast({
        title: "Withdraw Successful",
        description: "You have successfully withdrawn an asset.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error during transfer:", error);
      // Display an error message
      toast({
        title: "Withdraw Error",
        description: "Something went wrong while transferring.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Web3Button
      theme="dark"
      contractAddress={TRANSFER_CONTRACT_ADDRESS}
      action={handleTransfer} // Use the handleTransfer function
      onSubmit={() => console.log("Transaction submitted")}
      onError={(error) => alert("Something went wrong!")}
      className={styles.submitButton}
      isDisabled={isDisabled} // Set the isDisabled state based on the prop
    >
      Withdraw
    </Web3Button>
  );
}
