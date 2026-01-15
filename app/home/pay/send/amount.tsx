import AppScaffold from "@/components/layout/AppScaffold";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import SecurePassKeyBoard from "@/components/layout/SecurePassKeyBoard";
import SendAmountTop from "@/components/send/SendAmountTop";
import { useSendContext } from "@/components/send/SendContext";
import { TText } from "@/components/themed";
import AppButton from "@/components/ui/AppButton";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { formatPrice } from "@/functions/number";
import { cn } from "@/lib/cn";
import { router } from "expo-router";
import { View } from "react-native";

export default function PayAmountScreen() {
  const {
    accountQuery: { data },
    amount,
    setAmount,
  } = useSendContext();

  const submitDisabled = !data || !amount || amount.trim().length <= 2;

  return (
    <AppScaffold centerTitle title="Pay To" noScroll>
      <View className="flex-1 p-5 gap-6">
        <View className="flex-1">
          <SendAmountTop />
        </View>

        <SecurePassKeyBoard value={amount} onChange={setAmount} />

        <AppButton
          disabled={submitDisabled}
          className={cn(cls.btn.primary, "gap-2 flex-row")}
          onPress={() => router.navigate(paths.paySendConfirm)}
        >
          <TText className={cn(cls.btn.primaryText)}>
            Pay {amount && formatPrice(amount)}
          </TText>
        </AppButton>

        <InsetSpacing.Bottom />
      </View>
    </AppScaffold>
  );
}
