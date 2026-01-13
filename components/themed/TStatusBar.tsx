import { StatusBar, StatusBarProps } from "react-native";
import { useUniwind } from "uniwind";

export default function TStatusBar(
  props: StatusBarProps & { always?: "light" | "dark" }
) {
  const { theme } = useUniwind();
  return (
    <StatusBar
      {...props}
      translucent
      backgroundColor={"#00000000"}
      barStyle={
        props.always === "light"
          ? "light-content"
          : props.always === "dark"
          ? "dark-content"
          : theme === "dark"
          ? "light-content"
          : "dark-content"
      }
    />
  );
}
