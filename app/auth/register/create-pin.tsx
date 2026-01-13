import AuthScaffold from "@/components/auth/AuthScaffold";
import { AppIcons } from "@/components/icons/AppIcons";
import { AppMessage } from "@/components/layout/AppMessage";
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

export default function RegisterCreatePinScreen() {
  const { formButtonProps, inputProps } = useFormSubmit({
    onSubmit: async () => {
      await sleep(3);
      return { success: "Complete personal details" };
    },
    onSuccess() {
      router.navigate(paths.registerDetails);
    },
  });

  return (
    <AuthScaffold
      title="Create Your PIN"
      description="Choose a 6-digit PIN for secure access"
    >
      <View className="gap-10">
        <View className="gap-4">
          {fields.map((field) => (
            <AppInput
              key={field.name}
              {...field}
              {...inputProps(field.name)}
              prefix={
                <AppIcons.lock_outline
                  className={cn(cls.text.shade100, "h-4 w-4 absolute left-3")}
                />
              }
              inputClass="pl-10"
            />
          ))}
        </View>
         <AppMessage
                  variant="info"
                  message="Security Tips"
                  icon="lock_outline"
                  bulletMessage={[
                    "Choose a PIN you’ll remember but others can’t guess",
                    "Don’t use obvious numbers like 123456 or your birthday",
                    "Never share your PIN with anyone",
                  ]}
                />
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
    name: "pin",
    label: "Enter PIN",
    placeholder: "******",
    keyboardType: "number-pad",
    type: "password",
  },
  {
    name: "confirmPin",
    label: "Confirm PIN",
    placeholder: "******",
    keyboardType: "number-pad",
    type: "password",
  },
];
