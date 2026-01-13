import { useEffect } from "react";
import { Keyboard, KeyboardEvent } from "react-native";
import Animated, {
  Easing,
  useAnimatedKeyboard,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function KeyboardSpace() {
  const { height } = useAnimatedKeyboard({
    // isStatusBarTranslucentAndroid: true
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      height.value = withTiming(0, { duration: 0 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Animated.View style={{ height }} />;
}

type AppKeyboardSpaceProps = {
  extraHeight?: number;
};

export function AppKeyboardSpace({
  extraHeight = 0,
}: AppKeyboardSpaceProps = {}) {
  const keyboardHeight = useSharedValue(extraHeight);

  useEffect(() => {
    function fn(ev: KeyboardEvent) {
      const height = ev.endCoordinates.height;

      keyboardHeight.value = withTiming((height ?? 0) + extraHeight, {
        duration: 80,
        easing: Easing.out(Easing.ease),
      });
    }

    const showListener = Keyboard.addListener("keyboardDidShow", fn);
    const hideListener = Keyboard.addListener("keyboardDidHide", fn);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [keyboardHeight, extraHeight]);

  useEffect(() => {
    keyboardHeight.value = extraHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Animated.View style={{ height: keyboardHeight }} />;
}
