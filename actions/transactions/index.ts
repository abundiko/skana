import { sleep } from "@/functions/helpers";
import {
  dummyTransactions,
  TransactionModelPopulated,
} from "@/types/transaction";
import { dummyUsers } from "@/types/user";

export async function $getTransactions(): Promise<TransactionModelPopulated[]> {
  await sleep(3);

  const transactions: (TransactionModelPopulated | null)[] =
    dummyTransactions.map((t) => {
      const foundFrom = dummyUsers.find((u) => u._id === t.from);
      const foundTo = dummyUsers.find((u) => u._id === t.to);

      if (!foundFrom || !foundTo) return null;

      return {
        ...t,
        from: foundFrom,
        to: foundTo,
      };
    });

  return transactions.filter((i) => i !== null);
}
