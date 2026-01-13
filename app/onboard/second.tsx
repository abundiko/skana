import OnboardScreen from "@/components/onboard/OnboardScreen";
import { paths } from "@/constants/paths";
import { router } from "expo-router";

export default function Onboard2() {
  return (
    <OnboardScreen
      path={paths.onboard2}
      step={2}
      title="Pay With @User or Store Name"
      description="Send money as easily as a message by finding any person or store by their unique username."
      primaryActionLabel="Next"
      primaryAction={() => router.navigate(paths.onboard3)}
      image={require("@/assets/images/design/onboard-2.png")}
      secondaryActionLabel="Skip"
    />
  );
}
