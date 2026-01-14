import Skeleton from "@/components/animation/Skeleton";
import { AppIcons } from "@/components/icons/AppIcons";
import AppScaffold from "@/components/layout/AppScaffold";
import { AppToast } from "@/components/layout/AppToast";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import { TText, TView } from "@/components/themed";
import { TransactionCardComponents } from "@/components/transactions/TransactionCard";
import AppButton from "@/components/ui/AppButton";
import InfoLine from "@/components/ui/InfoLine";
import UserAvatar from "@/components/ui/UserAvatar";
import { cls } from "@/constants";
import { formatPrice } from "@/functions/number";
import { TransactionFunctions } from "@/functions/transaction";
import { useTransactionQuerySingle } from "@/hooks/query/useTransactionsQuerySingle";
import { cn } from "@/lib/cn";
import { TransactionModelPopulated } from "@/types/transaction";
import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import { useEffect } from "react";
import { ImageBackground, View } from "react-native";

export default function SingleTransaction() {
  const { id } = useLocalSearchParams() as { id: string };

  useEffect(() => {
    if (!id) router.back();
  }, [id]);

  if (id) return <Main id={id} />;
}

function Main({ id }: { id: string }) {
  const { isPending, data } = useTransactionQuerySingle(id);

  return (
    <AppScaffold title="Transaction Details" centerTitle>
      <View className="p-5">
        {isPending ? <LoadingView /> : data && <RenderData data={data} />}
      </View>
      <InsetSpacing.Bottom />
    </AppScaffold>
  );
}

function RenderData({ data }: { data: TransactionModelPopulated }) {
  function shareReceipt() {
    Sharing.isAvailableAsync().then((is) => {
      if (!is) return AppToast.error("Can't share on your device");
      AppToast.success("hello Comfort ft Abundance");
      // Sharing.shareAsync("hello Comfort ft Abundance", {
      //   dialogTitle: "Sharing reciept",
      //   mimeType: "text/plain"
      // });
    });
  }

  return (
    <>
      <ImageBackground
        source={require("@/assets/images/design/bg-pattern.png")}
        resizeMode={"repeat"}
        className={cn("relative rounded-2xl", cls.bg.primary)}
      >
        <View className="p-5 justify-center items-center gap-2">
          <UserAvatar
            src={data.to.imageUrl}
            name={data.to.fullname}
            size={60}
            style={{
              borderWidth: 1,
              borderColor: "#fff",
              position: "absolute",
              top: 0,
              transform: [{ translateY: -30 }],
            }}
          />
          <View className="h-5"></View>
          <TransactionCardComponents.Pill status={data.status} />
          <TText className="font-medium text-white mt-2 text-xl text-center">
            {TransactionFunctions.getLabel(data)}
          </TText>
          <TText className="font-bold text-white mt-2 text-2xl text-center">
            {formatPrice(data.amount)}
          </TText>
        </View>
      </ImageBackground>

      <TView variant="pure" className="roundedrounded-lg p-4 my-5 gap-3">
        <InfoLine title="Paid to" value={`@${data.to.username}`} />
        <InfoLine
          title="Date & Time"
          value={format(data.createdAt, "MMM dd, yyyy @ hh:mm a")}
        />
        <TView variant="opacified05" className="h-px" />
        <View className="flex-row items-center justify-between">
          <InfoLine vertical title="Transaction ID" value={data._id} />
          <AppIcons.copy_outline className="h-6 w-6 text-primary" />
        </View>
        <TView variant="opacified05" className="h-px" />
        <InfoLine title="Total" value={formatPrice(data.amount)} />
        <InfoLine title="Fee" value={formatPrice(0)} />
        <TView variant="opacified05" className="h-px" />
        <InfoLine title="Total" value={formatPrice(data.amount)} />
      </TView>

      <View className="flex-row gap-4 my-3">
        <View className="flex-1 ">
          <AppButton
            onPress={shareReceipt}
            className={cn(cls.btn.primary, "gap-2 flex-row")}
          >
            <AppIcons.share className={cn(cls.btn.primaryText, "h-5 w-5")} />
            <TText className={cn(cls.btn.primaryText)}>Share Receipt</TText>
          </AppButton>
        </View>
        <View className="flex-1 ">
          <AppButton className={cn(cls.btn.gray, "gap-2 flex-row")}>
            <AppIcons.exclamation className={cn(cls.btn.grayText, "h-5 w-5")} />
            <TText className={cn(cls.btn.grayText)}>Report Issue</TText>
          </AppButton>
        </View>
      </View>
      <AppButton className={cn(cls.btn.flat, "gap-2 flex-row")}>
        <TText variant="primary" className={cn(cls.btn.buttonTextClass)}>
          Repeat Payment
        </TText>
      </AppButton>
    </>
  );
}

function LoadingView() {
  return (
    <View className="gap-10">
      <View className="relative items-center">
        <Skeleton className={"absolute h-15 w-15 rounded-full -top-6"} />
        <Skeleton className={"h-40 w-full"} />
      </View>

      <Skeleton className={"gap-4 p-4"}>
        <Skeleton className={"h-8 rounded-full w-10/12"} />
        <Skeleton className={"h-8 rounded-full w-8/12"} />
        <Skeleton className={"h-8 rounded-full w-12/12"} />
        <Skeleton className={"h-8 rounded-full w-9/12"} />
        <Skeleton className={"h-8 rounded-full w-10/12"} />
      </Skeleton>

      <View className="flex-row gap-4">
        <Skeleton className={"h-12 rounded-full flex-1"} />
        <Skeleton className={"h-12 rounded-full flex-1"} />
      </View>
    </View>
  );
}
