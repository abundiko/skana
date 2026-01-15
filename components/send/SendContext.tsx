import { useAccountQuerySingle } from "@/hooks/query/useAccountsQuery";
import { router, useGlobalSearchParams } from "expo-router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type SendContextState = {
  accountQuery: ReturnType<typeof useAccountQuerySingle>;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
};

const SendContext = createContext<SendContextState>({} as SendContextState);

export function SendContextProvider({ children }: { children: ReactNode }) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const amt = amount.trim().replace(/[^0-9]/g, "");
    if (amt === "") setAmount("0");
    if (amt.startsWith("0") && amt.length > 1) setAmount(amt.slice(1));
    if (amt.length > 10) setAmount(amt.slice(0, 10));
  }, [amount]);

  const { userId } = useGlobalSearchParams() as { userId: string };

  const accountQuery = useAccountQuerySingle(userId);

  if (!userId) {
    requestAnimationFrame(() => router.back());
    return null;
  }

  return (
    <SendContext.Provider
      value={{
        accountQuery,
        amount,
        setAmount,
      }}
    >
      {children}
    </SendContext.Provider>
  );
}

export function useSendContext() {
  const ctx = useContext(SendContext);
  if (!ctx)
    throw new Error("SendContext must be used in a SendContextProvider");
  return ctx;
}
