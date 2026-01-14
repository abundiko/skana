import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { formatPrice } from "@/functions/number";
import { TransactionFunctions } from "@/functions/transaction";
import { cn } from "@/lib/cn";
import {
  TransactionModel,
  TransactionModelPopulated,
} from "@/types/transaction";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { router } from "expo-router";
import { View } from "react-native";
import { useResolveClassNames } from "uniwind";
import Skeleton from "../animation/Skeleton";
import { TText, TView } from "../themed";
import AppButton from "../ui/AppButton";

type TransactionCardProps = {
  transaction: TransactionModelPopulated;
  borderTop?: boolean;
};

export default function TransactionCard({
  transaction,
  borderTop,
}: TransactionCardProps) {
  return (
    <AppButton
      onPress={() => router.navigate(paths.transactionSingle(transaction._id))}
    >
      <View
        className={cn(
          "flex-row gap-3 items-center py-4 border-t border-transparent",
          {
            [cls.border.class05]: borderTop,
          }
        )}
      >
        <Icon type={transaction.type} />
        <View className="flex-1">
          <TText variant="shade100" className="font-semibold text-base">
            {TransactionFunctions.getLabel(transaction)}
          </TText>
          <TText variant="shade300" className="text-sm">
            {format(transaction.createdAt, "MMM d, h:mm a")}
          </TText>
        </View>
        <View className=" items-end gap-1">
          <Amount
            amount={transaction.amount}
            type={transaction.type}
            status={transaction.status}
          />
          <Pill status={transaction.status} />
        </View>
      </View>
    </AppButton>
  );
}

function Icon({ type }: { type: TransactionModel["type"] }) {
  const style = useResolveClassNames(
    cn({
      [cls.text.accentGreen]: type === "funds-receive",
      [cls.text.accentRed]: type === "funds-sent",
      "text-purple-500": type === "funds-reversed",
    })
  );

  return (
    <TView
      variant="opacified05"
      className="aspect-square rounded-full p-3 justify-center items-center"
    >
      <Ionicons
        name="arrow-up"
        size={16}
        color={style.color?.toString()}
        style={{
          transform: [
            type === "funds-sent" ? { rotate: "35deg" } : { rotate: "220deg" },
          ],
        }}
      />
    </TView>
  );
}
function Pill({ status }: { status: TransactionModel["status"] }) {
  const colorClass = cn({
    [`${cls.text.accentGreen} bg-green-500/10`]: status === "success",
    [`${cls.text.accentRed} bg-red-500/10`]: status === "failed",
    [`text-purple-500 bg-purple-500/10`]: status === "reversed",
    [`text-yellow-500 bg-yellow-500/10`]: status === "pending",
  });

  return (
    <TText
      className={cn(" font-medium text-xs px-2 py-1 rounded-full", colorClass)}
    >
      {status}
    </TText>
  );
}
function Amount({
  status,
  amount,
  type,
}: Pick<TransactionModelPopulated, "status" | "type" | "amount">) {
  const colorClass = cn({
    [`${cls.text.accentGreen}`]:
      status === "success" && type === "funds-receive",
    [`text-purple-500`]: status === "reversed" && type === "funds-reversed",
    [`text-yellow-500`]: status === "pending",
    [`${cls.text.accentRed}`]: status === "failed",
  });
  const currency = type === "funds-receive" ? "+ ₦" : "- ₦";

  return (
    <TText className={cn(" font-semibold text-base", colorClass)}>
      {formatPrice(amount, currency, true)}
    </TText>
  );
}

export function TransactionCardSkeleton() {
  return (
    <View className="flex-row items-center gap-3 py-2">
      <Skeleton className={"rounded-full aspect-square w-10 h-10"} />
      <View className="flex-1 gap-2">
        <Skeleton className={" w-10/12 h-3"} />
        <Skeleton className={" w-6/12 h-3"} />
      </View>
      <View className="w-16 gap-2 items-end">
        <Skeleton className={" w-12/12 h-3"} />
        <Skeleton className={" w-10/12 h-3"} />
      </View>
    </View>
  );
}

export const TransactionCardComponents = {
  Amount,
  Pill,
  Icon,
};
