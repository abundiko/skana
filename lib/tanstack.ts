import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | null = null;

export function appQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnReconnect: false,
          retry: (c) => c < 3,
          refetchOnWindowFocus: false,
          staleTime: 5 * 60 * 1000, // 5 minutes
        },
      },
    });
  }
  return queryClient;
}
