import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { ImageBackground, ScrollView, View } from "react-native";
import { InsetSpacing } from "../layout/InsetSpacing";
import { TStatusBar, TText, TView } from "../themed";

export type HomeScaffoldProps = {
  children?: React.ReactNode;
  topContent?: React.ReactNode;
  heading?: React.ReactNode;
};

export default function HomeScaffold({
  children,
  topContent,
  heading,
}: HomeScaffoldProps) {
  return (
    <>
      <TView variant="base" className="relative flex-1">
        <View className="relative overflow-hidden ">
          <TStatusBar always="light" />
          <ImageBackground
            source={require("@/assets/images/design/bg-pattern.png")}
            resizeMode={"repeat"}
            className={cn("relative", cls.bg.primary)}
          >
            <View className="relative">
              <InsetSpacing.Top />
              <View className="py-4 px-5">
                {typeof heading === "string" ? (
                  <TText className="text-white font-semibold text-lg text-center">
                    {heading}
                  </TText>
                ) : (
                  heading
                )}
              </View>
            </View>
          </ImageBackground>
        </View>
        <ScrollView
          bounces={false}
          bouncesZoom={false}
          overScrollMode="never"
          className="flex-1"
        >
          <View className="relative overflow-hidden rounded-b-4xl">
            <ImageBackground
              source={require("@/assets/images/design/bg-pattern.png")}
              resizeMode={"repeat"}
              className={cn("relative", cls.bg.primary)}
            >
              <View className="p-5">{topContent}</View>
            </ImageBackground>
          </View>
          {children}
        </ScrollView>
      </TView>
    </>
  );
}
