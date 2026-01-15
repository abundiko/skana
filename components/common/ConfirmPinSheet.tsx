import { cls } from "@/constants";
import { tags } from "@/constants/tags";
import { formatPrice } from "@/functions/number";
import { cn } from "@/lib/cn";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { InsetSpacing } from "../layout/InsetSpacing";
import SecurePassKeyBoard from "../layout/SecurePassKeyBoard";
import { TText, TView } from "../themed";
import FormButton from "../ui/FormButton";
import { PinInput } from "../ui/PinInput";

export default function ConfirmPinSheet({ amount }: { amount: string }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.length > 6) setValue(value.slice(0, 6));
  }, [value]);

  const btnDisabled = value.length < 6;

  return (
    <>
      <TrueSheet
        name={tags.sheets.confirmPin}
        detents={["auto"]}
        backgroundBlur="prominent"
        dismissible={false}
      >
        <View className="p-5 mt-8">
          <View className=" justify-center items-center gap-5">
            <View pointerEvents="none">
              <PinInput name="" value={value} onChangeText={setValue} />
            </View>
            <FormButton
              disabled={btnDisabled}
              className={cn(cls.btn.primary, "gap-2 flex-row self-stretch")}
              onPress={() => TrueSheet.present(tags.sheets.confirmPin)}
            >
              <TText className={cn(cls.btn.primaryText)}>
                Pay {formatPrice(amount)}
              </TText>
            </FormButton>
            <TText variant="shade200" className=" text-base text-center">
              Forgot PIN?{" "}
              <TText variant="primary" className="font-semibold">
                Click to Reset
              </TText>
            </TText>
          </View>
          <TView variant="base" className="p-3 rounded-2xl mt-4">
            <SecurePassKeyBoard value={value} onChange={setValue} />
          </TView>
          <InsetSpacing.Bottom />
        </View>
      </TrueSheet>
    </>
  );
}
