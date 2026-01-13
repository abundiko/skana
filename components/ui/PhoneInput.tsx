import { cls } from "@/constants";
import { PHONE_CODES, PhoneCode } from "@/data/phone-codes";
import { cn } from "@/lib/cn";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useRef, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { AppIcons } from "../icons/AppIcons";
import { InsetSpacing } from "../layout/InsetSpacing";
import { TText } from "../themed";
import AppButton from "./AppButton";
import { AppInput } from "./AppInput";

export default function PhoneInput() {
  const sheetRef = useRef<TrueSheet>(null);
  const inputRef = useRef<TextInput>(null);
  const [selectedCode, setSelectedCode] = useState<PhoneCode>(() => {
    return PHONE_CODES.find((code) => code.code === "+234")!;
  });

  return (
    <>
      <AppInput
        ref={inputRef}
        label="Phone Number"
        placeholder="000 - 0000 - 000"
        keyboardType="number-pad"
        inputClass="pl-30"
        prefix={
          <View className="absolute left-0 top-0 h-full flex-row items-center pl-2">
            <AppButton
              onPress={() => sheetRef.current?.present()}
              className={cn(
                " flex-row items-center border-r pr-3 h-full",
                cls.border.class05
              )}
            >
              <TText variant="base" className="text-2xl">
                {selectedCode.emoji}
              </TText>
              <AppIcons.chevron_down
                className={cn("h-2 w-2", cls.text.shade300)}
              />
            </AppButton>
            <TText variant="shade200" className="font-medium text-base pl-2">
              {selectedCode.code}
            </TText>
          </View>
        }
      />

      <TrueSheet ref={sheetRef} detents={["auto"]} backgroundBlur="prominent">
        <View className="p-5">
          <TText variant="base" className="font-semibold text-base mb-4">
            Select country code
          </TText>
          <FlatList
            scrollEnabled={false}
            data={PHONE_CODES}
            renderItem={({ item }) => (
              <AppButton
                onPress={() => {
                  setSelectedCode(item);
                  sheetRef.current?.dismiss();
                  inputRef.current?.focus();
                }}
                className={cn(
                  "flex-row gap-2 items-center py-2 px-2 rounded-lg",
                  {
                    "bg-primary/20 border border-primary":
                      item.code === selectedCode.code,
                  }
                )}
              >
                <TText className="text-lg">{item.emoji}</TText>
                <TText className="text-base">{item.country}</TText>
              </AppButton>
            )}
          />
          <InsetSpacing.Bottom />
        </View>
      </TrueSheet>
    </>
  );
}
