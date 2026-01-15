import { randomNumber } from "@/functions/helpers";
import { UserModel } from "@/types/user";
import { useState } from "react";
import { View } from "react-native";
import Skeleton from "../animation/Skeleton";
import { AppIcons } from "../icons/AppIcons";
import { TText } from "../themed";
import ListTile from "../ui/ListTile";
import UserAvatar from "../ui/UserAvatar";

type UserListTileProps = {
  user: UserModel;
  onPress?: () => void;
};

export default function UserListTile({ user, onPress }: UserListTileProps) {
  return (
    <>
      <ListTile
        onPress={onPress}
        prefix={
          <UserAvatar size={50} src={user.imageUrl} name={user.fullname} />
        }
        title={
          <View className="flex-row items-center gap-2">
            <TText variant="shade100" className="font-medium text-lg">
              {user.fullname}
            </TText>
            <AppIcons.verified_badge className="h-4 w-4 text-green-500" />
          </View>
        }
        subTitle={`@${user.username}`}
        suffix={<></>}
      />
    </>
  );
}

export function UserListTileSkeleton() {
  const [titleWidth] = useState(() => randomNumber(50, 80));
  const [subTitleWidth] = useState(() => randomNumber(20, titleWidth));

  return (
    <View className="flex-row gap-4 items-center px-4 py-2">
      <Skeleton className={"rounded-full aspect-square w-12.5 h-12.5"} />
      <View className="flex-1 gap-2">
        <Skeleton
          className={"rounded-full h-4"}
          style={{ width: `${titleWidth}%` }}
        />
        <Skeleton
          className={"rounded-full h-2"}
          style={{ width: `${subTitleWidth}%` }}
        />
      </View>
    </View>
  );
}
