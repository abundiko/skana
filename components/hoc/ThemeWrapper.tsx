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
    Uniwind.setTheme("light");
   
  }, [theme]);

  return children;
}
