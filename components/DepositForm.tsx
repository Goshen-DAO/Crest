// WithdrawNow.tsx
import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  FormControl,
  FormLabel,
  Button,
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
} from "@thirdweb-dev/react";
import { ChangeEvent, useState } from "react";
import styles from "../styles/CashInOutForm.module.css";
import { IconButton } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE_PROVIDER, // replace with your email provider (e.g., 'gmail')
  port:process.env.PORT,
  auth: {
    user: process.env.USER_EMAIL, // replace with your email
    pass: process.env.USER_PASS, // replace with your email password
  },
});

export default function DepositFormPage() {
  const [modalContent, setModalContent] = useState<null | JSX.Element>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const address = useAddress();
  const [formData, setFormData] = useState({
    amount: "",
    depositCurrency: "",
    yourEmail: "",
    depositDestination: "",
    gcashNumber: "",
    paynowNumber: "",
    bankName: "",
    senderName: "",
    senderBankNumber: "",
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

  const handleEmailButtonClick = () => {
    // Add logic to set the modal content based on the selected option
    setModalContent(getModalContent());
    // Open the modal
    setIsModalOpen(true);

    // have enough time to complete before sending the email
    setTimeout(() => {
      // Send email
      sendDepositInformationEmail();
      sendDepositInformationEmail2();
    }, 500);
  };

  const getModalContent = () => {
    switch (formData.depositDestination) {
      case "GCash":
        return (
          <>
            <center>
              <ModalHeader>GCash</ModalHeader>
            </center>
            <ModalBody>
              <Text>
                <b>GCash Holder Name:</b> AL**N BR***O C.
              </Text>{" "}
              <br></br>
              <Text>
                <b>GCash Holder Number:</b> 09760874368
              </Text>{" "}
              <br></br> <br></br> <br></br>
              <Text>
                <center>
                  <i>
                    Please transfer the exact amount you specified in the form
                    to this account for the processing of your deposit.
                  </i>
                </center>
              </Text>
            </ModalBody>
            <ModalFooter>
              <IconButton
                onClick={() => handleSaveButtonClick()}
                aria-label="Acknowledge"
                icon={<FaCheck />}
                ml="auto" // This pushes the button to the right
              />
            </ModalFooter>
          </>
        );
      case "Paynow":
        return (
          <>
            <center>
              <ModalHeader>Paynow</ModalHeader>
            </center>
            <ModalBody>
              <Text>
                <b>Paynow Number:</b> 96443927
              </Text>{" "}
              <br></br> <br></br> <br></br>
              <Text>
                <center>
                  <i>
                    Please transfer the exact amount you specified in the form
                    to this account for the processing of your deposit.
                  </i>
                </center>
              </Text>
            </ModalBody>
            <ModalFooter>
              <IconButton
                onClick={() => handleSaveButtonClick()}
                aria-label="Acknowledge"
                icon={<FaCheck />}
                ml="auto" // This pushes the button to the right
              />
            </ModalFooter>
          </>
        );
      case "BankTransfer":
        return (
          <>
            <center>
              <ModalHeader>Bank Transfer</ModalHeader>
            </center>
            <ModalBody>
              <Text>
                <b>Bank:</b> Security Bank
              </Text>{" "}
              <br></br>
              <Text>
                <b>Bank Holders Name:</b> ALLAN BRANDO B. CATAYOC
              </Text>{" "}
              <br></br>
              <Text>
                <b>Bank Holders Number:</b> 0000058650503
              </Text>{" "}
              <br></br> <br></br> <br></br>
              <Text>
                <center>
                  <i>
                    Please transfer the exact amount you specified in the form
                    to this account for the processing of your deposit.
                  </i>
                </center>
              </Text>
            </ModalBody>
            <ModalFooter>
              <IconButton
                onClick={() => handleSaveButtonClick()}
                aria-label="Acknowledge"
                icon={<FaCheck />}
                ml="auto" // This pushes the button to the right
              />
            </ModalFooter>
          </>
        );
      default:
        return (
          <>
            <ModalHeader>Deposit</ModalHeader>
            <ModalBody>
              <Text>Deposit Content Here</Text>
            </ModalBody>
            <ModalFooter>
              <IconButton
                onClick={() => handleSaveButtonClick()}
                aria-label="Acknowledge"
                icon={<FaCheck />}
                ml="auto" // This pushes the button to the right
              />
            </ModalFooter>
          </>
        );
    }
  };

  const closeModal = () => {
    // Close the modal
    setIsModalOpen(false);
    // Clear the modal content
    setModalContent(null);
  };

  const handleModalClose = () => {
    // Display toast message if the image is not saved
    toast({
      title: "Kindly close this window by clicking the check button.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSaveButtonClick = () => {
    closeModal(); // Close the modal
  };

  const sendDepositInformationEmail = async () => {
    try {
      if (!formData.depositDestination) {
        console.error("Please select a deposit destination before submitting");
        return;
      }

      let recipientEmail;
      let depositDetails;

      switch (formData.depositDestination) {
        case "GCash":
          recipientEmail = `${formData.yourEmail}`;
          depositDetails = `
            <b>Email:</b> ${formData.yourEmail}
            <b>Deposit Source:</b> ${formData.depositDestination}
            <b>UID:</b> ${address}
            <b>Amount:</b> ${formData.amount}
          `;
          break;

        case "Paynow":
          recipientEmail = `${formData.yourEmail}`;
          depositDetails = `
            <b>Email:</b> ${formData.yourEmail}
            <b>Deposit Source:</b> ${formData.depositDestination}
            <b>UID:</b> ${address}
            <b>Amount:</b> ${formData.amount}
          `;
          break;

        case "BankTransfer":
          recipientEmail = `${formData.yourEmail}`;
          depositDetails = `
            <b>Email:</b> ${formData.yourEmail}
            <b>Deposit Source:</b> ${formData.depositDestination}
            <b>UID:</b> ${address}
            <b>Amount:</b> ${formData.amount} 
          `;
          break;

        default:
          // Default case for unknown destinations
          recipientEmail = `${formData.yourEmail}`;
          depositDetails = `
            <b>Email:</b> ${formData.yourEmail}
            <b>Deposit Destination:</b> ${formData.depositDestination}
            <b>UID:</b> ${address}
            <b>Amount:</b> ${formData.amount}
            <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;
      }

      await transporter.sendMail({
          from: "pwnjabi.gg@gmail.com",
          to: "pwnjabi.gg@gmail.com",
          subject: 'New Deposit From a User',
          html: `Deposit Details:<br/>${depositDetails}`,
        })
        .promise();

      // Optionally, show a success toast or perform other actions upon successful email sending
      toast({
        title: "Deposit details shown",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error sending email:", error);

      // Show an error toast or handle the error in another way
      toast({
        title: "Error sending deposit details",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const sendDepositInformationEmail2 = async () => {
    try {
      if (!formData.depositDestination) {
        console.error("Please select a deposit destination before submitting");
        return;
      }

      let recipientEmail;
      let depositDetails;

      switch (formData.depositDestination) {
        case "GCash":
          recipientEmail = "equan@alum.up.edu.ph";
          depositDetails = `
            <b>Email:</b> ${formData.yourEmail}
            <b>Deposit Source:</b> ${formData.depositDestination}
            <b>UID:</b> ${address}
            <b>Amount:</b> ${formData.amount}
          `;
          break;

        case "Paynow":
          recipientEmail = "equan@alum.up.edu.ph";
          depositDetails = `
            <b>Email:</b> ${formData.yourEmail}
            <b>Deposit Source:</b> ${formData.depositDestination}
            <b>UID:</b> ${address}
            <b>Amount:</b> ${formData.amount}
          `;
          break;

        case "BankTransfer":
          recipientEmail = "equan@alum.up.edu.ph";
          depositDetails = `
            <b>Email:</b> ${formData.yourEmail}
            <b>Deposit Source:</b> ${formData.depositDestination}
            <b>UID:</b> ${address}
            <b>Amount:</b> ${formData.amount} 
          `;
          break;

        default:
          // Default case for unknown destinations
          recipientEmail = "equan@alum.up.edu.ph";
          depositDetails = `
            <b>Email:</b> ${formData.yourEmail}
            <b>Deposit Destination:</b> ${formData.depositDestination}
            <b>UID:</b> ${address}
            <b>Amount:</b> ${formData.amount}
            <b>Message:</b> ${formData.message || "N/A"}
          `;
          break;
      }

      await transporter.sendMail({
        from: "pwnjabi.gg@gmail.com",
        to: "equan@alum.up.edu.ph",
        subject: 'New Deposit From a User',
        html: `Deposit Details:<br/>${depositDetails}`,
      })
      .promise();

      // Optionally, show a success toast or perform other actions upon successful email sending
      toast({
        title: "Deposit details shown",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error sending email:", error);

      // Show an error toast or handle the error in another way
      toast({
        title: "Error sending deposit details",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const isDepositButtonDisabled =
    !formData.amount ||
    !formData.depositCurrency ||
    !formData.yourEmail ||
    !formData.depositDestination;

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
        Deposit
      </Heading>
      <FormControl mb={4}>
        <FormLabel>Amount:</FormLabel>
        <Input
          placeholder="0.0"
          type="number"
          value={formData.amount}
          required
          onChange={(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event, "amount")}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Select Deposit Currency:</FormLabel>
        <Select
          placeholder="Deposit Currency"
          value={formData.depositCurrency}
          required
          onChange={(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event, "depositCurrency")}
        >
          <option value="SGD">SGD</option>
          <option value="PHP">PHP</option>
        </Select>
      </FormControl>

      {formData.depositCurrency === "PHP" && (
        <FormControl mb={4}>
          <FormLabel>Select Deposit Destination:</FormLabel>
          <Select
            placeholder="Deposit Destination"
            value={formData.depositDestination}
            required
            onChange={(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event, "depositDestination")}
          >
            <option value="GCash">GCash</option>
            <option value="BankTransfer">Bank Transfer</option>
          </Select>
        </FormControl>
      )}

      {formData.depositCurrency === "SGD" && (
        <FormControl mb={4}>
          <FormLabel>Select Deposit Destination:</FormLabel>
          <Select
            placeholder="Deposit Destination"
            value={formData.depositDestination}
            required
            onChange={(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event, "depositDestination")}
          >
            <option value="Paynow">Paynow</option>
            <option value="BankTransfer">Bank Transfer</option>
          </Select>
        </FormControl>
      )}

      <FormControl mb={4}>
        <FormLabel>Email:</FormLabel>
        <Input
          placeholder="youremail@gmail.com"
          type="email"
          value={formData.yourEmail}
          required
          onChange={(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event, "yourEmail")}
        />
      </FormControl>
      <Flex justifyContent="center" mt={4}>
        <Button
          onClick={handleEmailButtonClick}
          isDisabled={isDepositButtonDisabled}
        >
          Deposit
        </Button>
      </Flex>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalContent}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
