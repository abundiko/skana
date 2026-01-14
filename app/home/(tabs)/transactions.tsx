import { HomeBottomNavSpace } from "@/components/home/HomeBottomNav";
import { AppIcons } from "@/components/icons/AppIcons";
import AppScaffold from "@/components/layout/AppScaffold";
import NoTransactionsView from "@/components/transactions/NoTransactionsView";
import { TransactionCardSkeleton } from "@/components/transactions/TransactionCard";
import TransactionFiltersSheet from "@/components/transactions/TransactionFiltersSheet";
import TransactionGroup from "@/components/transactions/TransactionGroup";
import AppButton from "@/components/ui/AppButton";
import AppList from "@/components/ui/AppList";
import SearchInput from "@/components/ui/SearchInput";
import { cls } from "@/constants";
import { useTransactionQuery } from "@/hooks/query/useTransactionsQuery";
import { cn } from "@/lib/cn";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useRef, useState } from "react";
import { View } from "react-native";

export default function Index() {
  const sheetRef = useRef<TrueSheet>(null);
  const [no, setNo] = useState(false);

  const { isPending, groupedTransactions } = useTransactionQuery();

  return (
    <>
      <AppScaffold
        title="Transactions"
        centerTitle
        hideBack
        underAppbar={
          <View className="flex-row gap-2 items-stretch px-5">
            <View className="flex-1">
              <SearchInput placeholder="Search transactions" />
            </View>
            <AppButton
              onPress={() => sheetRef.current?.present()}
              onLongPress={() => setNo(!no)}
              className={cn(
                "p-3 rounded-lg justify-center items-center",
                cls.bg.opacified05
              )}
            >
              <AppIcons.filter_lines
                className={cn("h-5 w-5", cls.text.shade100)}
              />
            </AppButton>
          </View>
        }
        noScroll
      >
        <View className="flex-1 p-5">
          {isPending ? (
            <LoadingView />
          ) : groupedTransactions.length === 0 || no ? (
            <NoTransactionsView className="m-auto" />
          ) : (
            <AppList
              data={groupedTransactions}
              renderItem={({ item }) => <TransactionGroup group={item} />}
              keyExtractor={(item) => item.date}
              ListFooterComponent={() => <HomeBottomNavSpace />}
            />
          )}
        </View>
      </AppScaffold>
      <TransactionFiltersSheet ref={sheetRef} />
    </>
  );
}

function LoadingView() {
  return (
    <View className="gap-1">
      <TransactionCardSkeleton />
      <TransactionCardSkeleton />
      <TransactionCardSkeleton />
    </View>
  );
}
