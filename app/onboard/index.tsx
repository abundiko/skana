import OnboardScreen from "@/components/onboard/OnboardScreen";
import { paths } from "@/constants/paths";
import { router } from "expo-router";

export default function Index() {
  return (
    <OnboardScreen
      path={paths.onboard1}
      step={1}
      title="Scan & Pay Instantly"
      description=" Scan any merchant's QR code to make instant, hassle-free payments without the need for cash or cards."
      primaryActionLabel="Next"
      primaryAction={() => router.navigate(paths.onboard2)}
      image={require("@/assets/images/design/onboard-1.png")}
      secondaryActionLabel="Skip"
    />
  );
}
