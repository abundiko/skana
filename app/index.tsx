import { paths } from "@/constants/paths";
import { useLSSettings } from "@/hooks/localStorage/settings";
import { Redirect } from "expo-router";

export default function Index() {
  const {
    item: { onboarded },
  } = useLSSettings();
  const { item: account } = useLSSettings();

  if (!onboarded) return <Redirect href={paths.onboard1} />;

  if (!account) return <Redirect href={paths.login} />;

  return <Redirect href={paths.home} />;
}
