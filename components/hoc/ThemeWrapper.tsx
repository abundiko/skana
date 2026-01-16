import { useLSSettings } from "@/hooks/localStorage/settings";
import { useEffect } from "react";
import { Uniwind } from "uniwind";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    item: { themeMode: theme },
  } = useLSSettings();

  useEffect(() => {
    if (!theme) return;
    console.log({ theme });
    Uniwind.setTheme(theme);
   
  }, [theme]);

  return children;
}
