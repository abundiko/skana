import { AppIcons } from "@/components/icons/AppIcons";
import AppScaffold from "@/components/layout/AppScaffold";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import { useSendContext } from "@/components/send/SendContext";
import { TText, TView } from "@/components/themed";
import AppButton from "@/components/ui/AppButton";
import InfoLine from "@/components/ui/InfoLine";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { formatPrice } from "@/functions/number";
import { useBackHandler } from "@/hooks/useBackHandler";
import { cn } from "@/lib/cn";
import { dummyTransactions } from "@/types/transaction";
import { format } from "date-fns";
import { router } from "expo-router";
import { View } from "react-native";

export default function PaySuccessScreen() {
  const {
    accountQuery: { data },
    amount,
  } = useSendContext();

  useBackHandler({ allowBack: false });

  function handleDone() {
    router.dismissAll();
    router.dismissTo(paths.home);
  }

  function handleViewReceipt() {
    handleDone();
    router.navigate(paths.transactionSingle(dummyTransactions[0]._id));
  }

  return (
    <AppScaffold centerTitle noScroll hideBack>
      <View className="flex-1 gap-6 p-5">
        <View className="flex-1 gap-4">
          <View className=" justify-center items-center gap-2">
            <View className="rounded-full justify-center items-center p-3 aspect-square bg-green-400/10">
              <AppIcons.check_fill className=" size-10 text-green-500" />
            </View>
            <TText variant="base" className=" text-2xl font-bold text-center">
              Payment Successful!
            </TText>

            <View>
              <TText variant="shade200" className=" text-base text-center">
                Your payment has been sent to
              </TText>
              <TText
                variant="shade200"
                className="font-semibold text-base text-center"
              >
                @{data?.username}
              </TText>
            </View>
          </View>

          <TView variant="pure" className="rounded-2xl p-4 mt-6 gap-3">
            <View className="gap-2 justify-center items-center">
              <TText variant="shade400" className=" text-sm text-center">
                Amount Paid
              </TText>
              <TText variant="base" className="font-bold text-2xl text-center">
                {formatPrice(amount)}
              </TText>
            </View>
            <TView variant="opacified05" className="h-px" />
            <InfoLine
              title="Date & Time"
              vertical
              value={format(new Date().toISOString(), "MMM dd, yyyy @ hh:mm a")}
            />
            <TView variant="opacified05" className="h-px" />
            <InfoLine
              title="Transaction ID"
              vertical
              value={"SKN-20260106-3500-FC"}
            />
          </TView>

          <View className="flex-row gap-4 my-3">
            <View className="flex-1 ">
              <AppButton className={cn(cls.btn.primary, "gap-2 flex-row")}>
                <AppIcons.share
                  className={cn(cls.btn.primaryText, "h-5 w-5")}
                />
                <TText className={cn(cls.btn.primaryText)}>Share Receipt</TText>
              </AppButton>
            </View>
            <View className="flex-1 ">
              <AppButton className={cn(cls.btn.gray, "gap-2 flex-row")}>
                <AppIcons.exclamation
                  className={cn(cls.btn.grayText, "h-5 w-5")}
                />
                <TText className={cn(cls.btn.grayText)}>Report Issue</TText>
              </AppButton>
            </View>
          </View>
        </View>

        <AppButton
          onPress={handleDone}
          className={cn(cls.btn.primary, "gap-2 flex-row")}
        >
          <TText className={cn(cls.btn.primaryText)}>Done</TText>
          <AppIcons.arrow_right
            className={cn(cls.btn.primaryText, "h-4 w-4")}
          />
        </AppButton>
        <AppButton
          onPress={handleViewReceipt}
          className={cn(cls.btn.flat, "gap-2 flex-row")}
        >
          <TText variant="primary" className={cn(cls.btn.buttonTextClass)}>
            View Receipt
          </TText>
        </AppButton>

        <InsetSpacing.Bottom />
      </View>
    </AppScaffold>
  );
}
