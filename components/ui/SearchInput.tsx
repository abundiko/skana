import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { TextInput, TextInputProps, View } from "react-native";
import { useResolveClassNames } from "uniwind";
import { AppIcons } from "../icons/AppIcons";

type SearchInputProps = TextInputProps & {};

export default function SearchInput(props: SearchInputProps) {
  const style = useResolveClassNames(cn(cls.text.shade400));

  return (
    <View className="relative w-full flex-row items-center">
      <TextInput
        {...props}
        placeholderTextColor={style.color?.toString()}
        className={cn(
          "w-full pl-10 pr-4 py-3 rounded-lg",
          cls.bg.opacified05,
          props.className
        )}
      />
      <View className=" absolute left-3">
        <AppIcons.search_outline className={cn("h-5 w-5", cls.text.shade200)} />
      </View>
    </View>
  );
}
