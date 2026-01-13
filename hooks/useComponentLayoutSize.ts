import { useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

export function useComponentLayoutSize() {
  const [layout, setLayout] = useState<LayoutRectangle>();

  function onLayout(event: LayoutChangeEvent) {
    setLayout(event.nativeEvent.layout);
  }

  return [layout, onLayout] as const;
}
