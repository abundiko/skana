import { usePathname } from "expo-router";
import { useEffect, useState } from "react";

export function useExactPathKey(path: string) {
  const [key, setKey] = useState<string>(
    () => path + Date.now().toString() + Math.floor(Math.random() * 9999)
  );
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === path)
      setKey(path + Date.now().toString() + Math.floor(Math.random() * 9999));
  }, [path, pathname]);
  return key;
}
