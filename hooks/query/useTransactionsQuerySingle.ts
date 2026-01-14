import { $getTransactionById } from "@/actions/transactions";
import { tags } from "@/constants/tags";
import { useQuery } from "@tanstack/react-query";

export function useTransactionQuerySingle(id: string) {
  const q = useQuery({
    queryKey: [tags.query.transactions, { singleId: id }],
    queryFn: () => $getTransactionById(id),
  });

  return {
    ...q,
  };
}
