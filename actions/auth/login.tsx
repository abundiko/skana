import { AppToast } from "@/components/layout/AppToast";
import { paths } from "@/constants/paths";
import { sleep } from "@/functions/helpers";
import { LSAccount } from "@/hooks/localStorage/account";
import { _JSON, SubmitResponse } from "@/hooks/useFormSubmit";
import { dummyUsers } from "@/types/user";
import { router } from "expo-router";

export async function $login(data: _JSON): Promise<SubmitResponse> {
  await sleep(3);
  LSAccount.set(dummyUsers[0]);
  AppToast.success("login success");
  requestAnimationFrame(() => {
    router.dismissAll();
    router.dismissTo(paths.login);
  });
  return { success: "login success" };
}
