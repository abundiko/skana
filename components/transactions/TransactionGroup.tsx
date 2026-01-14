import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { TransactionModelPopulated } from "@/types/transaction";
import { FlatList, View } from "react-native";
import { TText } from "../themed";
import TransactionCard from "./TransactionCard";

type TransactionGroupProps = {
  group: {
    date: string;
    data: TransactionModelPopulated[];
  };
};

export default function TransactionGroup({ group }: TransactionGroupProps) {
  return (
    <View className="mb-3 gap-2">
      <TText variant="shade200" className="text-base font-medium">
        {group.date}
      </TText>
      <View className={cn("rounded-lg border px-2 py-3", cls.border.class05)}>
        <FlatList
          scrollEnabled={false}
          data={group.data}
          renderItem={({ item, index }) => (
            <TransactionCard transaction={item} borderTop={index !== 0} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}
