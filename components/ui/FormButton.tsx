import { AppIcons } from "@/components/icons/AppIcons";
import { cn } from "@/lib/cn";
import React from "react";
import { PressableProps } from "react-native";
import SpinInfinite from "../animation/SpinInfinite";
import { TText } from "../themed";
import AppButton from "../ui/AppButton";

export type FormButtonProps = PressableProps & {
  children: React.ReactNode | string;
  childrenClassName?: string;
  loading?: boolean;
};

export default function FormButton({
  children,
  childrenClassName,
  loading = false,
  disabled,
  ...props
}: FormButtonProps) {
  return (
    <AppButton {...props} disabled={loading || disabled}>
      {loading ? (
        // <Image
        //   source={require('@/assets/images/loading.gif')}
        //   className={`h-6 w-6 ${loading ? 'opacity-50' : ''}`}
        // />
        <SpinInfinite duration={10}>
          <AppIcons.spinner className={cn("h-5 w-5", childrenClassName)} />
        </SpinInfinite>
      ) : typeof children === "string" ? (
        <TText className={childrenClassName}>{children}</TText>
      ) : (
        children
      )}
    </AppButton>
  );
}
