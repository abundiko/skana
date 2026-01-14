import { $login } from "@/actions/auth/login";
import AuthScaffold from "@/components/auth/AuthScaffold";
import { AppIcons } from "@/components/icons/AppIcons";
import { AppInput, AppInputPropsWithName } from "@/components/ui/AppInput";
import FormButton from "@/components/ui/FormButton";
import { cls } from "@/constants";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { cn } from "@/lib/cn";
import React from "react";
import { View } from "react-native";

export default function RegisterCreatePinScreen() {
  const { formButtonProps, inputProps } = useFormSubmit({
    onSubmit: $login,
  });

  return (
    <AuthScaffold
      title="Create New PIN"
      description="Choose a strong password to secure your account."
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
    label: "New PIN",
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
