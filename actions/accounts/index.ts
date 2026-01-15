import { sleep } from "@/functions/helpers";
import { dummyUsers, UserModel } from "@/types/user";

export async function $getAccounts(): Promise<UserModel[]> {
  await sleep(3);
  return dummyUsers;
}

export async function $getAccountById(id: string): Promise<UserModel | null> {
  await sleep(3);
  const found = dummyUsers.find((u) => u._id === id);
  return found || null;
}
