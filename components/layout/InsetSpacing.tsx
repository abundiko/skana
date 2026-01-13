import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Top() {
  const top = useSafeAreaInsets().top;

  return <View style={{ height: top }} />;
}

function Bottom() {
  const bottom = useSafeAreaInsets().bottom;

  return <View style={{ height: bottom }} />;
}

export const InsetSpacing = {
  Top,
  Bottom,
};
