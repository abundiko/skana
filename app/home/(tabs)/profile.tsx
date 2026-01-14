import HomeScaffold from "@/components/home/HomeScaffold";
import { AppIcons } from "@/components/icons/AppIcons";
import { TText } from "@/components/themed";
import ListGroup from "@/components/ui/ListGroup";
import UserAvatar from "@/components/ui/UserAvatar";
import { useLSAccount } from "@/hooks/localStorage/account";
import { View } from "react-native";

export default function Index() {
  const { item: account } = useLSAccount();

  return (
    <HomeScaffold
      heading="Profile"
      topContent={
        <View className="bg-primary-400 p-2 rounded-t-lg rounded-b-2xl flex-row gap-3 items-center">
          <UserAvatar
            src={account?.imageUrl}
            name={account?.fullname}
            size={60}
            style={{ borderWidth: 1, borderColor: "#fff" }}
          />
          <View>
            <View className="flex-row gap-1 items-center">
              <TText className="text-white font-medium text-base">
                {account?.fullname}
              </TText>
              <AppIcons.verified_badge className="h-4 w-4 text-green-400" />
            </View>
            <TText className="text-white text-sm">@{account?.username}</TText>
          </View>
        </View>
      }
    >
      <View className="p-5 gap-5">
        <ListGroup title="Account">
          <></>
        </ListGroup>
      </View>
    </HomeScaffold>
  );
}
