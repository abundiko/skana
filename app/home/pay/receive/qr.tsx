import { AppIcons } from "@/components/icons/AppIcons";
import AppScaffold from "@/components/layout/AppScaffold";
import { InsetSpacing } from "@/components/layout/InsetSpacing";
import { useReceiveContext } from "@/components/receive/ReceiveContext";
import ShareReceiveQrCodeSheet from "@/components/receive/ShareReceiveQrCodeSheet";
import { TText, TView } from "@/components/themed";
import AppButton from "@/components/ui/AppButton";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { tags } from "@/constants/tags";
import { formatPrice } from "@/functions/number";
import { QRFunctions } from "@/functions/qr";
import { useLSAccount } from "@/hooks/localStorage/account";
import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { router } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useResolveClassNames } from "uniwind";

export default function ReceiveQRScreen() {
  const style = useResolveClassNames("text-primary");
  const { item: user } = useLSAccount();
  const { amount, isValidAmount } = useReceiveContext();

  const qrData = useMemo(
    () =>
      user
        ? QRFunctions.generateQrCodeFromUserAndAmount(user, Number(amount))
        : "",
    [amount, user]
  );

  return (
    <>
      <AppScaffold
        title="Scan to Pay"
        centerTitle
        underBody={
          <View className="px-5 py-2">
            <AppButton
              onPress={() => TrueSheet.present(tags.sheets.shareReceiveQr)}
              className={cn(cls.btn.primary, "gap-2 flex-row")}
            >
              <AppIcons.share className={cn(cls.btn.primaryText, "h-5 w-5")} />
              <TText className={cn(cls.btn.primaryText)}>Share QR Code</TText>
            </AppButton>
            <InsetSpacing.Bottom />
          </View>
        }
      >
        <View className="p-5">
          <TView variant="pure" className="rounded-2xl p-4 mt-6 gap-3">
            <View className="gap-2 justify-center items-center">
              <TText variant="shade400" className=" text-sm text-center">
                Amount to Pay
              </TText>
              <View className="items-center gap-2">
                {isValidAmount ? (
                  <TText
                    variant="base"
                    className="font-bold text-2xl text-center"
                  >
                    {formatPrice(amount)}
                  </TText>
                ) : (
                  <TText
                    variant="base"
                    className="font-bold text-base text-center"
                  >
                    Sender decides
                  </TText>
                )}
                <AppButton
                  onPress={() => router.replace(paths.payReceiveAmount)}
                  hitSlop={10}
                  className="flex-row items-center gap-1 bg-primary-100 rounded-full px-2 py-1"
                >
                  <Ionicons name="pencil" size={14} color={style.color} />
                  <TText
                    variant="primary"
                    className="font-bold text-base text-center"
                  >
                    change
                  </TText>
                </AppButton>
              </View>
            </View>

            <View
              className={cn(
                "my-4 border rounded-xl p-4 mx-auto",
                cls.border.class05
              )}
            >
              {qrData && (
                <QRCode
                  value={qrData}
                  logo={require("@/assets/images/icon.png")}
                  logoSize={30}
                  size={200}
                  logoBackgroundColor="transparent"
                />
              )}
            </View>

            <View className=" justify-center items-center gap-1">
              <TText variant="base" className="font-medium text-xl text-center">
                {user?.fullname}
              </TText>
              <TText
                variant="shade200"
                className="font-semibold text-sm text-center"
              >
                @{user?.username}
              </TText>
              <TText variant="shade200" className="text-sm text-center">
                Scan to pay with Skana
              </TText>
            </View>
          </TView>
        </View>
      </AppScaffold>
      <ShareReceiveQrCodeSheet url="https://skana.app/pay/@chioma_a?req=REQ1761579023922" />
    </>
  );
}
