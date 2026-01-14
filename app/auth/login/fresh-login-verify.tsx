import { $login } from "@/actions/auth/login";
import AuthScaffold from "@/components/auth/AuthScaffold";
import { TText } from "@/components/themed";
import FormButton from "@/components/ui/FormButton";
import { PinInput } from "@/components/ui/PinInput";
import { cls } from "@/constants";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { cn } from "@/lib/cn";
import React from "react";
import { View } from "react-native";

export default function LoginFreshVerifyScreen() {
  const { formButtonProps, values, setValues } = useFormSubmit({
    onSubmit: $login,
  });
  const canSubmit = Boolean(values.code && values.code.length === 6);

  return (
    <AuthScaffold
      title="Verify login code"
      description="Enter the 6-digit code sent to +234 *** *** 4321"
    >
      <View className="gap-10">
        <PinInput
          name="code"
          value={values.code}
          onChangeText={(v) => setValues((old) => ({ ...old, code: v }))}
        />
        <View className="gap-6">
          <TText variant="shade200" className=" text-base text-center">
            code expires in{" "}
            <TText variant="primary" className="font-semibold">
              00:59
            </TText>
          </TText>
          <TText variant="shade200" className=" text-base text-center">
            {"Didn’t receive the code? "}
            <TText
              onPress={() => {}}
              variant="primary"
              className="font-semibold"
            >
              Resend Code
            </TText>
          </TText>
          <FormButton
            {...formButtonProps}
            disabled={!canSubmit}
            className={cn(cls.btn.primary, "w-full")}
            childrenClassName={cn(cls.btn.primaryText)}
          >
            Verify
          </FormButton>
        </View>
      </View>
    </AuthScaffold>
  );
}
