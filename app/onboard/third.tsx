import OnboardScreen from "@/components/onboard/OnboardScreen";
import { paths } from "@/constants/paths";
import { useLSSettings } from "@/hooks/localStorage/settings";
import { router } from "expo-router";

export default function Onboard3() {
  const { updateItem } = useLSSettings();

  function primaryAction() {
    requestAnimationFrame(() => {
      updateItem({
        onboarded: true,
      });
      router.navigate(paths.home);
    });
  }

  return (
    <OnboardScreen
      path={paths.onboard3}
      step={3}
      title="Pay Safe & Secure"
      description="Your money is protected at every step with bank-level security and real-time transaction notifications."
      primaryActionLabel="Get Started"
      primaryAction={primaryAction}
      image={require("@/assets/images/design/onboard-3.png")}
      secondaryActionLabel="Already Have An Account? Login"
    />
  );
}
