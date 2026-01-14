import { formatPrice } from "@/functions/number";
import { useLSSettings } from "@/hooks/localStorage/settings";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

function Toggle({ children, color }: { children?: ReactNode; color?: string }) {
  const { text } = useAppTheme();
  const {
    item: { showWalletBalance },
    updateItem,
  } = useLSSettings();

  function toggle() {
    updateItem({ showWalletBalance: !showWalletBalance });
  }

  return (
    <TouchableOpacity hitSlop={30} onPress={toggle}>
      {children ?? (
        <Ionicons
          name={!showWalletBalance ? "eye-outline" : "eye-off-outline"}
          size={25}
          color={color ?? text}
        />
      )}
    </TouchableOpacity>
  );
}

function Display({ value }: { value?: string }) {
  const {
    item: { showWalletBalance },
  } = useLSSettings();

  return showWalletBalance ? value : formatPrice("****", true, true);
}

export const WalletBalance = {
  Toggle,
  Display,
};
