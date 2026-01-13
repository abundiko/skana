import { View } from "react-native";
import AppScaffold from "../layout/AppScaffold";
import { InsetSpacing } from "../layout/InsetSpacing";
import { TText } from "../themed";

type AuthScaffoldProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function AuthScaffold({
  title,
  description,
  children,
}: AuthScaffoldProps) {
  return (
    <AppScaffold>
      <View className="px-5 gap-1">
        <TText variant="base" className="font-semibold text-xl">
          {title}
        </TText>
        <TText variant="shade200" className="text-base mb-8">
          {description}
        </TText>

        {children}
        <InsetSpacing.Bottom />
      </View>
    </AppScaffold>
  );
}
