import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";
import { TView } from "../themed";
import { TViewProps } from "../themed/TView";

export default function GlassView({
  children,
  className,
  screen,
  ...props
}: TViewProps & {
  screen?: string;
}) {
  const { theme } = useUniwind();
  const [showBlur, setShowBlur] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (showBlur) {
        setShowBlur(false);
      }
    });

    return unsubscribe;
  }, [showBlur, navigation]);

  return (
    <TView
      {...props}
      className={cn(
        "border relative overflow-hidden",
        cls.border.class,
        className,
        "border-transparent"
      )}
    >
      <View
        className={cn(
          "absolute w-full h-full top-0 left-0"
          //    {
          //   [cls.bg.opacifiedAlt30]: showBlur,
          //   [cls.bg.opacifiedAlt70]: !showBlur,
          // }
        )}
      >
        {showBlur && (
          <BlurView
            style={{
              width: "100%",
              height: "100%",
            }}
            blurAmount={1}
            downsampleFactor={1}
            blurRadius={1}
            overlayColor="#00000001"
            blurType={theme === "dark" ? "dark" : "light"}
          />
        )}
      </View>

      {children}
    </TView>
  );
}
