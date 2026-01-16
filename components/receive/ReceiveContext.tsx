import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ReceiveContextState = {
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  isValidAmount: boolean;
};

const ReceiveContext = createContext<ReceiveContextState>(
  {} as ReceiveContextState
);

export function ReceiveContextProvider({ children }: { children: ReactNode }) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const amt = amount.trim().replace(/[^0-9]/g, "");
    if (amt === "") setAmount("0");
    if (amt.startsWith("0") && amt.length > 1) setAmount(amt.slice(1));
    if (amt.length > 10) setAmount(amt.slice(0, 10));
  }, [amount]);

  const isValidAmount = useMemo(
    () => Number(amount.trim().replace(/[^0-9]/g, "")) >= 100,
    [amount]
  );

  return (
    <ReceiveContext.Provider
      value={{
        isValidAmount,
        amount,
        setAmount,
      }}
    >
      {children}
    </ReceiveContext.Provider>
  );
}

export function useReceiveContext() {
  const ctx = useContext(ReceiveContext);
  if (!ctx)
    throw new Error("ReceiveContext must be used in a ReceiveContextProvider");
  return ctx;
}
