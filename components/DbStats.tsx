import { useQuery } from "@apollo/client";
import { CheckCircleIcon, CheckIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Circle,
  Heading,
  HStack,
  Progress,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { postgresclient } from "../client/apollo";
import { postgrestStats } from "../client/queries";
import useHealth from "../hooks/useHealth";
import App from "./App";
const DbStats: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const { servers } = useHealth();
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchstats,
  } = useQuery(postgrestStats, { client: postgresclient });
  //handle stats error

  if (statsError) {
    // eslint-disable-next-line no-console
    console.log(statsError);
  }

  return (
    <Box marginTop="20px" marginBottom={"30px"} mx="auto" maxW={["sm", "lg"]}>
      <Box justifyContent={"center"} display="flex">
        <Heading marginBottom={2} color="teal.500">
          Stats
          {toggle && (
            <Progress
              rounded={10}
              size="xs"
              isIndeterminate
              colorScheme={"teal"}
            />
          )}
        </Heading>
      </Box>
      <Box justifyContent={"center"} display="flex">
        <HStack>
          <HStack alignItems={"center"}>
            <Text fontSize={"xs"} color={"gray.400"}>
              SqlServer
            </Text>
            <Circle
              size="10px"
              bg={servers?.sqlserver ? "green.400" : "red.500"}
            ></Circle>
          </HStack>
          <HStack alignItems={"center"}>
            <Text fontSize={"xs"} color={"gray.400"}>
              postgres
            </Text>
            <Circle
              size="10px"
              bg={servers?.postgres ? "green.400" : "red.500"}
            ></Circle>
          </HStack>
        </HStack>
      </Box>
      <Table variant={"unstyled"} marginTop={2} size="sm">
        <Thead borderBottom={"1px solid"} borderColor={"rgba(255,255,255,.2)"}>
          <Tr>
            <Th>#</Th>
            <Th>Table</Th>
            <Th>Count</Th>
            <Th>
              <RepeatClockIcon fontSize={"20px"} />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {stats?.GetNumberOfRecords.map(
            (table: { tablename: string; count: number }, i: number) => {
              return (
                <Tr
                  key={i}
                  sx={{
                    transition: "all .3s",
                    "&:hover": {
                      bg: "rgba(255,255,255,.1)",
                    },
                  }}
                  onClick={() => {}}
                  cursor={"pointer"}
                >
                  <Td>{i + 1}</Td>
                  <Td>{table.tablename}</Td>
                  <Td textAlign={"center"}>{table.count}</Td>
                  {/* {<Td>{<CheckCircleIcon color={"green.300"} />}</Td>} */}
                </Tr>
              );
            }
          )}
        </Tbody>
      </Table>
      {statsLoading && (
        <Stack>
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
        </Stack>
      )}
      {statsError && (
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      )}
      <App refetchstats={refetchstats} toggle={setToggle} />
    </Box>
  );
};
export default DbStats;
