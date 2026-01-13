import { cls } from "@/constants";
import { useLSSettings } from "@/hooks/localStorage/settings";
import { useExactPathKey } from "@/hooks/useExactPathKey";
import { cn } from "@/lib/cn";
import { ImageBackground, View } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { BackButton } from "../layout/AppBar";
import { InsetSpacing } from "../layout/InsetSpacing";
import { TStatusBar, TText, TView } from "../themed";
import AppButton from "../ui/AppButton";

export type OnboardScreenProps = {
  step: number;
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  primaryAction: () => void;
  secondaryAction?: () => void;
  image: any;
  path: string;
};

export default function OnboardScreen(props: OnboardScreenProps) {
  const pathkey = useExactPathKey(props.path);
  const { updateItem } = useLSSettings();

  function secondaryAction() {
    if (props.secondaryAction) props.secondaryAction();
    else {
      updateItem({
        onboarded: true,
      });
    }
  }

  return (
    <>
      <TStatusBar always="light" />
      <TView variant="base" className="flex-1" key={pathkey}>
        <View className="flex-1 bg-primary relative">
          <View className="relative h-full w-full">
            <ImageBackground
              source={require("@/assets/images/design/bg-pattern.png")}
              resizeMode={"repeat"}
              className="w-full h-full"
            />
          </View>
          <View className="absolute inset-0">
            <InsetSpacing.Top />
            <View className="flex-row items-center justify-between mt-6 px-5">
              <View className="w-20">
                <BackButton.BackIcon color="white" />
              </View>
              <View className="flex-row items-center gap-1">
                {Array.from({ length: 3 }).map((_, index) => (
                  <View
                    key={index}
                    className={cn(
                      {
                        "bg-white": index + 1 === props.step,
                        "bg-white/30": index + 1 !== props.step,
                      },
                      "h-1.5 w-8 rounded-2xl"
                    )}
                  />
                ))}
              </View>
              <View className="w-20" />
            </View>
            <View className="flex-1 overflow-hidden">
              <Animated.View
                entering={FadeInDown.duration(700)}
                exiting={FadeOut.duration(100)}
                className="flex-1 justify-center items-center overflow-hidden"
              >
                <Animated.Image
                  source={props.image}
                  resizeMode="contain"
                  className="w-full h-full"
                  style={{
                    transform: [{ scale: 1.24 }, { translateY: 80 }],
                  }}
                />
              </Animated.View>
            </View>
          </View>
        </View>
        <View className="p-5">
          <View className=" justify-center items-center gap-4 pt-4">
            <Animated.View
              exiting={FadeOut.duration(150)}
              entering={FadeInDown.delay(200).springify().damping(50)}
            >
              <TText
                variant="base"
                className="text-center font-semibold text-xl"
              >
                {props.title}
              </TText>
            </Animated.View>
            <Animated.View
              exiting={FadeOut.duration(150)}
              entering={FadeInDown.delay(400).springify().damping(50)}
            >
              <TText variant="shade100" className="text-center text-base mb-2">
                {props.description}
              </TText>
            </Animated.View>
            <AppButton
              onPress={props.primaryAction}
              className={cn(cls.btn.primary, "w-full")}
            >
              <TText className={cn(cls.btn.primaryText)}>
                {props.primaryActionLabel}
              </TText>
            </AppButton>
            <AppButton
              onPress={secondaryAction}
              className={cn(cls.btn.flat, "w-full")}
            >
              <TText className={cn(cls.btn.buttonTextClass, cls.text.primary)}>
                {props.secondaryActionLabel}
              </TText>
            </AppButton>
          </View>
          <InsetSpacing.Bottom />
        </View>
      </TView>
    </>
  );
}
