import { ReactNode } from "react";
import Animated, { CSSAnimationKeyframes } from "react-native-reanimated";

type SpinInfiniteProps = {
  delay?: number;
  duration?: number;
  children: ReactNode;
};

export default function SpinInfinite({
  delay = 0,
  duration = 2,
  children,
}: SpinInfiniteProps) {
  const pulse: CSSAnimationKeyframes = {
    from: {
      transform: [{ rotate: "0deg" }],
    },
    to: {
      transform: [{ rotate: "3600deg" }],
    },
  };

  return (
    <Animated.View
      style={[
        {
          animationName: pulse,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          animationIterationCount: "infinite",
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
