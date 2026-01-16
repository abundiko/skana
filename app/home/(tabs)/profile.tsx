import ThemeSheet from "@/components/common/ThemeSheet";
import { HomeBottomNavSpace } from "@/components/home/HomeBottomNav";
import HomeScaffold from "@/components/home/HomeScaffold";
import { AppIcons } from "@/components/icons/AppIcons";
import ProfileListTile, {
  ProfileListTileProps,
} from "@/components/profile/ProfileListTile";
import { TText } from "@/components/themed";
import { TransactionCardComponents } from "@/components/transactions/TransactionCard";
import ListGroup from "@/components/ui/ListGroup";
import UserAvatar from "@/components/ui/UserAvatar";
import { tags } from "@/constants/tags";
import { useLSAccount } from "@/hooks/localStorage/account";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { View } from "react-native";

export default function Index() {
  const { item: account } = useLSAccount();

  return (
    <>
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
          {profileActions.map((action, i) => (
            <ListGroup title={action.title} key={i}>
              {action.actions.map((item, i) => (
                <ProfileListTile key={i} {...item} />
              ))}
            </ListGroup>
          ))}
          <HomeBottomNavSpace />
        </View>
      </HomeScaffold>
      <ThemeSheet />
    </>
  );
}

const profileActions: { title: string; actions: ProfileListTileProps[] }[] = [
  {
    title: "Account",
    actions: [
      {
        title: "Personal Information",
        icon: "avatar_outline",
        onPress: () => {},
      },
      {
        title: "Verified Status",
        icon: "check_circle",
        onPress: () => {},
        suffix: <TransactionCardComponents.Pill status="success" />,
      },
    ],
  },
  {
    title: "Security",
    actions: [
      {
        title: "Security Settings",
        icon: "shield_key",
        onPress: () => {},
      },
    ],
  },
  {
    title: "Support",
    actions: [
      {
        title: "Help Centre",
        icon: "questionmark_circle",
        onPress: () => {},
      },
      {
        title: "Term & Privacy",
        icon: "document_outline",
        onPress: () => {},
      },
    ],
  },
  {
    title: "Preferences",
    actions: [
      {
        title: "Notifications",
        icon: "bell_outline",
        onPress: () => {},
      },
      {
        title: "App Theme",
        icon: "theme",
        onPress: () => TrueSheet.present(tags.sheets.theme),
      },
    ],
  },
];
