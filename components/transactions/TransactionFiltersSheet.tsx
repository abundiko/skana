import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { View } from "react-native";
import { InsetSpacing } from "../layout/InsetSpacing";
import { TText } from "../themed";

type TransactionFiltersSheetProps = {
  ref: React.RefObject<TrueSheet | null>;
};

export default function TransactionFiltersSheet({
  ref,
}: TransactionFiltersSheetProps) {
  return (
    <>
      <TrueSheet ref={ref} detents={["auto"]} backgroundBlur="prominent">
        <View className="p-5">
          <TText variant="base" className="font-semibold text-base mb-4">
            Filters
          </TText>
          <View className="h-40"></View>
          <InsetSpacing.Bottom />
        </View>
      </TrueSheet>
    </>
  );
}
