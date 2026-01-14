import { UserModel } from "@/types/user";
import { View } from "react-native";
import { TText } from "../themed";
import AppButton from "../ui/AppButton";
import UserAvatar from "../ui/UserAvatar";

type QuickPayUserCardProps = {
  user: UserModel;
};

export default function QuickPayUserCard({ user }: QuickPayUserCardProps) {
  return (
    <AppButton className="w-20 justify-center items-center mx-1 gap-1">
      <View className="rounded-full p-0.5 border border-primary">
        <UserAvatar src={user.imageUrl} name={user.fullname} size={44} />
      </View>
      <TText
        variant="shade100"
        className="text-xs font-medium"
        numberOfLines={1}
      >
        @{user.username}
      </TText>
    </AppButton>
  );
}
