import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { tags } from "@/constants/tags";
import { sleep } from "@/functions/helpers";
import { formatPrice } from "@/functions/number";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { cn } from "@/lib/cn";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useResolveClassNames } from "uniwind";
import { InsetSpacing } from "../layout/InsetSpacing";
import SecurePassKeyBoard from "../layout/SecurePassKeyBoard";
import { TText, TView } from "../themed";
import FormButton from "../ui/FormButton";
import { PinInput } from "../ui/PinInput";

export default function ConfirmPinSheet({ amount }: { amount: string }) {
  const [value, setValue] = useState("");
  const style = useResolveClassNames(cn(cls.bg.base));

  const { formButtonProps } = useFormSubmit({
    extra: { pin: value },
    onSubmit: async () => {
      await sleep(3);
      TrueSheet.dismiss(tags.sheets.confirmPin);
      router.back();
      router.replace(paths.paySendSuccess);
    },
  });

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
        dismissible={!formButtonProps.loading}
        backgroundColor={style.backgroundColor}
      >
        <View className="p-5 mt-8">
          <View className=" justify-center items-center gap-5">
            <View pointerEvents="none">
              <PinInput name="" value={value} onChangeText={setValue} />
            </View>
            <FormButton
              disabled={btnDisabled}
              {...formButtonProps}
              className={cn(cls.btn.primary, "gap-2 flex-row self-stretch")}
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
