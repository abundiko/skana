import AppBar from "@/components/layout/AppBar";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import QrScanner from "@/components/send/QrScanner";
import { TStatusBar } from "@/components/themed";
import { View } from "react-native";

export default function ScanQrScreen() {
  return (
    <>
      <View className="flex-1 relative">
        <QrScanner />
        <View className="absolute top-0 left-0 w-full">
          <InsetSpacing.Top />
          <AppBar accentColor="white" centerTitle title="Scan & Pay" />
          <TStatusBar always="light" />
        </View>
      </View>
    </>
  );
}
