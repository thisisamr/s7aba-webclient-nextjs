import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import App from "../components/App";
import DbStats from "../components/DbStats";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <Box height={"100vh"}>
      <Nav />
      <DbStats />
    </Box>
  );
};

export default Home;
