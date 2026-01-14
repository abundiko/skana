import { useNavigation } from "expo-router";
import { useEffect } from "react";

/**
 * use in parent components that have LiquidView children because LiquidView prevents going back
 */
export function useDelayedBack(){
  const navigation = useNavigation();
    useEffect(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        requestAnimationFrame(() => navigation.dispatch(e.data.action));
      });
  
      return unsubscribe;
    }, [navigation]);
}