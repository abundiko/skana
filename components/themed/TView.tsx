import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { View, ViewProps } from "react-native";

export type TViewProps = ViewProps & {
  variant?: keyof typeof cls.bg;
};

export default function TView({
  variant,
  style,
  className,
  ...props
}: TViewProps) {
  return (
    <View
      style={[style]}
      className={cn(`${variant ? cls.bg[variant] : ""} ${className}`)}
      {...props}
    />
  );
}
