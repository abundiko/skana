import React, { memo, useEffect, useMemo, useState } from "react";
import { ViewProps } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type DelayRenderProps = ViewProps & {
  children: React.ReactNode;
  milliseconds?: number;
  fallback?: React.ReactNode;
  animation?: typeof FadeIn;
  onLoadingChange?: (loading: boolean) => void;
};

export function DelayRender({
  children,
  milliseconds = 200,
  fallback,
  animation,
  onLoadingChange,
  ...props
}: DelayRenderProps) {
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (milliseconds < 0) {
    console.warn("DelayRender: milliseconds should not be negative");
    milliseconds = 0;
  }

  useEffect(() => {
    onLoadingChange?.(isLoading);
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        setReady(true);
        setIsLoading(false);
      });
    }, milliseconds);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [milliseconds, isLoading, onLoadingChange]);

  const AnimatedContent = useMemo(
    () => (
      <Animated.View {...props} entering={animation || FadeIn}>
        {children}
      </Animated.View>
    ),
    [children, props, animation]
  );

  try {
    return ready ? AnimatedContent : fallback;
  } catch (error) {
    console.error("DelayRender Error:", error);
    return fallback;
  }
}

export default memo(DelayRender);
