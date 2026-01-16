// import { AppToast } from "@/components/AppToast";
import { useNavigation, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";

export type UseBackHandlerParams = {
  allowBack?: boolean | (() => boolean);
  onBack?: () => void;

  allowTwoTries?: boolean;
  onFirstTry?: () => void;
  onRouteChange?: (segments: string[]) => void;
};

export function useBackHandler({
  allowBack = false,
  onBack,
  allowTwoTries,
  onFirstTry,
  onRouteChange,
}: UseBackHandlerParams) {
  const [tries, setTries] = useState(2);
  const segments = useSegments();
  useEffect(() => {
    onRouteChange?.(segments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments]);

  const navigation = useNavigation();
  useEffect(() => {
    function handler(e?: any) {
      if (allowTwoTries) {
        if (tries > 0) {
          e?.preventDefault();
          if (onFirstTry) onFirstTry();
          else {
            // AppToast.default("press back again to exit");
            // console.log("attemt to go back");
          }
          setTries((v) => v - 1);
          setTimeout(() => resetTries(), 2000);
        } else {
          return false;
        }
      } else {
        console.log("trying to go back");

        onBack?.();
        const allow = typeof allowBack === "function" ? allowBack() : allowBack;

        if (!allow) {
          if (e) e.preventDefault();
          else return !allow;
        }
      }
    }
    const navListener = (e: any) => {
      if (e.data.action.type === "GO_BACK") {
        handler(e);
      }
    };

    // console.log("adding listener");
    navigation.addListener("beforeRemove", navListener);
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        console.log("wow");
        return handler();
      }
    );

    // 4. Remove the event listener when the component unmounts
    return () => {
      navigation.removeListener("beforeRemove", navListener);
      backHandler.remove();
    };
  }, [
    allowBack,
    onBack,
    allowTwoTries,
    onFirstTry,
    tries,
    onRouteChange,
    navigation,
  ]);

  function resetTries() {
    setTries(1);
  }

  return { resetTries };
}
