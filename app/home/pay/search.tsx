import Skeleton from "@/components/animation/Skeleton";
import UserListTile, {
  UserListTileSkeleton,
} from "@/components/cards/UserListTile";
import AppScaffold from "@/components/layout/AppScaffold";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import { TText } from "@/components/themed";
import AppList from "@/components/ui/AppList";
import SearchInput from "@/components/ui/SearchInput";
import { paths } from "@/constants/paths";
import { useAccountsQuery } from "@/hooks/query/useAccountsQuery";
import { router } from "expo-router";
import { View } from "react-native";

export default function SearchScreen() {
  const { data, isPending } = useAccountsQuery();

  return (
    <AppScaffold
      centerTitle
      title="Search & Pay"
      underAppbar={
        <View className="px-5 py-2">
          <SearchInput placeholder="search by @username or storename" />
        </View>
      }
      noScroll
    >
      <View className="flex-1">
        {isPending ? (
          <LoadingView />
        ) : (
          data && (
            <AppList
              data={data}
              renderItem={({ item }) => (
                <UserListTile
                  user={item}
                  onPress={() => router.navigate(paths.paySendAmount(item._id))}
                />
              )}
              keyExtractor={(i) => i._id}
              ListHeaderComponent={() => (
                <TText
                  variant="shade200"
                  className="font-semibold text-sm px-5"
                >
                  Recents
                </TText>
              )}
              ListFooterComponent={() => <InsetSpacing.Bottom />}
            />
          )
        )}
      </View>
    </AppScaffold>
  );
}

function LoadingView() {
  return (
    <View className="gap-3">
      <Skeleton className={"w-20 ml-5 my-2 rounded-full h-6"} />
      <UserListTileSkeleton />
      <UserListTileSkeleton />
      <UserListTileSkeleton />
      <UserListTileSkeleton />
    </View>
  );
}
