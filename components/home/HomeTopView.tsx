import { paths } from "@/constants/paths";
import { formatPrice } from "@/functions/number";
import { router } from "expo-router";
import { View } from "react-native";
import { AppIcons } from "../icons/AppIcons";
import { TText } from "../themed";
import AppButton from "../ui/AppButton";
import { WalletBalance } from "../wallet/WalletBalance";

export default function HomeTopView() {
  return (
    <View className="gap-8">
      <View className=" justify-center items-center gap-1">
        <View className="flex-row items-center gap-1">
          <TText className="text-white/90 text-sm font-medium">
            Total Balance
          </TText>
          <WalletBalance.Toggle color="#ffffffee" />
        </View>
        <TText className="font-semibold text-4xl text-white">
          <WalletBalance.Display value={formatPrice("682420.40")} />
        </TText>
      </View>
      <View className="flex-row items-center justify-evenly">
        {actions.map((action, i) => {
          const Icon = AppIcons[action.icon];

          return (
            <AppButton
              key={i}
              onPress={action.onPress}
              className=" justify-center items-center gap-1"
            >
              <View className="aspect-square rounded-full justify-center items-center bg-primary-400 p-5">
                <Icon className="h-6 w-6 text-white" />
              </View>
              <TText className="text-white font-medium text-sm text-center">
                {action.title}
              </TText>
            </AppButton>
          );
        })}
      </View>
    </View>
  );
}

const actions: {
  title: string;
  icon: keyof typeof AppIcons;
  onPress: () => void;
}[] = [
  {
    title: "Scan to Pay",
    icon: "scan_outline",
    onPress: () => {},
  },
  {
    title: "Search to Pay",
    icon: "search_outline",
    onPress: () => router.navigate(paths.paySearch),
  },
  {
    title: "Receive",
    icon: "inbox_outline",
    onPress: () => {},
  },
];
