import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { View, ViewProps } from "react-native";
import { AppColoredIcons } from "../icons/AppColoredIcons";
import { TText } from "../themed";
import FormButton from "../ui/FormButton";

export default function NoTransactionsView(props: ViewProps) {
  return (
    <View {...props}>
      <View className=" justify-center items-center gap-2">
        <AppColoredIcons.no_transactions className=" h-25 w-30" />
        <TText
          variant="base"
          className="font-medium text-base text-center"
        >
          No transactions yet
        </TText>
        <TText variant="shade200" className="text-sm text-center mb-2 max-w-70">
          Once you make a payment or receive money, your transaction history
          will appear here.
        </TText>
        <FormButton
          className={cn(cls.btn.primary, "w-full")}
          childrenClassName={cn(cls.btn.primaryText)}
        >
          Make Your First Payment
        </FormButton>
      </View>
    </View>
  );
}
