import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { TText } from "../themed";
import { AppInputPropsWithName } from "./AppInput";

export type PinInputProps = AppInputPropsWithName & {
  label?: string;
  parentClassName?: string;
  onComplete?: (val: string) => void;

  _className?: string;
  errors?: string[];
  fieldCount?: number;
};

export function PinInput({
  parentClassName: className,
  type = "text",
  label = "",
  errors,
  fieldCount = 6,
  onComplete,
  _className,
  ...props
}: PinInputProps) {
  const [value, setValue] = React.useState(props.value);
  const ref = useBlurOnFulfill({ value: value, cellCount: fieldCount });

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const [codeFieldProps, getCellOnLayout] = useClearByFocusCell({
    value,
    setValue,
  });
  const isComplete = value?.length === fieldCount;

  useEffect(() => {
    if (isComplete) {
      onComplete?.(value);
    } else {
      // onInComplete?.(value);
    }
  }, [value]);

  return (
    <View className={` w-full ${className}`}>
      {label && (
        <TText variant="shade100" className="mb-1">
          {label}
        </TText>
      )}
      <View className="mb-2">
        <CodeField
          {...codeFieldProps}
          {...props}
          ref={ref}
          cellCount={fieldCount}
          value={value}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={(val) => {
            setValue(val);
            props.onChangeText?.(val);
          }}
          rootStyle={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              className={cn(`${cls.input.borderClassName} ${cls.input.className} ${
                (isFocused || !!symbol) ? "border border-primary" : ""
              } mx-[.8%] aspect-square w-[15%] items-center justify-center`, "bg-transparent p-0")}
            >
              <TText variant="primary" className="font-medium text-xl text-center " onLayout={getCellOnLayout(index)}>
                {symbol}
              </TText>
            </View>
          )}
        />
        {errors?.length && <Text className="text-red-500 ">{errors[0]}</Text>}
      </View>
    </View>
  );
}
