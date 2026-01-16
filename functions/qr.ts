import { UserModel } from "@/types/user";

function generateQrCodeFromUserAndAmount(
  user: Pick<UserModel, "_id" | "username">,
  amount: number
) {
  return JSON.stringify({ amount, user });
}

function decodeQrCode(value: string) {
  try {
    const parsed = JSON.parse(value);
    if ("user" in parsed && "_id" in parsed.user) {
      return parsed as { amount?: number; user: Partial<UserModel> };
    }
    return null;
  } catch (decodeQrError) {
    console.warn({ decodeQrError });
    return null;
  }
}

export const QRFunctions = {
  generateQrCodeFromUserAndAmount,
  decodeQrCode,
};
