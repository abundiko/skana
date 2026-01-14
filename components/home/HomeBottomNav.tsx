import { cls, HOME_NAV_HEIGHT } from "@/constants";
import { paths } from "@/constants/paths";
import { cn } from "@/lib/cn";
import { router, usePathname } from "expo-router";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import DashedLine from "react-native-dashed-line";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useResolveClassNames } from "uniwind";
import { AppIcons } from "../icons/AppIcons";
import { TText, TView } from "../themed";

function HomeBottomNav() {
  const style = useResolveClassNames(cn(cls.text.shade400));
  const { bottom } = useSafeAreaInsets();
  const pathname = usePathname();

  function navigate(to: (typeof items)[number]["href"]) {
    // console.log({ pathname, to });

    if (pathname === to) return;
    if (pathname === paths.home) return router.navigate(to as any);
    if (to === paths.home) return router.back();
    router.replace(to as any);
  }

  return (
    <View style={{ paddingBottom: bottom + 12 }}>
      <View
        style={{
          height: HOME_NAV_HEIGHT,
          zIndex: 999,
          width: "100%",
        }}
      >
        <DashedLine
          dashLength={8}
          dashStyle={{ borderRadius: 5, opacity: 0.2 }}
          dashThickness={1}
          dashColor={style.color?.toString() ?? "#777"}
        />
        <TView
          className={cn("h-full flex-row items-center justify-evenly px-4")}
        >
          {items.map((item, i) => {
            const isActive = item.href === pathname;
            const Icon = isActive
              ? AppIcons[item.icon[1]]
              : AppIcons[item.icon[0]];

            return (
              <TouchableOpacity
                key={item.href + i}
                className="justify-center items-center aspect-square"
                onPress={() => navigate(item.href)}
              >
                <Icon
                  className={cn("h-6 w-6", {
                    [`${cls.text.shade300}`]: !isActive,
                    [`${cls.text.primary}`]: isActive,
                  })}
                />
                <TText
                  variant={isActive ? "primary" : "shade100"}
                  className={cn("text-sm mt-1 font-medium", {
                    "font-semibold": isActive,
                  })}
                >
                  {item.title}
                </TText>
                <View
                  style={{ borderRadius: 10, borderTopEndRadius: 10 }}
                  className={cn(
                    "h-1 w-2",
                    isActive ? cls.bg.primary : "bg-transparent"
                  )}
                />
              </TouchableOpacity>
            );
          })}
        </TView>
      </View>
    </View>
  );
}

export default memo(HomeBottomNav);

const items: {
  title: string;
  icon: [keyof typeof AppIcons, keyof typeof AppIcons];
  href: (typeof paths)[keyof typeof paths];
}[] = [
  {
    title: "Home",
    icon: ["home_outline", "home_fill"],
    href: paths.home,
  },
  {
    title: "Transactions",
    icon: ["transaction_history_outline", "transaction_history_fill"],
    href: paths.homeTransactions,
  },
  {
    title: "Wallet",
    icon: ["card_outline", "card_fill"],
    href: paths.homeWallet,
  },
  {
    title: "Profile",
    icon: ["avatar_outline", "avatar_fill"],
    href: paths.homeProfile,
  },
];
