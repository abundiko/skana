import { cls } from "@/constants";
import { tags } from "@/constants/tags";
import { useLSSettings } from "@/hooks/localStorage/settings";
import { cn } from "@/lib/cn";
import { Settings } from "@/types/settings";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { View } from "react-native";
import { useResolveClassNames } from "uniwind";
import GridView from "../layout/GridView";
import { TText } from "../themed";
import ActionCard, { ActionCardProps } from "../ui/ActionCard";

export default function ThemeSheet() {
  const style = useResolveClassNames(cn(cls.bg.base));
  const {
    updateItem,
    item: { themeMode },
  } = useLSSettings();

  return (
    <>
      <TrueSheet
        name={tags.sheets.theme}
        detents={[0.5]}
        maxHeight={300}
        cornerRadius={24}
        backgroundColor={style.backgroundColor}
        grabberOptions={{
          width: 50,
        }}
      >
        <View className="p-5">
          <TText variant="base" className="font-semibold text-lg my-4">
            Select Theme
          </TText>
          <GridView
            data={actions.map((action, i) => (
              <ActionCard
                key={i}
                {...action}
                onPress={() => {
                  updateItem({ themeMode: action.theme });
                }}
                highlight={action.theme === themeMode}
              />
            ))}
            cols={3}
            gap={12}
          />
        </View>
      </TrueSheet>
    </>
  );
}

const actions: (ActionCardProps & { theme: Settings["themeMode"] })[] = [
  {
    title: "Light",
    primaryIcon: "sunny-outline",
    theme: "light",
  },
  {
    title: "Dark",
    primaryIcon: "moon-outline",
    theme: "dark",
  },
  {
    title: "Device",
    primaryIcon: "phone-portrait-outline",
    theme: "system",
  },
];
