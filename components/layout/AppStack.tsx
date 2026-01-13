import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import React from "react";
import { TView } from "../themed";

export type AppStackProps = {
  screens: (
    | string
    | {
        title: string;
        name: string;
      }
  )[];
  noAnimation?: boolean;
};

export default function AppStack({ screens, noAnimation }: AppStackProps) {
  const { bg, defaultStackOptions } = useAppTheme();

  return (
    <TView className="flex-1">
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: bg,
          },
          ...defaultStackOptions,
          animation: noAnimation ? "fade" : defaultStackOptions.animation,
        }}
      >
        {screens.map((screen) => {
          const name = typeof screen === "string" ? screen : screen.name;
          const title = typeof screen === "string" ? screen : screen.title;

          return (
            <Stack.Screen
              key={name}
              name={name}
              options={{
                ...defaultStackOptions,
                animation: noAnimation ? "none" : defaultStackOptions.animation,
                title,
              }}
            />
          );
        })}
      </Stack>
    </TView>
  );
}

type AppStackProtectedProps = Omit<AppStackProps, "screens"> & {
  screens: {
    screens: string[];
    allow: boolean;
  }[];
  home?: string;
};

export function AppStackProtected({
  screens,
  noAnimation,
  home
}: AppStackProtectedProps) {
  const { bg, defaultStackOptions } = useAppTheme();

  return (
    <TView className="flex-1">
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: bg,
          },
          ...defaultStackOptions,
          animation: noAnimation ? "none" : defaultStackOptions.animation,
        }}
        initialRouteName={home}
      >
        {screens.map((group, i) => {
          return (
            <Stack.Protected key={i} guard={group.allow}>
              {group.screens.map((sc, i) => (
                <Stack.Screen
                  key={sc + i}
                  name={sc}
                  options={{
                    ...defaultStackOptions,
                    animation: noAnimation
                      ? "none"
                      : defaultStackOptions.animation,
                    title: sc,
                  }}
                />
              ))}
            </Stack.Protected>
          );
        })}
      </Stack>
    </TView>
  );
}
