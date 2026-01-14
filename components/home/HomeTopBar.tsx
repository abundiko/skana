import { useLSAccount } from "@/hooks/localStorage/account";
import { useDelayedBack } from "@/hooks/useDelayedBack";
import { View } from "react-native";
import { AppIcons } from "../icons/AppIcons";
import { TText } from "../themed";
import AppButton from "../ui/AppButton";
import UserAvatar from "../ui/UserAvatar";

export default function HomeTopBar() {
  useDelayedBack();

  const { item: account } = useLSAccount();

  return (
    <View className="flex-row justify-between items-center">
        <View className="flex-row gap-2 items-center p-2 rounded-full bg-white/10">
          <UserAvatar
            src={account?.imageUrl}
            name={account?.fullname}
            size={40}
            style={{ borderWidth: 1, borderColor: "#fff" }}
          />
          <View>
            <TText className="text-white font-medium text-sm">
              Hello {account?.fullname}
            </TText>
            <TText className="text-white text-xs">@{account?.username}</TText>
          </View>
        </View>
        <AppButton className="aspect-square rounded-full justify-center items-center bg-primary-400 p-3">
          <AppIcons.bell_outline className="h-6 w-6 text-white" />
        </AppButton>
    </View>
  );
}
