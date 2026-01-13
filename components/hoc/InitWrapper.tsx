import { useSplashStore } from "@/hooks/stores/splashStore";
import { useFonts } from "expo-font";
import React, { Fragment, useEffect } from "react";

export default function InitWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const setFontsLoaded = useSplashStore((s) => s.setInitializedFonts);
  const setAssetsLoaded = useSplashStore((s) => s.setAssetsLoaded);
  const [fontsLoaded] = useFonts({
    ClashDisplayBold: require("@/assets/fonts/SF-Pro-Display-Bold.otf"),
    ClashDisplaySemiBold: require("@/assets/fonts/SF-Pro-Display-Semibold.otf"),
    ClashDisplayMedium: require("@/assets/fonts/SF-Pro-Display-Medium.otf"),
    ClashDisplayLight: require("@/assets/fonts/SF-Pro-Display-Light.otf"),
    ClashDisplay: require("@/assets/fonts/SF-Pro-Display-Regular.otf"),
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    setFontsLoaded(fontsLoaded);
    setTimeout(() => {
      setAssetsLoaded(true);
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontsLoaded]);
  return (
    <Fragment
    // key={`${fontsLoaded}`}
    >
      {children}
    </Fragment>
  );
}
