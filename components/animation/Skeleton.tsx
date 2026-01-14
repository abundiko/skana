import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { ViewProps } from "react-native";
import Animated, {
  AnimatedProps,
  CSSAnimationKeyframes,
} from "react-native-reanimated";

export default function Skeleton(props: AnimatedProps<ViewProps>) {
  const blink: CSSAnimationKeyframes = {
    from: {
      opacity: 0.5,
    },
    to: {
      opacity: 1,
    },
  };

  return (
    <Animated.View
      {...props}
      className={cn(" rounded-xl", cls.bg.opacified10, props.className)}
      style={[
        { opacity: 0 },
        {
          animationName: blink,
          animationDuration: `${0.7}s`,
          animationDelay: `${0}s`,
          animationIterationCount: "infinite",
          animationTimingFunction: "ease-in-out",
          animationDirection: "alternate",
        },
        props.style,
      ]}
    />
  );
}
