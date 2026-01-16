import AppStack from "@/components/layout/AppStack";
import { ReceiveContextProvider } from "@/components/receive/ReceiveContext";

export default function _layout() {
  return (
    <ReceiveContextProvider>
      <AppStack screens={["index", "amount", "qr"]} />
    </ReceiveContextProvider>
  );
}
