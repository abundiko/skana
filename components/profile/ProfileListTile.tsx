import { cls } from "@/constants";
import { cn } from "@/lib/cn";
import { AppIcons } from "../icons/AppIcons";
import { TView } from "../themed";
import ListTile from "../ui/ListTile";

export type ProfileListTileProps = {
  title: string;
  icon: keyof typeof AppIcons;
  onPress: () => void;
  suffix?: React.ReactNode;
};

export default function ProfileListTile({
  title,
  icon,
  onPress,
  suffix,
}: ProfileListTileProps) {
  const Icon = AppIcons[icon];

  return (
    <>
      <ListTile
        prefix={
          <TView
            variant="opacified05"
            className="rounded-full p-3 justify-center items-center"
          >
            <Icon className={cn("h-4 w-4", cls.text.shade200)} />
          </TView>
        }
        title={title}
        suffix={suffix}
        onPress={onPress}
      />
    </>
  );
}
