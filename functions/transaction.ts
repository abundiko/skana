import { TransactionModelPopulated } from "@/types/transaction";
import { format, isToday, isYesterday, parseISO } from "date-fns";

function groupByDate<T extends { createdAt: string }>(
  transactions: T[]
): { date: string; data: T[] }[] {
  const groupedTransactions: Record<string, T[]> = {};

  transactions.forEach((transaction) => {
    const createdAt = parseISO(transaction.createdAt);
    const formattedDate = isToday(createdAt)
      ? "Today"
      : isYesterday(createdAt)
        ? "Yesterday"
        : format(createdAt, "dd, MMM yyyy");

    if (!groupedTransactions[formattedDate]) {
      groupedTransactions[formattedDate] = [];
    }

    groupedTransactions[formattedDate].push(transaction);
  });

  return Object.entries(groupedTransactions).map(([date, data]) => ({
    date,
    data,
  }));
}

function getLabel(t: TransactionModelPopulated): string {
  const toOrFrom = t.type === "funds-receive" ? "from" : "to";
  const end =
    t.method === "qr"
      ? `QR ${toOrFrom} @${t.to.username}`
      : `@${t.to.username}`;
  return `${_prefixes[t.type]} ${end} `;
}

export const TransactionFunctions = {
  groupByDate,
  getLabel,
};

const _prefixes: Record<TransactionModelPopulated["type"], string> = {
  "funds-receive": "Received via",
  "funds-sent": "Sent via",
  "funds-reversed": "Paid via",
};
