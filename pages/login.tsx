import {
  Box,
  useColorModeValue,
  useColorMode,
  Button,
  Flex,
  Heading,
  Input,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { auth } from "../lib/mutations";
import { authMode, authReq } from "../lib/types";
import router from "next/router";
const Login: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userinput: authReq = {
      email,
      password,
    };
    const response = await auth(authMode.SIGNIN, userinput);
    if (response.message) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        description: "response.message",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log("response.message");
    } else {
      setLoading(false);
      router.push("/");
    }
  };
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  return (
    <Flex height={"100vh"} justifyContent="center" alignItems={"center"}>
      <Flex
        as={"form"}
        flexDirection={"column"}
        padding="12"
        rounded={6}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <Heading mb={6}>Login</Heading>
        <FormControl isRequired>
          <FormLabel
            fontSize={"xs"}
            color={"gray.700"}
            cursor={"pointer"}
            htmlFor="email"
            _hover={{ color: "gray.300" }}
          >
            Email
          </FormLabel>
          <Input
            id="email"
            type="email"
            isRequired={true}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Asolyma@hotmail.com"
            variant={"filled"}
            mb={3}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel
            fontSize={"xs"}
            color={"gray.700"}
            cursor={"pointer"}
            _hover={{ color: "gray.300" }}
            htmlFor="password"
          >
            Password
          </FormLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**************"
            mb={6}
            type={"password"}
            variant="filled"
            isRequired
          />
        </FormControl>
        <Button
          type="submit"
          isLoading={loading}
          colorScheme={"teal"}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          GO
        </Button>
      </Flex>
    </Flex>
  );
};
export default Login;
