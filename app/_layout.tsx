import "@/global.css";

import InitWrapper from "@/components/hoc/InitWrapper";
import ThemeWrapper from "@/components/hoc/ThemeWrapper";
import AppStack from "@/components/layout/AppStack";
import { AppToastProvider } from "@/components/layout/AppToast";
import { appQueryClient } from "@/lib/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  return <MainLayout />;
}

function MainLayout() {
  return (
    <>
      <QueryClientProvider client={appQueryClient()}>
        <GestureHandlerRootView>
          <ThemeWrapper>
            <InitWrapper>
              <SafeAreaProvider>
                <AppStack screens={["onboard"]} />
              </SafeAreaProvider>
              <AppToastProvider />
            </InitWrapper>
          </ThemeWrapper>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </>
  );
}
