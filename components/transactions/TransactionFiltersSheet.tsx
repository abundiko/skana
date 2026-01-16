import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { View } from "react-native";
import { useResolveClassNames } from "uniwind";
import { InsetSpacing } from "../layout/InsetSpacing";
import { TText } from "../themed";

type TransactionFiltersSheetProps = {
  ref: React.RefObject<TrueSheet | null>;
};

export default function TransactionFiltersSheet({
  ref,
}: TransactionFiltersSheetProps) {
  const style = useResolveClassNames(cn(cls.bg.base));

  return (
    <>
      <TrueSheet
        ref={ref}
        detents={["auto"]}
        backgroundBlur="prominent"
        backgroundColor={style.backgroundColor}
      >
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
