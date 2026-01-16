import AppScaffold from "@/components/layout/AppScaffold";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import SecurePassKeyBoard from "@/components/layout/SecurePassKeyBoard";
import { useReceiveContext } from "@/components/receive/ReceiveContext";
import { TText, TView } from "@/components/themed";
import AppButton from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { formatPrice } from "@/functions/number";
import { cn } from "@/lib/cn";
import { router } from "expo-router";
import { View } from "react-native";

export default function ReceiveAmountScreen() {
  const { amount, setAmount, isValidAmount } = useReceiveContext();

  const submitDisabled = !amount || amount.trim().length <= 2 || !isValidAmount;

  function handleSenderDecides() {
    setAmount("0");
    router.replace(paths.payReceiveQr);
  }

  return (
    <>
      <AppScaffold
        title="Requst Amount"
        centerTitle
        underBody={
          <View className="px-5 pt-2 pb-5">
            <SecurePassKeyBoard value={amount} onChange={setAmount} />
            <InsetSpacing.Bottom />
          </View>
        }
      >
        <View className="p-5 gap-10">
          <TView variant="pure" className=" rounded-2xl p-4 gap-6">
            <View className="flex-row items-center justify-between">
              <TText variant="shade200" className="font-medium text-lg">
                Amount to request
              </TText>
              <AppButton
                onPress={handleSenderDecides}
                hitSlop={10}
                className="flex-row items-center gap-1 bg-primary-100 rounded-full px-2 py-1"
              >
                <TText
                  variant="primary"
                  className="font-bold text-base text-center"
                >
                  sender decides
                </TText>
              </AppButton>
            </View>
            <TText variant="base" className="font-bold text-3xl">
              {formatPrice(amount)}
            </TText>
            <View className="flex-row gap-2 items-center justify-between">
              {quicks.map((quick, i) => (
                <AppButton
                  className={cn(
                    "flex-1 border py-2 rounded",
                    cls.border.class05
                  )}
                  key={i}
                >
                  <TText
                    variant="shade200"
                    className="font-medium text-base text-center"
                  >
                    {quick}k
                  </TText>
                </AppButton>
              ))}
            </View>
            <AppInput placeholder="Add a note (optional)" type="textarea" />
          </TView>
          <AppButton
            disabled={submitDisabled}
            className={cn(cls.btn.primary, "gap-2 flex-row")}
            onPress={() => router.replace(paths.payReceiveQr)}
          >
            <TText className={cn(cls.btn.primaryText)}>
              Generate Payment Request
            </TText>
          </AppButton>
        </View>
      </AppScaffold>
    </>
  );
}

const quicks = [1, 2, 5, 10, 20];
