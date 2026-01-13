import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { useMemo } from "react";
import { Platform } from "react-native";
import { useResolveClassNames, useUniwind } from "uniwind";

export const useTw = useResolveClassNames;

export function useAppTheme() {
  const { theme: colorScheme } = useUniwind();
  const bg = useTw(cls.bg.base).backgroundColor?.toString() ?? "#fff";
  const bgPure = useTw(cls.bg.pure).backgroundColor?.toString() ?? "#fff";
  const bgPureOpposite =
    useTw(cls.bg.pureAlt).backgroundColor?.toString() ?? "#fff";
  const bgGrey = useTw(cls.bg.grey300).backgroundColor?.toString() ?? "#ededed";
  const primary = useTw(cls.text.primary).color?.toString() ?? "white";
  // const primaryActive = useTw(cls.text.primaryActiveClass).color?.toString() ?? "white";
  const text = useTw(cls.text.base).color?.toString() ?? "white";
  const textLight = useTw(cls.text.shade100).color?.toString() ?? "white";
  const textLighter = useTw(cls.text.shade200).color?.toString() ?? "white";

  const colors = useMemo(
    () => ({
      bg,
      bgPure,
      bgGrey,
      bgPureOpposite,
      primary,
      primaryActive: primary,
      text,
      textLight,
      textLighter,
      statusBar: colorScheme === "dark" ? "light" : "dark",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorScheme]
  );

  const style = useTw(" rounded-xl");
  const backgroundStyle = useTw(cn(cls.bg.base, ""));
  const handleIndicatorStyle = useTw(cn("w-20 h-1.5", cls.bg.opacified10));
  const containerStyle = useTw("rounded-xl");
  const bottomSheetProps = {
    style,
    backgroundStyle,
    handleIndicatorStyle,
    containerStyle,
  };

  const defaultStackOptions = {
    headerShown: false,
    animation: Platform.OS === "ios" ? "slide_from_right" : "fade_from_bottom",
  } as any;

  return { ...colors, colorScheme, defaultStackOptions, bottomSheetProps };
}
