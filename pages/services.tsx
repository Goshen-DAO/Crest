// pages/services.tsx

import React from "react";
import { NextPage } from "next";
import {
  Container,
  Heading,
  Grid,
  GridItem,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  FaCode,
  FaMobileAlt,
  FaCube,
  FaProjectDiagram,
  FaLock,
  FaBullhorn,
  FaGlobe,
  FaEye,
  FaLightbulb,
} from "react-icons/fa";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const Services: NextPage = () => {
  const services: Service[] = [
    {
      title: "Web Development",
      description: "Create stunning websites and web applications.",
      icon: <FaCode />,
      link: "https://services.goshendao.com", // Add your link here
    },
    {
      title: "Mobile Development",
      description: "Build mobile applications for iOS and Android.",
      icon: <FaMobileAlt />,
      link: "https://services.goshendao.com", // Add your link here
    },
    {
      title: "Metaverse Development",
      description: "Build immersive experiences in the metaverse.",
      icon: <FaGlobe />,
      link: "https://services.goshendao.com", // Add your link here
    },
    {
      title: "Blockchain Development",
      description: "Develop decentralized applications (DApps).",
      icon: <FaCube />,
      link: "https://services.goshendao.com", // Add your link here
    },
    {
      title: "NFT Project Development",
      description: "Create and launch NFT projects.",
      icon: <FaProjectDiagram />,
      link: "https://services.goshendao.com", // Add your link here
    },
    {
      title: "Smart Contract Auditing",
      description: "Audit and secure smart contracts.",
      icon: <FaLock />,
      link: "https://services.goshendao.com", // Add your link here
    },
    {
      title: "Blockchain Security",
      description: "Enhance security in blockchain applications.",
      icon: <FaLock />,
      link: "https://services.goshendao.com", // Add your link here
    },
    {
      title: "Web3 Marketing",
      description: "Promote projects in the Web3 space.",
      icon: <FaBullhorn />,
      link: "https://services.goshendao.com", // Add your link here
    },
    {
      title: "Web3 Consultation",
      description: "Consultation on Web3 technologies.",
      icon: <FaEye />,
      link: "https://services.goshendao.com", // Add your link here
    },
  ];

  return (
    <Container maxW="800px" mt={10}>
      <Heading as="h1" mb={6}>
        Our Services
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {services.map((service, index) => (
          <GridItem key={index}>
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              height="200px"
              width="100%"
              textAlign="center"
              cursor="pointer"
              transition="background 0.3s ease-in-out"
              _hover={{
                background: "teal.500",
                color: "white",
              }}
            >
              {service.icon}
              <Heading as="h3" size="md" my={2}>
                {service.title}
              </Heading>
              <Text>{service.description}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
