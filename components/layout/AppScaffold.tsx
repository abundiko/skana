import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  View,
} from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
import { useResolveClassNames } from "uniwind";
import { TStatusBar, TView } from "../themed";
import { TViewProps } from "../themed/TView";
import AppBar, { AppBarProps } from "./AppBar";
import { AppKeyboardSpace } from "./KeyboardSpace";

/**
 * Props for the AppScaffold component.
 * Extends AppBarProps to allow passing app bar configuration directly.
 */
export interface AppScaffoldProps extends AppBarProps {
  /** The main content of the screen. */
  children?: React.ReactNode;
  /** Content to render immediately below the app bar, above the scrollable area. */
  underAppbar?: React.ReactNode;
  /** Content to render at the very bottom of the screen, fixed position. */
  underBody?: React.ReactNode;
  /** If true, disables the default ScrollView wrapper. */
  noScroll?: boolean;
  /** State to indicate if the ScrollView is currently refreshing. */
  refreshing?: boolean;
  /** Callback triggered when the ScrollView is pulled to refresh. */
  onRefresh?: () => void;
  /** If true, the AppBar is hidden. */
  hideAppbar?: boolean;
  /** Props passed to the internal ScrollView. */
  scrollViewProps?: ScrollViewProps;
  /** Props passed to the root TView container. */
  rootViewProps?: TViewProps;
  /** If true, removes the default vertical spacing in the ScrollView. */
  noSpacing?: boolean;
  /** If true, disables the bottom safe area inset. */
  noBottomInset?: boolean;
  /** If true, disables the top safe area inset. */
  noTopInset?: boolean;
  /**
   * Custom edges for SafeAreaView.
   * Defaults to undefined (all edges safe) unless `noBottomInset` is true.
   */
  safeAreaEdges?: Edges;
  
}

/**
 * A scaffold component that provides a consistent layout structure for screens.
 * Includes SafeAreaView handling, AppBar, and scrollable content area.
 */
export default function AppScaffold({
  title = "",
  children,
  underAppbar,
  underBody,
  noScroll = false,
  onRefresh,
  refreshing = false,
  hideAppbar = false,
  scrollViewProps,
  rootViewProps,
  noSpacing = false,
  noBottomInset = true,
  noTopInset = false,
  safeAreaEdges,
  ...appbarProps
}: AppScaffoldProps) {
  const tw: any = useResolveClassNames(cls.bg.base);

  // Determine safe area edges
  const defaultEdges: Edges = [
    "left",
    "right",
    ...((noTopInset ? [] : ["top"]) as any),
    ...((noBottomInset ? [] : ["bottom"]) as any),
  ];
  const finalEdges = safeAreaEdges ?? defaultEdges;

  return (
    <TView
      {...rootViewProps}
      variant={rootViewProps?.variant ?? "base"}
      style={rootViewProps?.style}
      className={cn(rootViewProps?.className, "flex-1")}
    >
      <TStatusBar />
      <SafeAreaView style={{ flex: 1 }} edges={finalEdges}>
        {!hideAppbar && <AppBar title={title} {...appbarProps} />}
        {underAppbar}

        <View className="flex-1">
          {noScroll ? (
            children
          ) : (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                {...scrollViewProps}
                refreshControl={
                  onRefresh ? (
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      progressViewOffset={-50}
                      progressBackgroundColor={tw.backgroundColor}
                      // Make sure tintColor contrasts if needed, or rely on system default
                    />
                  ) : undefined
                }
                className={cn("flex-1", scrollViewProps?.className)}
              >
                {!noSpacing && <View className="h-3" />}
                {children}
              </ScrollView>
              <AppKeyboardSpace />
            </>
          )}
        </View>

        {underBody}
      </SafeAreaView>
    </TView>
  );
}
