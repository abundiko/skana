import AuthScaffold from "@/components/auth/AuthScaffold";
import { TText } from "@/components/themed";
import FormButton from "@/components/ui/FormButton";
import PhoneInput from "@/components/ui/PhoneInput";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { sleep } from "@/functions/helpers";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { cn } from "@/lib/cn";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function RegisterPhoneScreen() {
  const { formButtonProps } = useFormSubmit({
    onSubmit: async () => {
      await sleep(3);
      return { success: "verify phone" };
    },
    onSuccess() {
      router.navigate(paths.forgotPasswordVerify);
    },
  });

  return (
    <AuthScaffold
      title="Forgot Password"
      description="Enter the phone number linked to your account.
We’ll send you a code to reset your password. "
    >
      <View className="gap-10">
        <PhoneInput />
        <View>
          <FormButton
            {...formButtonProps}
            className={cn(cls.btn.primary, "w-full")}
            childrenClassName={cn(cls.btn.primaryText)}
          >
            Send Code
          </FormButton>
          <TText
            variant="shade400"
            className=" italic text-xs mt-4  text-center"
          >
            By tapping send code, we will send a verification code via SMS to your
            phone number. Standard rates may apply.
          </TText>
        </View>
      </View>
    </AuthScaffold>
  );
}
