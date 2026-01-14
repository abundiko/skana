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

export async function $getTransactionById(
  id: string
): Promise<TransactionModelPopulated | null> {
  await sleep(3);
  const found = dummyTransactions.find((t) => t._id === id);
  if (!found) return null;

  const foundFrom = dummyUsers.find((u) => u._id === found.from);
  const foundTo = dummyUsers.find((u) => u._id === found.to);

  if (!foundFrom || !foundTo) return null;

  return {
    ...found,
    to: foundTo,
    from: foundFrom,
  };
}
