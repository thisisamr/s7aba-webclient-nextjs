import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  Heading,
  SkeletonCircle,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useMe from "../hooks/useMe";
import router from "next/router";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isError, isLoading } = useMe();
  const [asd, setAsd] = useState(false);
  //need to handel errors ??
  return (
    <Box bg={useColorModeValue("gray.200", "gray.900")}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Text
          marginLeft={5}
          bgGradient="linear(to-l, #4EDAEC, #5509B1)"
          bgClip="text"
        >
          Sync 1.0 beta
        </Text>
        <Flex alignItems={"center"} justifyContent="center" marginRight={5}>
          <Stack direction={"row"} spacing={7} alignItems="center">
            <Button onClick={toggleColorMode} _focus={{ outline: 0 }}>
              {colorMode === "light" ? (
                <MoonIcon height={3} width={3} />
              ) : (
                <SunIcon height={3} width={3} />
              )}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                {isLoading ? (
                  <SkeletonCircle size="10" />
                ) : (
                  <Avatar
                    size={"md"}
                    src={user?.avatar}
                    name={user?.firstname + " " + user?.lastname}
                  />
                )}
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar size={"2xl"} src={user?.avatar} />
                </Center>
                <br />
                <Center>
                  <p>
                    {user?.firstname.toUpperCase() +
                      " " +
                      user?.lastname.toUpperCase()}
                  </p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem
                  onClick={async () => {
                    try {
                      await fetch("/api/logout", {
                        method: "POST",
                      });
                      router.push("/login");
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
