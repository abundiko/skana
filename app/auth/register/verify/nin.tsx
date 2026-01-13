import AuthScaffold from "@/components/auth/AuthScaffold";
import { AppMessage } from "@/components/layout/AppMessage";
import { TText } from "@/components/themed";
import AppButton from "@/components/ui/AppButton";
import { AppInput, AppInputPropsWithName } from "@/components/ui/AppInput";
import FormButton from "@/components/ui/FormButton";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { sleep } from "@/functions/helpers";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { cn } from "@/lib/cn";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function RegisterVerifyNINScreen() {
  const { formButtonProps, inputProps } = useFormSubmit({
    onSubmit: async () => {
      await sleep(3);
      return { success: "Verification complete" };
    },
    onSuccess() {
      router.navigate(paths.registersuccess);
    },
  });

  return (
    <AuthScaffold
      title="Enter Your NIN"
      description="This is to confirm your identity"
    >
      <View className="gap-10">
        <View className="gap-4">
          {fields.map((field) => (
            <AppInput key={field.name} {...field} {...inputProps(field.name)} />
          ))}
        </View>
        <AppMessage
          variant="info"
          message="Your data is encrypted and securely stored. We comply with all Nigerian data protection regulations."
          icon="lock_outline"
        />
        <View className="gap-2">
          <FormButton
            {...formButtonProps}
            className={cn(cls.btn.primary, "w-full")}
            childrenClassName={cn(cls.btn.primaryText)}
          >
            Verify Identity
          </FormButton>
          <AppButton
            onPress={router.back}
            className={cn(cls.btn.flat, "w-full")}
          >
            <TText className={cn(cls.btn.buttonTextClass, cls.text.primary)}>
              Choose another method
            </TText>
          </AppButton>
        </View>
      </View>
    </AuthScaffold>
  );
}

const fields: AppInputPropsWithName[] = [
  {
    name: "nin",
    label: "NIN (National Identification Number)",
    placeholder: "Enter 11-digit NIN",
    keyboardType: "number-pad",
    regexFormatter: /^[0-9]{0,11}$/,
  },
];
