import { useSplashStore } from "@/hooks/stores/splashStore";
import { Modal } from "react-native";
import { TText, TView } from "../themed";
import { AppLogo } from "../ui/AppLogo";

export default function SplashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const appIsReady = useSplashStore((s) => s.isAppReady);
  console.log({ appIsReady });

  return (
    <>
      {children}
      {!appIsReady && <Splash />}
    </>
  );
}

function Splash() {
  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      statusBarTranslucent
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <Splash />
      <TView variant="pure" className="flex-1 justify-center items-center">
        <TText variant="pure">We&apos;re Back!</TText>
        <AppLogo size={100} />
      </TView>
    </Modal>
  );
}
