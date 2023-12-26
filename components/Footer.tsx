import { Container, Divider, Image, Flex, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Container maxW={"100%"} mt={20}>
      <Divider />

      <Container maxW={"1440px"} py={8}>
        <Flex
          flexDirection={{ base: "column", md: "row" }} // Stack columns on small screens, align rows on medium screens and above
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href={"/"}>
            <Image
              src="/crest_horizontal_logo_black_nobg.png" // Replace with the actual logo image path
              alt="Crest Logo"
              boxSize="auto"
              maxW="120px" // Adjust the maximum width of the logo
            />
          </Link>
          Crafted by:
          <Link href={"https://goshendao.com"}>
            <Image
              src="/Goshen Horizontal With Color.png" // Replace with the actual logo image path
              alt="Goshen"
              boxSize="auto"
              maxW="120px" // Adjust the maximum width of the logo
            />
          </Link>
          <Flex>
          <p>&copy; 2022-2023 Goshen DAO. All rights reserved.</p>
          </Flex>
          <Flex mt={{ base: 4, md: 0 }} flexDirection="row">
            <Link href="/about" mr={4}>
              About Us
            </Link>
            <Link href="/services" mr={4}>
              Services
            </Link>
            <Link href="/contact" mr={4}>
              Contact
            </Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Flex>
        </Flex>
      </Container>
    </Container>
  );
}
