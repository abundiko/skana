import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { IonIconName } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useResolveClassNames } from "uniwind";
import { TText } from "../themed";

export type ActionCardProps = {
  title: string;
  primaryIcon: IonIconName;
  secondaryIcon?: IonIconName;
  href?: Href;
  onPress?: () => void;
  highlight?: boolean;
  disabled?: boolean;
};

export default function ActionCard({
  title,
  primaryIcon,
  secondaryIcon,
  href,
  onPress,
  highlight,
  disabled = false,
}: ActionCardProps) {
  const urc = useResolveClassNames;
  const primaryIconStyle = urc(cn(cls.text.base));
  const secondaryIconStyle = urc(cn(cls.text.shade300, "mt-1"));

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          onPress?.();
          if (href) router.navigate(href);
        }}
        activeOpacity={0.7}
        className={cn("rounded-xl p-4 items-start justify-start", {
          [`${cls.bg.opacified05}`]: !highlight,
          [`${cls.bg.primaryLight} border border-primary`]: highlight,
          "opacity-60": disabled,
        })}
      >
        <Ionicons name={primaryIcon} size={32} style={primaryIconStyle} />
        <View className="flex-row mt-2">
          <TText variant="base" className="flex-1 text-base font-medium">
            {title}
          </TText>
          {secondaryIcon && (
            <Ionicons
              name={secondaryIcon}
              size={20}
              style={secondaryIconStyle}
            />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
}
