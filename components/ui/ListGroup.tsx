import { ReactNode } from "react";
import { View } from "react-native";
import { TText, TView } from "../themed";

type ListGroupProps = {
  title: string;
  children: ReactNode;
};

export default function ListGroup({ children, title }: ListGroupProps) {
  return (
    <View className="gap-3">
      <TText variant="shade300" className="text-base font-medium">
        {title}
      </TText>
      <TView variant="pure" className="rounded-lg py-2 px-4">
        {children}
      </TView>
    </View>
  );
}
