import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { Text, TextProps } from "react-native";

type TTextProps = TextProps & {
  variant?: keyof typeof cls.text;
};

export default function TText({
  variant,
  style,
  className,
  children,
  ...props
}: TTextProps) {
  return (
    <Text
      style={[
        style,
        {
          letterSpacing: 0.7,
        },
      ]}
      className={cn(
        `${variant ? cls.text[variant] : ""} font-normal tracking-tight ${className}`
      )}
      {...props}
    >
      {children}{" "}
    </Text>
  );
}
