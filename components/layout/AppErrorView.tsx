import { cls } from "@/constants";
import { AppError } from "@/lib/app-error";
import { cn } from "@/lib/cn";
import Animated, { FadeIn, FadeOutDown } from "react-native-reanimated";
import { TText } from "../themed";
import AppButton from "../ui/AppButton";

export type AppErrorViewProps = {
  error: AppError;
  refresh?: () => void;
  loading?: boolean;
  cn?: string;
};

export default function AppErrorView({
  error,
  refresh,
  cn: clss,
  loading,
}: AppErrorViewProps) {
  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOutDown.duration(100)}
      style={{ rowGap: 12 }}
      className={cn("bg-red-500/20 rounded-3xl p-5", clss)}
    >
      <TText variant="base" className="font-medium text-xl">
        {error.message}
      </TText>
      {refresh && (
        <AppButton
          disabled={loading}
          onPress={refresh}
          className={cn(cls.btn.primary, "rounded-[35px] py-[2%] px-6")}
        >
          <TText variant="shade100" className={cls.btn.primaryText}>
            {loading ? "Refreshing..." : "Try Again"}
          </TText>
        </AppButton>
      )}
    </Animated.View>
  );
}
