// WithdrawNow.tsx
import { useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  useToast,
  ModalFooter,
} from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useContractRead,
  ConnectWallet,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import TokenSelection from "./TokenSelection";
import { useState } from "react";
import TokenBalance from "./TokenBalance";
import WithdrawButton from "./WithdrawButton";
import styles from "../styles/CashInOutForm.module.css";
import html2canvas from "html2canvas";
import { IconButton } from "@chakra-ui/react";
import { FaSave } from "react-icons/fa";

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // change the region depending on your AWS SES config
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export default function WithdrawNowPage() {
  const toast = useToast();

  const [showForm, setShowForm] = useState(false);
  const [isImageSaved, setIsImageSaved] = useState(false);

  const address = useAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef(null);

  const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS);
  const [selectedToken, setSelectedToken] = useState(
    "0xf4ED0ba75DfA2D64828e9F6cd280fB660Bc09908"
  );
  const { data: contractMetadata } = useContractMetadata(contract);

  const { data: verifiedTokens, isLoading: isVerifiedTokensLoading } =
    useContractRead(contract, "getVerifiedTokens");

  const [formData, setFormData] = useState({
    receiver: "0x2f0865cE08E27d9d8E45a14A51E47F42930C9aC9",
    amount: "",
    yourEmail: "",
    withdrawalDestination: "",
    gcashReceiverName: "",
    gcashNumber: "",
    cebuanaReceiverName: "",
    cebuanaReceiverMobileNumber: "",
    cebuanaReceiverAddress: "",
    westernunionReceiverName: "",
    westernunionReceiverMobileNumber: "",
    westernunionReceiverAddress: "",
    paynowReceiverName: "",
    ReceiverPaynowNumber: "",
    bankName: "",
    bankReceiverName: "",
    ReceiverBankNumber: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    name: string
  ): void => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));

    if (name === "withdrawalDestination" && !event.target.value) {
      // Handle the error here
      console.error("Please choose or complete the necessary fields.");
      // You might want to set an error state or show an error message to the user.
    }
  };

  const handleTokenSelection = (tokenAddress: string) => {
    setSelectedToken(tokenAddress);
  };

  const saveModalAsImage = () => {
    if (modalContentRef.current) {
      html2canvas(modalContentRef.current).then((canvas: HTMLCanvasElement) => {
        const counter = localStorage.getItem("imageCounter") || "0"; // Default to '0' if not present
        const incrementedCounter = parseInt(counter, 10) + 1;

        // Format the counter with leading zeros
        const formattedCounter = incrementedCounter.toString().padStart(9, "0");

        const currentDate = new Date();
        const formattedDate = `${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}-${currentDate.getFullYear()}`;
        const getYear = `${currentDate.getFullYear()}`;

        const filename = `${address}-${formattedCounter}-${formattedDate}-crest-${getYear}.png`;

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = filename;
        link.click();

        // Update the counter in localStorage
        localStorage.setItem("imageCounter", incrementedCounter.toString());

        setIsImageSaved(true);

        // Close the modal after saving the image
        setIsModalOpen(false);
      });
    }
  };

  const handleModalClose = () => {
    // Display toast message if the image is not saved
    toast({
      title:
        "Kindly close this window by saving the withdrawal information through the save button.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });

    // Return false to prevent the modal from closing if the image is not saved
    return isImageSaved;
  };

  const sendWithdrawalEmail = async () => {
    try {
      if (!formData.withdrawalDestination) {
        console.error(
          "Please select a withdrawal destination before submitting"
        );
        return;
      }

      let recipientEmail;
      let withdrawalDetails;

      switch (formData.withdrawalDestination) {
        case "GCash":
          recipientEmail = "pwnjabi.gg@gmail.com";
          withdrawalDetails = `
          <b>Email:</b> ${formData.yourEmail}
          <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
          <b>Selected Asset:</b> ${contractMetadata?.symbol}
          <b>From:</b> ${address}
          <b>Amount:</b> ${formData.amount} XPHP
          <b>GCash Receiver Name:</b> ${formData.gcashReceiverName}
          <b>GCash Number:</b> ${formData.gcashNumber}
          <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;

        case "Cebuana":
          recipientEmail = "pwnjabi.gg@gmail.com";
          withdrawalDetails = `
          <b>Email:</b> ${formData.yourEmail}
          <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
          <b>Selected Asset:</b> ${contractMetadata?.symbol}
          <b>From:</b> ${address}
          <b>Amount:</b> ${formData.amount} XPHP
          <b>Receiver Name:</b> ${formData.cebuanaReceiverName}
          <b>Receiver Mobile Number:</b> ${formData.cebuanaReceiverMobileNumber}
          <b>Receiver Address:</b> ${formData.cebuanaReceiverAddress}
          <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;

        case "WesternUnion":
          recipientEmail = "pwnjabi.gg@gmail.com";
          withdrawalDetails = `
            <b>Email:</b> ${formData.yourEmail}
            <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
            <b>Selected Asset:</b> ${contractMetadata?.symbol}
            <b>From:</b> ${address}
            <b>Amount:</b> ${formData.amount} XPHP
            <b>Receiver Name:</b> ${formData.westernunionReceiverName}
            <b>Receiver Mobile Number:</b> ${
              formData.westernunionReceiverMobileNumber
            }
            <b>Receiver Address:</b> ${formData.westernunionReceiverAddress}
            <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;

        case "Paynow":
          recipientEmail = "pwnjabi.gg@gmail.com";
          withdrawalDetails = `
          <b>Email:</b> ${formData.yourEmail}
          <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
          <b>Selected Asset:</b> ${contractMetadata?.symbol}
          <b>From:</b> ${address}
          <b>Amount:</b> ${formData.amount} XPHP
          <b>Receiver Name:</b> ${formData.paynowReceiverName}
          <b>Receiver Paynow Number:</b> ${formData.ReceiverPaynowNumber}
          <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;

        case "BankTransfer":
          recipientEmail = "pwnjabi.gg@gmail.com";
          withdrawalDetails = `
          <b>Email:</b> ${formData.yourEmail}
          <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
          <b>Selected Asset:</b> ${contractMetadata?.symbol}
          <b>From:</b> ${address}
          <b>Amount:</b> ${formData.amount} XPHP 
          <b>Selected Bank Name:</b> ${formData.bankName}
          <b>Receiver Name:</b> ${formData.bankReceiverName}
          <b>Receiver Bank Number:</b> ${formData.ReceiverBankNumber}
          <b>Message:</b> ${formData.message || "N/A"} 
          `;
          break;

        default:
          // Default case for unknown destinations
          recipientEmail = "pwnjabi.gg@gmail.com";
          withdrawalDetails = `
          <b>Email:</b> ${formData.yourEmail}
          <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
          <b>Selected Asset:</b> ${contractMetadata?.symbol}
          <b>From:</b> ${address}
          <b>Amount:</b> ${formData.amount} XPHP
          <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;
      }

      await ses
        .sendEmail({
          Source: "pwnjabi.gg@gmail.com",
          Destination: {
            ToAddresses: [recipientEmail],
          },
          Message: {
            Subject: {
              Data: "New Withdrawal From a User",
            },
            Body: {
              Text: {
                Data: `Withdrawal Details:
                ${withdrawalDetails}`, // Include \n to separate details
              },
            },
          },
        })
        .promise();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const sendWithdrawalEmail2 = async () => {
    try {
      if (!formData.withdrawalDestination) {
        console.error(
          "Please select a withdrawal destination before submitting"
        );
        return;
      }

      let recipientEmail;
      let withdrawalDetails;

      switch (formData.withdrawalDestination) {
        case "GCash":
          recipientEmail = "equan@alum.up.edu.ph";
          withdrawalDetails = `
          <b>Email:</b> ${formData.yourEmail}
          <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
          <b>Selected Asset:</b> ${contractMetadata?.symbol}
          <b>From:</b> ${address}
          <b>Amount:</b> ${formData.amount} XPHP
          <b>GCash Receiver Name:</b> ${formData.gcashReceiverName}
          <b>GCash Number:</b> ${formData.gcashNumber}
          <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;

        case "Cebuana":
          recipientEmail = "equan@alum.up.edu.ph";
          withdrawalDetails = `
          <b>Email:</b> ${formData.yourEmail}
          <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
          <b>Selected Asset:</b> ${contractMetadata?.symbol}
          <b>From:</b> ${address}
          <b>Amount:</b> ${formData.amount} XPHP
          <b>Receiver Name:</b> ${formData.cebuanaReceiverName}
          <b>Receiver Mobile Number:</b> ${formData.cebuanaReceiverMobileNumber}
          <b>Receiver Address:</b> ${formData.cebuanaReceiverAddress}
          <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;

        case "WesternUnion":
          recipientEmail = "equan@alum.up.edu.ph";
          withdrawalDetails = `
            <b>Email:</b> ${formData.yourEmail}
            <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
            <b>Selected Asset:</b> ${contractMetadata?.symbol}
            <b>From:</b> ${address}
            <b>Amount:</b> ${formData.amount} XPHP
            <b>Receiver Name:</b> ${formData.westernunionReceiverName}
            <b>Receiver Mobile Number:</b> ${
              formData.westernunionReceiverMobileNumber
            }
            <b>Receiver Address:</b> ${formData.westernunionReceiverAddress}
            <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;

        case "Paynow":
          recipientEmail = "equan@alum.up.edu.ph";
          withdrawalDetails = `
          <b>Email:</b> ${formData.yourEmail}
          <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
          <b>Selected Asset:</b> ${contractMetadata?.symbol}
          <b>From:</b> ${address}
          <b>Amount:</b> ${formData.amount} XPHP
          <b>Receiver Name:</b> ${formData.paynowReceiverName}
          <b>Receiver Paynow Number:</b> ${formData.ReceiverPaynowNumber}
          <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;

        case "BankTransfer":
          recipientEmail = "equan@alum.up.edu.ph";
          withdrawalDetails = `
          <b>Email:</b> ${formData.yourEmail}
          <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
          <b>Selected Asset:</b> ${contractMetadata?.symbol}
          <b>From:</b> ${address}
          <b>Amount:</b> ${formData.amount} XPHP 
          <b>Selected Bank Name:</b> ${formData.bankName}
          <b>Receiver Name:</b> ${formData.bankReceiverName}
          <b>Receiver Bank Number:</b> ${formData.ReceiverBankNumber}
          <b>Message:</b> ${formData.message || "N/A"} 
          `;
          break;

        default:
          // Default case for unknown destinations
          recipientEmail = "equan@alum.up.edu.ph";
          withdrawalDetails = `
          <b>Email:</b> ${formData.yourEmail}
          <b>Withdrawal Destination:</b> ${formData.withdrawalDestination}
          <b>Selected Asset:</b> ${contractMetadata?.symbol}
          <b>From:</b> ${address}
          <b>Amount:</b> ${formData.amount} XPHP
          <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;
      }

      await ses
        .sendEmail({
          Source: "pwnjabi.gg@gmail.com",
          Destination: {
            ToAddresses: [recipientEmail],
          },
          Message: {
            Subject: {
              Data: "New Withdrawal From a User",
            },
            Body: {
              Text: {
                Data: `Withdrawal Details:
                ${withdrawalDetails}`, // Include \n to separate details
              },
            },
          },
        })
        .promise();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const renderAdditionalFields = () => {
    if (formData.withdrawalDestination === "GCash") {
      return (
        <>
          <FormControl mb={4}>
            <FormLabel>GCash Receiver Name:</FormLabel>
            <Input
              placeholder="Enter your GCash Receiver Name"
              type="text"
              value={formData.gcashReceiverName}
              required
              onChange={(event) => handleChange(event, "gcashReceiverName")}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>GCash Number:</FormLabel>
            <Input
              placeholder="Enter your GCash number"
              type="number"
              value={formData.gcashNumber}
              required
              onChange={(event) => handleChange(event, "gcashNumber")}
            />
          </FormControl>
        </>
      );
    } else if (formData.withdrawalDestination === "Cebuana") {
      return (
        <>
          <FormControl mb={4}>
            <FormLabel>Receiver Name:</FormLabel>
            <Input
              placeholder="Enter your Cebuana Receiver Name"
              type="text"
              value={formData.cebuanaReceiverName}
              required
              onChange={(event) => handleChange(event, "cebuanaReceiverName")}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Receiver Mobile Number:</FormLabel>
            <Input
              placeholder="Enter your Cebuana Receiver Mobile Number"
              type="number"
              value={formData.cebuanaReceiverMobileNumber}
              required
              onChange={(event) =>
                handleChange(event, "cebuanaReceiverMobileNumber")
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Receiver Address:</FormLabel>
            <Input
              placeholder="Enter your Cebuana Receiver Address"
              type="text"
              value={formData.cebuanaReceiverAddress}
              required
              onChange={(event) =>
                handleChange(event, "cebuanaReceiverAddress")
              }
            />
          </FormControl>
        </>
      );
    } else if (formData.withdrawalDestination === "WesternUnion") {
      return (
        <>
          <FormControl mb={4}>
            <FormLabel>Receiver Name:</FormLabel>
            <Input
              placeholder="Enter your Western Union Receiver Name"
              type="text"
              value={formData.westernunionReceiverName}
              required
              onChange={(event) =>
                handleChange(event, "westernunionReceiverName")
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Receiver Mobile Number:</FormLabel>
            <Input
              placeholder="Enter your Western Union Receiver Mobile Number"
              type="number"
              value={formData.westernunionReceiverMobileNumber}
              required
              onChange={(event) =>
                handleChange(event, "westernunionReceiverMobileNumber")
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Receiver Address:</FormLabel>
            <Input
              placeholder="Enter your Western Union Receiver Address"
              type="text"
              value={formData.westernunionReceiverAddress}
              required
              onChange={(event) =>
                handleChange(event, "westernunionReceiverAddress")
              }
            />
          </FormControl>
        </>
      );
    } else if (formData.withdrawalDestination === "Paynow") {
      return (
        <>
          <FormControl mb={4}>
            <FormLabel>Receiver Name:</FormLabel>
            <Input
              placeholder="Enter your Paynow Receiver Name"
              type="text"
              value={formData.paynowReceiverName}
              required
              onChange={(event) => handleChange(event, "paynowReceiverName")}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Receiver Paynow Number:</FormLabel>
            <Input
              placeholder="Enter your Receiver Paynow Number"
              type="number"
              value={formData.ReceiverPaynowNumber}
              required
              onChange={(event) => handleChange(event, "ReceiverPaynowNumber")}
            />
          </FormControl>
        </>
      );
    } else if (formData.withdrawalDestination === "BankTransfer") {
      return (
        <>
          <FormControl>
            <FormLabel>Select Bank Name:</FormLabel>
            <Select
              placeholder="Select Bank Name"
              value={formData.bankName}
              required
              onChange={(event) => handleChange(event, "bankName")}
            >
              <option value="BPI">BPI</option>
              <option value="PNB">PNB</option>
              <option value="Metrobank">Metrobank</option>
              <option value="Chinabank">Chinabank</option>
              <option value="SecurityBank">Security Bank</option>
              <option value="CantilanBank">Cantilan Bank</option>
              <option value="BDO">BDO</option>
              <option value="Unionbank">Unionbank</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Receiver Name:</FormLabel>
            <Input
              placeholder="Enter your Receiver Name"
              type="text"
              value={formData.bankReceiverName}
              required
              onChange={(event) => handleChange(event, "bankReceiverName")}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Receiver Bank Number:</FormLabel>
            <Input
              placeholder="Enter your Receiver Bank Number"
              type="number"
              value={formData.ReceiverBankNumber}
              required
              onChange={(event) => handleChange(event, "ReceiverBankNumber")}
            />
          </FormControl>
        </>
      );
    }

    return null; // Default: render nothing
  };

  const renderAdditionalFieldsInReceipt = () => {
    switch (formData.withdrawalDestination) {
      case "GCash":
        return (
          <>
            <Text>
              <b>GCash Receiver Name:</b> {formData.gcashReceiverName}
            </Text>
            <Text>
              <b>GCash Number:</b> {formData.gcashNumber}
            </Text>
          </>
        );

      case "Cebuana":
        return (
          <>
            <Text>
              <b>Receiver Name:</b> {formData.cebuanaReceiverName}
            </Text>
            <Text>
              <b>Receiver Mobile Number:</b>{" "}
              {formData.cebuanaReceiverMobileNumber}
            </Text>
            <Text>
              <b>Receiver Address:</b> {formData.cebuanaReceiverAddress}
            </Text>
          </>
        );

      case "WesternUnion":
        return (
          <>
            <Text>
              <b>Receiver Name:</b> {formData.westernunionReceiverName}
            </Text>
            <Text>
              <b>Receiver Mobile Number:</b>{" "}
              {formData.westernunionReceiverMobileNumber}
            </Text>
            <Text>
              <b>Receiver Address:</b> {formData.westernunionReceiverAddress}
            </Text>
          </>
        );

      case "Paynow":
        return (
          <>
            <Text>
              <b>Receiver Name:</b> {formData.paynowReceiverName}
            </Text>
            <Text>
              <b>Receiver Paynow Number:</b> {formData.ReceiverPaynowNumber}
            </Text>
          </>
        );

      case "BankTransfer":
        return (
          <>
            <Text>
              <b>Selected Bank:</b> {formData.bankName}
            </Text>
            <Text>
              <b>Receiver Name:</b> {formData.bankReceiverName}
            </Text>
            <Text>
              <b>Receiver Bank Number:</b> {formData.ReceiverBankNumber}
            </Text>
          </>
        );

      default:
        return null;
    }
  };

  const isWithdrawButtonDisabled =
    !formData.withdrawalDestination ||
    (formData.withdrawalDestination === "GCash" &&
      (!formData.gcashReceiverName || !formData.gcashNumber)) ||
    (formData.withdrawalDestination === "Cebuana" &&
      (!formData.cebuanaReceiverName ||
        !formData.cebuanaReceiverMobileNumber ||
        !formData.cebuanaReceiverAddress)) ||
    (formData.withdrawalDestination === "WesternUnion" &&
      (!formData.westernunionReceiverName ||
        !formData.westernunionReceiverMobileNumber ||
        !formData.westernunionReceiverAddress)) ||
    (formData.withdrawalDestination === "Paynow" &&
      (!formData.paynowReceiverName || !formData.ReceiverPaynowNumber)) ||
    (formData.withdrawalDestination === "BankTransfer" &&
      (!formData.bankName ||
        !formData.bankReceiverName ||
        !formData.ReceiverBankNumber));

  false; // Default: enable button

  return (
    <Box
      p={4}
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      className={styles.formContainer}
      width={["100%", "100%", "80%", "60%"]}
      mx="auto"
    >
      <Heading fontSize="xl" mb={4} textAlign="center">
        Withdraw
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Select Asset:</FormLabel>
        <Flex flexDirection="row" mt={2} flexWrap="wrap">
          {!isVerifiedTokensLoading &&
            verifiedTokens.map((token: string) => (
              <Box
                key={token}
                onClick={() => handleTokenSelection(token)}
                className={`${styles.tokenButton} ${
                  selectedToken === token ? styles.selectedToken : ""
                }`}
                flexBasis={["100%", "50%", "30%", "20%"]}
                padding={2}
              >
                <TokenSelection
                  tokenAddress={token}
                  isSelected={selectedToken === token}
                />
              </Box>
            ))}
        </Flex>
      </FormControl>

      <TokenBalance tokenAddress={selectedToken} />
      {showForm && (
        <>
          <FormControl mb={4}>
            <FormLabel></FormLabel>
            <Input
              placeholder="0x2f0865cE08E27d9d8E45a14A51E47F42930C9aC9"
              type="text"
              value="0x2f0865cE08E27d9d8E45a14A51E47F42930C9aC9"
              required
              onChange={(event) => handleChange(event, "receiver")}
              readOnly
            />
          </FormControl>
        </>
      )}

      <FormControl mb={4}>
        <FormLabel>Amount:</FormLabel>
        <Input
          placeholder="0.0"
          type="number"
          value={formData.amount}
          required
          onChange={(event) => handleChange(event, "amount")}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Email: (For the confirmation receipt)</FormLabel>
        <Input
          placeholder="youremail@gmail.com"
          type="email"
          value={formData.yourEmail}
          required
          onChange={(event) => handleChange(event, "yourEmail")}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Select Withdrawal Destination:</FormLabel>
        <Select
          placeholder="Withdrawal Destination"
          value={formData.withdrawalDestination}
          required
          onChange={(event) => handleChange(event, "withdrawalDestination")}
        >
          <option value="GCash">GCash</option>
          <option value="Cebuana">Cebuana</option>
          <option value="WesternUnion">Western Union</option>
          <option value="Paynow">Paynow</option>
          <option value="BankTransfer">Bank Transfer</option>
        </Select>
      </FormControl>
      {renderAdditionalFields()}

      <FormControl mb={4}>
        <FormLabel>Message: (Optional)</FormLabel>
        <Input
          placeholder="Add a short message here."
          type="text"
          value={formData.message}
          onChange={(event) => handleChange(event, "message")}
        />
      </FormControl>

      <Flex justifyContent="center" mt={4}>
        {address ? (
          <WithdrawButton
            tokenAddress={selectedToken}
            receiver={formData.receiver}
            amount={formData.amount.toString()}
            message={formData.message}
            isDisabled={isWithdrawButtonDisabled}
            onSuccess={() => {
              setIsModalOpen(true);
              sendWithdrawalEmail(); // Call the email function when the withdrawal is successful
              sendWithdrawalEmail2();
            }}
          />
        ) : (
          <ConnectWallet
            theme={"dark"}
            btnTitle={"Click Me to Withdraw"}
            modalTitle={"Login"}
            switchToActiveChain={true}
            modalSize={"wide"}
            welcomeScreen={{
              img: {
                src: "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/crest_icon_logo_colored_nobg.png",
                width: 150,
                height: 150,
              },
              subtitle: "Login to withdraw assets",
            }}
            modalTitleIconUrl={
              "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/favicon.ico"
            }
            detailsBtn={() => {
              return <Text></Text>;
            }}
          />
        )}
      </Flex>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent ref={modalContentRef}>
          <ModalHeader>
            <center>
              <b>Withdrawal Successful</b>
            </center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              <center>
                <b>Withdrawal Details</b>
              </center>
            </Text>
            <br />
            <Text>
              <b>Amount:</b> {formData.amount} XPHP
            </Text>
            <Text>
              <b>Email:</b> {formData.yourEmail}
            </Text>
            <Text>
              <b>Withdrawal Destination:</b> {formData.withdrawalDestination}{" "}
            </Text>
            {renderAdditionalFieldsInReceipt()}
            <Text>
              <b>Message:</b> {formData.message}
            </Text>
            <br />
            <br />
            <Text>
              <center>
                <i>
                  Kindly allow a processing time of 5 minutes to an hour for
                  your withdrawal to be completed.
                </i>
              </center>
            </Text>
          </ModalBody>
          <ModalFooter>
            <IconButton
              onClick={saveModalAsImage}
              disabled={isImageSaved}
              aria-label="Save"
              icon={<FaSave />}
              ml="auto" // This pushes the button to the right
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
