import { User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
const useHealth = (): {
  servers: { postgres: boolean; sqlserver: boolean } | undefined;
  isLoading: boolean;
  isError: any;
} => {
  const { data, error } = useSWR<
    { postgres: boolean; sqlserver: boolean },
    any
  >("/up", fetcher);
  return {
    servers: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export default useHealth;
