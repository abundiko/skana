import * as LocalAuth from "expo-local-authentication";

export function useBioAuth({
  onVerify,
  onCancel,
}: {
  onVerify?: () => void;
  onCancel?: () => void;
}) {
  async function attemptVerify() {
    const result = await LocalAuth.authenticateAsync({
      promptMessage: "Verify with biometrics",
    });
    if (result.success) {
      onVerify?.();
    } else onCancel?.();
  }

  return { attemptVerify };
}

export const BiometricManager = {
  useBioAuth,
};
