import { paths } from "@/constants/paths";
import { useTransactionQuery } from "@/hooks/query/useTransactionsQuery";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";
import Skeleton from "../animation/Skeleton";
import { TText } from "../themed";
import NoTransactionsView from "../transactions/NoTransactionsView";
import { TransactionCardSkeleton } from "../transactions/TransactionCard";
import TransactionGroup from "../transactions/TransactionGroup";
import AppButton from "../ui/AppButton";

export default function HomeRecentTransactions() {
  const [no, setNo] = useState(false);

  const { isPending, groupedTransactions } = useTransactionQuery();

  return (
    <View className="p-5 gap-3">
      <View className="flex-row items-center justify-between">
        <TText
          onPress={() => setNo(!no)}
          variant="primary"
          className="font-semibold text-base"
        >
          Recent Transactions
        </TText>
        <AppButton
          hitSlop={10}
          onLongPress={() => router.navigate(paths.homeTransactions)}
        >
          <TText variant="primary" className="font-medium text-sm">
            View All
          </TText>
        </AppButton>
      </View>
      {isPending ? (
        <LoadingView />
      ) : groupedTransactions.length === 0 || no ? (
        <NoTransactionsView />
      ) : (
        <FlatList
          scrollEnabled={false}
          data={groupedTransactions}
          renderItem={({ item }) => <TransactionGroup group={item} />}
          keyExtractor={(item) => item.date}
        />
      )}
    </View>
  );
}

function LoadingView() {
  return (
    <View className="gap-1">
      <Skeleton className={"h-6 w-20 mb-4"} />
      <TransactionCardSkeleton />
      <TransactionCardSkeleton />
      <TransactionCardSkeleton />
    </View>
  );
}
