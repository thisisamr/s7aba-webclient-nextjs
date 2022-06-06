import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <Box height={"100vh"}>
      <Nav />
      {/** nav */}
      {/**database statistics */}
      {/** control panael */}
    </Box>
  );
};

export default Home;
