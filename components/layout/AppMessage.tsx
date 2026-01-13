import { cn } from "@/lib/cn";
import { View } from "react-native";
import { AppIcons } from "../icons/AppIcons";
import { TText } from "../themed";

export type AppMessageProps = {
  variant: "info" | "success" | "error";
  message: string;
  bulletMessage?: string[];
  icon?: keyof typeof AppIcons;
};

export function AppMessage({
  message,
  variant,
  icon,
  bulletMessage = [],
}: AppMessageProps) {
  const Icon = AppIcons[icon ?? "questionmark_circle"];
  const textClass = cn({
    "text-blue-800": variant === "info",
    "text-green-800": variant === "success",
    "text-red-800": variant === "error",
  });

  return (
    <View
      className={cn("rounded-lg border p-3", {
        "bg-blue-50 border-blue-200": variant === "info",
        "bg-green-50 border-green-200": variant === "success",
        "bg-red-50 border-red-200": variant === "error",
      })}
    >
      <View className="flex-row gap-3">
        <Icon className={cn("h-5 w-5", textClass)} />
        <View className="flex-1">
          <TText className={cn("text-xs font-medium", textClass)}>
            {message}
          </TText>
          {bulletMessage.map((msg, i) => (
            <TText key={i} className={cn("text-xs", textClass)}>
              • {msg}
            </TText>
          ))}
        </View>
      </View>
    </View>
  );
}
