import React from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AppButton({
  style,
  onPressIn,
  disabled,
  onPressOut,
  className,
  ...props
}: PressableProps) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const btnStyle = useAnimatedStyle(() => ({
    opacity: disabled ? 0.5 : opacity.value,
    transform: [{ scale: scale.value }],
    tintColor: "#777"
  }));

  return (
    <AnimatedPressable
      {...props}
      style={[btnStyle, style]}
      disabled={disabled}
      onPressIn={(p) => {
        if (onPressIn) onPressIn(p);
        opacity.value = withSpring(0.5, { damping: 100, stiffness: 100 });
        scale.value = withSpring(0.97, { damping: 20, stiffness: 500 });
      }}
      onPressOut={(p) => {
        if (onPressOut) onPressOut(p);
        opacity.value = withSpring(1, { damping: 100, stiffness: 100 });
        scale.value = withSpring(1, { damping: 100, stiffness: 100 });
      }}
      className={className}
    />
    // <Pressable
    //   {...(props as any)}
    //   style={[style as any]}
    //   disabled={disabled as boolean}
    //   activeOpacity={0.7}
    //   // onPressIn={(p) => {
    //   //   if (onPressIn) onPressIn(p);
    //   //   opacity.value = withSpring(0.5, {damping: 100, stiffness: 100});
    //   //   scale.value = withSpring(0.99, {damping: 100, stiffness: 100});
    //   // }}
    //   // onPressOut={(p) => {
    //   //   if (onPressOut) onPressOut(p);
    //   //   opacity.value = withSpring(1, {damping: 100, stiffness: 100});
    //   //   scale.value = withSpring(1, {damping: 100, stiffness: 100});
    //   // }}
    //   className={className}
    // />
  );
}
