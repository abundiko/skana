import { cls } from "@/constants";
import { useAppTheme } from "@/hooks/useAppTheme";
import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TText, TView } from "../themed";

type SecurePassKeyBoardProps = {
  onKeyPress?: (key: string) => void;
  onChange?: (key: string) => void;
  noPoint?: boolean;
  value: string;
  disabled?: boolean;
};

export default function SecurePassKeyBoard({
  onKeyPress,
  onChange,
  noPoint = true,
  value,
  disabled = false,
}: SecurePassKeyBoardProps) {
  const { textLight } = useAppTheme();
  const [keys] = useState(
    () =>
      [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        [noPoint ? "" : ".", "0", "back"],
      ] as const
  );
  function handleKeyPress(key: string) {
    onKeyPress?.(key);
    if (key === "back") onChange?.(value.slice(0, -1));
    else onChange?.(value + key);
  }

  return (
    <TView
      variant="base"
      pointerEvents={disabled ? "none" : "auto"}
      className={cn({ "opacity-50": disabled })}
    >
      <View className="flex-col" style={{ gap: 12 }}>
        {keys.map((row, i) => (
          <View
            key={i}
            className="flex-row justify-between"
            style={{ gap: 10 }}
          >
            {row.map((key) => (
              <TouchableOpacity
                activeOpacity={0.4}
                key={key}
                onPressIn={() => handleKeyPress(key)}
                className={cn(
                  "h-12 flex-1 items-center justify-center rounded-xl",
                  cls.bg.pure,
                  cls.border.class
                )}
                style={{ minWidth: 40 }}
              >
                {key === "back" ? (
                  <Ionicons
                    name="backspace-outline"
                    size={24}
                    color={textLight}
                  />
                ) : (
                  <TText
                    variant="shade100"
                    className="text-secondary-950 font-medium text-lg"
                  >
                    {key}
                  </TText>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </TView>
  );
}
