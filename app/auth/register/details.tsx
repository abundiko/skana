import AuthScaffold from "@/components/auth/AuthScaffold";
import { AppIcons } from "@/components/icons/AppIcons";
import { TText } from "@/components/themed";
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

export default function RegisterPersonalDetailsScreen() {
  const { formButtonProps, inputProps } = useFormSubmit({
    onSubmit: async () => {
      await sleep(3);
      return { success: "Complete verification" };
    },
    onSuccess() {
      router.navigate(paths.registerVerify);
    },
  });

  return (
    <AuthScaffold
      title="Personal Details"
      description="Tell us a bit about yourself"
    >
      <View className="gap-10">
        <View className="gap-4">
          {fields.map((field) => (
            <AppInput
              key={field.name}
              {...field}
              {...inputProps(field.name)}
              inputClass="pl-10"
            />
          ))}
          <TText variant="shade400" className="text-xs -mt-4">
            Your username must be unique.
          </TText>
        </View>
        <View>
          <FormButton
            {...formButtonProps}
            className={cn(cls.btn.primary, "w-full")}
            childrenClassName={cn(cls.btn.primaryText)}
          >
            Continue
          </FormButton>
        </View>
      </View>
    </AuthScaffold>
  );
}

const fields: AppInputPropsWithName[] = [
  {
    name: "fullname",
    label: "Full Name",
    placeholder: "Enter your full name",
    prefix: (
      <AppIcons.avatar_outline
        className={cn(cls.text.shade100, "h-4 w-4 absolute left-3")}
      />
    ),
  },
  {
    name: "username",
    label: "@Username",
    placeholder: "Enter unique username",
    prefix: (
      <AppIcons.at
        className={cn(cls.text.shade100, "h-4 w-4 absolute left-3")}
      />
    ),
  },
];
