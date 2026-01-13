import { cls } from "@/constants";
import { useTw } from "@/hooks/useAppTheme";
import { useComponentLayoutSize } from "@/hooks/useComponentLayoutSize";
import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  ZoomInEasyUp,
  ZoomOutEasyUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { TText, TView } from "../themed";

type ActionSuccessToastProps = {
  title: string;
  variant: "success" | "error";
};

export default function ActionToast({
  title,
  variant,
}: ActionSuccessToastProps) {
  const { top } = useSafeAreaInsets();
  const style = useTw(
    cn({
      [cls.text.accentGreen]: variant === "success",
      [cls.text.accentRed]: variant === "error",
    })
  );
  const [layout, onLayout] = useComponentLayoutSize();
  const height = (layout?.height ?? 0) + top + 200;
  const [isSwippedOut, setIsSwippedOut] = useState(false);

  const translateY = useSharedValue(0);

  const onDismiss = () => {
    setIsSwippedOut(true);
  };

  // 👇 Pan gesture
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY < 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      const flingVelocity = event.velocityY;
      const threshold = -(height + top + 200); // must move up 25% of screen height

      // condition: either user swiped far enough or flung fast enough
      if (translateY.value < threshold || flingVelocity < -400) {
        translateY.value = withTiming(
          -height,
          { duration: 400 },
          (finished) => {
            if (finished) {
              scheduleOnRN(onDismiss); // Run callback on JS thread
            }
          }
        );
      } else {
        translateY.value = withSpring(0); // return back
      }
    });

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (isSwippedOut) return <></>;
  return (
    <>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          onLayout={onLayout}
          className={"absolute top-20 w-full max-w-[90vw] self-center"}
          style={[
            animatedStyle,
            {
              top: top + 20,
              elevation: 1,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
            },
          ]}
        >
          <Animated.View
            entering={ZoomInEasyUp.springify().damping(70)}
            exiting={isSwippedOut ? undefined : ZoomOutEasyUp.duration(300)}
          >
            <TView
              variant="base"
              className={cn(
                "flex-row items-center rounded-full px-4 py-3 border",
                cls.border.class
              )}
              style={{ gap: 10 }}
            >
              <View className="h-10 w-10">
                <Ionicons
                  name="checkmark-circle"
                  color={style.color}
                  size={40}
                />
              </View>
              <TText variant="shade100" className=" font-semibold text-base">
                {title}
              </TText>
            </TView>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </>
  );
}
