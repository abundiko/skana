import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { useCameraPermissions } from "expo-camera";
import { TStatusBar, TText, TView } from "../themed";
import AppButton from "../ui/AppButton";

export default function CameraPermissionBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <TView variant="base" className="flex-1" />;
  }

  if (!permission.granted) {
    return (
      <TView
        variant="base"
        className="flex-1 justify-center items-center p-5 gap-2"
      >
        <TStatusBar />
        <TText variant="base" className="font-semibold text-lg text-center">
          Camera Permission Reduired.
        </TText>
        <TText
          variant="shade200"
          className="text-base text-center max-w-70 mb-4"
        >
          We need your permission to show the camera for scanning QR codes.
        </TText>
        <AppButton
          onPress={requestPermission}
          className={cn(cls.btn.primary, "gap-2 px-20")}
        >
          <TText className={cn(cls.btn.primaryText)}>Grant Permission</TText>
        </AppButton>
      </TView>
    );
  }

  return children;
}
