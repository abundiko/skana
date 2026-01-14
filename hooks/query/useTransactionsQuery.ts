import { $getTransactions } from "@/actions/transactions";
import { tags } from "@/constants/tags";
import { TransactionFunctions } from "@/functions/transaction";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useTransactionQuery() {
  const q = useQuery({
    queryKey: [tags.query.transactions],
    queryFn: $getTransactions,
  });

  const groupedTransactions = useMemo(
    () => TransactionFunctions.groupByDate(q.data || []),
    [q.data]
  );

  return {
    ...q,
    groupedTransactions,
  };
}
