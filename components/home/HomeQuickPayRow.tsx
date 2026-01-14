import { dummyUsers } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useCSSVariable } from "uniwind";
import QuickPayUserCard from "../cards/QuickPayUserCard";
import { TText } from "../themed";
import AppButton from "../ui/AppButton";

export default function HomeQuickPayRow() {
  const primaryColor = useCSSVariable("--color-primary");

  return (
    <View className="py-5 gap-3">
      <TText variant="primary" className="font-semibold text-base px-5">
        Quick Pay
      </TText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dummyUsers}
        renderItem={({ item }) => <QuickPayUserCard user={item} />}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <AppButton className=" justify-center items-center mx-2 gap-1">
            <View className="rounded-full aspect-square p-3 border border-primary">
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={primaryColor?.toString()}
              />
            </View>
            <TText variant="primary" className="font-medium text-xs">
              Add
            </TText>
          </AppButton>
        )}
      />
    </View>
  );
}
