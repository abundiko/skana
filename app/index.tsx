import { paths } from "@/constants/paths";
import { useLSSettings } from "@/hooks/localStorage/settings";
import { Redirect } from "expo-router";

export default function Index() {
  const {
    item: { onboarded },
  } = useLSSettings();

  if (!onboarded) return <Redirect href={paths.onboard1} />;

  if(true) return <Redirect href={paths.register} />
  
}
