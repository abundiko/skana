import { cn } from "@/lib/cn";
import { UserModel } from "@/types/user";
import { View } from "react-native";
import { useResolveClassNames } from "uniwind";
import { AppIcons } from "../icons/AppIcons";
import { TText } from "../themed";
import UserAvatar from "../ui/UserAvatar";

export default function AccountVerifiedCard({ user }: { user: UserModel }) {
  const style = useResolveClassNames(cn("border-green-500"));

  
  return (
  <>
            <View className="relative">
              <UserAvatar
                size={60}
                src={user.imageUrl}
                name={user.fullname}
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
                {user.fullname}
              </TText>
              <TText
                variant="shade200"
                className="font-semibold text-sm text-center"
              >
                @{user.username}
              </TText>
            </View>
          </>)
}
