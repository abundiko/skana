import { PHONE_CODES, PhoneCode } from "@/data/phone-codes";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useRef, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { InsetSpacing } from "../layout/InsetSpacing";
import { TText } from "../themed";
import AppButton from "./AppButton";
import { AppInput } from "./AppInput";

export default function PhoneInput() {
  const sheetRef = useRef<TrueSheet>(null);
  const [selectedCode, setSelectedCode] = useState<PhoneCode>(() => {
    return PHONE_CODES.find((code) => code.code === "+234")!;
  });

  return (
    <>
      <AppInput
        label="Phone Number"
        placeholder="000 - 0000 - 000"
        keyboardType="number-pad"
        inputClass="pl-16"
        prefix={
          <Pressable
            onPress={() => sheetRef.current?.present()}
            className="absolute left-2 top-2"
          >
            <TText variant="base" className="text-2xl">
              {selectedCode.emoji}
            </TText>
          </Pressable>
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
                }}
                className="flex-row gap-2 items-center py-2"
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
