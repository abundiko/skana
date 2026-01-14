import { paths } from "@/constants/paths";
import { useLSAccount } from "@/hooks/localStorage/account";
import { Redirect } from "expo-router";

export default function Index() {
  const { item: account } = useLSAccount();

  if (account) return <Redirect href={paths.loginSaved} />;
  return <Redirect href={paths.loginFresh} />;
}
