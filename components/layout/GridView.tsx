import { useComponentLayoutSize } from "@/hooks/useComponentLayoutSize";
import React, { useMemo } from "react";
import { View, ViewProps } from "react-native";

export type GridViewProps = ViewProps & {
  cols: number;
  gap?: number | [number, number];
  data: React.ReactNode[];
};


export default function GridView({
  cols,
  gap = 0,
  children,
  className,
  style,
  data,
  ...props
}: GridViewProps) {
  const [layout, onLayout] = useComponentLayoutSize();
  const rowGap = gap instanceof Array ? gap[0] : gap;
  const colGap = gap instanceof Array ? gap[1] : gap;
  const cellSize = useMemo(() => {
    if (!layout) return 0;
    const { width } = layout;
    return (
      Math.floor((width - Math.floor(rowGap * (cols - 1))) / cols - 0.09) - 0.5
    );
  }, [layout, cols, rowGap]);

  return (
    <View
      {...props}
      style={style}
      className={`${className} flex-row flex-wrap`}
      onLayout={(v) => {
        onLayout(v);
        props.onLayout?.(v);
      }}
    >
      {data.map((item, i) => (
        <View
          key={i}
          className=""
          style={{
            width: cellSize,
            marginRight: i % cols === cols - 1 ? 0 : rowGap,
            marginBottom: colGap,
            display: cellSize < 2 ? "none" : "flex",
          }}
        >
          {item}
        </View>
      ))}
    </View>
  );
}
