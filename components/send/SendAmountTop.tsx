import { formatPrice } from "@/functions/number";
import { View } from "react-native";
import Skeleton from "../animation/Skeleton";
import AccountVerifiedCard from "../common/AccountVerifiedCard";
import { AppMessage } from "../layout/AppMessage";
import { TText } from "../themed";
import { AppInput } from "../ui/AppInput";
import { WalletBalance } from "../wallet/WalletBalance";
import { useSendContext } from "./SendContext";

export default function SendAmountTop() {
  const {
    accountQuery: { data },
    amount,
  } = useSendContext();

  return (
    <View className=" justify-center items-center gap-4">
      {!data ? <LoadingView /> : <AccountVerifiedCard user={data} />}

      <View>
        <TText variant="base" className="font-bold text-2xl text-center">
          {formatPrice(amount)}
        </TText>
        <TText variant="shade400" className="font-semibold text-sm text-center">
          Available Balance:{" "}
          <WalletBalance.Display show value={formatPrice("682420.40")} />
        </TText>
      </View>
      <View className="w-full">
        <AppMessage
          variant="success"
          message="Transaction fee ₦0"
          icon="exclamation"
        />
      </View>
      <AppInput placeholder="Add a note (optional)" type="textarea" />
    </View>
  );
}

function LoadingView() {
  return (
    <View className=" justify-center items-center">
      <Skeleton className={"aspect-square w-15 h-15 rounded-full"} />
      <Skeleton className={"mt-4 w-40 h-6 rounded-full"} />
      <Skeleton className={"mt-2 w-20 h-3 rounded-full"} />
    </View>
  );
}
