import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { useResolveClassNames } from "uniwind";
import { TText } from "../themed";

export type AppInputProps = TextInputProps & {
  label?: string;
  parentClassName?: string;
  type?: "text" | "password" | "textarea";
  errors?: string[];
  variant?: "borderClassName" | "underline";
  inputClass?: string;
  prefix?: ReactNode;
  regexFormatter?: RegExp;
  suffix?: ReactNode;
};

export type AppInputPropsWithName<T = string> = AppInputProps & {
  name: T;
};

export function AppInput({
  parentClassName: className,
  type = "text",
  label = "",
  errors,
  variant = "borderClassName",
  inputClass = "",
  prefix,
  suffix,
  ...props
}: AppInputProps) {
  const ref = useRef<TextInput>(null);
  const style = useResolveClassNames(cn("bg-primary", cls.text.shade100));
  const [focused, setFocused] = useState<boolean>(!!props.autoFocus);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { iconStyle } = StyleSheet.create({
    iconStyle: {
      color: style.color,
      fontSize: 20,
    },
  });

  function getInputClassName(): string {
    // if (variant === "underline")
    //   return cn(cls.input.underline, "px-5 py-4", {
    //     "border-primary": focused,
    //   });

    return [
      cls.input.className,
      errors?.length ? "!border-red-500" : "",
      type === "password" ? "pr-6" : "",
      focused ? "border border-primary" : cls.input[variant],
      variant,
      "h-14",
    ]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <View
      // className={`w-full`}
      style={{ opacity: props.readOnly ? 0.6 : 1, position: "relative" }}
    >
      {label && (
        <TText
          variant="shade100"
          className={cn(`pb-2 font-medium`, {
            "pl-5": variant === "underline",
          })}
        >
          {label}
        </TText>
      )}
      <View className="relative h-14">
        <View className="relative flex-1 mb-1 flex-row items-center">
          <TextInput
            {...props}
            onChangeText={(txt) =>
              props.regexFormatter
                ? props.onChangeText?.(txt.replace(props.regexFormatter, ""))
                : props.onChangeText?.(txt)
            }
            multiline={type === "textarea"}
            numberOfLines={type === "textarea" ? 5 : 1}
            textAlignVertical={type === "textarea" ? "top" : "auto"}
            ref={ref}
            selectionColor={style.backgroundColor}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              "text-base w-full",
              getInputClassName(),
              {
                "pr-6": !!suffix,
                "pl-6": !!prefix,
              },
              inputClass
            )}
            style={[
              {
                maxHeight: type === "textarea" ? 120 : undefined,
              },
            ]}
            secureTextEntry={type === "password" && !showPassword}
          />
          {type === "password" && (
            <TouchableOpacity
              hitSlop={30}
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 "
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                style={iconStyle}
              />
            </TouchableOpacity>
          )}
          {prefix}
          {suffix}
        </View>

        {errors && errors.length > 0 && (
          <TText
            className={cn("text-red-500 ", {
              "pl-5 pb-1": variant === "underline",
            })}
          >
            {errors[0]}
          </TText>
        )}
      </View>
    </View>
  );
}
