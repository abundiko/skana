import { cls } from "@/constants";
import { formatPrice } from "@/functions/number";
import { cn } from "@/lib/cn";
import { View } from "react-native";
import { AppIcons } from "../icons/AppIcons";
import { TText } from "../themed";
import AppButton from "../ui/AppButton";
import { WalletBalance } from "./WalletBalance";

export default function WalletTopBar() {
  return (
    <>
      <View className="bg-primary-400 p-3 rounded-t-lg rounded-b-4xl gap-2 items-start">
        <View className="flex-row items-center gap-1">
          <TText className="text-white/90 text-sm font-medium">
            Total Balance
          </TText>
          <WalletBalance.Toggle color="#ffffffee" />
        </View>
        <TText className="font-semibold text-4xl text-white">
          <WalletBalance.Display value={formatPrice("682420.40")} />
        </TText>

        <View className="flex-row gap-3">
          <View className="flex-1 ">
            <AppButton
              className={cn(
                cls.btn.primary,
                "gap-2 flex-row border border-white"
              )}
            >
              <AppIcons.plus className={cn(cls.btn.primaryText, "h-3 w-3")} />
              <TText className={cn(cls.btn.primaryText)}>Add Money</TText>
            </AppButton>
          </View>
          <View className="flex-1 ">
            <AppButton className={cn(cls.btn.primary, "gap-2 flex-row")}>
              <AppIcons.withdraw
                className={cn(cls.btn.primaryText, "h-4 w-4")}
              />
              <TText className={cn(cls.btn.primaryText)}>Withdraw</TText>
            </AppButton>
          </View>
        </View>
      </View>
    </>
  );
}
