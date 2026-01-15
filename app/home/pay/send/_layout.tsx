import AppStack from "@/components/layout/AppStack";
import { SendContextProvider } from "@/components/send/SendContext";

export default function _layout() {
  return (
    <SendContextProvider>
      <AppStack screens={["amount", "confirm", "success"]} />
    </SendContextProvider>
  );
}
