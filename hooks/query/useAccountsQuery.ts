import { $getAccountById, $getAccounts } from "@/actions/accounts";
import { tags } from "@/constants/tags";
import { useQuery } from "@tanstack/react-query";


export function useAccountQuerySingle(id: string) {
  const q = useQuery({
    queryKey: [tags.query.accounts, { singleId: id }],
    queryFn: () => $getAccountById(id),
  });

  return {
    ...q,
  };
}

export function useAccountsQuery() {
  const q = useQuery({
    queryKey: [tags.query.accounts],
    queryFn: $getAccounts,
  });

  return {
    ...q,
  };
}
