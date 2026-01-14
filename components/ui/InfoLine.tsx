import { cn } from "@/lib/cn";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { TText } from "../themed";

export type InfoLineProps = {
  title: ReactNode;
  value: ReactNode;
  titleClassName?: string;
  valueClassName?: string;
  vertical?: boolean;
};

export default function InfoLine({
  title,
  value,
  vertical = false,
  ...props
}: InfoLineProps) {
  return (
    <View
      className={cn("my-0 items-start", {
        "flex-row": !vertical,
      })}
    >
      {typeof title === "string" ? (
        <TText
          variant="shade300"
          className={cn(
            "font-medium text-base text-left",
            props.titleClassName
          )}
        >
          {title}
        </TText>
      ) : (
        title
      )}
      {/* <TBgGreyView className="mx-2 h-[1px] flex-1" /> */}
      <View className="mx-2 h-px flex-1" />
      {typeof value === "string" ? (
        <TText
          variant="shade100"
          className={cn(
            "font-medium text-base text-right",
            props.valueClassName
          )}
        >
          {value}
        </TText>
      ) : (
        value
      )}
    </View>
  );
}
