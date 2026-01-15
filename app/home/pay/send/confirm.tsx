import ConfirmPinSheet from "@/components/common/ConfirmPinSheet";
import { AppMessage } from "@/components/layout/AppMessage";
import AppScaffold from "@/components/layout/AppScaffold";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import { useSendContext } from "@/components/send/SendContext";
import { TText, TView } from "@/components/themed";
import AppButton from "@/components/ui/AppButton";
import InfoLine from "@/components/ui/InfoLine";
import { cls } from "@/constants";
import { tags } from "@/constants/tags";
import { formatPrice } from "@/functions/number";
import { cn } from "@/lib/cn";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { View } from "react-native";

export default function PayConfirmScreen() {
  const {
    amount,
    accountQuery: { data },
  } = useSendContext();

  return (
    <>
      <AppScaffold centerTitle title="Confirm Payment" noScroll>
        <View className="flex-1 p-5 gap-6">
          <View className="flex-1 gap-6">
            <TView variant="pure" className="rounded-2xl p-4 mt-6 gap-3">
              <View className="gap-2 justify-center items-center">
                <TText
                  variant="shade400"
                  className="font-semibold text-sm text-center"
                >
                  You’re paying
                </TText>
                <TText
                  variant="base"
                  className="font-bold text-2xl text-center"
                >
                  {formatPrice(amount)}
                </TText>
              </View>
              <TView variant="opacified05" className="h-px" />
              <InfoLine title="To" value={data?.username} />
              <InfoLine title="Amount" value={formatPrice(amount)} />
              <InfoLine title="Fee" value={formatPrice(0)} />
              <TView variant="opacified05" className="h-px" />
              <InfoLine
                title="Total"
                titleClassName={cn(cls.text.base)}
                value={formatPrice(amount + 0)}
              />
            </TView>
            <AppMessage
              variant="info"
              message="This payment is instant and cannot be reversed. Please confirm the details are correct."
            />
          </View>
          <AppButton
            className={cn(cls.btn.primary, "gap-2 flex-row")}
            onPress={() => TrueSheet.present(tags.sheets.confirmPin)}
          >
            <TText className={cn(cls.btn.primaryText)}>Confirm Payment</TText>
          </AppButton>

          <InsetSpacing.Bottom />
        </View>
      </AppScaffold>
      <ConfirmPinSheet key={"confirm-pin-for-sending"} amount={amount} />
    </>
  );
}
