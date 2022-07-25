import {
  ApolloQueryResult,
  OperationVariables,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import {
  Alert,
  AlertDialogContent,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { postgresclient } from "../client/apollo";
import { unsafe } from "../client/mutations";
import { postgrestStats } from "../client/queries";
const App: React.FC<{
  refetchstats: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
  toggle: Dispatch<SetStateAction<boolean>>;
}> = ({ refetchstats, toggle }) => {
  const toast = useToast();
  const [spninner, setSpinner] = useState(false);
  const [initialize, { data, loading, error }] = useMutation(unsafe, {
    refetchQueries: [postgrestStats],
    client: postgresclient,
  });
  async function getem(tablename: string) {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    await fetch("/api/sync", {
      method: "POST",
      body: JSON.stringify({
        table: tablename,
      }),
      headers: headersList,
    });
    await refetchstats();
  }
  const handleSync = async () => {
    //table addresses
    try {
      toggle(true);
      setSpinner(true);
      await getem("addresses");
      await getem("aspnetusers");
      await getem("userprofiles");
      await getem("requests");
      await getem("shippingorders");
      await getem("paymenttrasnsactions");
      await getem("useraddresses");
      toggle(false);
      setSpinner(false);
      toast({
        colorScheme: "teal",
        duration: 5000,
        status: "success",
        isClosable: true,
        title: "Sync completed Successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        colorScheme: "pink",
        duration: 5000,
        status: "error",
        isClosable: true,
        title: "check the console for errors",
      });
    }
  };

  return (
    <Box>
      <HStack spacing={2} justifyContent="center">
        <Button
          isLoading={loading}
          onClick={() => {
            initialize({
              onCompleted: async () => {
                toast({
                  colorScheme: "green",
                  duration: 5000,
                  status: "success",
                  isClosable: true,
                  title: "tables initialized successfully",
                });
              },
            });
          }}
        >
          init
        </Button>
        <Button
          isLoading={spninner}
          variant={"solid"}
          onClick={async () => {
            await handleSync();
          }}
        >
          Sync⚡
        </Button>
      </HStack>
    </Box>
  );
};

export default App;
