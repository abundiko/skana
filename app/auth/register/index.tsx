import AuthScaffold from "@/components/auth/AuthScaffold";
import { AppIcons } from "@/components/icons/AppIcons";
import { TText, TView } from "@/components/themed";
import AppButton from "@/components/ui/AppButton";
import { cls } from "@/constants";
import { paths } from "@/constants/paths";
import { cn } from "@/lib/cn";
import { router } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <AuthScaffold
      title="Choose Account Type"
      description="Select the type of account you want to create"
    >
      <View className="gap-6">
        {accountOptions.map((option, i) => (
          <AppButton key={i} onPress={() => router.navigate(option.href)}>
            <TView
              variant="pure"
              className={cn(
                "border rounded-xl p-4 gap-2 items-start",
                cls.border.class05
              )}
            >
              <View className="rounded-lg p-2 bg-primary-200 aspect-square">
                <option.icon className="h-6 w-6 text-primary" />
              </View>
              <TText variant="primary" className="font-semibold text-base">
                {option.title}
              </TText>
              <TText variant="primary" className=" text-sm">
                {option.description}
              </TText>
            </TView>
          </AppButton>
        ))}
        <TText variant="shade300" className="text-sm text-center">
          You can upgrade or change account type later in settings
        </TText>
      </View>
    </AuthScaffold>
  );
}

const accountOptions = [
  {
    title: "Individual Account",
    description: "Pay friends, shops and services",
    icon: AppIcons.avatar_outline,
    href: paths.registerPhone,
  },
  {
    title: "Business Account",
    description: "Accept payments from customers",
    icon: AppIcons.business_outline,
    href: paths.registerPhone,
  },
];
