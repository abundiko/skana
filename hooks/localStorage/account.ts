import { tags } from "@/constants/tags";
import { UserModel } from "@/types/user";
import { RNLocalStorage, useLocalStorage } from "@abundiko/rn-local-storage";

export const useLSAccount = () =>
  useLocalStorage<UserModel|null>(tags.storage.account, {
    jsonSerialize: true,
    defaultValue: null,
  });

export const LSAccount = RNLocalStorage<UserModel|null>(tags.storage.account, {
  jsonSerialize: true,
  defaultValue: null,
});
