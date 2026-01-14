import { TStatusBar, TText } from "@/components/themed";
import { cls } from "@/constants";
import { useAppTheme } from "@/hooks/useAppTheme";
import { cn } from "@/lib/cn";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, View } from "react-native";
import TView, { TViewProps } from "../themed/TView";

/**
 * Props for the AppBar component.
 */
export interface AppBarProps {
  /** The title of the app bar. Can be a string or a React Node. */
  title?: ReactNode | string;
  /** The subtitle to display below the title. */
  subtitle?: ReactNode | string;
  /** Icons or elements to display on the right side of the app bar. */
  icons?: ReactNode;
  /** If true, the back button is hidden. Defaults to false (checks router.canGoBack). */
  hideBack?: boolean;
  /** The height of the app bar. Defaults to 60. */
  appbarHeight?: number;
  /** Custom handler for the back button press. */
  onBackPress?: () => void;
  /** If true, renders a bottom border. */
  borderBottom?: boolean;
  centerTitle?: boolean;
}

/**
 * A standard application bar component.
 * Designed to be used within a SafeAreaView context (like AppScaffold).
 */
export default function AppBar({
  title = "",
  hideBack = false,
  icons: children,
  appbarHeight = 60,
  onBackPress,
  subtitle,
  borderBottom = false,
  centerTitle = false,
}: AppBarProps) {
  const canGoBack = router.canGoBack();

  return (
    <>
      <TStatusBar />
      <View
        style={{
          height: appbarHeight,
          zIndex: 5,
        }}
        className={cn("flex-row items-center justify-between px-4 w-full", {
          [`border-b ${cls.border.class}`]: borderBottom,
        })}
      >
        {!hideBack && canGoBack && <BackIcon onPress={onBackPress} />}

        <View className="flex-1 flex-row items-center justify-between pl-2">
          {typeof title === "string" ? (
            <View
              className={cn("flex-1 justify-center", {
                "items-center": centerTitle,
              })}
            >
              <TText
                variant="base"
                className="font-semibold text-lg tracking-wider"
                numberOfLines={1}
              >
                {title}
              </TText>
              {subtitle && (
                <TText
                  variant="shade400"
                  className="text-xs font-medium"
                  numberOfLines={1}
                >
                  {subtitle}
                </TText>
              )}
            </View>
          ) : (
            <View className="flex-1">{title}</View>
          )}

          {children ? (
            <View className="flex-row items-center justify-end pl-2 gap-2">
              {children}
            </View>
          ) : (
            !hideBack &&
            canGoBack && (
              <View pointerEvents="none" style={{ opacity: 0 }}>
                <BackIcon onPress={onBackPress} />
              </View>
            )
          )}
        </View>
      </View>
    </>
  );
}

/**
 * Internal BackIcon component.
 */
function BackIcon({
  onPress,
  color,
}: { onPress?: () => void; color?: string } = {}) {
  const { text } = useAppTheme();
  const canGoBack = router.canGoBack();

  const handleBack = () => {
    if (onPress) onPress();
    else router.back();
  };

  if (canGoBack)
    return (
      <Pressable
        onPress={handleBack}
        hitSlop={8}
        style={{
          height: 40,
          width: 40,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 4,
          marginLeft: -8, // Negative margin to align with padding
        }}
      >
        <Feather name="chevron-left" size={24} color={color ?? text} />
      </Pressable>
    );
}

/**
 * A floating back button component.
 * Useful for screens with full-screen content where a standard AppBar is not used.
 */
function Floating(props: TViewProps) {
  return (
    <TView
      {...props}
      variant="base"
      className={cn(
        "aspect-square justify-center items-center p-1 border rounded-full absolute top-5 left-5 z-50",
        cls.border.class05,
        props.className
      )}
    >
      <BackIcon />
    </TView>
  );
}

export const BackButton = {
  BackIcon,
  Floating,
};
