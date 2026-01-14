import { cn } from "@/lib/cn";
import { FlatList, View } from "react-native";
import { AppColoredIcons } from "../icons/AppColoredIcons";

const data = [AppColoredIcons.add_banner, AppColoredIcons.add_banner];

export default function AdRow() {
  return (
    <View className="py-2">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => (
          <View className={cn("aspect-360/120 h-30 mr-4", {
            "ml-4": index === 0
          })}>{item({})}</View>
        )}
      />
    </View>
  );
}
