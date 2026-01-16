import { cls } from "@/constants";
import { tags } from "@/constants/tags";
import { cn } from "@/lib/cn";
import { IonIconName } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { View } from "react-native";
import { useResolveClassNames } from "uniwind";
import { AppIcons } from "../icons/AppIcons";
import { InsetSpacing } from "../layout/InsetSpacing";
import { TText, TView } from "../themed";
import AppButton from "../ui/AppButton";

export default function ShareReceiveQrCodeSheet({ url }: { url: string }) {
  const style = useResolveClassNames("text-primary");

  return (
    <>
      <TrueSheet
        name={tags.sheets.shareReceiveQr}
        detents={["auto"]}
        backgroundBlur="prominent"
      >
        <View className="p-5 mt-8 gap-2">
          <TText variant="base" className="font-semibold text-xl">
            Share your Skana QR
          </TText>
          <TText variant="shade200" className="text-base">
            Let others scan or pay you instantly
          </TText>

          <View className="my-4 flex-row justify-between">
            {actions.map((action, i) => (
              <View key={i} className=" justify-center items-center gap-1">
                <TView className="rounded-full p-4 justify-center items-center bg-primary-50">
                  <Ionicons name={action.icon} size={24} color={style.color} />
                </TView>
                <TText variant="shade300" className="text-sm text-center">
                  {action.title}
                </TText>
              </View>
            ))}
          </View>

          <View
            className={cn(
              "flex-row items-center border rounded-xl px-4 py-3 gap-2",
              cls.border.class
            )}
          >
            <TText
              variant="shade400"
              numberOfLines={1}
              className="flex-1 text-base"
            >
              {url}
            </TText>
            <AppButton>
              <AppIcons.copy_outline className="h-5 w-5 text-primary" />
            </AppButton>
          </View>

          <InsetSpacing.Bottom />
        </View>
      </TrueSheet>
    </>
  );
}

const actions: {
  icon: IonIconName;
  onPress: (url: string) => void;
  title: string;
}[] = [
  {
    title: "Whatsapp",
    icon: "logo-whatsapp",
    onPress: () => {},
  },
  {
    title: "SMS",
    icon: "chatbox-ellipses-outline",
    onPress: () => {},
  },
  {
    title: "Email",
    icon: "mail-outline",
    onPress: () => {},
  },
  {
    title: "Facebook",
    icon: "logo-facebook",
    onPress: () => {},
  },
];
