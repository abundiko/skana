import { formatPrice } from "@/functions/number";
import { cn } from "@/lib/cn";
import { View } from "react-native";
import { useResolveClassNames } from "uniwind";
import Skeleton from "../animation/Skeleton";
import { AppIcons } from "../icons/AppIcons";
import { AppMessage } from "../layout/AppMessage";
import { TText } from "../themed";
import { AppInput } from "../ui/AppInput";
import UserAvatar from "../ui/UserAvatar";
import { WalletBalance } from "../wallet/WalletBalance";
import { useSendContext } from "./SendContext";

export default function SendAmountTop() {
  const style = useResolveClassNames(cn("border-green-500"));
  const {
    accountQuery: { data },
    amount,
  } = useSendContext();

  return (
    <View className=" justify-center items-center gap-4">
      {!data ? (
        <LoadingView />
      ) : (
        <>
          <View className="relative">
            <UserAvatar
              size={60}
              src={data?.imageUrl}
              name={data?.fullname}
              style={{ borderWidth: 4, borderColor: style.borderColor }}
            />
            <View className="absolute right-0 bg-white rounded-full">
              <View style={{ transform: [{ scale: 1.2 }] }}>
                <AppIcons.verified_badge className="h-4 w-4 text-green-500 " />
              </View>
            </View>
          </View>
          <View>
            <TText variant="base" className="font-medium text-xl text-center">
              {data?.fullname}
            </TText>
            <TText
              variant="shade200"
              className="font-semibold text-sm text-center"
            >
              @{data?.username}
            </TText>
          </View>
        </>
      )}

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
