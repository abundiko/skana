import React, { memo, useEffect, useMemo, useState } from "react";
import {
  AccessibilityProps,
  Image,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

/* -----------------------------------------------------
 * High contrast palette (safe on light & dark surfaces)
 * ---------------------------------------------------- */
const HIGH_CONTRAST_COLORS = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#00C7BE",
  "#32ADE6",
  "#007AFF",
  "#5856D6",
  "#AF52DE",
  "#FF2D55",
  "#4CD964",
  "#5AC8FA",
  "#FFD60A",
  "#BF5AF2",
  "#D1D1D6",
  "#1C1C1E",
  "#E5E5EA",
  "#FF375F",
  "#0A84FF",
  "#30D158",
] as const;

/* -----------------------------------------------------
 * Deterministic color generator
 * ---------------------------------------------------- */
function getDeterministicColor(seed?: string | number): string {
  if (!seed) {
    return HIGH_CONTRAST_COLORS[
      Math.floor(Math.random() * HIGH_CONTRAST_COLORS.length)
    ];
  }

  const str = String(seed);
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  return HIGH_CONTRAST_COLORS[Math.abs(hash) % HIGH_CONTRAST_COLORS.length];
}

/* -----------------------------------------------------
 * Props
 * ---------------------------------------------------- */
export type UserAvatarProps = {
  /** Full name or label used for initials + color seed */
  name?: string;

  /** Remote image URL */
  src?: string;

  /** Avatar size (width & height) */
  size?: number;

  /** Optional override background color */
  backgroundColor?: string;

  /** Container style */
  style?: StyleProp<ViewStyle>;

  /** Image style override */
  imageStyle?: StyleProp<ImageStyle>;

  /** Initials text style override */
  textStyle?: StyleProp<TextStyle>;

  /** Accessibility label */
  accessibilityLabel?: string;
} & AccessibilityProps;

/* -----------------------------------------------------
 * Component
 * ---------------------------------------------------- */
const UserAvatar = memo<UserAvatarProps>(function UserAvatar({
  name = "",
  src,
  size = 48,
  backgroundColor,
  style,
  imageStyle,
  textStyle,
  accessibilityLabel,
  ...a11yProps
}) {
  const [imageError, setImageError] = useState(false);

  const bgColor = useMemo(
    () => backgroundColor ?? getDeterministicColor(name),
    [backgroundColor, name]
  );

  const initials = useMemo(() => {
    if (!name.trim()) return "?";
    const parts = name.trim().split(/\s+/);
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
  }, [name]);

  const fontSize = Math.round(size * 0.42);

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const showImage = Boolean(src && !imageError);

  return (
    <View
      {...a11yProps}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? name ?? "User avatar"}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      {showImage ? (
        <Image
          source={{ uri: src }}
          onError={() => setImageError(true)}
          resizeMode="cover"
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
            imageStyle,
          ]}
        />
      ) : (
        <Text
          numberOfLines={1}
          style={[
            styles.initials,
            {
              fontSize,
            },
            textStyle,
          ]}
        >
          {initials}
        </Text>
      )}
    </View>
  );
});

/* -----------------------------------------------------
 * Styles
 * ---------------------------------------------------- */
const styles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,

  image: {
    alignSelf: "stretch",
  } as ImageStyle,

  initials: {
    color: "#FFFFFF",
    fontWeight: "600",
  } as TextStyle,
};

export default UserAvatar;
