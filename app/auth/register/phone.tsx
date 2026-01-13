import AuthScaffold from "@/components/auth/AuthScaffold";
import PhoneInput from "@/components/ui/PhoneInput";
import { View } from "react-native";

export default function RegisterPhoneScreen() {
  return (
    <AuthScaffold
      title="Enter Your Phone Number"
      description="We’ll send you a verification code"
    >
      <View className="gap-10">
        <PhoneInput />
      </View>
    </AuthScaffold>
  );
}
