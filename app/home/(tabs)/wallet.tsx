import { HomeBottomNavSpace } from "@/components/home/HomeBottomNav";
import HomeScaffold from "@/components/home/HomeScaffold";
import { AppIcons } from "@/components/icons/AppIcons";
import { TText, TView } from "@/components/themed";
import AppButton from "@/components/ui/AppButton";
import ListGroup from "@/components/ui/ListGroup";
import ListTile, { ListTileProps } from "@/components/ui/ListTile";
import WalletTopBar from "@/components/wallet/WalletTopBar";
import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { View } from "react-native";

export default function WalletScreen() {
  return (
    <HomeScaffold heading="Wallet" topContent={<WalletTopBar />}>
      <View className="p-5 gap-5">
        <ListGroup title={"Linked Accounts"}>
          {profileActions.map((action, i) => {
            const Icon = AppIcons[action._icon];
            return (
              <ListTile
                key={i}
                {...action}
                prefix={
                  <TView className="rounded-full p-3 justify-center items-center bg-primary-50">
                    <Icon className={cn("h-4 w-4", cls.text.primary)} />
                  </TView>
                }
                suffix={
                  <TText variant="shade400" className="font-semibold text-sm">
                    Remove
                  </TText>
                }
              />
            );
          })}
          <AppButton className={cn(cls.btn.flat, "gap-2 flex-row mt-2")}>
            <AppIcons.plus className={cn(cls.btn.primaryText, "h-3 w-3")} />
            <TText variant="primary" className={cn(cls.btn.buttonTextClass)}>
              Add Payment Method
            </TText>
          </AppButton>
        </ListGroup>
        <HomeBottomNavSpace />
      </View>
    </HomeScaffold>
  );
}

const profileActions: (ListTileProps & { _icon: keyof typeof AppIcons })[] = [
  {
    title: "GTBank Mastercard",
    subTitle: "****4532",
    _icon: "card_outline",
  },
  {
    title: "Access Bank",
    subTitle: "012345678",
    _icon: "bank_fill",
  },
];
