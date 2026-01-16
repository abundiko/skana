import AccountVerifiedCard from "@/components/common/AccountVerifiedCard";
import { AppIcons } from "@/components/icons/AppIcons";
import { AppMessage } from "@/components/layout/AppMessage";
import AppScaffold from "@/components/layout/AppScaffold";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import { TText, TView } from "@/components/themed";
import ListTile, { ListTileProps } from "@/components/ui/ListTile";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { useLSAccount } from "@/hooks/localStorage/account";
import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";

export default function ReceiveScreen() {
  const { item: user } = useLSAccount();

  if (!user) return null;

  return (
    <>
      <AppScaffold title="Receive Funds" centerTitle>
        <View className="px-5 gap-4">
          <TView
            variant="pure"
            className="p-4 rounded-2xl gap-4 justify-center items-center"
          >
            <AccountVerifiedCard user={user} />
          </TView>

          <ListTile
            onPress={() => router.navigate(paths.payReceiveQr)}
            title={
              <TText className="text-white font-medium text-lg">
                Show QR Code
              </TText>
            }
            subTitle={
              <TText className="text-[#f9f9f9]  text-sm">
                Let someone scan to pay you
              </TText>
            }
            listClassName={cn(
              "border rounded-xl border-primary-600",
              cls.bg.primary
            )}
            suffix={<Ionicons name={"chevron-forward"} color={"#fff"} />}
            prefix={
              <TView className="rounded-full p-3 justify-center items-center bg-primary-400">
                <AppIcons.qr className={cn("h-4 w-4 text-white")} />
              </TView>
            }
          />

          {secondaryActions.map((action, i) => {
            const Icon = AppIcons[action._icon];
            return (
              <ListTile
                key={i}
                {...action}
                listClassName={cn(
                  cls.border.class05,
                  "border rounded-xl",
                  cls.bg.pure
                )}
                prefix={
                  <TView className="rounded-full p-3 justify-center items-center bg-primary-50">
                    <Icon className={cn("h-4 w-4", cls.text.primary)} />
                  </TView>
                }
              />
            );
          })}

          <AppMessage
            variant="info"
            message={
              "Fast & Secure Payments.\nNo need to share bank details. Payments arrive instantly in your skana wallet."
            }
          />

          <InsetSpacing.Bottom />
        </View>
      </AppScaffold>
    </>
  );
}

const secondaryActions: (ListTileProps & { _icon: keyof typeof AppIcons })[] = [
  {
    title: "Request Amount",
    _icon: "naira_sign",
    subTitle: "Set a specific payment amount",
    onPress: () => router.navigate(paths.payReceiveAmount),
  },
  {
    title: "Copy @username",
    _icon: "copy_outline",
    suffix: <></>,
  },
];
