import { FlashList, FlashListProps, FlashListRef } from "@shopify/flash-list";
import { memo, useRef, useState } from "react";
import { FlatList, FlatListProps, View } from "react-native";

type AppListProps<T extends any> = FlatListProps<T> & FlashListProps<T>;

function AppList<T>(props: AppListProps<T>) {
  const flashListRef = useRef<FlashListRef<T>>(null);
  const [isFlatListVisible, setIsFlatListVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const canSwap = !isScrolling && !isFlatListVisible;

  return (
    <View style={{ flex: 1, position: "relative", alignItems: "stretch" }}>
      <View style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <FlashList
          {...props}
          ref={flashListRef}
          onLayout={(...e) => {
            props.onLayout?.(...e);
            setTimeout(() => setIsFlatListVisible(false), 500);
          }}
          style={{
            opacity: !canSwap ? 0 : 1,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {!canSwap && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            alignSelf: "stretch",
            width: "100%",
            zIndex: 1,
            inset: 0,
          }}
        >
          <FlatList
            {...props}
            data={props.data ?? []}
            refreshing={
              typeof props.refreshing === "boolean" ? props.refreshing : false
            }
            scrollEventThrottle={16}
            onScroll={({ nativeEvent }) => {
              const progress = nativeEvent.contentOffset.y;
              flashListRef.current?.scrollToOffset({
                offset: progress,
                animated: false,
              });
            }}
            ListEmptyComponent={<></>}
            onScrollEndDrag={() => setIsScrolling(false)}
            onScrollBeginDrag={() => setIsScrolling(true)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

export default memo(AppList) as typeof AppList;
