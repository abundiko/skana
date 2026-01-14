import { tags } from "@/constants/tags";
import { Settings } from "@/types/settings";
import { RNLocalStorage, useLocalStorage } from "@abundiko/rn-local-storage";

export const useLSSettings = () =>
  useLocalStorage<Settings>(tags.storage.settings, {
    jsonSerialize: true,
    defaultValue: {
      onboarded: false,
      themeMode: "light",
      showWalletBalance: false,
    },
  });

export const LSSettings = RNLocalStorage<Settings>(tags.storage.settings, {
  jsonSerialize: true,
  defaultValue: {
    onboarded: false,
    themeMode: "light",
    showWalletBalance: false,
  },
});
