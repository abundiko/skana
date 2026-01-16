import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { QRFunctions } from "@/functions/qr";
import { useComponentLayoutSize } from "@/hooks/useComponentLayoutSize";
import { cn } from "@/lib/cn";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import { Image, View } from "react-native";
import CameraPermissionBoundary from "../hoc/CameraPermissionBoundary";
import { AppIcons } from "../icons/AppIcons";
import { AppToast } from "../layout/AppToast";
import { InsetSpacing } from "../layout/InsetSpacing";
import { TText } from "../themed";
import AppButton from "../ui/AppButton";

export default function QrScanner() {
  const [enableTorch, setEnableTorch] = useState(false);
  const [overlayLayout, onOverlayLayout] = useComponentLayoutSize();
  const [qrInProcess, setQrInProcess] = useState<BarcodeScanningResult | null>(
    null
  );

  function handleBarCodeScanned(b: BarcodeScanningResult) {
    if (qrInProcess && qrInProcess.data === b.data) return;

    setQrInProcess(b);

    const details = QRFunctions.decodeQrCode(b.data);
    if (!details || !details.user._id) AppToast.error("Invalid QR code");
    else router.replace(paths.paySendAmount(details.user._id, details.amount));
    setTimeout(() => {
      setQrInProcess(null);
    }, 5000);
  }

  const actions: {
    title: string;
    icon: keyof typeof AppIcons;
    onPress: () => void;
  }[] = [
    {
      title: "Flashlight",
      icon: enableTorch ? "flash_light_off_outline" : "flash_light_outline",
      onPress: () => setEnableTorch((_) => !_),
    },
    {
      title: "Upload QR",
      icon: "qr",
      onPress: () => AppToast.success("Hello @abundiko ft Comfort O."),
    },
  ];

  return (
    <CameraPermissionBoundary>
      <View className="flex-1  relative">
        <CameraView
          autofocus="on"
          style={{ flex: 1 }}
          facing="back"
          enableTorch={enableTorch}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleBarCodeScanned}
        />

        <View className="absolute inset-0 w-full h-full justify-center items-center">
          <Image
            onLayout={onOverlayLayout}
            className="relative w-full h-full"
            source={require("@/assets/images/design/camera-overlay.png")}
            resizeMode="cover"
          />
          <View
            style={{
              width: (overlayLayout?.width ?? 10) * 0.45,
            }}
            className="aspect-square absolute"
          >
            <AppIcons.focus_corners className="aspect-square text-white" />
          </View>
        </View>

        <View className="absolute inset-0 w-full h-full justify-end p-5 gap-8">
          <View className="max-w-70 mx-auto gap-6">
            <TText className="text-white text-base font-medium text-center">
              Hold your camera over a Skana QR to pay instantly.
            </TText>
            <View className="flex-row items-center justify-around">
              {actions.map((action, i) => {
                const Icon = AppIcons[action.icon];

                return (
                  <AppButton
                    key={i}
                    onPress={action.onPress}
                    className=" justify-center items-center gap-1"
                  >
                    <View className="aspect-square rounded-full justify-center items-center bg-white p-5">
                      <Icon className="h-6 w-6 text-primary" />
                    </View>
                    <TText className="text-white font-medium text-sm text-center">
                      {action.title}
                    </TText>
                  </AppButton>
                );
              })}
            </View>
          </View>

          <AppButton
            onPress={() => router.replace(paths.paySearch)}
            className={cn(cls.btn.primary, "gap-2")}
          >
            <TText className={cn(cls.btn.primaryText)}>
              Enter @username or storename instead
            </TText>
          </AppButton>

          <InsetSpacing.Bottom />
        </View>
      </View>
    </CameraPermissionBoundary>
  );
}
