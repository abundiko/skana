import HomeBottomNav from "@/components/home/HomeBottomNav";
import AppStack from "@/components/layout/AppStack";
import { View } from "react-native";

export default function _layout() {
  return (
    <View className="flex-1 relative">
      <AppStack screens={["index"]} noAnimation />
      <HomeBottomNav />
    </View>
  );
}
