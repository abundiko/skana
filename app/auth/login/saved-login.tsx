import { $login } from "@/actions/auth/login";
import { AppIcons } from "@/components/icons/AppIcons";
import AppScaffold from "@/components/layout/AppScaffold";
import { AppToast } from "@/components/layout/AppToast";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import { TText } from "@/components/themed";
import AppButton from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import FormButton from "@/components/ui/FormButton";
import UserAvatar from "@/components/ui/UserAvatar";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { useLSAccount } from "@/hooks/localStorage/account";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { BiometricManager } from "@/lib/biometric";
import { cn } from "@/lib/cn";
import { router } from "expo-router";
import { View } from "react-native";

export default function SavedLogin() {
  const { item: account, setItem } = useLSAccount();

  const { formButtonProps } = useFormSubmit({
    onSubmit: $login,
  });

  function switchAccount() {
    setItem(null);
    router.replace(paths.loginFresh);
  }

  const { attemptVerify } = BiometricManager.useBioAuth({
    onVerify() {
      AppToast.success("Biometric Authentication Success");
      router.dismissAll();
      router.dismissTo(paths.home);
    },
  });

  if (!account) return null;

  return (
    <AppScaffold>
      <View className="px-5 gap-4">
        <View className="py-10 justify-center items-center gap-2">
          <UserAvatar
            src={account.imageUrl}
            name={account.fullname}
            size={140}
          />
          <TText variant="base" className=" font-semibold text-xl mt-4">
            Welcome Back, {account.fullname}
          </TText>
          <TText variant="shade200" className=" text-base text-center">
            Not You?{" "}
            <TText
              onPress={switchAccount}
              variant="primary"
              className="font-semibold"
            >
              Switch Account
            </TText>
          </TText>
        </View>
        <View className="gap-4">
          <AppInput
            // label="Enter PIN"
            placeholder="Enter your 6-digit PIN"
            keyboardType="number-pad"
            type="password"
            prefix={
              <AppIcons.lock_outline
                className={cn(cls.text.shade100, "h-4 w-4 absolute left-3")}
              />
            }
            inputClass="pl-10"
          />
          <FormButton
            {...formButtonProps}
            className={cn(cls.btn.primary, "w-full")}
            childrenClassName={cn(cls.btn.primaryText)}
          >
            Continue
          </FormButton>
          <TText variant="shade200" className=" text-base text-center">
            Forgot PIN?{" "}
            <TText
              onPress={() => router.push(paths.forgotPassword)}
              variant="primary"
              className="font-semibold"
            >
              Click to Reset
            </TText>
          </TText>
        </View>
        <TText
          variant="shade400"
          className="text-base text-center opacity-50 my-3"
        >
          Or
        </TText>
        <AppButton
          onPress={attemptVerify}
          className=" mx-auto justify-center items-center gap-2"
        >
          <AppIcons.fingerprint
            className={cn("h-16 w-16", cls.text.shade100)}
          />

          <TText
            onPress={switchAccount}
            variant="primary"
            className="font-semibold text-center text-base"
          >
            Press to Login
          </TText>
        </AppButton>
      </View>
      <InsetSpacing.Bottom />
    </AppScaffold>
  );
}
