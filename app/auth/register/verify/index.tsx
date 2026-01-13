import AuthScaffold from "@/components/auth/AuthScaffold";
import { AppIcons } from "@/components/icons/AppIcons";
import { AppToast } from "@/components/layout/AppToast";
import { TText, TView } from "@/components/themed";
import AppButton from "@/components/ui/AppButton";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { cn } from "@/lib/cn";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function RegisterVerificationScreen() {
  return (
    <AuthScaffold
      title="Verify Your Identify"
      description="Choose a verification method to get verified"
    >
      <View className="gap-4">
        {verificationMethods.map((method, i) => (
          <AppButton key={i} onPress={method.action}>
            <TView
              variant="pure"
              className={cn(
                "border rounded-xl px-4 py-5 gap-3 items-center flex-row",
                cls.border.class05
              )}
            >
              <View
                className={cn(
                  "rounded-lg p-2 aspect-square",
                  method.iconBgClass
                )}
              >
                <method.icon className={cn("h-6 w-6", method.iconClass)} />
              </View>
              <View className="flex-1">
                <TText variant="base" className="font-semibold text-base">
                  {method.title}
                </TText>
                <TText variant="shade200" className=" text-sm">
                  {method.description}
                </TText>
              </View>
            </TView>
          </AppButton>
        ))}
      </View>
    </AuthScaffold>
  );
}

const verificationMethods = [
  {
    title: "NIN",
    description: "Recommended for instant verification",
    icon: AppIcons.avatar_outline,
    iconClass: "text-[#1E40AF]",
    iconBgClass: "bg-[#D0FAE5]",
    action: () => router.navigate(paths.registerVerifyNIN),
  },
  {
    title: "BVN",
    description: "Bank Verification Number",
    icon: AppIcons.card_outline,
    iconClass: "text-[#3C78FC]",
    iconBgClass: "bg-[#DBEAFE]",
    action: () => AppToast.error("Please Use NIN"),
  },
  {
    title: "National ID / Passport",
    description: "Manual review required",
    icon: AppIcons.document_outline,
    iconClass: "text-[#9810FA]",
    iconBgClass: "bg-[#F3E8FF]",
    action: () => AppToast.error("Please Use NIN"),
  },
];
