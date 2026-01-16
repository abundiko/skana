import { cls } from "@/constants";
import { useAppTheme } from "@/hooks/useAppTheme";
import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { memo, ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { TText } from "../themed";

export type ListTileProps = TouchableOpacityProps & {
  title: ReactNode;
  subTitle?: ReactNode;
  icon?: string;
  suffixIcon?: string | false;
  href?: string;
  underline?: boolean;
  listClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  children?: ReactNode;
};

function ListTile({
  listClassName,
  suffixIcon,
  prefix,
  suffix,
  children,
  ...item
}: ListTileProps) {
  const { textLight, textLighter } = useAppTheme();
  const isAccordion = !!children;
  const [open, setOpen] = React.useState(false);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        {...item}
        onPress={(e) =>
          isAccordion
            ? setOpen(!open)
            : item.onPress
              ? item.onPress(e)
              : item.href
                ? router.navigate(item.href as any)
                : undefined
        }
        style={{ gap: 10, opacity: item.disabled ? 0.5 : 1 }}
        className={cn(
          "relative flex-row items-center overflow-hidden px-4 py-[4%]",
          listClassName,
          {
            [`border-b ${cls.border.class05}`]: item.underline,
          }
        )}
      >
        {prefix}
        {item.icon && (
          <Ionicons name={item.icon as any} size={20} color={textLight} />
        )}
        <View className="flex-1">
          {typeof item.title === "string" ? (
            <TText variant="shade100" className="text-base font-medium">
              {item.title}
            </TText>
          ) : (
            item.title
          )}
          {item.subTitle && (
            <>
              {typeof item.subTitle === "string" ? (
                <TText variant="shade300" className="flex-1 text-xs">
                  {item.subTitle}
                </TText>
              ) : (
                item.subTitle
              )}
            </>
          )}
        </View>
        {suffix ? (
          suffix
        ) : suffixIcon !== false ? (
          <Ionicons
            name={(suffixIcon as any) ?? "chevron-forward"}
            color={textLighter}
            style={
              isAccordion
                ? { transform: [{ rotate: open ? "90deg" : "0deg" }] }
                : {}
            }
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
      {isAccordion && open && (
        <Animated.View
          entering={FadeInUp.duration(100)}
          exiting={FadeOutUp.duration(100)}
          className="px-4 pb-4"
        >
          {isAccordion && children}
        </Animated.View>
      )}
    </View>
  );
}

export default memo(ListTile);
