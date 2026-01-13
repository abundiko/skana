import { AppColoredIcons } from "@/components/icons/AppColoredIcons";
import AppScaffold from "@/components/layout/AppScaffold";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import { TText } from "@/components/themed";
import FormButton from "@/components/ui/FormButton";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { cn } from "@/lib/cn";
import { router } from "expo-router";
import { View } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";

export default function RegisterSuccess() {
  function handleHome() {
    router.dismissTo(paths.home);
  }

  return (
    <AppScaffold
      hideAppbar
      noScroll
      underBody={
        <View className="p-5 pb-20">
          <FormButton
            onPress={handleHome}
            className={cn(cls.btn.primary, "w-full")}
            childrenClassName={cn(cls.btn.primaryText)}
          >
            Go to Home
          </FormButton>
          <InsetSpacing.Bottom />
        </View>
      }
    >
      <View className="p-5 justify-center items-center flex-1 gap-3">
        <Animated.View entering={ZoomIn.springify().damping(20)}>
          <AppColoredIcons.success_check className="h-40 w-40" />
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().damping(40).delay(80)}>
          <TText
            variant="base"
            className="text-xl font-semibold text-center mt-4"
          >
            {"You're al set!"}
          </TText>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().damping(40).delay(120)}>
          <TText variant="shade200" className="text-base text-center max-w-60">
            Start sending and receiving money instantly with zero fees.
          </TText>
        </Animated.View>
      </View>
    </AppScaffold>
  );
}
